
import { DayPlan, ActivityType, DeploymentStep, Accommodation, PackingCategory } from './types';

// ==========================================
// 🔥 FIREBASE 設定區
// ==========================================
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCHpfzayKD9FdLIpvN07wHzbgPDZ7u-RrQ",
  authDomain: "familytrip2025-1e440.firebaseapp.com",
  projectId: "familytrip2025-1e440",
  storageBucket: "familytrip2025-1e440.firebasestorage.app",
  messagingSenderId: "68447315766",
  appId: "1:68447315766:web:789f6be9523beb1820b597"
};
// ==========================================

export const TRIP_DATA: DayPlan[] = [
  {
    id: 1,
    date: "12/10",
    weekday: "週三",
    route: "台南 ➔ 宜蘭",
    theme: "舒適移動，晚上泡湯消除疲勞",
    weather: { type: 'rain', temp: "18-22°C", desc: "多雲短暫雨" },
    activities: [
      {
        time: "09:00",
        title: "台南出發",
        description: "睡飽再出發，避開上班車潮。走國道3號接國道5號。",
        type: ActivityType.Drive,
      },
      {
        time: "12:00",
        title: "午餐時間",
        description: "建議在 石碇服務區 或 深坑老街 (吃豆腐) 休息用餐。",
        type: ActivityType.Food,
        location: "深坑老街"
      },
      {
        time: "14:30",
        title: "宜蘭親子熱點 (二選一)",
        type: ActivityType.Activity,
        description: "根據天氣或孩子喜好選擇一處遊玩。",
        options: [
          { title: "張美阿嬤農場", description: "三星鄉｜目前最紅！穿浴衣餵水豚、笑笑羊，環境乾淨。" },
          { title: "蜡藝蠟筆城堡", description: "蘇澳｜雨天備案首選，有很多色彩DIY，小孩會玩瘋。" }
        ],
        location: "宜蘭張美阿嬤農場"
      },
      {
        time: "17:00",
        title: "飯店 Check-in",
        description: "建議住 礁溪 (泡溫泉) 或 宜蘭市/羅東。",
        type: ActivityType.Hotel,
        location: "礁溪溫泉公園"
      },
      {
        time: "18:30",
        title: "晚餐時光",
        description: "飯店內用或羅東夜市 (阿灶伯羊肉湯、魏姐包心粉圓)。",
        type: ActivityType.Food,
        location: "羅東夜市"
      }
    ]
  },
  {
    id: 2,
    date: "12/11",
    weekday: "週四",
    route: "宜蘭 ➔ 花蓮",
    theme: "體驗最美公路，抵達花蓮慢活",
    weather: { type: 'cloudy', temp: "20-24°C", desc: "多雲時陰" },
    activities: [
      {
        time: "10:00",
        title: "出發往花蓮",
        description: "走蘇花改 (台9線)，欣賞沿途風景。",
        type: ActivityType.Drive,
      },
      {
        time: "11:00",
        title: "台泥 DAKA 園區",
        description: "星巴克、7-11休息。中間有音樂噴水池，整點會有水舞秀，小孩可以跑跑跳跳。",
        type: ActivityType.Rest,
        location: "台泥DAKA園區"
      },
      {
        time: "13:00",
        title: "午餐：佳興冰果室",
        description: "新城名店。檸檬汁必買，什錦麵很大碗適合分食。",
        type: ActivityType.Food,
        location: "佳興冰果室"
      },
      {
        time: "14:30",
        title: "七星潭",
        description: "不用趕行程，就在海邊疊石頭、看戰機起降，這是小朋友最單純的快樂。",
        type: ActivityType.Activity,
        location: "七星潭風景區"
      },
      {
        time: "16:30",
        title: "飯店 Check-in",
        description: "入住花蓮市區。建議續住兩晚(Day 2, 3)，減少換飯店的麻煩。",
        type: ActivityType.Hotel,
        location: "花蓮市區"
      },
      {
        time: "18:00",
        title: "晚餐：東大門夜市",
        description: "原住民一條街有很多特色料理。",
        type: ActivityType.Food,
        location: "東大門夜市"
      }
    ]
  },
  {
    id: 3,
    date: "12/12",
    weekday: "週五",
    route: "花蓮深度遊",
    theme: "不用長途開車，選定一個區域玩整天",
    weather: { type: 'sunny', temp: "21-25°C", desc: "舒適晴朗" },
    activities: [
      {
        time: "09:30",
        title: "全日活動 (二選一)",
        type: ActivityType.Activity,
        description: "今天是以孩子為主的行程，選擇一個方案輕鬆玩。",
        options: [
          { title: "方案A：遠雄海洋公園", description: "遊樂園+水族館+纜車。適合玩一整天，看海豚海獅表演。" },
          { title: "方案B：自然休閒派", description: "早上：立川漁場(摸蜆仔) -> 午餐：炒蜆仔 -> 下午：星巴克洄瀾門市 / 知卡宣親水公園 / 新天堂樂園。" }
        ],
        location: "遠雄海洋公園"
      },
      {
        time: "17:00",
        title: "返回飯店休息",
        description: "玩了一整天，稍微休息一下。",
        type: ActivityType.Rest,
      },
      {
        time: "18:30",
        title: "晚餐",
        description: "花蓮市區美食探險 (扁食、公正包子、炸彈蔥油餅)。",
        type: ActivityType.Food,
        location: "公正包子"
      }
    ]
  },
  {
    id: 4,
    date: "12/13",
    weekday: "週六",
    route: "花蓮 ➔ 台東池上",
    theme: "邊走邊玩台9線(山線)，最美田園風光",
    weather: { type: 'sunny', temp: "22-26°C", desc: "陽光普照" },
    activities: [
      {
        time: "10:00",
        title: "離開花蓮市",
        description: "往南走，沿著花東縱谷前進。",
        type: ActivityType.Drive,
      },
      {
        time: "11:00",
        title: "花蓮觀光糖廠 (光復糖廠)",
        description: "必吃紅豆鮮奶冰、買魚飼料餵超多錦鯉 (小朋友會在這裡卡關很久)。",
        type: ActivityType.Activity,
        location: "光復糖廠"
      },
      {
        time: "13:00",
        title: "午餐時間",
        description: "大農大富附近的餐廳，或到瑞穗吃牛奶鍋。",
        type: ActivityType.Food,
        location: "瑞穗綠精靈牛奶鍋"
      },
      {
        time: "14:30",
        title: "大農大富平地森林園區",
        description: "騎腳踏車！全台最美龍貓森林隧道，路非常平，租電動車或親子車騎在樹林裡非常舒服。",
        type: ActivityType.Activity,
        location: "大農大富平地森林園區"
      },
      {
        time: "16:30",
        title: "前往台東池上",
        description: "移動時間約 1.5 小時。今晚建議住池上或關山，縮短隔天回程車距。",
        type: ActivityType.Drive,
      },
      {
        time: "18:00",
        title: "飯店 Check-in & 晚餐",
        description: "享受池上的寧靜夜晚。",
        type: ActivityType.Hotel,
        location: "池上火車站"
      }
    ]
  },
  {
    id: 5,
    date: "12/14",
    weekday: "週日",
    route: "台東 ➔ 台南",
    theme: "騎車逛伯朗大道，帶著滿足的心情回家",
    weather: { type: 'sunny', temp: "23-27°C", desc: "晴朗溫暖" },
    activities: [
      {
        time: "09:00",
        title: "伯朗大道 / 天堂路",
        description: "租一台電動四輪車 (一家四口剛好)，去看金城武樹。早上的遊客少，空氣好。",
        type: ActivityType.Activity,
        location: "伯朗大道"
      },
      {
        time: "12:00",
        title: "午餐：悟饕池上飯包",
        description: "文化故事館，可以在火車車廂裡吃飯盒，很有氣氛。",
        type: ActivityType.Food,
        location: "悟饕池上飯包文化故事館"
      },
      {
        time: "13:30",
        title: "回程：往南開",
        description: "經台9線接南迴公路。",
        type: ActivityType.Drive,
      },
      {
        time: "15:30",
        title: "休息點：大武之心南迴驛",
        description: "南迴公路上最新的休息站，有無敵海景，買點零食休息一下。",
        type: ActivityType.Rest,
        location: "大武之心南迴驛"
      },
      {
        time: "18:00",
        title: "抵達台南",
        description: "剛好趕上晚餐時間，甜蜜的家！",
        type: ActivityType.Hotel,
        location: "台南"
      }
    ]
  }
];

export const ACCOMMODATION_DATA: Accommodation[] = [
  { 
    id: 1, 
    date: "12/10 (週三)", 
    name: "宜蘭住宿 (待定)", 
    location: "宜蘭縣礁溪鄉", 
    note: "建議選擇礁溪溫泉區",
    checkIn: "15:00",
    checkOut: "11:00",
    bookingId: "尚未預訂"
  },
  { 
    id: 2, 
    date: "12/11 (週四)", 
    name: "花蓮市區住宿 (待定)", 
    location: "花蓮縣花蓮市", 
    note: "建議靠近東大門夜市",
    checkIn: "15:00",
    checkOut: "11:00",
    bookingId: "尚未預訂" 
  },
  { 
    id: 3, 
    date: "12/12 (週五)", 
    name: "花蓮市區住宿 (續住)", 
    location: "花蓮縣花蓮市", 
    note: "同前一晚",
    checkIn: "15:00",
    checkOut: "11:00",
    bookingId: "尚未預訂"
  },
  { 
    id: 4, 
    date: "12/13 (週六)", 
    name: "台東池上住宿 (待定)", 
    location: "台東縣池上鄉", 
    note: "建議靠近伯朗大道或火車站",
    checkIn: "15:00",
    checkOut: "11:00",
    bookingId: "尚未預訂"
  },
];

export const DEFAULT_PACKING_LIST: PackingCategory[] = [
  {
    id: 'docs',
    title: '重要證件與現金',
    items: [
      { id: 'd1', text: '身分證 / 健保卡 (全家)', checked: false },
      { id: 'd2', text: '現金 (夜市、小吃)', checked: false },
      { id: 'd3', text: '信用卡 / 悠遊卡', checked: false },
      { id: 'd4', text: '駕照 (租車用)', checked: false },
    ]
  },
  {
    id: 'tech',
    title: '3C 與電器',
    items: [
      { id: 't1', text: '手機充電器 / 線', checked: false },
      { id: 't2', text: '行動電源', checked: false },
      { id: 't3', text: '自拍棒 / 腳架', checked: false },
      { id: 't4', text: '車用充電器', checked: false },
    ]
  },
  {
    id: 'clothes',
    title: '衣物 (5天4夜)',
    items: [
      { id: 'c1', text: '換洗衣物 (5套+備用)', checked: false },
      { id: 'c2', text: '睡衣 / 居家服', checked: false },
      { id: 'c3', text: '薄外套 / 防風外套', checked: false },
      { id: 'c4', text: '好走的鞋子 / 拖鞋', checked: false },
      { id: 'c5', text: '泳衣 / 泳帽 (泡溫泉)', checked: false },
    ]
  },
  {
    id: 'toiletries',
    title: '盥洗與保養',
    items: [
      { id: 'b1', text: '牙刷 / 牙膏', checked: false },
      { id: 'b2', text: '毛巾 / 浴巾 (備用)', checked: false },
      { id: 'b3', text: '洗面乳 / 保養品', checked: false },
      { id: 'b4', text: '刮鬍刀', checked: false },
    ]
  },
  {
    id: 'kids',
    title: '親子必備',
    items: [
      { id: 'k1', text: '安撫玩具 / 玩偶', checked: false },
      { id: 'k2', text: '防蚊液 / 止癢膏', checked: false },
      { id: 'k3', text: '乾洗手 / 濕紙巾', checked: false },
      { id: 'k4', text: '水壺', checked: false },
      { id: 'k5', text: '車上零食', checked: false },
    ]
  },
  {
    id: 'meds',
    title: '常備藥品',
    items: [
      { id: 'm1', text: '暈車藥', checked: false },
      { id: 'm2', text: '腸胃藥', checked: false },
      { id: 'm3', text: '感冒藥 / 退燒藥', checked: false },
      { id: 'm4', text: 'OK繃 / 外傷藥', checked: false },
    ]
  }
];

export const DEPLOYMENT_STEPS: DeploymentStep[] = [
  {
    title: "⚠️ 重要提醒：Vercel 限制",
    content: "Vercel 免費版每天最多部署 100 次。如果更新後手機沒看到新內容，可能是達到上限了，請等待隔天重置。"
  },
  {
    title: "1. 註冊 Vercel 帳號",
    content: "前往 vercel.com，使用 GitHub 登入，這樣最方便連結。"
  },
  {
    title: "2. 申請 Firebase (為了同步記帳)",
    content: "這一步是為了讓大家的手機記帳能同步。前往 console.firebase.google.com -> 建立專案 -> 建立 Web App -> 複製 Config -> 回到 constants.ts 填入 FIREBASE_CONFIG。"
  },
  {
    title: "3. 設定 Firebase 資料庫",
    content: "在 Firebase 控制台左側點 'Firestore Database' -> 建立資料庫 -> 選擇 '以測試模式啟動 (Start in test mode)' -> 位置選 asia-east1 (台灣) -> 完成。"
  },
  {
    title: "4. 部署到 Vercel",
    content: "回到 Vercel Dashboard -> Add New Project -> Import Git Repository -> 選擇你的 family-trip-2024 -> 點擊 Deploy。"
  },
  {
    title: "5. 手機安裝",
    content: "部署完成後，用手機瀏覽器打開網址，選擇「分享」->「加入主畫面」，就能像 APP 一樣使用囉！"
  },
  {
    title: "疑難排解：需要登入？",
    content: "如果打開網頁出現 Vercel 登入畫面，請到 Vercel 專案設定 -> Settings -> Deployment Protection -> 將 'Vercel Authentication' 設為 Disabled -> Save。"
  }
];
