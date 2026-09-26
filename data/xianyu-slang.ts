// 闲鱼黑话词条：商品名/术语 → 社区常用叫法 / 别名 / 暗号。
// 数据来源为公开社区共建词典与二手交易圈实战整理，覆盖全网主流交易黑话。
// 仅收录中性、合规词条用于检索与避坑参考，符合内容审核与安全政策。

export type SlangCategory =
  | "all"
  | "trading"     // 交易与砍价术语
  | "hardware"    // 数码与手机硬件
  | "ai"          // AI与虚拟会员
  | "anime"       // 二次元与谷圈潮玩
  | "gaming"      // 游戏与主机外设
  | "fashion"     // 美妆鞋服与球鞋
  | "security";   // 平台防封与引流

export type SlangEntry = {
  name: string;
  category?: SlangCategory;
  aliases: string[];
};

export const xianyuSlang: SlangEntry[] = [
  // ==========================================
  // 一、二手交易核心通用术语与砍价暗语 (trading)
  // ==========================================
  {
    name: "屠龙刀 / 大刀",
    category: "trading",
    aliases: ["大刀", "砍半", "骨折价", "离谱出价", "对半砍", "关公刀", "开局对半砍", "白嫖党出价"]
  },
  {
    name: "小刀",
    category: "trading",
    aliases: ["微刀", "小砍", "抹零", "包个邮", "给点路费", "车马费", "小议", "诚心要小刀", "只接小刀"]
  },
  {
    name: "自刀",
    category: "trading",
    aliases: ["主动降价", "自砍一刀", "急出降价", "自降身价", "痛下决心自刀", "自刀出", "血亏自刀"]
  },
  {
    name: "到手刀",
    category: "trading",
    aliases: ["到货砍价", "拆箱找茬", "恶意勒索", "瑕疵威胁退款", "到手砍", "二手流氓", "到手刀退货党"]
  },
  {
    name: "秒拍 / 秒确认",
    category: "trading",
    aliases: ["爽快秒拍", "极速到账", "秒确认收货", "不墨迹秒确认", "神仙买家", "直接拍下不墨迹"]
  },
  {
    name: "鸽子 / 鸽了",
    category: "trading",
    aliases: ["放鸽子", "口头预留被鸽", "拍下不买", "线下放鸽子", "鸽武圣", "咕咕咕", "爽约党", "放鸽者拉黑"]
  },
  {
    name: "传家宝",
    category: "trading",
    aliases: ["当宝卖", "比全新还贵", "理财产品", "万年不降价", "祖传宝贝", "黄金成色", "古董标价"]
  },
  {
    name: "出差回血 / 退坑出",
    category: "trading",
    aliases: ["出差急出", "退坑回血", "毕业转让", "搬家甩卖", "回血出", "吃土回血", "老婆不让玩了", "换钱吃饭"]
  },
  {
    name: "仅拆封 / 充新",
    category: "trading",
    aliases: ["充新成色", "通电一次", "999新", "仅拆封拍照", "摸了一下", "未激活", "全新仅拆封", "拆封未使用"]
  },
  {
    name: "箱说齐全",
    category: "trading",
    aliases: ["配件全", "带原盒发票", "全套在", "说明书原盒在", "三包发票全", "包装盒齐全", "成色完美箱说全"]
  },
  {
    name: "明盘",
    category: "trading",
    aliases: ["明确标价", "底价公开", "非虚标", "明码实价", "不接受私聊问底价", "真实价格已明盘"]
  },
  {
    name: "验货宝",
    category: "trading",
    aliases: ["走验货", "官方质检", "第三方鉴定", "验机中心", "支持验货宝", "出报告再买", "验货宝发货"]
  },
  {
    name: "闲鱼小法庭",
    category: "trading",
    aliases: ["小法庭", "大众评审", "17人陪审团", "闲鱼打官司", "法庭见", "小法庭胜诉", "小法庭拉票"]
  },
  {
    name: "同城面交",
    category: "trading",
    aliases: ["线下自提", "当面验货", "地铁口面交", "同城自取", "当场确认", "不发快递面交"]
  },
  {
    name: "捡漏",
    category: "trading",
    aliases: ["白菜价", "超值漏", "神价", "骨折捡漏", "买到就是赚到", "懂行的来捡漏"]
  },
  {
    name: "包顺丰 / 保价",
    category: "trading",
    aliases: ["顺丰特快包邮", "保价顺丰", "顺丰空运", "包邮包保价", "运输损坏包赔"]
  },
  {
    name: "随缘出 / 慢出",
    category: "trading",
    aliases: ["不急卖", "佛系出", "随缘出不刀", "遇到有缘人再出", "留着吃灰也不贱卖"]
  },
  {
    name: "人民币¥",
    category: "trading",
    aliases: ["米", "软妹币", "r", "🥕", "CNY", "圆子", "馒头", "大米", "RMB", "C", "元", "个W", "几张红的"]
  },

  // ==========================================
  // 二、数码硬件、手机、电脑显卡圈暗语 (hardware)
  // ==========================================
  {
    name: "妖机 (iPhone)",
    category: "hardware",
    aliases: ["黑改机", "硬改序列号", "翻新魔改", "拼装iPhone", "假国行", "改码机", "山寨套壳", "炸弹机"]
  },
  {
    name: "卡贴机 (iPhone)",
    category: "hardware",
    aliases: ["有锁机", "网络锁", "美版卡贴", "日版合约机", "配卡贴使用", "便宜苹果", "运营商锁机"]
  },
  {
    name: "黑解 (iPhone)",
    category: "hardware",
    aliases: ["ICCID解锁", "免卡贴有锁机", "越狱黑解", "不要还原出厂", "不能抹掉数据", "黑解变无锁"]
  },
  {
    name: "官翻机 / 官换机",
    category: "hardware",
    aliases: ["官方翻新", "Apple认证翻新", "售后置换机", "官方换新裸机", "N开头型号", "小白盒", "保修换机"]
  },
  {
    name: "资源机 / BS机",
    category: "hardware",
    aliases: ["富士康资源机", "软银退货机", "1978机器", "官方过保机", "未激活无保修", "渠道库存机"]
  },
  {
    name: "纯原 / 纯原未拆",
    category: "hardware",
    aliases: ["全原装", "螺丝没动过", "气密性好", "原装原电", "无拆无修", "爱思助手全绿", "原厂零件"]
  },
  {
    name: "压屏 / 换盖板",
    category: "hardware",
    aliases: ["外屏碎换盖板", "后压屏", "纯原内屏", "压盖板", "触摸正常", "无漏液无黑点", "压屏机"]
  },
  {
    name: "大修机 / 动板机",
    category: "hardware",
    aliases: ["修过主板", "焊接过芯片", "飞线机", "进水维修", "大修机器", "重做CPU", "暗病主板"]
  },
  {
    name: "面容损坏",
    category: "hardware",
    aliases: ["面容坏", "原深感失效", "无法录入面容", "无面容特价", "无face id", "深感损坏"]
  },
  {
    name: "矿卡 (显卡)",
    category: "hardware",
    aliases: ["锻炼卡", "大矿卡", "水洗卡", "挖矿显卡", "矿渣", "矿场退休", "核心泛黄", "硅油渗出"]
  },
  {
    name: "3060 显卡",
    category: "hardware",
    aliases: ["大矿卡", "甜品卡", "锁算力3060", "3060ti", "矿神卡", "网吧拆机"]
  },
  {
    name: "580 显卡",
    category: "hardware",
    aliases: ["战术核显卡", "矿难神卡", "rx580", "580 8g", "满血580", "红旗不倒"]
  },
  {
    name: "摸摸党",
    category: "hardware",
    aliases: ["7天白嫖", "拆封退货", "试玩就退", "电商摸摸党", "退货专业户", "防摸封条"]
  },
  {
    name: "洋垃圾 (硬件)",
    category: "hardware",
    aliases: ["至强CPU", "二手服务器拆机", "X79/X99", "E5神教", "企业级固态拆机", "海外淘垃圾"]
  },
  {
    name: "苹果 (Apple)",
    category: "hardware",
    aliases: ["果子", "水果", "Apple", "库克", "美美把玩", "果粉", "水果全家桶"]
  },
  {
    name: "AMD",
    category: "hardware",
    aliases: ["农企", "按摩店", "YES！", "苏妈", "红厂", "锐龙", "积木U"]
  },
  {
    name: "微软 (Microsoft)",
    category: "hardware",
    aliases: ["巨硬", "microslop", "ms", "田牌", "苏菲 (Surface)"]
  },
  {
    name: "尼康 Z5",
    category: "hardware",
    aliases: ["传奇连拍王", "z5", "全画幅入门神机", "慢速快门王"]
  },

  // ==========================================
  // 三、AI 与虚拟会员、流媒体服务暗语 (ai)
  // ==========================================
  {
    name: "Claude",
    category: "ai",
    aliases: ["克劳德", "小克", "A畜", "a/", "a➗", "kyc", "安特罗匹克", "cld", "3HK", "A%", "cc", "A\\", "claude3.7", "sonnet"]
  },
  {
    name: "ChatGPT / GPT-4o",
    category: "ai",
    aliases: ["狗屁通", "奥特曼", "closeai", "codex", "c0dex", "鸡皮提", "g老师", "5.5满血版", "plus月抛", "ai拼车", "team车队", "ds祖宗", "美版ds"]
  },
  {
    name: "Gemini Pro",
    category: "ai",
    aliases: ["哈基米", "美国豆包", "哥迷你", "基迷你", "杰米奈", "双子座 pro", "谷歌大模型", "结木奈", "给秘密", "芥末奶"]
  },
  {
    name: "Midjourney",
    category: "ai",
    aliases: ["mj", "魔法画画", "中途之旅", "咒语作图", "绘图大师", "v6绘图", "ai修图", "出图神器", "垫图神仙"]
  },
  {
    name: "Cursor",
    category: "ai",
    aliases: ["光标", "代码神器", "自动写代码", "cursor pro", "AI编辑器", "编程助手"]
  },
  {
    name: "GitHub Copilot",
    category: "ai",
    aliases: ["副驾驶", "飞行员", "编程机长", "绿飞机", "copilot学生包", "教师车", "代码补全"]
  },
  {
    name: "DeepSeek (深度求索)",
    category: "ai",
    aliases: ["ds", "国产之光", "深度求索", "满血r1", "硅基流动", "蒸馏模型", "开源大模型"]
  },
  {
    name: "Grok",
    category: "ai",
    aliases: ["马斯克", "gr0k", "找片神器", "xAI", "gr克会员", "马斯克ai"]
  },
  {
    name: "Netflix",
    category: "ai",
    aliases: ["奈飞", "网飞", "奶飞", "NF", "地霸", "红色流媒体", "4k四人车", "独享车位"]
  },
  {
    name: "YouTube Premium",
    category: "ai",
    aliases: ["油管", "红油管", "红色播放器", "油管家庭组", "yt premium", "油管去广告", "油管音乐"]
  },
  {
    name: "Spotify",
    category: "ai",
    aliases: ["声破天", "绿听", "斑点音乐", "绿色音乐", "spotify会员", "家庭组车位"]
  },
  {
    name: "Disney+",
    category: "ai",
    aliases: ["迪士尼", "耗子家", "蓝米老鼠", "米奇妙妙屋", "disney会员"]
  },
  {
    name: "Apple ID (外区)",
    category: "ai",
    aliases: ["美区id", "漂亮国id", "外区水果号", "独享美区", "充值卡号", "免税州账号"]
  },
  {
    name: "Notion",
    category: "ai",
    aliases: ["诺宣", "笔记神器", "个人知识库", "教育优惠永久车", "notion ai", "团队版车位"]
  },
  {
    name: "百度网盘",
    category: "ai",
    aliases: ["度盘", "熊掌盘", "蓝色网盘", "极速下载", "超级svip", "度盘车位"]
  },
  {
    name: "夸克网盘",
    category: "ai",
    aliases: ["88vip权益出", "p p a a", "垃圾盘", "红盘", "阿里网盘", "夸克svip"]
  },
  {
    name: "网易云音乐",
    category: "ai",
    aliases: ["黑胶唱片", "云村村民", "88vip网易云", "黑胶vip", "网易黑胶"]
  },
  {
    name: "giffgaff (英国手机卡)",
    category: "ai",
    aliases: ["黄色信封", "英伦风明信片", "GG", "英国信封", "+44信封", "gogo牌熊猫公仔", "吉夫加夫", "漂洋过海的信", "gg卡"]
  },

  // ==========================================
  // 四、二次元、谷圈周边、潮玩盲盒暗语 (anime)
  // ==========================================
  {
    name: "谷子 / 谷美 (Goods)",
    category: "anime",
    aliases: ["吃谷", "谷圈", "谷美外壳", "动漫周边", "周边收纳", "收谷", "出谷", "谷子打包"]
  },
  {
    name: "吧唧 (Badge)",
    category: "anime",
    aliases: ["铁皮徽章", "徽章", "马口铁", "吧唧套", "闪底吧唧", "激光碎玻璃", "镭射吧唧", "痛包吧唧"]
  },
  {
    name: "痛包",
    category: "anime",
    aliases: ["扎包", "扎痛包", "透明视窗包", "痛层", "痛包展示", "外出痛包"]
  },
  {
    name: "切煤 / 煤炉 (Mercari)",
    category: "anime",
    aliases: ["煤炉代切", "日本代购", "Mercari代买", "切煤炭", "海淘转运", "煤炉极速切", "煤炉收谷"]
  },
  {
    name: "海景房 (绝版周边)",
    category: "anime",
    aliases: ["炒上天", "天价周边", "海景房吧唧", "绝版绝美", "溢价十倍", "梦中情谷"]
  },
  {
    name: "祖国版 / 散货 (手办)",
    category: "anime",
    aliases: ["厂货", "代工瑕疵", "山寨手办", "国产仿版", "非日版正品", "盗版散件", "高仿祖国版"]
  },
  {
    name: "捆出 / 捆绑销售",
    category: "anime",
    aliases: ["带走", "烫门捆冷门", "一捆一", "大热角色捆垃圾", "打包带走", "不单出只捆"]
  },
  {
    name: "端盒 / 盲盒",
    category: "anime",
    aliases: ["拆盒未拆袋", "带卡带盒", "隐藏款", "整盒端", "热款盲盒", "泡泡玛特盲盒"]
  },
  {
    name: "厂瑕 / 官瑕",
    category: "anime",
    aliases: ["出厂飞漆", "涂装瑕疵", "细微磨损", "出厂划痕", "介意勿拍", "初版厂瑕"]
  },
  {
    name: "排谷 / 拼团",
    category: "anime",
    aliases: ["开团", "排角色", "多人平摊运费", "跟团吃谷", "拼盒", "选妃团"]
  },

  // ==========================================
  // 五、游戏、Steam、主机与电竞外设 (gaming)
  // ==========================================
  {
    name: "GTA (侠盗猎车手)",
    category: "gaming",
    aliases: ["给他爱", "道德与法治", "三男一狗", "那个游戏", "美国异环", "鸡踢欸", "洛圣都历险记", "大作5"]
  },
  {
    name: "Steam / 蒸汽平台",
    category: "gaming",
    aliases: ["大蒸笼", "喜加一", "G胖", "跨区买游戏", "蒸汽余额", "钱包充值卡", "红信警告"]
  },
  {
    name: "任天堂 Switch (NS)",
    category: "gaming",
    aliases: ["思维驰", "ns", "任豚", "续航版", "oled日版", "破戒版", "双系统", "喷射战士主机"]
  },
  {
    name: "PlayStation 5 (PS5)",
    category: "gaming",
    aliases: ["索尼路由器", "空气净化器", "双手柄日版", "光驱版", "双手柄备份港服", "白色大砖头"]
  },
  {
    name: "动物之森 (动森)",
    category: "gaming",
    aliases: ["猛男捡树枝", "东吴僧友会", "绿框大作", "大头菜投资", "开开心心动物园", "树枝卡带"]
  },
  {
    name: "原神 / 崩铁 / 绝区零",
    category: "gaming",
    aliases: ["米忽悠", "米哈游", "自抽号", "初始号", "死邮科技号", "满命满精", "带专武"]
  },
  {
    name: "黑神话：悟空",
    category: "gaming",
    aliases: ["天命人", "猴子", "国产3A", "预购码", "大圣归来", "黑猴卡带"]
  },
  {
    name: "CS2 / CS:GO",
    category: "gaming",
    aliases: ["go", "csgo", "go一把", "开箱子", "大行动", "饰品崭新出厂", "暗金武器"]
  },
  {
    name: "最后生还者 2",
    category: "gaming",
    aliases: ["最后的高尔夫", "乔尔高尔夫", "高尔夫大作", "美末2"]
  },
  {
    name: "HHKB 键盘",
    category: "gaming",
    aliases: ["好好看吧", "程序员神键", "静电容键盘", "配列神器"]
  },

  // ==========================================
  // 六、美妆鞋服、潮牌球鞋与二手奢侈品 (fashion)
  // ==========================================
  {
    name: "专柜正品带小票 (高危套路)",
    category: "fashion",
    aliases: ["带免税店小票", "专柜全套票据", "机打小票保真", "支持专柜验货 (假)", "香港免税小票"]
  },
  {
    name: "原单 / 外贸尾单",
    category: "fashion",
    aliases: ["代工厂流出", "原厂剪标", "老鼠货", "外贸原单尾货", "假正品代称", "跟单定制"]
  },
  {
    name: "纯原 / 顶配 (莆田球鞋)",
    category: "fashion",
    aliases: ["裁片级", "PK版", "OG批次", "LJR纯原", "过毒级", "得物同款工艺", "高品质实拍"]
  },
  {
    name: "专柜撤柜清仓",
    category: "fashion",
    aliases: ["商场撤柜", "专柜瑕疵打折", "断码清货", "临期特惠", "柜姐私下拿货"]
  },
  {
    name: "分装 / 试香 (美妆香水)",
    category: "fashion",
    aliases: ["2ml小样", "试香喷雾", "正品粉底分装", "小瓶试色", "保真正装自压分装"]
  },
  {
    name: "茅台酒",
    category: "fashion",
    aliases: ["酱香科技", "飞天酱香", "白水", "红飘带", "硬通货回血"]
  },

  // ==========================================
  // 七、平台社交引流、防违规与防封暗语 (security)
  // ==========================================
  {
    name: "微信 (WeChat)",
    category: "security",
    aliases: ["绿泡泡", "大而丑", "VX", "小而美", "🛰️", "卫星", "V", "地球号", "微差它", "Wechat", "张小龙", "绿色聊天软件", "小绿书", "留爪私"]
  },
  {
    name: "QQ",
    category: "security",
    aliases: ["企鹅", "企鹅号", "🐧", "蓝鸟聊天", "扣扣", "马化腾", "Q号"]
  },
  {
    name: "淘宝 (Taobao)",
    category: "security",
    aliases: ["橙色软件", "某宝", "淘淘", "TB", "马云家"]
  },
  {
    name: "京东 (JD)",
    category: "security",
    aliases: ["狗东", "红色软件", "某东", "东哥家", "自营带票"]
  },
  {
    name: "小红书",
    category: "security",
    aliases: ["小黄书", "红薯", "集美聚集地", "小红薯", "🍠", "某红书"]
  },
  {
    name: "X (Twitter)",
    category: "security",
    aliases: ["推特", "黑叉", "推", "蓝鸟", "黑色错误", "黑色❌", "小黑书", "黑×", "叉叉空间"]
  },
  {
    name: "Telegram",
    category: "security",
    aliases: ["纸飞机", "tg", "电报", "天国", "飞机号", "TG群"]
  },
  {
    name: "私信联系",
    category: "security",
    aliases: ["私", "DM", "厮", "4️⃣", "右下角聊", "私聊留号", "打字聊"]
  },
  {
    name: "虚拟货币 (USDT/BTC)",
    category: "security",
    aliases: ["U", "大饼", "usdt", "矿", "二饼", "油", "果子", "牛油果", "烧饼", "数字货币"]
  },
  {
    name: "国家反诈中心",
    category: "security",
    aliases: ["老大哥正在看着你", "相信咱妈", "监控中心", "1984", "监视器"]
  },
];
