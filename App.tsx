import React, { useState, useCallback } from 'react';
import { CloudBackground } from './components/CloudBackground';
import { LatticeFrame } from './components/LatticeFrame';
import { Bookmark } from './components/Bookmark';
import { generateImage } from './services/geminiService';
import { AspectRatio, GenerationState } from './types';
import { Loader2, Download, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [placeholder, setPlaceholder] = useState<string>('请输入城市名称');
  
  // 核心：记录当前选中的协议标识符
  const [activeProtocol, setActiveProtocol] = useState<'city_map' | 'specialty_craft'>('city_map');

  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    imageSrc: null,
    error: null,
  });

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // --- 关键修正：确保发送的标识符与指令中的标识符完全一致 ---
      // 统一使用带方括号的格式发送给 Gemini 3 Pro
      const formattedPrompt = `[${activeProtocol}] ${prompt}`;
      
      // 注意：aspectRatio 目前固定为 SQUARE，如需 9:16 可在后面调整
      const imageBase64 = await generateImage(formattedPrompt, aspectRatio);
      setState({ isLoading: false, imageSrc: imageBase64, error: null });
    } catch (err: any) {
      setState({
        isLoading: false,
        imageSrc: null,
        error: err.message || "生成失败，请检查 API 设置或网络。",
      });
    }
  }, [prompt, aspectRatio, activeProtocol]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !state.isLoading && prompt.trim()) {
      handleGenerate();
    }
  };

  const handleDownload = () => {
    if (state.imageSrc) {
      const link = document.createElement('a');
      link.href = state.imageSrc;
      link.download = `gujing-art-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center py-8 px-4 sm:px-6">
      <CloudBackground />

      <header className="mb-4 sm:mb-8 text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-calligraphy text-[#5D4037] mb-2 drop-shadow-sm">
          古韵画境
        </h1>
        <p className="text-[#8D6E63] tracking-widest text-xs sm:text-base font-serif uppercase">
          Classical Chinese AI Art Generator
        </p>
      </header>

      <main className="w-full max-w-[672px] flex-grow flex flex-col items-center justify-start z-10 gap-6">
        
        <div className="w-full relative">
          
          {/* 左侧书签 */}
          <Bookmark 
            side="left" 
            text="手绘城市地图" 
            // 如果你的 Bookmark 组件支持高亮，可以传入 isActive={activeProtocol === 'city_map'}
            onClick={() => {
              setActiveProtocol('city_map');
              setPlaceholder('请输入城市名称');
            }}
          />
          
          {/* 右侧书签 */}
          <Bookmark 
            side="right" 
            text="手绘特产工艺" 
            onClick={() => {
              setActiveProtocol('specialty_craft');
              setPlaceholder('请输入特产名称');
            }}
          />

          <div className="relative z-10">
            <LatticeFrame className="w-full min-h-[400px] sm:min-h-[600px] transition-all duration-500 ease-in-out">
              {state.isLoading ? (
                <div className="flex flex-col items-center justify-center text-[#8D6E63] animate-pulse h-full w-full py-20">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p className="font-serif tracking-widest text-lg">笔墨渲染中...</p>
                  <p className="text-xs opacity-70 mt-2">
                    正在执行 {activeProtocol === 'city_map' ? '城市地图' : '特产工艺'} 协议
                  </p>
                </div>
              ) : state.imageSrc ? (
                <img 
                  src={state.imageSrc} 
                  alt="Generated Art" 
                  className="w-full h-full object-contain max-h-[70vh] shadow-inner"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#D7CCC8] h-full w-full py-20">
                   <ImageIcon className="w-24 h-24 mb-4 opacity-50" />
                   <p className="text-[#A1887F] font-serif tracking-widest text-xl">待君挥毫</p>
                   <p className="text-sm opacity-60 text-[#A1887F] mt-2">
                     请点击书签并输入{activeProtocol === 'city_map' ? '城市' : '特产'}名称
                   </p>
                </div>
              )}
            </LatticeFrame>
          </div>
        </div>

        <div className="w-[95%] sm:w-1/2 bg-[#FDFBF0]/90 backdrop-blur-sm border border-[#8D6E63]/30 p-4 rounded-lg shadow-lg z-20">
          <div className="flex items-stretch gap-3 sm:gap-4 h-12 sm:h-14">
            <div className="flex-1 relative h-full">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full h-full px-4 bg-[#F7F5E6] border-2 border-[#D7CCC8] rounded text-[#4E342E] placeholder-[#BCAAA4] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63] font-serif transition-colors text-sm sm:text-base"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={state.isLoading || !prompt.trim()}
              className={`
                h-full aspect-square flex-shrink-0
                bg-[#DA251C] hover:bg-[#C41E16]
                text-[#FDFBF0]
                font-calligraphy text-lg
                rounded-sm
                shadow-[0_3px_0_#9F1810,0_5px_8px_rgba(93,64,55,0.3)]
                border-t border-white/20
                active:translate-y-[2px]
                transition-all duration-100
                disabled:opacity-50 disabled:cursor-not-allowed
                flex flex-col items-center justify-center
              `}
            >
              {state.isLoading ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                <div className="flex flex-col items-center leading-none">
                  <span>生</span>
                  <span>成</span>
                </div>
              )}
            </button>

             {state.imageSrc && (
                <button
                  onClick={handleDownload}
                  className="h-full w-12 sm:w-16 flex items-center justify-center bg-[#EFEBE9] hover:bg-[#D7CCC8] text-[#5D4037] rounded border-2 border-[#A1887F] transition-colors shadow-sm"
                  title="下载图片"
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
          </div>

          {state.error && (
            <div className="mt-3 text-red-800 bg-red-100/50 border border-red-200 p-2 rounded text-xs text-center">
              {state.error}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-6 sm:mt-8 text-[#A1887F] text-xs font-serif flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-[1px] w-12 bg-[#D7CCC8]"></span>
          <span>Designed with Gemini 3 Pro</span>
          <span className="h-[1px] w-12 bg-[#D7CCC8]"></span>
        </div>
      </footer>
    </div>
  );
};

export default App;