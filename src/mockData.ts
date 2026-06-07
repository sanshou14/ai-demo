import { 
  Topic, 
  HotSearchItem, 
  ContentInspiration, 
  MaterialItem, 
  CompetitorAccount, 
  StructuralBreakdown, 
  LocalAsset,
  ScriptOutput
} from "./types";

export const mockTopics: Topic[] = [
  {
    id: "1",
    title: "#AI重塑工作流#",
    heatIndex: "8.4M",
    trend: "+124%",
    isPositive: true,
    tag: "热门话题"
  },
  {
    id: "2",
    title: "\"赛博朋克穿搭\"",
    heatIndex: "125K篇",
    trend: "+342%",
    isPositive: true,
    tag: "增幅最快"
  }
];

export const mockHotSearchList: HotSearchItem[] = [
  { rank: 1, keyword: "#春季露营指南#", heat: 9234100, isNew: true },
  { rank: 2, keyword: "#职场穿搭OOTD#", heat: 8102400 },
  { rank: 3, keyword: "#AI大模型对比#", heat: 7540200 },
  { rank: 4, keyword: "#速食减脂餐#", heat: 6890000 },
  { rank: 5, keyword: "#数字人带货脚本#", heat: 6412000, isNew: true },
  { rank: 6, keyword: "#小红书爆款文案#", heat: 5980000 },
  { rank: 7, keyword: "#咖啡豆风味评测#", heat: 5310000 },
  { rank: 8, keyword: "#智能数码穿戴推荐#", heat: 4890000 },
  { rank: 9, keyword: "#极简户外露营风#", heat: 4120000 },
  { rank: 10, keyword: "#大厂打工人效率神器#", heat: 3870000 }
];

export const mockInspirations: ContentInspiration[] = [
  {
    id: "ins-1",
    title: "五一春季露营，这5件平价好物闭眼入！",
    source: "小红书",
    type: "video",
    duration: "00:45",
    badge: "AI 分析提炼",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80",
    views: "23.4W",
    shares: "1.2W",
    likes: "4.8W"
  },
  {
    id: "ins-2",
    title: "效率翻倍！3个神仙AI工具推荐，拯救打工人",
    source: "抖音",
    type: "graphic",
    badge: "AI 分析提炼",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    views: "58.2W",
    shares: "8.9W",
    likes: "12.4W"
  },
  {
    id: "ins-3",
    title: "数字人直播搭建实操：从零到月销百万的秘诀",
    source: "B站",
    type: "video",
    duration: "10:15",
    badge: "高点击爆款",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    views: "15.7W",
    shares: "3.5W",
    likes: "6.2W"
  }
];

export const mockSearchMaterials: MaterialItem[] = [
  {
    id: "m-1",
    title: "2024早秋穿搭公式，微胖女孩闭眼入！",
    platform: "小红书",
    type: "graphic",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    badge: "AI 分析",
    duration: "00:45",
    likes: "12.4w",
    shares: "3.2k",
    author: "穿搭研究所",
    desc: "针对微胖女孩精心挑选的显瘦气质单品。通过合理的色系碰撞与叠穿技巧，完美遮盖腰腹，提升身材比例。内含大厂HR和白领通勤推荐！"
  },
  {
    id: "m-2",
    title: "5款平价口粮咖啡豆盲测，哪款最适合打工人？",
    platform: "抖音",
    type: "video",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    likes: "8.9w",
    shares: "1.1w",
    author: "精品咖啡浪潮",
    desc: "本期评测挑选了市面上热销的5款价格在50元以内的意式及单品咖啡豆。涵盖油脂丰富度、苦酸平衡度以及加奶后的风味表现。一站式解决白领提神痛点。"
  },
  {
    id: "m-3",
    title: "跑鞋红黑榜 | 这双国产新星真的踩屎感吗？",
    platform: "B站",
    type: "video",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    badge: "AI 分析",
    likes: "45.2w",
    shares: "8.4k",
    author: "极客跑鞋汇",
    desc: "通过压力传感器、抓地力防滑测试、缓震材料刚度测试，深度拆解这款备受争议的百元跑鞋。真实干货评测，不吹不黑。"
  },
  {
    id: "m-4",
    title: "夏日冰饮指南：职场人必看的咖啡避雷贴",
    platform: "微信公众号",
    type: "graphic",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80",
    likes: "10w+",
    shares: "1.2k",
    author: "都市生活指南",
    desc: "随着气温逐渐升高，一杯清爽的冰美式成为了许多职场人士的续命神器。但如何在众多品牌中挑选出那杯最合心意的咖啡？今天我们就来深度测评市面上最火的5家连锁咖啡品牌的冰美式，从咖啡豆产地、烘焙程度、口感层次到性价比，全方位为你避雷指南。首先，我们来看..."
  }
];

export const mockCompetitorAccounts: CompetitorAccount[] = [
  {
    id: "comp-1",
    name: "TechReview 科技前哨",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=tech",
    followers: "2.4M",
    status: "high",
    statusText: "高活活跃"
  },
  {
    id: "comp-2",
    name: "AI_Marketing 营销实验室",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=marketing",
    followers: "890K",
    status: "stable",
    statusText: "稳定输出"
  },
  {
    id: "comp-3",
    name: "DataDriven 流量操盘手",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=datadriven",
    followers: "1.2M",
    status: "low",
    statusText: "低频更新"
  }
];

export const mockStructuralBreakdowns: StructuralBreakdown[] = [
  {
    id: "sb-1",
    title: "2024年最强AI神器，效率提升十倍！",
    published: "2天前",
    views: "1.2M",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    badge: "AI 自动解析",
    hook: "利用数字化焦虑情绪开头，展示极端反差，比如：'别再用传统Excel了，人家用AI 3秒钟搞定了一天的工作！'",
    visual: "高对比度实操界面演示，搭配急促鼓点，特写镜头跟进操作步骤，突出快节奏高燃氛围。",
    logic: "问题困境引发共鸣 → 展示工具炫酷效率 → 拆解实操步骤 → 强调可免费获取资源进行收尾转化。"
  },
  {
    id: "sb-2",
    title: "别再盲目投流了，带你看透直播套路",
    published: "5天前",
    views: "890K",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    badge: "AI 自动解析",
    hook: "反常规思维起手式，打破用户原有常识：'为什么销量越高的直播间反而越不赚钱？背后的致命漏洞！'",
    visual: "清晰的手绘白板逻辑图，直观标注数字漏斗，绿幕背景结合丰富的手势互动、高亮红字标记。",
    logic: "破除迷思 → 提出新概念名词机制 → 揭秘底层套路逻辑公式 → 提供避坑避雷落地方案、引流特定私域。"
  }
];

export const mockLocalAssets: LocalAsset[] = [
  {
    id: "la-1",
    title: "春季健康沙拉海报底图",
    category: "food",
    type: "image",
    fileSize: "2.4 MB",
    date: "2026-02-24",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    tags: ["食品", "高清大图", "双十一"]
  },
  {
    id: "la-2",
    title: "智能手表动态展示视频",
    category: "tech",
    type: "video",
    duration: "00:15",
    fileSize: "12.8 MB",
    date: "2026-03-22",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    tags: ["科技", "短视频素材"]
  },
  {
    id: "la-3",
    title: "双十一女装促销回头图",
    category: "fashion",
    type: "image",
    fileSize: "3.1 MB",
    date: "2026-03-20",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    tags: ["服饰", "双十一", "高清大图"]
  }
];

export const testParseResponse = {
  scriptStructure: {
    title: "黄金3秒秒开头",
    hook: "痛点引入",
    solution: "核心解决方案提示"
  },
  highlightWords: ["千万别错过", "内部消息", "零基础", "限时免费"],
  cameraLanguage: [
    "近景切特写，强调表情张力",
    "快速推拉镜头，增加视频节奏感"
  ],
  emotionalRhythm: "起伏缓急明显，最后通过倒计时激发紧迫，顺利达成引流目标。",
  conversionPitch: "点击左下角链接，最后30个名额，先到先得。"
};

export const sampleAIGeneratedScripts: Record<string, ScriptOutput> = {
  xiaohongshu: {
    title: "【新手必看】2026最火的自媒体变现拆解 🔥",
    outline: [
      "开头：抛出痛点（为什么你做自媒体总是不赚钱？）",
      "中间：案例拆解（三个普通人逆袭的隐藏玩法）",
      "结尾：行动号召（领取免费实操手册）"
    ],
    firstDraft: "家人们，是不是觉得现在做账号越来越难了？发了上百条视频，播放量还是卡在500？其实你只是没找对赛道！今天我拆解了三个最近发声大财的对标账号，直接把底层逻辑喂到你嘴里..."
  },
  tiktok: {
    title: "打工人狂喜！这3个AI工作流直接干废加班 🚀",
    outline: [
      "开头：灵魂拷问（每天加班到十点，工资却只有五千？）",
      "原理：核心拆解（如何通过提示词让AI自动做PPT、写周报）",
      "福利：点赞关注，免费送全套大模型指令集"
    ],
    firstDraft: "老板以为我干到吐血，其实我全盘交给了AI！只需要把指令复制进对话框，3秒钟自动生成精美图表和高逼格日报，悄悄提效下班，今天这期讲干货不听绝对后悔..."
  },
  moment: {
    title: "私域必看：如何用一句话让客户追着你下单 💌",
    outline: [
      "场景：描绘渴望（不用苦苦求人，客户主动问你要配方）",
      "心法：情绪价值（卖解决方案，而不是产品冷冰冰的指标）",
      "引导：评论扣1开启一对一诊断"
    ],
    firstDraft: "最近帮一位实体店老板优化了一句微信问候语，客单转化竟然翻了3倍！很多人发朋友圈都在刷屏广告，其实最聪明的成交都藏在提供有温度的问题解答里..."
  }
};
