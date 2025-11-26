
import { DayPlan, ActivityType, DeploymentStep } from './types';

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
        location: "宜蘭張美阿嬤農場" // 預設導航點
      },
      {
        time: "17:00",
        title: "飯店 Check-in",
        description: "建議住 礁溪 (泡溫泉) 或 宜蘭市/羅東。",
        type: ActivityType.Hotel,
        location: "礁溪溫泉公園" // 示意導航點
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

export const DEPLOYMENT_STEPS: DeploymentStep[] = [
  {
    title: "1. 註冊 Vercel 帳號",
    content: "前往 vercel.com，點擊 'Sign Up'。強烈建議選擇 'Continue with GitHub'，這樣可以直接連結你的儲存庫，最方便。"
  },
  {
    title: "2. 新增專案 (Add New Project)",
    content: "登入後，在 Dashboard 頁面點擊右側的 'Add New...' 按鈕，然後選擇 'Project'。"
  },
  {
    title: "3. 匯入 Git 儲存庫",
    content: "你會看到 'Import Git Repository' 的列表。找到你的專案 'family-trip-2024'，點擊旁邊的 'Import' 按鈕。"
  },
  {
    title: "4. 設定專案 (Configure Project)",
    content: "Framework Preset (框架預設值)：Vercel 通常會自動偵測。如果沒有，請選擇 'Create React App' 或 'Vite' (因為我們是用 React)。Root Directory 保持預設即可。"
  },
  {
    title: "5. 點擊 Deploy",
    content: "點擊藍色的 'Deploy' 按鈕。Vercel 會開始自動建置你的網站，這大約需要 1-2 分鐘。"
  },
  {
    title: "6. 完成與故障排除 (重要！)",
    content: "如果打開網頁出現「登入畫面 (Vercel Authentication)」，請這樣做：回到 Vercel 專案設定 -> Settings -> Deployment Protection -> 將 'Vercel Authentication' 設為 Disabled (關閉) -> 點擊 Save。這樣家人就可以直接看到網頁囉！"
  }
];
