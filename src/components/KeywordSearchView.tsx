import { useState } from "react";
import { Search, SlidersHorizontal, Download, Play, ThumbsUp, Eye, MessageSquare, Sparkles, X, ChevronRight } from "lucide-react";
import { mockSearchMaterials } from "../mockData";
import { MaterialItem } from "../types";

export default function KeywordSearchView() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "video" | "graphic">("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("全部");
  const [selectedTime, setSelectedTime] = useState<string>("全部");
  const [selectedEngagement, setSelectedEngagement] = useState<string>("全部");
  
  // Modal / Side draw for AI details
  const [selectedAIInsight, setSelectedAIInsight] = useState<MaterialItem | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Filter logic
  const filteredMaterials = mockSearchMaterials.filter((item) => {
    // Search query constraint
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) || 
                         (item.desc && item.desc.toLowerCase().includes(query.toLowerCase()));
    
    // Type constraint
    const matchesType = selectedType === "all" ? true : item.type === selectedType;

    // Platform constraint
    const matchesPlatform = selectedPlatform === "全部" ? true : item.platform === selectedPlatform;

    return matchesQuery && matchesType && matchesPlatform;
  });

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert("素材已成功加入下载队列！");
    }, 1200);
  };

  return (
    <div className="space-y-6" id="keyword-search-view-container">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900" id="keyword-search-title">关键词检索</h1>
        <p className="text-sm text-slate-500 mt-1">通过精准全网检索，发掘全品类高潜力营销素材与投放案例。</p>
      </div>

      {/* Modern Filter Card Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        {/* Search Bar Row */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入关键词，例如 '夏日穿搭', '咖啡豆评测', '微胖女孩'..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium"
            />
            {query && (
              <button 
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-sans"
              >
                清除
              </button>
            )}
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs shrink-0">
            检索素材
          </button>
        </div>

        {/* Divider with filters title */}
        <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold uppercase tracking-wider pt-2 border-t border-slate-100">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
          <span>高级筛选条件</span>
        </div>

        {/* Filters Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Material type selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">素材类型</label>
            <div className="flex border border-slate-200 rounded-md overflow-hidden bg-slate-50">
              {(["all", "video", "graphic"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`flex-1 py-1.5 text-xs font-semibold transition-all ${
                    selectedType === t ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:bg-white/40"
                  }`}
                >
                  {t === "all" ? "全部类型" : t === "video" ? "视频" : "图文底稿"}
                </button>
              ))}
            </div>
          </div>

          {/* Platform filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">发布渠道</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-slate-50 text-slate-700 border border-slate-200 rounded-md py-1.5 px-3 text-xs font-semibold focus:ring-1 focus:ring-blue-500"
            >
              {["全部", "小红书", "抖音", "B站", "微信公众号"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Time range selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">热榜范围</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full bg-slate-50 text-slate-700 border border-slate-200 rounded-md py-1.5 px-3 text-xs font-semibold focus:ring-1 focus:ring-blue-500"
            >
              {["全部", "近24小时", "近7天", "近30天"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Engagement rating */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">互动体量</label>
            <select
              value={selectedEngagement}
              onChange={(e) => setSelectedEngagement(e.target.value)}
              className="w-full bg-slate-50 text-slate-700 border border-slate-200 rounded-md py-1.5 px-3 text-xs font-semibold focus:ring-1 focus:ring-blue-500"
            >
              {["全部", "1万以上赞", "5万以上赞", "10万以上赞"].map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid Content Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Poster thumbnail frame */}
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Image badges */}
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm text-white inline-block ${
                    item.platform === "小红书"
                      ? "bg-rose-500"
                      : item.platform === "抖音"
                      ? "bg-slate-900"
                      : item.platform === "B站"
                      ? "bg-pink-500"
                      : "bg-emerald-600"
                  }`}
                >
                  {item.platform}
                </span>

                {item.badge && (
                  <button 
                    onClick={() => setSelectedAIInsight(item)}
                    className="flex items-center space-x-1 bg-cyan-600 text-white font-semibold text-[9px] px-1.5 py-0.5 rounded cursor-pointer hover:bg-cyan-700 select-none animate-pulse"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>{item.badge}</span>
                  </button>
                )}
              </div>

              {item.type === "video" && (
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>00:45</span>
                </div>
              )}
            </div>

            {/* Description & Analytics */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-medium font-mono">@{item.author || "操盘手"}</span>
                <h3 className="font-bold text-slate-900 leading-snug text-sm mt-1 line-clamp-2 hover:text-blue-600 cursor-pointer">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                {/* Engagement icons */}
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-0.5"><ThumbsUp className="w-3.5 h-3.5" /> {item.likes}</span>
                  <span className="flex items-center gap-0.5"><Eye className="w-3.5 h-3.5" /> {item.shares}</span>
                </div>

                {/* Download interaction */}
                <button
                  disabled={downloadingId === item.id}
                  onClick={() => handleDownload(item.id)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${
                    downloadingId === item.id
                      ? "bg-slate-100 border-slate-200 text-slate-400"
                      : "bg-slate-50 border-slate-200 text-blueprint-primary hover:bg-blue-50/70 hover:border-blue-300 hover:text-blue-600"
                  }`}
                  title="下载底稿及素材包"
                >
                  <Download className={`w-3.5 h-3.5 ${downloadingId === item.id ? "animate-bounce" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-slate-50 border border-slate-250 rounded-xl p-12 text-center" id="search-empty-state">
          <p className="text-slate-400">没有检索到符合筛选条件的素材</p>
          <button 
            onClick={() => {
              setQuery("");
              setSelectedPlatform("全部");
              setSelectedType("all");
            }}
            className="mt-3 text-xs font-bold text-blue-600 hover:underline"
          >
            重置所有检索条件
          </button>
        </div>
      )}

      {/* AI Analysis Insight Details Drawer Overlay modal */}
      {selectedAIInsight && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-5 bg-gradient-to-r from-blue-700 to-cyan-600 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <h3 className="font-bold text-lg">AI 深度营销分析报告</h3>
              </div>
              <button
                onClick={() => setSelectedAIInsight(null)}
                className="text-white hover:text-yellow-200 p-1 bg-white/10 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[450px]">
              {/* Heading material block */}
              <div>
                <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded mb-1 inline-block">
                  {selectedAIInsight.platform} | {selectedAIInsight.type === "video" ? "视频素材" : "图文案"}
                </span>
                <h4 className="text-slate-900 font-bold text-base leading-snug">{selectedAIInsight.title}</h4>
              </div>

              {/* Explanatory blocks */}
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide">营销痛点定位</h5>
                  <p className="text-sm text-slate-800 mt-1 font-medium">{selectedAIInsight.desc || "提炼核心白领情绪共鸣，直击高性价比和高效产出。"}</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide">核心套路机制</h5>
                  <p className="text-sm text-slate-800 mt-1 leading-relaxed">
                     利用高频黄金反差词起势。通过对标“打工人加班”痛点，将生硬的技术描述拆解为具体的“3秒提效”，进而提供全站转化包，极大打消了付费顾虑。
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide">互动率增长驱动因子</h5>
                  <ul className="text-xs text-slate-700 space-y-1.5 mt-2 list-disc pl-4 font-medium">
                    <li><strong className="text-slate-900">视觉强聚焦：</strong> 近景高清特写与醒目的高亮红色文本叠加。</li>
                    <li><strong className="text-slate-900">转发原动力：</strong> 干货型，极具保存转发及收藏备用。</li>
                    <li><strong className="text-slate-900">收尾闭环：</strong> 评论中暗藏指令或加群私域福利。</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sticky Actions foot */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedAIInsight(null)}
                className="px-4 py-2 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100"
              >
                关闭报告
              </button>
              <button
                onClick={() => {
                  setSelectedAIInsight(null);
                  handleDownload(selectedAIInsight.id);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-xs hover:bg-blue-700 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>打包下载素材包</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
