import { useState } from "react";
import { TrendingUp, DollarSign, Eye, Percent, ArrowDown, ArrowUp, Star, GraduationCap, ClipboardCheck, MessageSquare, ChevronRight } from "lucide-react";

export default function DataDashboardView() {
  const [selectedRange, setSelectedRange] = useState<"30d" | "7d">("30d");

  // Multi-axis SVG lines chart variables
  const dataSales = [
    { label: "05/01", sales: 24, conv: 3.2 },
    { label: "05/05", sales: 42, conv: 4.5 },
    { label: "05/10", sales: 38, conv: 3.9 },
    { label: "05/15", sales: 65, conv: 5.1 },
    { label: "05/20", sales: 52, conv: 4.2 },
    { label: "05/25", sales: 85, conv: 6.2 },
    { label: "05/30", sales: 98, conv: 6.8 }
  ];

  const getSalesY = (sales: number) => 170 - (sales / 120) * 130;
  const getConvY = (conv: number) => 170 - (conv / 10) * 130;
  const getX = (idx: number) => 60 + idx * 95;

  const buildSalesPath = () => {
    return dataSales.reduce((path, pt, i) => {
      const x = getX(i);
      const y = getSalesY(pt.sales);
      return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
    }, "");
  };

  const buildConvPath = () => {
    return dataSales.reduce((path, pt, i) => {
      const x = getX(i);
      const y = getConvY(pt.conv);
      return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
    }, "");
  };

  return (
    <div className="space-y-6" id="data-dashboard-view-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900" id="data-dashboard-title">数据归因复盘</h1>
          <p className="text-sm text-slate-500 mt-1">深度透视数字人投放及自媒体渠道的转化数据，提供智能归因调优策略。</p>
        </div>

        {/* Action controllers */}
        <div className="bg-slate-100 p-1 border border-slate-200 rounded-lg flex items-center space-x-1 select-none">
          <button
            onClick={() => setSelectedRange("30d")}
            className={`px-3.5 py-1 text-xs font-semibold rounded-md transition-all ${
              selectedRange === "30d" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            近30天数据
          </button>
          <button
            onClick={() => setSelectedRange("7d")}
            className={`px-3.5 py-1 text-xs font-semibold rounded-md transition-all ${
              selectedRange === "7d" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            近7天数据
          </button>
        </div>
      </div>

      {/* Numerical Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total GMV */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between hover:border-blue-200 transition-all">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">总关联销售额 (¥)</span>
            <h3 className="text-2xl font-bold font-mono text-slate-800 mt-2">¥1,284,500</h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
              ↑ +12.5% 较上周
            </span>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-full shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Combo Conv */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between hover:border-emerald-200 transition-all">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">综合转化率</span>
            <h3 className="text-2xl font-bold font-mono text-slate-800 mt-2">4.82%</h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
              ↑ +0.8% 行业上游
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-full shrink-0">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        {/* Brand Follows */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between hover:border-indigo-200 transition-all">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">新增粉丝总数</span>
            <h3 className="text-2xl font-bold font-mono text-slate-800 mt-2">32,450</h3>
            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded mt-2 inline-block">
              ↓ -2.1% 周期收缩
            </span>
          </div>
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-full shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Transactions Done */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between hover:border-blue-250 transition-all">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">成功订单体量</span>
            <h3 className="text-2xl font-bold font-mono text-slate-800 mt-2">8,920 笔</h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">
              ↑ +5.4% 稳健推进
            </span>
          </div>
          <div className="p-3.5 bg-sky-50 text-sky-600 rounded-full shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Graph columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Hand: Interactive Performance Trend Chart */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">销售业绩与转化对比曲线</h3>
            
            {/* Legend indicators */}
            <div className="flex items-center space-x-4 text-[11px] font-medium text-slate-500">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>销售额 (十万)</span>
              </div>
              <div className="flex items-center space-x-1.5 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>转化率 (%)</span>
              </div>
            </div>
          </div>

          {/* Dual Axls SVG Chart representation */}
          <div className="relative w-full h-60">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 650 200">
              {/* Horizontal references */}
              <line x1="60" y1="40" x2="600" y2="40" stroke="#F1F5F9" />
              <line x1="60" y1="105" x2="600" y2="105" stroke="#F1F5F9" />
              <line x1="60" y1="170" x2="600" y2="170" stroke="#E2E8F0" />

              {/* Data paths */}
              <path d={buildSalesPath()} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
              <path d={buildConvPath()} fill="none" stroke="#A855F7" strokeWidth="2.5" strokeDasharray="3,3" strokeLinecap="round" />

              {/* Data points overlay dot drawings */}
              {dataSales.map((pt, idx) => {
                const x = getX(idx);
                const ySales = getSalesY(pt.sales);
                const yConv = getConvY(pt.conv);

                return (
                  <g key={idx} className="cursor-pointer">
                    <circle cx={x} cy={ySales} r="4" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                    <circle cx={x} cy={yConv} r="3.5" fill="#FFFFFF" stroke="#A855F7" strokeWidth="2" />
                    <text x={x} y="192" className="text-[9px] fill-slate-400 font-mono text-center font-bold" textAnchor="middle">
                      {pt.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Hand: Digital Human Views Statistics details */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-sm">数字人流控视频特征 (7d)</h3>
          </div>

          <div className="space-y-3 pt-1">
            
            {/* Views count */}
            <div className="flex justify-between items-center p-3.5 bg-slate-50/70 rounded-xl border border-slate-150">
              <span className="text-xs text-slate-500 font-semibold">短视频总播放</span>
              <span className="text-sm font-bold font-mono text-slate-800">1.2M 次</span>
            </div>

            {/* Average retention length */}
            <div className="flex justify-between items-center p-3.5 bg-slate-50/70 rounded-xl border border-slate-150">
              <span className="text-xs text-slate-500 font-semibold">平均播放时长</span>
              <span className="text-sm font-bold font-mono text-slate-800">45 秒</span>
            </div>

            {/* 5-sec retention rate */}
            <div className="flex justify-between items-center p-3.5 bg-slate-50/70 rounded-xl border border-slate-150">
              <span className="text-xs text-slate-500 font-semibold">5秒黄金融率留存</span>
              <span className="text-sm font-bold font-mono text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full select-none">68.5%</span>
            </div>

            {/* High engagement percent */}
            <div className="flex justify-between items-center p-3.5 bg-slate-50/70 rounded-xl border border-slate-150">
              <span className="text-xs text-slate-500 font-semibold">综合点赞互动率</span>
              <span className="text-sm font-bold font-mono text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full select-none">4.2%</span>
            </div>

          </div>
        </div>

      </div>

      {/* Attribution analysis blocks */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900 flex items-center gap-1.5 text-sm">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>AI爆款内容智能调优归因而推荐</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-semibold font-mono">根据近两周爆款漏洞总结</span>
        </div>

        {/* Detailed attribute recommendations rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Positive driver */}
          <div className="p-4 border border-emerald-150 bg-emerald-50/20 rounded-xl space-y-2">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              流量加分项归因
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-medium leading-relaxed">
              <li><strong className="text-slate-900">黄金3秒切面：</strong> 前置视频利用反常规概念（赛博朋克等）打破惯性，3s黄金留存率提升了<span className="text-emerald-600 font-bold">18%</span>。</li>
              <li><strong className="text-slate-900">音轨情绪契合：</strong> 拟真的激情带货声调音高与极具紧迫感的字幕滚动节奏完全踩点，播放时长明显被拉长。</li>
            </ul>
          </div>

          {/* Fault optimization suggestion */}
          <div className="p-4 border border-rose-150 bg-rose-50/20 rounded-xl space-y-2">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              流失漏洞项调优
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 font-medium leading-relaxed">
              <li><strong className="text-slate-900">价格催促疲软：</strong> 文案中后段在展示完红海痛点后，缺少强力成交行动呼唤，转化流失率相比标杆陡攀登了<span className="text-rose-600 font-bold">12%</span>。</li>
              <li><strong className="text-slate-900">建议话术优化：</strong> 尾部增加“限时最后30个名额，先到先得”的闭门式紧迫语，强化成交抓手。</li>
            </ul>
          </div>

        </div>

        {/* Sync trigger button */}
        <div className="flex sm:justify-end pt-3">
          <button
            onClick={() => alert("本周营销复盘报告与调优套路已成功同步导入本地素材库知识库中！")}
            className="bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white font-bold text-xs p-3.5 rounded-lg shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-all"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>同步智能归因至营销知识库</span>
          </button>
        </div>
      </div>
    </div>
  );
}
