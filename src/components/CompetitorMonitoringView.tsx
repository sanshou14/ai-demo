import { useState, FormEvent } from "react";
import { Users, FileText, Percent, Sparkles, Star, ClipboardCheck, Plus, Check, RefreshCw } from "lucide-react";
import { mockCompetitorAccounts, mockStructuralBreakdowns } from "../mockData";

interface CompetitorMonitoringViewProps {
  onParodyTemplate: (title: string, structure: string) => void;
}

export default function CompetitorMonitoringView({ onParodyTemplate }: CompetitorMonitoringViewProps) {
  const [selectedAccountId, setSelectedAccountId] = useState("comp-1");
  const [favoritedBreakdowns, setFavoritedBreakdowns] = useState<string[]>([]);
  const [isAddingMonitor, setIsAddingMonitor] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [accounts, setAccounts] = useState(mockCompetitorAccounts);

  const toggleFavorite = (id: string) => {
    setFavoritedBreakdowns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0];

  const handleAddAccount = (e: FormEvent) => {
    e.preventDefault();
    if (!newAccountName.trim()) return;
    const newAcc = {
      id: `comp-${Date.now()}`,
      name: newAccountName,
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${newAccountName}`,
      followers: "12K",
      status: "stable" as const,
      statusText: "稳定输出"
    };
    setAccounts([...accounts, newAcc]);
    setSelectedAccountId(newAcc.id);
    setNewAccountName("");
    setIsAddingMonitor(false);
  };

  return (
    <div className="space-y-6" id="competitor-monitoring-view-container">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900" id="competitor-monitoring-title">竞品监控大盘</h1>
          <p className="text-sm text-slate-500 mt-1">实时追踪对标账号的爆款内容结构与粉丝增长趋势。</p>
        </div>

        {/* Top actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAddingMonitor(!isAddingMonitor)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>添加监控账号</span>
          </button>
          <button 
            onClick={() => alert("计划任务已刷新，同步全部竞品历史大盘中！")}
            className="p-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 shadow-xs"
            title="刷新数据"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Adding account inline modal/card */}
      {isAddingMonitor && (
        <form onSubmit={handleAddAccount} className="bg-blue-50/50 border border-blue-150 p-4 rounded-xl flex flex-col sm:flex-row sm:items-end gap-3 max-w-2xl">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-bold text-blue-800">请输入要对标的抖音/小红书/快手名或ID</label>
            <input
              type="text"
              required
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="例如：@时尚好物挑剔官"
              className="w-full bg-white border border-blue-200 outline-none rounded-lg px-3 py-2 text-slate-800 text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>
          <div className="flex space-x-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsAddingMonitor(false)}
              className="px-3.5 py-2 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-300"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
            >
              确认添加
            </button>
          </div>
        </form>
      )}

      {/* Columns: Sidebar Account Lists & Analytics Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Monitored lists */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">监控账号列表</span>
            <span className="text-2xs font-bold font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{accounts.length} 账号</span>
          </div>

          <div className="space-y-2">
            {accounts.map((acc) => {
              const remainsActive = acc.id === selectedAccountId;
              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccountId(acc.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    remainsActive
                      ? "border-blue-600 bg-blue-50/50"
                      : "border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-3 limit-text">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-8 h-8 rounded-full border border-slate-200 shadow-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{acc.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">热度关注：{acc.followers}</span>
                    </div>
                  </div>

                  {/* Status lights indicator */}
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      acc.status === "high"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100 animate-pulse"
                        : acc.status === "stable"
                        ? "bg-orange-50 text-orange-600 border border-orange-100"
                        : "bg-red-50 text-red-600 border border-red-100"
                    }`}
                  >
                    ● {acc.statusText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Key Analytics & Viral breakouts structural breakdown */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Metrics matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Followers delta stat */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">粉丝数变动 (7日)</span>
                <h3 className="text-2xl font-bold font-mono text-slate-800 mt-1">
                  +{selectedAccountId === "comp-1" ? "12,450" : selectedAccountId === "comp-2" ? "8,120" : "2,410"}
                </h3>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                  ↑ 15.3% 同比上周
                </span>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Posting count stat */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">内容更新频率 (7日)</span>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {selectedAccountId === "comp-1" ? "18" : selectedAccountId === "comp-2" ? "12" : "5"} 篇
                </h3>
                <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-1">
                  持平 行业均值
                </span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            {/* Viral conversion stat */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">平均爆款率 (30日)</span>
                <h3 className="text-2xl font-bold font-mono text-slate-800 mt-1">
                  {selectedAccountId === "comp-1" ? "24.5%" : selectedAccountId === "comp-2" ? "22.1%" : "15.4%"}
                </h3>
                <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-1">
                  ↑ 4.2% 高于预期
                </span>
              </div>
              <div className="p-3 bg-pink-50 text-pink-600 rounded-full">
                <Percent className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Breakdown structural listing */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>爆款素材结构拆解 (AI 辅助生成)</span>
              </h3>
              <span className="text-xs text-slate-400">基于最新热度TOP2</span>
            </div>

            <div className="space-y-6">
              {mockStructuralBreakdowns.map((bk) => (
                <div
                  key={bk.id}
                  className="group relative border border-slate-150 rounded-xl bg-slate-50/50 p-4 hover:border-slate-300 transition-all duration-300 flex flex-col md:flex-row gap-5"
                >
                  {/* Aspect card preview */}
                  <div className="relative w-full md:w-40 aspect-video md:aspect-[4/5] bg-slate-200 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={bk.image}
                      alt={bk.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2 text-[10px] text-white font-mono flex items-center gap-1">
                      浏览 {bk.views}
                    </span>
                    {bk.badge && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-[10px] text-white font-bold px-2 py-0.5 rounded shadow-sm">
                        {bk.badge}
                      </span>
                    )}
                  </div>

                  {/* Structured breakdowns blocks */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono">对标：@{currentAccount.name}</span>
                      <h4 className="text-slate-800 font-bold text-base mt-0.5 leading-snug">{bk.title}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
                        {/* Hook details */}
                        <div className="bg-rose-50/50 border border-rose-100/60 p-3 rounded-lg flex flex-col">
                          <span className="text-[11px] font-bold text-rose-600 bg-rose-100/50 px-2 py-0.5 rounded-full w-max flex items-center gap-1">
                            Hook 吸引点
                          </span>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{bk.hook}</p>
                        </div>

                        {/* Visual details */}
                        <div className="bg-indigo-50/50 border border-indigo-100/60 p-3 rounded-lg flex flex-col">
                          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-100/50 px-2 py-0.5 rounded-full w-max flex items-center gap-1">
                            Visual 视觉呈现
                          </span>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{bk.visual}</p>
                        </div>

                        {/* Logic details */}
                        <div className="bg-cyan-50/50 border border-cyan-100/60 p-3 rounded-lg flex flex-col">
                          <span className="text-[11px] font-bold text-cyan-700 bg-cyan-100/50 px-2 py-0.5 rounded-full w-max flex items-center gap-1">
                            Logic 逻辑主线
                          </span>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{bk.logic}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer interactions */}
                    <div className="flex sm:justify-end items-center space-x-3 pt-3 border-t border-slate-200/50">
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(bk.id)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                          favoritedBreakdowns.includes(bk.id)
                            ? "bg-amber-50 border-amber-300 text-amber-600"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${favoritedBreakdowns.includes(bk.id) ? "fill-amber-500 text-amber-500 animate-spin" : ""}`} />
                        <span>{favoritedBreakdowns.includes(bk.id) ? "已收藏" : "收藏结构"}</span>
                      </button>

                      {/* Parody Button - Passes structured components to main workshop */}
                      <button
                        onClick={() => {
                          const detailedParodyStructure = bkBriefPrompt(bk);
                          onParodyTemplate(bk.title, detailedParodyStructure);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        <span>生成仿写脚本</span>
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Custom prompt parser for helper
function bkBriefPrompt(bk: typeof mockStructuralBreakdowns[0]) {
  return `参考对标标题: "${bk.title}"
【仿写框架结构】
1. 开头吸引(HOOK): ${bk.hook}
2. 视觉演绎(VISUAL): ${bk.visual}
3. 结构主干(LOGIC): ${bk.logic}`;
}
