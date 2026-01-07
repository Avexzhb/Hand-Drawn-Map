import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- 协议原文：一字不差嵌入，确保代码直接读取 ---
const SYSTEM_INSTRUCTIONS = `
你是一个专业的传统文化与城市视觉艺术大师。你的任务是根据用户输入的【模式 ID】和【关键词】，严格通过调用 generate_visual_content 函数输出。

模式 1: [city_map] (手绘城市地图)
协议要求：
一、前期调研：搜索【关键词】最新攻略、地标、美食、地理布局。
二、设计要求：采用温暖手绘插画风格，色彩明快。融入当地特色元素（如上海东方明珠、城隍庙）。使用地方特色装饰边框。
三、内容核心：标注 8-12 个必游景点（含手绘图标、简短介绍、门票）、10-15 个地道美食（分类标注、手绘插图、价格区间）、特色体验、交通枢纽（飞机/火车图标）及实用提示。
四、设计细节：景点用建筑剪影，美食用手绘图。中英文双语标注。
五、色彩方案：上海(蓝金)、北京(红金)、西安(黄红)、杭州(青绿粉)。格式：9:16。

模式 2: [specialty_craft] (手绘特产工艺)
协议要求：
第一阶段：调研 5 个核心工艺步骤；检索产地标志建筑（如福建厝、徽派马头墙）及纹样；提取“城市色彩指纹”（苏杭:黛青/湖绿，西安:暖沙/朱红，闽粤:深红/砖红）。
第二阶段：设计“文化叙事边框”包围主体。画面以“城市色彩指纹”为主基调。5 个工艺节点呈“S”型由上至下分布。
第三阶段：原子化图文绑定：[粗体数字] + [手绘插图] + [中文工艺名] + [英文对照]。
视觉：标题与侧边诗词采用模拟毛笔书法的干枯浓淡质感。

输出限制：禁止输出任何普通文本。你必须且只能调用 generate_visual_content 函数，将生成的极其详尽的 Prompt 放入 final_prompt 参数中。
`;

const tools = [{
  functionDeclarations: [{
    name: "generate_visual_content",
    description: "将协议生成的详尽提示词传递给生图接口",
    parameters: {
      type: "object",
      properties: {
        protocol_id: { type: "string", description: "当前协议 ID" },
        final_prompt: { type: "string", description: "生成的专业级生图描述词" }
      },
      required: ["protocol_id", "final_prompt"]
    }
  }]
}];

export const generateImage = async (
  userInput: string, 
  aspectRatio: AspectRatio = AspectRatio.SQUARE
): Promise<string> => {
  try {
    // --- 第一阶段：推理 ---
    const reasoningResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      systemInstruction: SYSTEM_INSTRUCTIONS, 
      contents: [{ role: 'user', parts: [{ text: userInput }] }],
      tools: tools,
      toolConfig: { functionCallingConfig: { mode: 'REQUIRED' } } 
    });

    const callPart = reasoningResponse.candidates?.[0]?.content?.parts?.find(p => p.functionCall);
    const functionCall = callPart?.functionCall;

    if (!functionCall) {
      throw new Error("AI 仍未触发函数，请检查代码中的 SYSTEM_INSTRUCTIONS 是否包含协议原文。");
    }

    const finalPrompt = (functionCall.args as any).final_prompt;

    // --- 第二阶段：生图 ---
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: finalPrompt }], role: "user" }],
      config: { imageConfig: { aspectRatio } }
    });

    const candidates = imageResponse.candidates;
    if (candidates && candidates[0].content.parts) {
      for (const p of candidates[0].content.parts) {
        if (p.inlineData) {
          return `data:image/png;base64,${p.inlineData.data}`;
        }
      }
    }
    throw new Error("生图模型未返回数据");
  } catch (error) {
    console.error("生成流程出错:", error);
    throw error;
  }
};