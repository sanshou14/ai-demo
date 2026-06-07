import { useState, useRef, ChangeEvent } from "react";
import { FolderOpen, UploadCloud, Tag, Layers, Search, Trash2, Video, ImageIcon, FileText, CheckCircle } from "lucide-react";
import { mockLocalAssets } from "../mockData";
import { LocalAsset } from "../types";

export default function LocalMaterialView() {
  const [assets, setAssets] = useState<LocalAsset[]>(mockLocalAssets);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "food" | "fashion" | "tech">("all");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Upload simulation
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available tags
  const popularTags = ["全部", "食品", "双十一", "高清大图", "短视频素材", "科技", "服饰"];

  // Handle fake file select
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      simulateUpload(file.name, file.size);
    }
  };

  const simulateUpload = (fileName: string, fileSize: number) => {
    setIsUploading(true);
    setUploadPercent(0);
    
    const interval = setInterval(() => {
      setUploadPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Add to asset state
            const isVideo = fileName.endsWith(".mp4") || fileName.endsWith(".mov");
            const finalSizeStr = (fileSize / (1024 * 1024)).toFixed(1) + " MB";
            const newAsset: LocalAsset = {
              id: `la-${Date.now()}`,
              title: fileName.split(".")[0],
              category: "food", // Default
              type: isVideo ? "video" : "image",
              fileSize: finalSizeStr,
              date: new Date().toISOString().split("T")[0],
              image: isVideo 
                ? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
                : "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
              tags: ["AI生成", isVideo ? "短视频素材" : "高清大图"],
              duration: isVideo ? "00:15" : undefined
            };
            setAssets((prevAssets) => [newAsset, ...prevAssets]);
            setIsUploading(false);
          }, 4);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  // Filter mechanics
  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === "all" ? true : asset.category === selectedCategory;
    const matchesType = selectedType === "all" ? true : asset.type === selectedType;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || selectedTag === "全部" ? true : asset.tags.includes(selectedTag);

    return matchesCategory && matchesType && matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6" id="local-material-view-container">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900" id="local-material-title">本地素材库</h1>
          <p className="text-sm text-slate-500 mt-1">云端保存本地素材，快速关联AI脚本生成与投放脚本分析。</p>
        </div>
      </div>

      {/* Grid: Categories Sidebar & Material Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Category Navigator */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Category List */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-slate-400 pb-2 border-b border-slate-100 mb-2">
              <FolderOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">素材分类</span>
            </div>

            {(["all", "food", "fashion", "tech"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex justify-between items-center transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>
                  {cat === "all"
                    ? "全部素材"
                    : cat === "food"
                    ? "消费品/食品"
                    : cat === "fashion"
                    ? "时尚服饰"
                    : "科技数码"}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {cat === "all"
                    ? assets.length
                    : assets.filter((a) => a.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Quick upload Drag Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition-all duration-300"
            >
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700 mt-3">拖拽或点击上传资产</p>
              <p className="text-[10px] text-slate-400 mt-1">支持 PNG, JPG, MP4, MP3 等格式</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Simulated file loader */}
            {isUploading && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-blue-700 animate-pulse">正在处理文件...</span>
                  <span className="text-[10px] font-mono font-bold text-blue-700">{uploadPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-1 rounded-full transition-all duration-150"
                    style={{ width: `${uploadPercent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Showcase Grid */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Workspace Filters Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            
            {/* Asset types */}
            <div className="flex items-center space-x-1.5 p-0.5 bg-slate-100 border border-slate-200 rounded-lg select-none">
              {(["all", "image", "video"] as const).map((at) => (
                <button
                  key={at}
                  onClick={() => setSelectedType(at)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    selectedType === at ? "bg-white text-blue-600 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {at === "all" ? "全部类型" : at === "image" ? "图片" : "视频"}
                </button>
              ))}
            </div>

            {/* Simple live filter searches */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索库中素材..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
              />
            </div>

          </div>

          {/* Popular Tag badging bar */}
          <div className="flex flex-wrap items-center gap-1.5 select-none">
            <span className="text-xs text-slate-400 flex items-center font-semibold gap-1 mr-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>快速标记:</span>
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === "全部" ? null : tag)}
                className={`text-2xs font-bold px-2.5 py-1 rounded-full transition-all border ${
                  (selectedTag === tag) || (tag === "全部" && selectedTag === null)
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Showroom gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Image block panel */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  {asset.duration && (
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono flex items-center gap-1">
                      <Video className="w-3 h-3 fill-white" />
                      {asset.duration}
                    </span>
                  )}
                  {asset.type === "image" && (
                    <span className="absolute bottom-2 left-2 bg-blue-600/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      底图
                    </span>
                  )}

                  {/* Size and file ext labels */}
                  <span className="absolute top-2 right-2 bg-slate-900/75 text-white text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                    {asset.fileSize}
                  </span>
                </div>

                {/* Details layout */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs truncate" title={asset.title}>
                      {asset.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">创建日期: {asset.date}</span>
                    
                    {/* Tags inline */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {asset.tags.map((tag) => (
                        <span key={tag} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end items-center mt-4 pt-2.5 border-t border-slate-100">
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-rose-50 hover:border-rose-200 transition-all text-xs font-bold"
                      title="从本地库删除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAssets.length === 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 text-center" id="assets-empty-state">
              <p className="text-slate-400">本地素库中该分类没有任何资产</p>
              <button 
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedTag(null);
                  setSearchQuery("");
                }}
                className="mt-2 text-xs font-bold text-blue-600 hover:underline"
              >
                重置查看全量素材
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
