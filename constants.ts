
import { DayPlan, ActivityType, DeploymentStep, Accommodation, PackingCategory } from './types';

// ==========================================
// 🔥 FIREBASE 設定區 (維持不變)
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
// 👶 親子優化版行程資料 (飛牛牧場 + 立川漁場版)
// ==========================================

export const TRIP_DATA: DayPlan[] = [
  {
    id: 1,
    date: "12/10",
    weekday: "週三",
    route: "台南 ➔ 苗栗 ➔ 宜蘭",
    theme: "牧場跑跳，西部綠意之旅",
    weather: { type: 'cloudy', temp: "19-23°C", desc: "戶外活動，注意防風" },
    activities: [
      {
        time: "09:00",
        title: "台南出發",
        description: "不用趕早起，讓寶寶睡飽喝完奶再出發。走國道1號北上，前往苗栗。",
        type: ActivityType.Drive,
      },
      {
        time: "11:30",
        title: "抵達：苗栗飛牛牧場",
        description: "這裡有完善的停車場與育嬰室。建議先用餐再開始玩。",
        type: ActivityType.Activity,
        location: "飛牛牧場"
      },
      {
        time: "12:00",
        title: "午餐：牧場餐廳",
        description: "園區內有餐廳（火鍋/義大利麵），牛奶鍋必點。推車可直接進入餐廳。",
        type: ActivityType.Food,
        location: "飛牛牧場餐廳"
      },
      {
        time: "13:30",
        title: "牧場活動：餵牛羊與鴨子遊行",
        description: "⚠️推車注意｜主要道路是柏油路好推，但有坡度。4個月寶寶若在睡覺可用推車，若醒著建議用背巾移動較靈活。2歲半小孩在大草皮跑跳非常安全。",
        type: ActivityType.Activity,
        location: "飛牛牧場大草皮"
      },
      {
        time: "16:00",
        title: "前往宜蘭 (約2-2.5小時)",
        description: "小孩放完電剛好上車睡覺。經國道1號轉國道3號接國道5號前往宜蘭。",
        type: ActivityType.Drive,
      },
      {
        time: "18:30",
        title: "飯店 Check-in",
        description: "入住山口溫泉飯店。位於礁溪熱鬧區域，吃飯購物都方便。",
        type: ActivityType.Hotel,
        location: "山口溫泉飯店"
      },
      {
        time: "19:30",
        title: "晚餐",
        description: "飯店附近簡單吃，或叫外送進飯店，早點休息迎接明天的花東行。",
        type: ActivityType.Food,
        location: "礁溪路五段"
      }
    ]
  },
  {
    id: 2,
    date: "12/11",
    weekday: "週四",
    route: "宜蘭 ➔ 花蓮 (宿新城)",
    theme: "蘇花改與海洋風光",
    weather: { type: 'cloudy', temp: "20-24°C", desc: "舒適，海邊風大" },
    activities: [
      {
        time: "09:00",
        title: "甲鳥園",
        description: "🛒推車極佳｜全水泥地平坦好推！有室內區，2歲半可體驗抱小鴨，環境乾淨適合小寶寶。",
        type: ActivityType.Activity,
        location: "甲鳥園"
      }, 
      {
        time: "11:00",
        title: "台泥 DAKA 園區",
        description: "🛒推車OK｜絕佳中繼站。星巴克旁有無障礙廁所與飲水機(泡奶方便)。大廣場適合2歲半放電。",
        type: ActivityType.Rest,
        location: "台泥DAKA園區"
      },
      {
        time: "13:00",
        title: "午餐：佳興冰果室",
        description: "名店人多，若需排隊建議一人排，一人帶小孩在車上或附近陰涼處等。",
        type: ActivityType.Food,
        location: "佳興冰果室"
      },
      {
        time: "14:30",
        title: "七星潭",
        description: "👶背巾限定｜海灘是礫石，推車完全推不動！請使用背巾背4個月寶寶，爸爸牽2歲半丟石頭。",
        type: ActivityType.Activity,
        location: "七星潭風景區"
      },
      {
        time: "15:40",
        title: "華東牧場",
        description: "🛒推車OK｜就在七星潭旁。草地與泥土路，推車可行但稍微費力。可以近距離餵小動物。",
        type: ActivityType.Activity,
        location: "華東牧場"
      },
      {
        time: "17:30",
        title: "民宿 Check-in",
        description: "入住七星潭星海民宿。就在七星潭旁，非常順路，不用進市區塞車。",
        type: ActivityType.Hotel,
        location: "七星潭星海民宿"
      },
      {
        time: "18:30",
        title: "晚餐：東大門夜市 (開車前往)",
        description: "🛒推車OK｜開車約15-20分鐘。路面寬敞平坦，建議早點去(18:00)避開尖峰人潮。",
        type: ActivityType.Food,
        location: "東大門夜市"
      }
    ]
  },
  {
    id: 3,
    date: "12/12",
    weekday: "週五",
    route: "花蓮定點慢遊",
    theme: "推車友善日，輕鬆玩水看飛機",
    weather: { type: 'sunny', temp: "21-25°C", desc: "舒適晴朗" },
    activities: [
      {
        time: "09:30",
        title: "立川漁場",
        description: "🛒推車OK｜園區平坦好推。2歲半大寶可下水體驗摸蜆仔(水淺安全)，4個月二寶坐推車在旁觀看，爸媽輪流顧。",
        type: ActivityType.Activity,
        location: "立川漁場"
      },
      {
        time: "12:00",
        title: "午餐：立川漁場餐廳",
        description: "直接在園區內用餐，招牌炒蜆仔必點。餐廳空間大，適合推車。",
        type: ActivityType.Food,
        location: "立川漁場"
      },
      {
        time: "14:00",
        title: "星巴克洄瀾門市 & 新天堂樂園",
        description: "🛒推車OK｜純白貨櫃屋拍照。重點是旁邊的「新天堂樂園」，室內冷氣強，有超長溜滑梯，且育嬰室設施非常完善。",
        type: ActivityType.Activity,
        location: "星巴克洄瀾門市"
      },
      {
        time: "16:00",
        title: "知卡宣親水公園 (或回民宿)",
        description: "🛒推車OK｜如果小孩還不想睡，可以去公園散步；如果累了就回七星潭民宿休息。",
        type: ActivityType.Rest,
        location: "知卡宣親水公園"
      },
      {
        time: "18:30",
        title: "晚餐",
        description: "推薦：公正包子(排隊久建議先打電話或外送)、液香扁食。",
        type: ActivityType.Food,
        location: "花蓮市區"
      }
    ]
  },
  {
    id: 4,
    date: "12/13",
    weekday: "週六",
    route: "花蓮 ➔ 台東市",
    theme: "縱谷放電，移動至台東",
    weather: { type: 'sunny', temp: "22-26°C", desc: "陽光普照" },
    activities: [
      {
        time: "10:00",
        title: "花蓮觀光糖廠",
        description: "🛒推車OK｜園區平坦。餵魚池有欄杆，2歲半看魚很安全。有足夠的休息椅。",
        type: ActivityType.Activity,
        location: "光復糖廠"
      },
      {
        time: "13:00",
        title: "午餐：糖廠周邊或瑞穗",
        description: "簡單用餐，保留體力給下午。",
        type: ActivityType.Food,
        location: "瑞穗"
      },
      {
        time: "14:30",
        title: "大農大富平地森林",
        description: "⭐️必租電動四輪車｜強烈建議租4人座電動棚車。爸爸開車，媽媽抱4個月寶寶坐後座，2歲半坐旁邊，舒服又遮陽。",
        type: ActivityType.Activity,
        location: "大農大富平地森林園區"
      },
      {
        time: "16:30",
        title: "瑞穗牧場",
        description: "🛒推車OK｜主要道路平坦。可以推車到柵欄邊看乳牛和鴕鳥。鮮奶饅頭適合小孩當點心。",
        type: ActivityType.Activity,
        location: "瑞穗牧場"
      },
      {
        time: "18:00",
        title: "前往台東市 (芭涵漢)",
        description: "車程約 1.5 - 2 小時。直奔台東市區住宿。",
        type: ActivityType.Drive,
      },
      {
        time: "19:30",
        title: "民宿 Check-in",
        description: "入住芭涵漢民宿。晚上可去台東市區或鐵花村走走。",
        type: ActivityType.Hotel,
        location: "芭涵漢民宿"
      }
    ]
  },
  {
    id: 5,
    date: "12/14",
    weekday: "週日",
    route: "台東市 ➔ 池上 ➔ 台南",
    theme: "最後的稻浪，回家之路",
    weather: { type: 'sunny', temp: "23-27°C", desc: "注意防曬" },
    activities: [
      {
        time: "09:00",
        title: "前往台東池上",
        description: "往北開約 50 分鐘。雖然稍微回頭，但去伯朗大道很值得。",
        type: ActivityType.Drive,
      },
      {
        time: "10:00",
        title: "伯朗大道 / 天堂路",
        description: "⭐️必租電動四輪車｜一般腳踏車無法載4個月寶寶。請租電動車，推車可寄放在租車店。",
        type: ActivityType.Activity,
        location: "伯朗大道"
      },
      {
        time: "12:30",
        title: "午餐：悟饕池上飯包",
        description: "🛒推車注意｜火車車廂座位狹窄，建議在一般的用餐區，或二樓有較大空間。",
        type: ActivityType.Food,
        location: "悟饕池上飯包文化故事館"
      },
      {
        time: "14:00",
        title: "回程：南迴公路",
        description: "經台9線(花東縱谷)接南迴公路回台南。這段山路較多彎道，容易暈車，建議上山前確認2歲半小孩狀態。",
        type: ActivityType.Drive,
      },
      {
        time: "16:00",
        title: "大武之心南迴驛",
        description: "🛒推車OK｜空間大、有電梯、廁所乾淨。是回西部前最後的大型休息站。",
        type: ActivityType.Rest,
        location: "大武之心南迴驛"
      },
      {
        time: "18:30",
        title: "抵達台南",
        description: "辛苦了！回到溫暖的家。",
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
    name: "山口溫泉飯店", 
    location: "宜蘭縣礁溪鄉五峰路2號", 
    note: "位於礁溪溫泉區，交通便利",
    checkIn: "15:00",
    checkOut: "11:00",
    bookingId: "尚未預訂"
  },
  { 
    id: 2, 
    date: "12/11 (週四)", 
    name: "七星潭星海民宿", 
    location: "花蓮縣新城鄉七星街79巷12號", 
    note: "近七星潭博物館旁停車場，可包棟",
    checkIn: "15:00",
    checkOut: "11:00",
    bookingId: "尚未預訂" 
  },
  { 
    id: 3, 
    date: "12/12 (週五)", 
    name: "七星潭星海民宿 (續住)", 
    location: "花蓮縣新城鄉七星街79巷12號", 
    note: "續住第二晚",
    checkIn: "15:00",
    checkOut: "11:00",
    bookingId: "尚未預訂"
  },
  { 
    id: 4, 
    date: "12/13 (週六)", 
    name: "芭涵漢民宿", 
    location: "台東市吉泰路599巷25號", 
    note: "位於台東市，方便隔日行程",
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
      { id: 'd2', text: '小孩健保卡', checked: false },
      { id: 'd3', text: '現金 (夜市、小吃)', checked: false },
      { id: 'd4', text: '信用卡 / 悠遊卡', checked: false },
      { id: 'd5', text: '駕照 (租車用)', checked: false },
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
      { id: 'c2', text: '尖尖衣服', checked: false },
      { id: 'c3', text: '尖尖外套', checked: false },
      { id: 'c4', text: '圈圈衣服', checked: false },
      { id: 'c5', text: '睡衣 / 居家服', checked: false },
      { id: 'c6', text: '薄外套 / 防風外套', checked: false },
      { id: 'c7', text: '好走的鞋子 / 拖鞋', checked: false },
      { id: 'c8', text: '泳衣 / 泳帽 (泡溫泉)', checked: false },
    ]
  },
  {
    id: 'toiletries',
    title: '盥洗與保養',
    items: [
      { id: 'b1', text: '牙刷 / 牙膏', checked: false },
      { id: 'b2', text: '尖尖牙刷', checked: false },
      { id: 'b3', text: '毛巾 / 浴巾 (備用)', checked: false },
      { id: 'b4', text: '洗面乳 / 保養品', checked: false },
      { id: 'b5', text: '刮鬍刀', checked: false },
    ]
  },
  {
    id: 'kids',
    title: '親子必備',
    items: [
      { id: 'k1', text: '安撫玩具 / 玩偶', checked: false },
      { id: 'k2', text: '防蚊液 / 止癢膏', checked: false },
      { id: 'k3', text: '乾洗手 / 濕紙巾', checked: false },
      { id: 'k5', text: '淨淨', checked: false },
      { id: 'k5', text: '奶瓶刷', checked: false },
      { id: 'k4', text: '尖尖水杯', checked: false },
      { id: 'k5', text: '車上零食', checked: false },
      { id: 'k6', text: '幫寶椅', checked: false },
      { id: 'k7', text: '瞬熱飲水機', checked: false },
      { id: 'k8', text: '小電風扇', checked: false },
      { id: 'k9', text: '尖尖吃飯圍兜', checked: false },
      { id: 'k10', text: '食物剪', checked: false },
      { id: 'k11', text: '口腔清潔棒', checked: false },
      { id: 'k12', text: '尖尖尿布', checked: false },
      { id: 'k13', text: '圈圈尿布', checked: false },
      { id: 'k14', text: '尖尖奶粉', checked: false },
      { id: 'k15', text: '圈圈奶粉', checked: false },
      { id: 'k16', text: '尖尖奶瓶', checked: false },
      { id: 'k17', text: '圈圈奶瓶', checked: false },
      { id: 'k18', text: '尖尖小被被', checked: false },
      { id: 'k19', text: '保溫杯', checked: false },
      { id: 'k20', text: '圈圈圍兜', checked: false },
      { id: 'k21', text: '帽子', checked: false },
      { id: 'k22', text: '護身符', checked: false },
      { id: 'k23', text: '布鞋', checked: false },
      { id: 'k24', text: '感冒藥水', checked: false },
      { id: 'k25', text: '退燒藥水', checked: false },
      
    ]
  },
  {
    id: 'meds',
    title: '常備藥品',
    items: [
      { id: 'm1', text: '暈車藥', checked: false },
      { id: 'm2', text: '保健食品', checked: false },
      { id: 'm3', text: '腸胃藥', checked: false },
      { id: 'm4', text: '感冒藥 / 退燒藥', checked: false },
      { id: 'm5', text: 'OK繃 / 外傷藥', checked: false },
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
