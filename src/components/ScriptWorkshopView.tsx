import { useState, useEffect, FormEvent } from "react";
import { Sparkles, ArrowRight, Play, Pause, RefreshCw, Layers, CheckCircle, Volume2, Video, Smile, Download, HelpCircle } from "lucide-react";
import { testParseResponse, sampleAIGeneratedScripts } from "../mockData";

interface ScriptWorkshopViewProps {
  inspirationSeed: {
    title: string;
    outline: string[];
    draft: string;
  } | null;
  onClearSeed: () => void;
}

export default function ScriptWorkshopView({ inspirationSeed, onClearSeed }: ScriptWorkshopViewProps) {
  // Parsing states
  const [urlInput, setUrlInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseStep, setParseStep] = useState(0);
  const [parsedResult, setParsedResult] = useState<typeof testParseResponse | null>(null);

  // Generation states
  const [platformTab, setPlatformTab] = useState<"xiaohongshu" | "tiktok" | "moment">("xiaohongshu");
  const [scriptTitle, setScriptTitle] = useState("");
  const [scriptOutline, setScriptOutline] = useState<string[]>([]);
  const [scriptDraft, setScriptDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Digital Human Settings
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.2);
  const [tonePreset, setTonePreset] = useState("Kore");
  const [backgroundTheme, setBackgroundTheme] = useState("office");
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  // Complete Video Generation Simulation
  const [isCompilingVideo, setIsCompilingVideo] = useState(false);
  const [compileStep, setCompileStep] = useState(0);
  const [compiledVideoUrl, setCompiledVideoUrl] = useState<string | null>(null);

  // Load Seed if available from parent components
  useEffect(() => {
    if (inspirationSeed) {
      setScriptTitle(inspirationSeed.title);
      setScriptOutline(inspirationSeed.outline);
      setScriptDraft(inspirationSeed.draft);
      // Determine probable tab from content keywords
      if (inspirationSeed.title.includes("自媒体") || inspirationSeed.title.includes("小红书")) {
        setPlatformTab("xiaohongshu");
      } else if (inspirationSeed.title.includes("AI工作流") || inspirationSeed.title.includes("抖音")) {
        setPlatformTab("tiktok");
      } else {
        setPlatformTab("moment");
      }
    }
  }, [inspirationSeed]);

  // Simulated Parse URL Workflow
  const handleParseUrl = (e: FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setIsParsing(true);
    setParseStep(1);
    setParsedResult(null);

    const steps = [
      "正在提取第三方短视频/图文底稿文本...",
      "AI正在进行深度自然语言分词与逻辑结构标注...",
      "评估首发渠道流量反馈、情绪套路公式分析中...",
      "结构提取已完成，生成可视化营销拆解大纲..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setParseStep(current + 1);
      } else {
        clearInterval(interval);
        setParsedResult(testParseResponse);
        setIsParsing(false);
      }
    }, 800);
  };

  // Generate Script
  const handleGenerateScript = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const sample = sampleAIGeneratedScripts[platformTab];
      setScriptTitle(sample.title);
      setScriptOutline(sample.outline);
      setScriptDraft(sample.firstDraft);
      setIsGenerating(false);
    }, 1000);
  };

  // Compile Video Simulation
  const handleCompileVideo = () => {
    setIsCompilingVideo(true);
    setCompileStep(1);
    setCompiledVideoUrl(null);

    const compileSteps = [
      "正在缓存背景素材与渲染超清人像底帧...",
      "正在读取分镜头脚本，启动中文音轨合成引擎...",
      "字幕层对齐、人脸唇形同步算法精算中...",
      "视频转码合流，渲染生成高清短视频成果..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < compileSteps.length) {
        setCompileStep(current + 1);
      } else {
        clearInterval(interval);
        setIsCompilingVideo(false);
        // Playback dummy url trigger
        setCompiledVideoUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80");
        setIsPlayingPreview(true);
      }
    }, 900);
  };

  const avatarsList = [
    { name: "晓雅 - 职场精英", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jessica" },
    { name: "阿杰 - 搞怪极客", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ryan" },
    { name: "丽莎 - 居家好物官", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Lisa" },
    { name: "陈总 - 专业咨询顾问", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=CEO" }
  ];

  return (
    <div className="space-y-6" id="script-workshop-view-container">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900" id="script-workshop-title">脚本创造工坊</h1>
        <p className="text-sm text-slate-500 mt-1">依托先进AI拆解底层结构、重构大纲，并一键完成数字人配音及视频合成。</p>
      </div>

      {inspirationSeed && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-emerald-800">已载入素材关联创意种子:</span>
              <p className="text-xs text-emerald-700 font-medium truncate max-w-lg mt-0.5">"{inspirationSeed.title}"</p>
            </div>
          </div>
          <button
            onClick={onClearSeed}
            className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg"
          >
            清除重建
          </button>
        </div>
      )}

      {/* Main Grid: Analytical Disassemble on Left, Synthesis & Configuration on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Hand: Explode & Structure Analyzer */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-950 flex items-center gap-1.5 text-sm">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>爆款脚本一键提炼</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold font-mono">粘贴抖音/小红书链接</span>
          </div>

          <form onSubmit={handleParseUrl} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.xiaohongshu.com/discovery/item/..."
                className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg px-3 py-2.5 text-xs font-medium outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <button
              type="submit"
              disabled={isParsing}
              className="w-full bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isParsing ? "animate-spin" : ""}`} />
              <span>{isParsing ? "爆款提取演算中..." : "一键提炼爆款结构"}</span>
            </button>
          </form>

          {/* Loader Processing Steps layout */}
          {isParsing && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>AI智能建模提取中</span>
                <span className="font-mono text-blue-600 bg-blue-50 px-2 rounded-full">步骤 {parseStep}/4</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {parseStep === 1 
                  ? "正在提取第三方短视频/图文底稿文本..." 
                  : parseStep === 2 
                  ? "AI正在进行深度自然语言分词与逻辑结构标注..." 
                  : parseStep === 3 
                  ? "评估首发渠道流量反馈、情绪套路公式分析中..." 
                  : "结构提取已完成，生成可视化营销拆解大纲..."}
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${parseStep * 25}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Parsed Result presentation outputs */}
          {parsedResult && !isParsing && (
            <div className="space-y-4 pt-1 animate-fadeIn">
              
              {/* Highlight statistics box */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-lg">
                  <span className="text-[10px] text-rose-600 font-bold tracking-wider block">爆款黄金词汇</span>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {parsedResult.highlightWords.map((word) => (
                      <span key={word} className="text-[9px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                  <span className="text-[10px] text-blue-600 font-bold tracking-wider block">3秒吸引手段 (HOOK)</span>
                  <p className="text-[10px] text-slate-600 font-medium mt-1.5 leading-snug truncate" title={parsedResult.scriptStructure.hook}>
                    {parsedResult.scriptStructure.hook}
                  </p>
                </div>
              </div>

              {/* Sub-tables instructions */}
              <div className="space-y-3 pt-2">
                
                {/* Visual Cameras */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700 block">推荐分镜头视角</span>
                  <div className="bg-slate-50/70 border border-slate-150 p-3 rounded-lg">
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-medium leading-relaxed">
                      {parsedResult.cameraLanguage.map((cam, idx) => (
                        <li key={idx}>{cam}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Emotional rhythm details */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-705 block">声调情绪呼吸掌控</span>
                  <div className="bg-slate-50/70 border border-slate-150 p-3 rounded-lg">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {parsedResult.emotionalRhythm}
                    </p>
                  </div>
                </div>

                {/* Conv pitch */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-705 block">带货留客转化话术</span>
                  <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-lg">
                    <p className="text-xs text-emerald-800 font-bold">
                      "{parsedResult.conversionPitch}"
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-2 border-t border-slate-150">
                <button
                  type="button"
                  onClick={() => {
                    setScriptTitle(`基于一键提取仿写的：2026年爆款神器实操方案 💪`);
                    setScriptOutline([
                      `[痛点对齐]: ${parsedResult.scriptStructure.hook}`,
                      `[亮点解析]: 详细展示提效方案，用爆款词汇强调`,
                      `[留客转化]: ${parsedResult.conversionPitch}`
                    ]);
                    setScriptDraft(`家人们，千万不要错过这次机会！老规矩，别再用传统模式低效摸爬滚打了。今天推荐的AI方法3秒搞定全套，点击左下角链接，马上免费尝试！`);
                  }}
                  className="w-full bg-blue-600 border border-blue-650 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>以此套用，直接仿写生成一版新文案</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {!parsedResult && !isParsing && (
            <div className="py-12 text-center text-slate-400 text-xs">
              粘贴外站高质量营销长贴或视频分享短链接，一键拆解核心骨架与带货机理。
            </div>
          )}

        </div>

        {/* Right Hand Side: AI Prompt Draft Generator & Digital Human Synthesis Engine */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI Creative Draft Block */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            
            {/* Header Platform selector */}
            <div className="flex justify-between items-center">
              <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-200 select-none">
                {(["xiaohongshu", "tiktok", "moment"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPlatformTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      platformTab === tab ? "bg-white text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tab === "xiaohongshu" ? "小红书模板" : tab === "tiktok" ? "抖音口播" : "微商朋友圈"}
                  </button>
                ))}
              </div>

              {/* Regenerate standard button */}
              <button
                onClick={handleGenerateScript}
                disabled={isGenerating}
                className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? "生成中..." : "AI 辅助写新脚本"}</span>
              </button>
            </div>

            {/* Editable Script Workspace fields */}
            <div className="space-y-4 pt-1">
              {/* Title input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">营销主题/爆款标题</label>
                <input
                  type="text"
                  value={scriptTitle}
                  onChange={(e) => setScriptTitle(e.target.value)}
                  placeholder="标题将极大程度决定首屏打开率..."
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Outline input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">逻辑大纲结构</label>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5 min-h-[90px]">
                  {scriptOutline.length > 0 ? (
                    scriptOutline.map((out, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs font-medium text-slate-600">
                        <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] flex items-center justify-center shrink-0 font-mono">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={out}
                          onChange={(e) => {
                            const copy = [...scriptOutline];
                            copy[idx] = e.target.value;
                            setScriptOutline(copy);
                          }}
                          className="bg-transparent border-none outline-none flex-1 text-xs text-slate-600 p-0"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-xs py-4 text-center">暂无大纲，可点击右上角 “AI 辅助写新脚本” 自动填充大纲与初稿</p>
                  )}
                </div>
              </div>

              {/* First draft textarea */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500">口播/文案第一初稿内容</label>
                  {scriptDraft && (
                    <span className="text-[10px] text-slate-400 font-mono font-bold">已录入：{scriptDraft.length} 字</span>
                  )}
                </div>
                <textarea
                  value={scriptDraft}
                  onChange={(e) => setScriptDraft(e.target.value)}
                  placeholder="这是生成数字人进行拟真配音说合口形的核心，请填入具体可读的分镜脚本底盘口播文案..."
                  rows={4}
                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg p-3 text-xs font-medium outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 resize-y min-h-[140px]"
                />
              </div>
            </div>

          </div>

          {/* Digital Human Speech preset parameters */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-950 flex items-center gap-1.5 text-sm">
                <Video className="w-4 h-4 text-cyan-600" />
                <span>拟真多声道数字人带货合包</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold font-mono">一键配声合成出片</span>
            </div>

            {/* Top Row: Avatar Selection & preview wave visualization mockup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Virtual character selection box */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">选择虚拟形象模特 (Avatar)</label>
                <div className="grid grid-cols-2 gap-2">
                  {avatarsList.map((av, idx) => (
                    <div
                      key={av.name}
                      onClick={() => setAvatarIndex(idx)}
                      className={`flex items-center space-x-2 p-2 border rounded-xl cursor-pointer transition-all ${
                        avatarIndex === idx
                          ? "border-cyan-500 bg-cyan-50/40"
                          : "border-slate-150 hover:bg-slate-50"
                      }`}
                    >
                      <img
                        src={av.img}
                        alt={av.name}
                        className="w-8 h-8 rounded-full border border-slate-200"
                      />
                      <div className="min-w-0">
                        <h4 className="text-[10px] font-bold text-slate-900 leading-tight truncate">{av.name.split(" - ")[0]}</h4>
                        <span className="text-[9px] text-slate-400 truncate block">{av.name.split(" - ")[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live interactive visualizer layout block */}
              <div className="bg-slate-900 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-4 h-36 border border-slate-850">
                
                {/* Visual rendering placeholder background */}
                <div className="absolute inset-0 bg-slate-950/40 z-1 pointer-events-none"></div>

                <div className="relative z-2 text-center flex flex-col items-center justify-center space-y-2 select-none">
                  <img
                    src={avatarsList[avatarIndex].img}
                    alt="Active avatar"
                    className={`w-14 h-14 rounded-full border-2 border-cyan-400 bg-slate-950 shadow-lg ${
                      isPlayingPreview ? "scale-105 animate-pulse" : "scale-100"
                    }`}
                  />
                  
                  {isPlayingPreview ? (
                    /* Wavelength animation placeholder container */
                    <div className="flex items-center justify-center space-x-1 h-3.5">
                      {[3, 7, 5, 2, 8, 4, 9, 6].map((h, i) => (
                        <div
                          key={i}
                          className="bg-cyan-400 w-0.5 rounded-full animate-bounce"
                          style={{
                            height: `${h * 1.5}px`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: "0.6s"
                          }}
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium">数字人就绪，等待播放合成</span>
                  )}
                </div>

                {/* Overlaid subtitles display synchronized script preview excerpt */}
                {isPlayingPreview && scriptTitle && (
                  <div className="absolute bottom-1.5 left-2 right-2 z-10 text-center">
                    <span className="inline-block bg-cyan-900/90 border border-cyan-800 text-[9px] px-2 py-0.5 rounded text-cyan-200 tracking-wide font-sans animate-pulse max-w-full truncate">
                      {scriptDraft ? scriptDraft.substring(0, 24) + "..." : "正在渲染并播放音频采样..."}
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Form Settings: Speed multipliers & preset audios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-4">
              
              {/* Presets sound profiling selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">配音情感音调</label>
                <select
                  value={tonePreset}
                  onChange={(e) => setTonePreset(e.target.value)}
                  className="w-full bg-slate-50 text-slate-700 border border-slate-200 rounded-md py-1.5 px-3 text-xs font-semibold focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="Kore">Kore - 拟真带货激情女音</option>
                  <option value="Zephyr">Zephyr - 职场中立通用女声</option>
                  <option value="Puck">Puck - 成熟商业深沉男音</option>
                  <option value="Charon">Charon - 新锐搞怪玩主男音</option>
                </select>
              </div>

              {/* Speeds */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span>语速精控</span>
                  <span className="font-mono text-cyan-600">{speedMultiplier}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.0"
                  step="0.1"
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-slate-150 h-1.5 rounded-full cursor-pointer mt-2"
                />
              </div>

              {/* BG Scene */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">合成背景底座</label>
                <select
                  value={backgroundTheme}
                  onChange={(e) => setBackgroundTheme(e.target.value)}
                  className="w-full bg-slate-50 text-slate-700 border border-slate-200 rounded-md py-1.5 px-3 text-xs font-semibold focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="office">现代办公大厅背景</option>
                  <option value="cyberpunk">炫酷赛博朋克虚拟背景</option>
                  <option value="nature">治愈户外森林草地背景</option>
                  <option value="living">家电厨卫直播间景基座</option>
                </select>
              </div>

            </div>

            {/* Core Synth Submissions Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              
              {/* Trigger local sandbox sound preview */}
              <button
                type="button"
                onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                disabled={!scriptDraft}
                className={`flex-1 py-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  !scriptDraft
                    ? "bg-slate-100 border-slate-150 text-slate-400"
                    : isPlayingPreview
                    ? "bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100/50"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {isPlayingPreview ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>暂停拟真配音预览</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 mr-0.5" />
                    <span>预览拟真数字人配音配口型</span>
                  </>
                )}
              </button>

              {/* Synthesize raw video mp4 format asset! */}
              <button
                type="button"
                onClick={handleCompileVideo}
                disabled={!scriptDraft || isCompilingVideo}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                  !scriptDraft
                    ? "bg-slate-100 border border-slate-150 text-slate-400"
                    : "bg-cyan-600 border border-cyan-650 hover:bg-cyan-700 text-white cursor-pointer"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>一键合成数字人视频</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Global compilation progress modal box overlay */}
      {isCompilingVideo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center select-none">
            <Video className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm">正在合算生成数字人视频</h4>
              <p className="text-[10px] text-cyan-300 font-mono tracking-wider font-semibold">渲染步骤：{compileStep} / 4</p>
            </div>
            
            <p className="text-xs text-slate-400 min-h-[30px] font-medium leading-relaxed font-sans">
              {compileStep === 1 
                ? "正在缓存背景素材与渲染超清人像底帧..." 
                : compileStep === 2 
                ? "正在读取分镜头脚本，启动中文音轨合成引擎..." 
                : compileStep === 3 
                ? "字幕层对齐、人脸唇形同步算法精算中..." 
                : "视频转码合流，渲染生成高清短视频成果..."}
            </p>

            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-1.5 rounded-full transition-all duration-350"
                style={{ width: `${compileStep * 25}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Synthetic Video playback success Overlay popup! */}
      {compiledVideoUrl && !isCompilingVideo && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden max-w-md w-full shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center text-xs font-extrabold select-none">
              <span className="flex items-center gap-1.5 text-cyan-400 font-sans tracking-wide">
                <CheckCircle className="w-4 h-4 fill-cyan-400 text-slate-900" />
                <span>数字人带货成品生成成功！</span>
              </span>
              <button
                onClick={() => setCompiledVideoUrl(null)}
                className="text-slate-400 hover:text-white"
              >
                [关闭]
              </button>
            </div>

            {/* Displaying rendering result screen frame */}
            <div className="aspect-[9/16] max-h-[480px] bg-slate-950 relative overflow-hidden flex flex-col justify-end items-center p-4">
              
              {/* Background preview */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
                  alt="bg"
                  className="w-full h-full object-cover opacity-60 blur-xs"
                />
              </div>

              {/* Avatar face overlays middle center */}
              <div className="relative z-1 mb-20 text-center flex flex-col items-center">
                <img
                  src={avatarsList[avatarIndex].img}
                  alt="active presenter"
                  className="w-24 h-24 rounded-full border-4 border-cyan-400 bg-slate-950 shadow-2xl scale-103 animate-pulse"
                />
                <span className="text-[10px] text-white bg-slate-900/80 px-2 py-0.5 rounded mt-3 backdrop-blur-xs">
                  {avatarsList[avatarIndex].name.split(" - ")[0]}
                </span>
              </div>

              {/* Synchronized rolling subtitles at the feet */}
              <div className="relative z-2 text-center w-full max-w-full px-4 mb-6">
                <p className="bg-cyan-950/92 border border-cyan-800 text-xs text-cyan-200 py-2.5 px-3 rounded-lg leading-relaxed shadow-lg font-sans">
                  {scriptDraft || "合成后的脚本字幕展示区间线。"}
                </p>
              </div>

            </div>

            {/* Bottom instant download buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3 select-none">
              <button
                onClick={() => setCompiledVideoUrl(null)}
                className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100"
              >
                关闭预览
              </button>
              <button
                onClick={() => {
                  setCompiledVideoUrl(null);
                  alert("合成的高清 MP4 短视频包与字幕声道已成功下载至本地素材库！");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs hover:bg-blue-700 flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>本地打包下载 (MP4)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
