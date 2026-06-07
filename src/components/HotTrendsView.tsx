import { useState } from "react";
import { TrendingUp, Flame, Zap, Clock, ThumbsUp, Share2, Play, ExternalLink, Award } from "lucide-react";
import { mockHotSearchList, mockInspirations, mockTopics } from "../mockData";
import { motion } from "motion/react";

interface HotTrendsViewProps {
  onSelectInspiration: (title: string, outline: string[], draft: string) => void;
}

export default function HotTrendsView({ onSelectInspiration }: HotTrendsViewProps) {
  const [platform, setPlatform] = useState<"all" | "douyin" | "xiaohongshu">("all");
  const [timeframe, setTimeframe] = useState<"24h" | "7d">("24h");
  const [inspirationTab, setInspirationTab] = useState<"video" | "graphic">("video");
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);

  // SVG Chart Data - Represents "AI营销" (Line 1) and "数字人直播" (Line 2)
  const chartPointsLine1 = [
    { time: "00:00", val: 3.5, label: "3.5M" },
    { time: "04:00", val: 4.8, label: "4.8M" },
    { time: "08:00", val: 6.2, label: "6.2M" },
    { time: "12:00", val: 7.5, label: "7.5M" },
    { time: "16:00", val: 3.8, label: "3.8M" },
    { time: "20:00", val: 9.8, label: "9.8M" },
    { time: "24:00", val: 9.5, label: "9.5M" },
  ];

  const chartPointsLine2 = [
    { time: "00:00", val: 2.1, label: "2.1M" },
    { time: "04:00", val: 3.2, label: "3.2M" },
    { time: "08:00", val: 4.4, label: "4.4M" },
    { time: "12:00", val: 5.9, label: "5.9M" },
    { time: "16:00", val: 2.8, label: "2.8M" },
    { time: "20:00", val: 8.4, label: "8.4M" },
    { time: "24:00", val: 6.5, label: "6.5M" },
  ];

  // Map value to SVG y-coordinate (height 200, padding 20)
  const getY = (val: number) => {
    return 180 - (val / 10) * 140;
  };
  const getX = (index: number) => {
    return 50 + index * 100;
  };

  // Build SVG path commands
  const getLinePath = (points: { val: number }[]) => {
    return points.reduce((path, pt, i) => {
      const x = getX(i);
      const y = getY(pt.val);
      if (i === 0) return `M ${x} ${y}`;
      // Smooth cubic bezier curves
      const prevX = getX(i - 1);
      const prevY = getY(points[i - 1].val);
      const cpX1 = prevX + 45;
      const cpY1 = prevY;
      const cpX2 = x - 45;
      const cpY2 = y;
      return `${path} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
    }, "");
  };

  const line1Path = getLinePath(chartPointsLine1);
  const line2Path = getLinePath(chartPointsLine2);

  return (
    <div className="space-y-6" id="hot-trends-view-container">
      {/* Search Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900" id="hot-trends-title">热榜追踪</h1>
          <p className="text-sm text-slate-500 mt-1">实时监测全网热门趋势，捕获高潜力营销内容。</p>
        </div>
        
        {/* Toggle Actions */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center space-x-1 border border-slate-200">
            <button
              onClick={() => setPlatform("all")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                platform === "all" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-950"
              }`}
            >
              全平台
            </button>
            <button
              onClick={() => setPlatform("douyin")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                platform === "douyin" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-950"
              }`}
            >
              抖音
            </button>
            <button
              onClick={() => setPlatform("xiaohongshu")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                platform === "xiaohongshu" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-950"
              }`}
            >
              小红书
            </button>
          </div>

          <div className="bg-slate-100 p-1 rounded-lg flex items-center space-x-1 border border-slate-200">
            <button
              onClick={() => setTimeframe("24h")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                timeframe === "24h" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-950"
              }`}
            >
              近24小时
            </button>
            <button
              onClick={() => setTimeframe("7d")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                timeframe === "7d" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-950"
              }`}
            >
              近7天
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Topic Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden transition-all hover:border-blue-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2 text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>当前最热话题</span>
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 124%
            </span>
          </div>
          <h3 className="text-xl font-bold font-sans text-slate-800 mt-4 tracking-tight">#AI重塑工作流#</h3>
          <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">全网热度指数</span>
            <span className="text-lg font-bold font-mono text-slate-800">8.4M</span>
          </div>
        </div>

        {/* Rapid Keyword Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden transition-all hover:border-emerald-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>增速最快词条</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> 342%
            </span>
          </div>
          <h3 className="text-xl font-bold font-sans text-slate-800 mt-4 tracking-tight">"赛博朋克穿搭"</h3>
          <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">关联内容数量</span>
            <span className="text-lg font-bold font-mono text-slate-800">125K 篇</span>
          </div>
        </div>

        {/* Peak Prediction Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs relative overflow-hidden transition-all hover:border-blue-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>流量高峰预测</span>
            </div>
            <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
              极高匹配
            </span>
          </div>
          <h3 className="text-xl font-bold font-mono text-slate-800 mt-4 tracking-tight">20:00 - 22:30</h3>
          <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">最佳发布时间推荐</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">极高推荐</span>
          </div>
        </div>
      </div>

      {/* Main Trend Chart Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">核心词条热度趋势</h2>
          {/* Chart Legends */}
          <div className="flex items-center space-x-4 text-xs font-medium text-slate-500">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span>AI营销</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-1.5 border-t-2 border-dashed border-cyan-400"></span>
              <span>数字人直播</span>
            </div>
          </div>
        </div>

        {/* Interactive SVG Chart wrapper */}
        <div className="relative w-full h-64 overflow-x-auto sm:overflow-x-visible">
          <svg className="w-full min-w-[650px] h-full overflow-visible" viewBox="0 0 700 220">
            <defs>
              <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="cyanGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="50" y1="40" x2="650" y2="40" stroke="#F1F5F9" strokeWidth="1" />
            <text x="25" y="44" className="text-[10px] fill-slate-400 font-mono text-right" textAnchor="end">10M</text>

            <line x1="50" y1="75" x2="650" y2="75" stroke="#F1F5F9" strokeWidth="1" />
            <text x="25" y="79" className="text-[10px] fill-slate-400 font-mono text-right" textAnchor="end">7.5M</text>

            <line x1="50" y1="110" x2="650" y2="110" stroke="#F1F5F9" strokeWidth="1" />
            <text x="25" y="114" className="text-[10px] fill-slate-400 font-mono text-right" textAnchor="end">5M</text>

            <line x1="50" y1="145" x2="650" y2="145" stroke="#F1F5F9" strokeWidth="1" />
            <text x="25" y="149" className="text-[10px] fill-slate-400 font-mono text-right" textAnchor="end">2.5M</text>

            <line x1="50" y1="180" x2="650" y2="180" stroke="#E2E8F0" strokeWidth="1" />
            <text x="25" y="184" className="text-[10px] fill-slate-400 font-mono text-right" textAnchor="end">0</text>

            {/* Fills under lines */}
            <path
              d={`${line1Path} L ${getX(chartPointsLine1.length - 1)} 180 L ${getX(0)} 180 Z`}
              fill="url(#blueGlow)"
            />
            <path
              d={`${line2Path} L ${getX(chartPointsLine2.length - 1)} 180 L ${getX(0)} 180 Z`}
              fill="url(#cyanGlow)"
            />

            {/* Actual Lines */}
            <path d={line1Path} fill="none" stroke="#0066FF" strokeWidth="3.5" strokeLinecap="round" />
            <path d={line2Path} fill="none" stroke="#22D3EE" strokeWidth="3" strokeDasharray="6,4" strokeLinecap="round" />

            {/* Data point circle interactions */}
            {chartPointsLine1.map((pt, idx) => {
              const x = getX(idx);
              const y1 = getY(pt.val);
              const y2 = getY(chartPointsLine2[idx].val);
              const isHovered = hoveredDataPoint === idx;

              return (
                <g key={idx} onMouseEnter={() => setHoveredDataPoint(idx)} onMouseLeave={() => setHoveredDataPoint(null)}>
                  {/* Vertical Hover Reference Line */}
                  {isHovered && (
                    <line x1={x} y1="40" x2={x} y2="180" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" />
                  )}

                  {/* Line 1 Dots */}
                  <circle cx={x} cy={y1} r={isHovered ? 6 : 4} fill="#FFFFFF" stroke="#0066FF" strokeWidth={isHovered ? 3 : 2} className="transition-all duration-150 cursor-pointer" />
                  {/* Line 2 Dots */}
                  <circle cx={x} cy={y2} r={isHovered ? 6 : 4} fill="#FFFFFF" stroke="#22D3EE" strokeWidth={isHovered ? 3 : 2} className="transition-all duration-150 cursor-pointer" />

                  {/* X-Axis labels */}
                  <text x={x} y="200" className="text-[10px] fill-slate-400 font-mono font-medium text-center" textAnchor="middle">
                    {pt.time}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip popup overlay */}
          {hoveredDataPoint !== null && (
            <div
              className="absolute z-10 bg-slate-900 border border-slate-700 text-white p-3 rounded-md shadow-lg pointer-events-none text-xs flex flex-col space-y-1 block"
              style={{
                left: `${getX(hoveredDataPoint) - 50}px`,
                top: `${getY(chartPointsLine1[hoveredDataPoint].val) - 70}px`,
              }}
            >
              <div className="font-semibold text-slate-300 font-mono">时间段：{chartPointsLine1[hoveredDataPoint].time}</div>
              <div className="flex items-center justify-between space-x-4">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>AI营销</span>
                <span className="font-bold font-mono">{chartPointsLine1[hoveredDataPoint].label}</span>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-1.5"></span>数字人直播</span>
                <span className="font-bold font-mono text-cyan-400">{chartPointsLine2[hoveredDataPoint].label}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid Split: Hot Searches and Content Inspirations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Grid: Top 10 Searches */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>跨平台实时热搜 Top 10</span>
            </h2>
            <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-0.5">
              查看全部 <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[440px]">
            {mockHotSearchList.map((item, index) => (
              <div key={item.rank} className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-all">
                <div className="flex items-center space-x-3">
                  {/* Rank Badge */}
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold leading-none ${
                      item.rank === 1
                        ? "bg-rose-50 text-rose-600 border border-rose-100"
                        : item.rank === 2
                        ? "bg-orange-50 text-orange-600 border border-orange-100"
                        : item.rank === 3
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.rank}
                  </span>
                  
                  {/* Keyword */}
                  <span className="text-slate-800 font-medium text-sm hover:text-blue-600 cursor-pointer">
                    {item.keyword}
                  </span>

                  {item.isNew && (
                    <span className="text-[9px] bg-red-500 text-white font-bold tracking-wider px-1.5 py-0.5 rounded uppercase font-sans animate-pulse">
                      NEW
                    </span>
                  )}
                </div>

                {/* Heat Indicator */}
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-semibold font-mono text-slate-500">{(item.heat / 10000).toFixed(1)}W</span>
                  <span className="text-[10px] text-slate-400">热度</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Grid: Content Inspirations */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-semibold text-slate-950">爆款内容灵感匣</h2>
            
            {/* Filter Toggle Buttons */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setInspirationTab("video")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  inspirationTab === "video" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500"
                }`}
              >
                短视频
              </button>
              <button
                onClick={() => setInspirationTab("graphic")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  inspirationTab === "graphic" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500"
                }`}
              >
                图文笔记
              </button>
            </div>
          </div>

          {/* List of Inspirations */}
          <div className="p-5 space-y-4 overflow-y-auto max-h-[440px]">
            {mockInspirations
              .filter((item) => item.type === inspirationTab)
              .map((item) => (
                <div
                  key={item.id}
                  className="group flex gap-4 p-3 border border-slate-100 rounded-lg bg-slate-50 hover:bg-slate-100/50 hover:border-slate-200 transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 h-20 bg-slate-200 rounded-md overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {item.duration && (
                      <span className="absolute bottom-1 right-1 bg-black/75 px-1.5 py-0.5 rounded text-[10px] font-mono text-white flex items-center gap-1">
                        <Play className="w-2 h-2 fill-white text-white" />
                        {item.duration}
                      </span>
                    )}
                    <span className="absolute top-1 left-1 bg-blue-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                      {item.source}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] bg-sky-50 text-sky-600 border border-sky-200 px-2 py-0.5 rounded font-medium">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-slate-800 font-semibold text-sm line-clamp-2 mt-1.5 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    {/* Footer Counts & Actions */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
                      <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5 text-slate-400" /> {item.likes}
                        </span>
                        <span>浏览 {item.views}</span>
                      </div>

                      {/* Instant Action: Write standard script copy out */}
                      <button
                        onClick={() => {
                          const outlines = [
                            `[黄金开头] 核心概念契入: 围绕主题“${item.title}”引发强烈好奇心。`,
                            `[原理痛点分析] 详细解答: 分析网民热议的爽点与解决方案。`,
                            `[权威号召转化] 诱导点击、点赞与关注收藏。`,
                          ];
                          const draftText = `家人们！今天这期视频，我们直接深入解析：${item.title}。很多人都踩过雷，买了一大堆不合心意的东西。今天我就用极其理性的爆款视角，一站式为你提炼出几款闭眼入、绝不后悔的心头好物，快点个赞接着往下听！`;
                          onSelectInspiration(item.title, outlines, draftText);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1 transition-all"
                      >
                        使用为参考
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
