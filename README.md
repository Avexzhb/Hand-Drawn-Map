古韵画境 (GuYun AI Art) 

🎨基于 Google Gemini 2.5 驱动的中国传统手绘风格 AI 艺术生成器

🌟 项目简介“古韵画境”是一个将中国传统视觉美学与现代生成式人工智能深度融合的 Web 应用。它不仅是一个生图工具，更是一套成熟的“两阶段 AI 协议”实验场。通过深度优化的系统指令（System Instructions），它能将简单的关键词转化为极具文化叙事感的视觉作品。

🚀 核心特性双模式协议引擎：内置“手绘城市地图”与“手绘特产工艺”两大核心协议。两阶段工作流 (Two-Stage Workflow)：逻辑推理层：由 gemini-2.5-flash 负责执行复杂的协议逻辑，生成详尽的生图提示词。视觉生成层：由 gemini-2.5-flash-image 负责将提示词转化为最终的高质量艺术图像。极致确定性控制：通过将 temperature 设为 0 并采用 mode: 'ANY' 的强制函数调用，确保 AI 严格遵守协议逻辑。

🛠️ 技术栈前端框架：React + TypeScriptUI 库：Tailwind CSS + Lucide ReactAI SDK：@google/genai (适配 2026 最新语法)部署平台：GitHub Pages / AI Studio Build

📜 协议逻辑 (Protocol Logic)本项目最核心的资产在于其高度结构化的 System Instructions：模式核心逻辑视觉元素[city_map]检索地标、美食、地理布局温暖手绘风格、青绿粉配色、地标剪影[specialty_craft]梳理 5 个工艺步骤、提取产地色彩指纹“S”型构图、文化叙事边框、书法标题


📦 如何运行克隆仓库：git clone https://github.com/您的用户名/GuYun-AI-Art.git安装依赖：npm install配置密钥：在项目的 Secrets 或环境变量中添加 API_KEY（获取自 Google AI Studio）。运行项目：npm start`npm run dev`

🎨 艺术展示

<img width="572" height="1024" alt="513ced059b908af20cea8db046cfbf73" src="https://github.com/user-attachments/assets/4292ccd5-7f35-454f-9aa2-0276f0e81126" />


<img width="572" height="1024" alt="cbe06e7db60536abde38f0b0feba3178" src="https://github.com/user-attachments/assets/23be4aa8-fa81-43b3-9e7e-3d6314fd30fb" />

<img width="768" height="1376" alt="Weixin Image_20260104181852_3021_171" src="https://github.com/user-attachments/assets/374e60ed-bab8-4f0f-8aa5-dc926d0307d0" />

<img width="768" height="1376" alt="Weixin Image_20260104181708_3019_17" src="https://github.com/user-attachments/assets/0f65b7a5-aca3-4d78-96b0-1636670601f4" />




