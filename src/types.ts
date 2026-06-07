export interface Topic {
  id: string;
  title: string;
  heatIndex: string;
  trend: string;
  isPositive: boolean;
  tag: string;
}

export interface HotSearchItem {
  rank: number;
  keyword: string;
  heat: number;
  isNew?: boolean;
}

export interface ContentInspiration {
  id: string;
  title: string;
  source: "小红书" | "抖音" | "B站" | "微信公众号";
  type: "video" | "graphic";
  duration?: string;
  badge: string;
  image: string;
  views: string;
  shares?: string;
  likes?: string;
}

export interface MaterialItem {
  id: string;
  title: string;
  platform: "小红书" | "抖音" | "B站" | "微信公众号";
  type: "video" | "graphic";
  image: string;
  badge?: string;
  duration?: string;
  avatar?: string;
  author?: string;
  likes: string;
  shares: string;
  desc?: string;
  url?: string;
}

export interface CompetitorAccount {
  id: string;
  name: string;
  avatar: string;
  followers: string;
  status: "high" | "stable" | "low";
  statusText: string;
}

export interface StructuralBreakdown {
  id: string;
  title: string;
  published: string;
  views: string;
  image: string;
  badge?: string;
  hook: string;
  visual: string;
  logic: string;
}

export interface LocalAsset {
  id: string;
  title: string;
  category: "food" | "fashion" | "tech" | "other";
  type: "image" | "video" | "doc";
  fileSize: string;
  date: string;
  image: string;
  duration?: string;
  tags: string[];
}

export interface ScriptOutput {
  title: string;
  outline: string[];
  firstDraft: string;
}

export interface DigitalHumanConfig {
  avatarId: string;
  speed: number;
  tone: string;
  background: string;
  subtitleStyle: string;
}
