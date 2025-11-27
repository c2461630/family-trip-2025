
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Coffee, Car, Moon, Camera, Info, ExternalLink, 
  ChevronDown, ChevronUp, CheckCircle, Smartphone, Navigation,
  Sun, Cloud, CloudRain, Wind, Plus, Trash2, Wallet, PieChart,
  CloudLightning, WifiOff
} from 'lucide-react';
import { TRIP_DATA, DEPLOYMENT_STEPS, FIREBASE_CONFIG } from './constants';
import { Activity, ActivityType, DayPlan, WeatherInfo, Expense } from './types';

// We will load these dynamically to avoid build errors
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

// --- Icons Components ---

const ActivityIcon = ({ type }: { type: ActivityType }) => {
  switch (type) {
    case ActivityType.Drive:
      return <Car className="w-5 h-5 text-blue-500" />;
    case ActivityType.Food:
      return <Coffee className="w-5 h-5 text-orange-500" />;
    case ActivityType.Activity:
      return <Camera className="w-5 h-5 text-green-500" />;
    case ActivityType.Hotel:
      return <Moon className="w-5 h-5 text-indigo-500" />;
    case ActivityType.Rest:
      return <MapPin className="w-5 h-5 text-gray-500" />;
    default:
      return <Info className="w-5 h-5 text-gray-400" />;
  }
};

const WeatherIcon = ({ type }: { type: WeatherInfo['type'] }) => {
  switch (type) {
    case 'sunny':
      return <Sun className="w-6 h-6 text-yellow-400" />;
    case 'cloudy':
      return <Cloud className="w-6 h-6 text-gray-200" />;
    case 'rain':
      return <CloudRain className="w-6 h-6 text-blue-300" />;
    case 'windy':
      return <Wind className="w-6 h-6 text-gray-300" />;
    default:
      return <Sun className="w-6 h-6 text-yellow-400" />;
  }
};

// --- Sub Components ---

const ActivityItem: React.FC<{ activity: Activity; isLast: boolean }> = ({ activity, isLast }) => {
  const openMap = (location: string) => {
    // Force open Apple Maps with the specific query
    const encodedLocation = encodeURIComponent(`台灣 ${location}`);
    window.open(`http://maps.apple.com/?q=${encodedLocation}`, '_blank');
  };

  return (
    <div className="relative pl-8 pb-8">
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gray-200" />
      )}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10">
        <ActivityIcon type={activity.type} />
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
        <span className="font-mono text-sm font-semibold text-gray-500 min-w-[3rem] pt-0.5">
          {activity.time}
        </span>
        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-bold text-gray-900 text-lg mb-1">{activity.title}</h4>
            
            {activity.location && (
              <button 
                onClick={() => openMap(activity.location!)}
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors active:scale-95"
              >
                <Navigation className="w-3 h-3" />
                導航
              </button>
            )}
          </div>

          {activity.location && (
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              {activity.location}
            </div>
          )}
          {activity.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-2">
              {activity.description}
            </p>
          )}
          
          {/* Render Options if available (for Day 1 & Day 3) */}
          {activity.options && (
            <div className="mt-3 grid grid-cols-1 gap-3">
              {activity.options.map((opt, idx) => (
                <div key={idx} className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <div className="font-semibold text-blue-800 text-sm mb-1">{opt.title}</div>
                  <div className="text-blue-600 text-xs">{opt.description}</div>
                </div>
              ))}
            </div>
          )}

          {activity.tips && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-semibold text-orange-600 mb-1">小撇步：</p>
              <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                {activity.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DayCard: React.FC<{ day: DayPlan }> = ({ day }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6 last:mb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
      >
        <div className={`p-4 ${isOpen ? 'bg-blue-600' : 'bg-white'} transition-colors duration-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${isOpen ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                <span className="text-xs font-medium uppercase">{day.weekday}</span>
                <span className="text-lg font-bold">{day.date}</span>
              </div>
              <div className="text-left">
                <h3 className={`font-bold text-lg ${isOpen ? 'text-white' : 'text-gray-900'}`}>
                  Day {day.id}
                </h3>
                <p className={`text-sm ${isOpen ? 'text-blue-100' : 'text-gray-500'}`}>
                  {day.route}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Weather Info */}
              <div className={`flex flex-col items-end text-xs ${isOpen ? 'text-blue-100' : 'text-gray-500'}`}>
                <div className="flex items-center gap-1">
                  <WeatherIcon type={day.weather.type} />
                  <span className="font-bold text-sm">{day.weather.temp}</span>
                </div>
                <span>{day.weather.desc}</span>
              </div>
              {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-gray-400" />}
            </div>
          </div>
          
          {isOpen && (
            <div className="mt-3 pt-3 border-t border-white/20 text-left">
              <span className="inline-block px-2 py-1 rounded bg-white/20 text-xs text-white backdrop-blur-sm">
                今日重點：{day.theme}
              </span>
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 px-2">
          {day.activities.map((activity, index) => (
            <ActivityItem 
              key={index} 
              activity={activity} 
              isLast={index === day.activities.length - 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DeploymentGuide = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <ExternalLink className="w-6 h-6" />
          部署到 Vercel
        </h2>
        <p className="text-green-50 opacity-90">
          按照以下步驟，將這份行程表變成家人手機裡的專屬 APP！
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-8">
          {DEPLOYMENT_STEPS.map((step, index) => (
            <div key={index} className="relative pl-10">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm border border-green-200">
                {index + 1}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base bg-gray-50 p-4 rounded-lg border border-gray-100">
                {step.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
            <Smartphone className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-yellow-800 text-sm mb-1">手機瀏覽小技巧</h4>
              <p className="text-yellow-700 text-xs">
                部署完成後，在手機瀏覽器打開網址，選擇「分享」&gt;「加入主畫面」，就能像原生 APP 一樣使用了！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Expense Tracker Component ---

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newItem, setNewItem] = useState({ title: '', amount: '', category: 'food', payer: '爸爸' });
  const [isFirebaseMode, setIsFirebaseMode] = useState(false);
  // Store Firebase functions in ref or state to use them later
  const [fbFunctions, setFbFunctions] = useState<any>(null);

  // Initialize Data Source (Firebase OR LocalStorage)
  useEffect(() => {
    // Check if Firebase config is present and valid
    if (FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId) {
      const initFirebase = async () => {
        try {
          // DYNAMIC IMPORT: This prevents build tools from failing
          // @ts-ignore
          const { initializeApp } = await import('firebase/app');
          // @ts-ignore
          const { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } = await import('firebase/firestore');

          const app = initializeApp(FIREBASE_CONFIG);
          const firestore = getFirestore(app);
          
          setFbFunctions({ db: firestore, collection, addDoc, deleteDoc, doc });
          setIsFirebaseMode(true);

          // Subscribe to real-time updates
          const q = query(collection(firestore, "expenses"), orderBy("dateTimestamp", "desc"));
          
          // @ts-ignore
          const unsubscribe = onSnapshot(q, (snapshot: any) => {
            const loadedExpenses: Expense[] = snapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data()
            } as Expense));
            setExpenses(loadedExpenses);
          });

          return () => unsubscribe();
        } catch (error) {
          console.error("Firebase init failed or modules not found:", error);
          loadFromLocal();
        }
      };
      
      initFirebase();
    } else {
      loadFromLocal();
    }
  }, []);

  const loadFromLocal = () => {
    setIsFirebaseMode(false);
    const saved = localStorage.getItem('trip_expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  };

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.amount) return;

    const expenseData = {
      title: newItem.title,
      amount: Number(newItem.amount),
      category: newItem.category,
      payer: newItem.payer,
      date: new Date().toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' }),
      dateTimestamp: Date.now() // for sorting
    };

    if (isFirebaseMode && fbFunctions) {
      // Add to Cloud
      await fbFunctions.addDoc(fbFunctions.collection(fbFunctions.db, "expenses"), expenseData);
    } else {
      // Add to Local
      const newExpense = { ...expenseData, id: Date.now().toString() } as Expense;
      const updated = [newExpense, ...expenses];
      setExpenses(updated);
      localStorage.setItem('trip_expenses', JSON.stringify(updated));
    }

    setNewItem({ title: '', amount: '', category: 'food', payer: '爸爸' });
  };

  const removeExpense = async (id: string) => {
    if (!confirm('確定要刪除這筆款項嗎？')) return;

    if (isFirebaseMode && fbFunctions) {
      // Delete from Cloud
      await fbFunctions.deleteDoc(fbFunctions.doc(fbFunctions.db, "expenses", id));
    } else {
      // Delete from Local
      const updated = expenses.filter(ex => ex.id !== id);
      setExpenses(updated);
      localStorage.setItem('trip_expenses', JSON.stringify(updated));
    }
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  const getCategoryLabel = (cat: string) => {
    const map: Record<string, string> = { food: '餐飲', transport: '交通', stay: '住宿', play: '娛樂', other: '其他' };
    return map[cat] || cat;
  };

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = { 
      food: 'bg-orange-100 text-orange-700', 
      transport: 'bg-blue-100 text-blue-700', 
      stay: 'bg-indigo-100 text-indigo-700', 
      play: 'bg-green-100 text-green-700', 
      other: 'bg-gray-100 text-gray-700' 
    };
    return map[cat] || 'bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className={`rounded-2xl p-6 text-white shadow-lg transition-colors ${isFirebaseMode ? 'bg-gradient-to-r from-orange-500 to-pink-600' : 'bg-gradient-to-r from-emerald-500 to-teal-600'}`}>
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-medium opacity-90 flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            目前總花費
          </h2>
          {isFirebaseMode ? (
            <span className="flex items-center gap-1 text-xs bg-black/20 px-2 py-1 rounded-full">
              <CloudLightning className="w-3 h-3" /> 已雲端同步
            </span>
          ) : (
             <span className="flex items-center gap-1 text-xs bg-black/20 px-2 py-1 rounded-full">
              <WifiOff className="w-3 h-3" /> 僅本機儲存
            </span>
          )}
        </div>
        <div className="text-4xl font-bold">
          ${totalAmount.toLocaleString()}
        </div>
        {!isFirebaseMode && (
          <div className="mt-2 text-xs opacity-75">
            設定 Firebase 可開啟多人同步 (詳見教學)
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={addExpense} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 bg-gray-900 text-white rounded-full p-0.5" />
          新增款項
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="col-span-2">
            <input
              type="text"
              placeholder="項目名稱 (例如: 午餐)"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={newItem.title}
              onChange={e => setNewItem({...newItem, title: e.target.value})}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="金額"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newItem.amount}
              onChange={e => setNewItem({...newItem, amount: e.target.value})}
              required
            />
          </div>
          <div>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg bg-white outline-none"
              value={newItem.payer}
              onChange={e => setNewItem({...newItem, payer: e.target.value})}
            >
              <option value="爸爸">爸爸</option>
              <option value="媽媽">媽媽</option>
              <option value="公費">公費</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-2 overflow-x-auto pb-1">
            {['food', 'transport', 'stay', 'play', 'other'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewItem({...newItem, category: cat})}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  newItem.category === cat 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full bg-gray-900 hover:bg-black text-white py-2.5 rounded-lg font-medium transition-colors active:scale-[0.98]"
        >
          新增紀錄
        </button>
      </form>

      {/* Expense List */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-700 px-1">消費紀錄</h3>
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
            <PieChart className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">目前還沒有記帳資料</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                  {expense.category === 'food' && <Coffee className="w-5 h-5" />}
                  {expense.category === 'transport' && <Car className="w-5 h-5" />}
                  {expense.category === 'stay' && <Moon className="w-5 h-5" />}
                  {expense.category === 'play' && <Camera className="w-5 h-5" />}
                  {expense.category === 'other' && <Wallet className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{expense.title}</div>
                  <div className="text-xs text-gray-500 flex gap-2">
                    <span>{expense.date}</span>
                    <span>•</span>
                    <span>{expense.payer}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 font-mono text-lg">
                  ${expense.amount.toLocaleString()}
                </span>
                <button 
                  onClick={() => removeExpense(expense.id)}
                  className="text-gray-300 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'expense' | 'deploy'>('itinerary');

  return (
    <div className="min-h-screen pb-12 max-w-md mx-auto sm:max-w-2xl bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Family Trip 2024
          </h1>
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            5 Days
          </span>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'itinerary' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            行程
          </button>
          <button
            onClick={() => setActiveTab('expense')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'expense' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            記帳
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'deploy' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            教學
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {activeTab === 'itinerary' && (
          <div className="animate-fade-in">
            <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">山海親子慢活之旅</h2>
                  <p className="text-blue-100 text-sm opacity-90">
                    台南 ➔ 宜蘭 ➔ 花蓮 ➔ 台東 ➔ 溫暖的家
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {TRIP_DATA.map((day) => (
              <DayCard key={day.id} day={day} />
            ))}
            
            <div className="text-center mt-12 mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-gray-100">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600 font-medium">祝旅途愉快！</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'expense' && (
          <div className="animate-fade-in">
            <ExpenseTracker />
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="animate-fade-in">
            <DeploymentGuide />
          </div>
        )}
      </main>
    </div>
  );
}
