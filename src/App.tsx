import { useState, useEffect } from "react";
import { 
  FolderOpen, 
  BarChart3, 
  Sparkles, 
  Clock,
  Menu,
  X
} from "lucide-react";

import HotTrendsView from "./components/HotTrendsView";
import KeywordSearchView from "./components/KeywordSearchView";
import CompetitorMonitoringView from "./components/CompetitorMonitoringView";
import LocalMaterialView from "./components/LocalMaterialView";
import ScriptWorkshopView from "./components/ScriptWorkshopView";
import DataDashboardView from "./components/DataDashboardView";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "hot-trends" | "keyword-search" | "competitor-monitoring" | "local-material" | "script-workshop" | "data-dashboard"
  >("hot-trends");

  // Flow integration seeds: Set from other tabs to streamline script workspace writing
  const [inspirationSeed, setInspirationSeed] = useState<{
    title: string;
    outline: string[];
    draft: string;
  } | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simple current dynamic UTC Clock simulation for precision
  const [timeStr, setTimeStr] = useState("08:00:00 UTC");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().slice(17, 25) + " UTC";
      setTimeStr(utc);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectInspiration = (title: string, outline: string[], draft: string) => {
    setInspirationSeed({ title, outline, draft });
    setActiveTab("script-workshop");
    alert("素材分析已被加载为工坊创意草稿，已为您自动跳转到【脚本创造工坊】查看底盘！");
  };

  const handleParodyTemplate = (title: string, structure: string) => {
    setInspirationSeed({
      title: `对标仿写：${title}`,
      outline: [
        "[Hook 爆款开头]: 套用竞品痛点头部黄金起势公式",
        "[Visual 情绪承载]: 还原实操高对比演示与干货高光",
        "[Logic 逻辑终局]: 嵌入留人加群、点击左下角下单等商业闭环话术"
      ],
      draft: `家人们！今天这期实操干货直接深入拆解——"${title}"背后的底层逻辑套路！其实你并不需要多昂贵的技术，只需要套用这三个关键公式，3秒钟自动破局，别再做傻乎乎交学费的事情了，一键收藏赶紧往下听！...\n\n(${structure})`
    });
    setActiveTab("script-workshop");
    alert("对标竞品爆款视频结构已成功提取！已自动套用仿写模板并跳转至【脚本创造工坊】。");
  };

  // Nav selections
  const materialItems = [
    { id: "hot-trends", label: "热榜追踪" },
    { id: "keyword-search", label: "关键词检索" },
    { id: "competitor-monitoring", label: "竞品监控" },
    { id: "local-material", label: "本地素材库" }
  ] as const;

  const mainItems = [
    { id: "script-workshop", label: "脚本创造工坊", icon: Sparkles },
    { id: "data-dashboard", label: "数据复盘", icon: BarChart3 }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="app-workbench-layout">
      
      {/* Dynamic Upper Navigation Dashboard Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3.5 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-3">
          {/* Main Logo icon */}
          <div className="p-2 bg-blue-600 rounded-lg text-white shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">AI 智能营销助手大盘</h1>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
              Intelligent Marketing Operations System
            </p>
          </div>
        </div>

        {/* Global actions row (Universal campaign creator & clock) */}
        <div className="flex items-center space-x-3 select-none">
          {/* Dynamic dynamic precise server UTC Clock */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 font-mono text-[10px]" title="服务器UTC绝对时间索引位">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-bold">{timeStr}</span>
          </div>

          {/* Mobile responsive toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main split frame */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        
        {/* Left hand menu: Desktop Navigation Rail bar */}
        <nav className="hidden md:block w-64 border-r border-slate-200 bg-[#F8FAFC] shrink-0 select-none flex flex-col">
          {/* Group 1: Material Center */}
          <div className="w-full">
            <div className="bg-[#48CBFF] text-[#0A4D6E] px-5 py-4 flex items-center space-x-2 font-bold select-none">
              <FolderOpen className="w-5 h-5 flex-shrink-0 text-[#0F6F9D]" />
              <span className="text-[15px]">素材中心</span>
            </div>
            <div className="flex flex-col py-3 px-4 space-y-1.5 bg-white">
              {materialItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#F0F5FF] text-[#1E3A8A] font-bold"
                        : "text-[#475569] hover:bg-slate-50 hover:text-slate-900 font-medium"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col px-6 py-4 space-y-4 mt-2">
            {mainItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-[#1E3A8A] font-bold"
                      : "text-[#475569] hover:text-[#1E3A8A] font-bold"
                  }`}
                >
                  <Icon className={`w-[22px] h-[22px] ${isActive ? "text-[#1E3A8A]" : "text-[#475569]"}`} strokeWidth={2.5} />
                  <span className="text-[15px]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile slide drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 flex">
            <div className="w-72 bg-white h-full flex flex-col justify-between shadow-2xl overflow-y-auto">
              <div className="flex flex-col">
                <div className="flex justify-between items-center p-5 pb-2 border-b border-slate-150">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">工作台矩阵</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Group 1: Material Center */}
                <div className="w-full">
                  <div className="bg-[#48CBFF] text-[#0A4D6E] px-5 py-4 flex items-center space-x-2 font-bold">
                    <FolderOpen className="w-5 h-5 text-[#0F6F9D]" />
                    <span className="text-sm">素材中心</span>
                  </div>
                  <div className="flex flex-col py-3 px-4 space-y-1">
                    {materialItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-[#F0F5FF] text-[#1E3A8A] font-bold"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col px-6 py-4 space-y-5">
                  {mainItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center space-x-3 text-left transition-all duration-200 ${
                          isActive
                            ? "text-[#1E3A8A] font-bold"
                            : "text-[#475569] font-bold"
                        }`}
                      >
                        <Icon className="w-[22px] h-[22px]" strokeWidth={2.5} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time bottom mobile */}
              <div className="p-5 pt-4 border-t border-slate-150 flex items-center gap-1 text-[10px] text-slate-400 font-mono mt-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeStr}</span>
              </div>
            </div>
            
            {/* Click backdrop side drawer to collapse */}
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Central Display Content Panel (Responsive with scroll indicators) */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 md:py-8 h-[calc(100vh-120px)] bg-slate-50">
          <div className="max-w-6xl mx-auto w-full transition-all duration-300">
            {activeTab === "hot-trends" && (
              <HotTrendsView onSelectInspiration={handleSelectInspiration} />
            )}
            {activeTab === "keyword-search" && (
              <KeywordSearchView />
            )}
            {activeTab === "competitor-monitoring" && (
              <CompetitorMonitoringView onParodyTemplate={handleParodyTemplate} />
            )}
            {activeTab === "local-material" && (
              <LocalMaterialView />
            )}
            {activeTab === "script-workshop" && (
              <ScriptWorkshopView
                inspirationSeed={inspirationSeed}
                onClearSeed={() => setInspirationSeed(null)}
              />
            )}
            {activeTab === "data-dashboard" && (
              <DataDashboardView />
            )}
          </div>
        </main>

      </div>

    </div>
  );
}
