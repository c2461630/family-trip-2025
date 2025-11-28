
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Coffee, Car, Moon, Camera, Info, ExternalLink, 
  ChevronDown, ChevronUp, CheckCircle, Smartphone, Navigation,
  Sun, Cloud, CloudRain, Wind, Plus, Trash2, Wallet, PieChart,
  CloudLightning, WifiOff, Pencil, Save, X, BedDouble,
  Luggage, CheckSquare, Square, Briefcase, Shirt, Plug, Baby, Pill, User
} from 'lucide-react';
import { TRIP_DATA, DEPLOYMENT_STEPS, FIREBASE_CONFIG, ACCOMMODATION_DATA, DEFAULT_PACKING_LIST } from './constants';
import { Activity, ActivityType, DayPlan, WeatherInfo, Expense, PackingCategory } from './types';

// We will load these dynamically to avoid build errors
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';

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

// --- Packing List Component ---

const PackingListChecklist = () => {
  const [list, setList] = useState<PackingCategory[]>(DEFAULT_PACKING_LIST);
  
  useEffect(() => {
    const saved = localStorage.getItem('packing_list_v2');
    if (saved) {
      try {
        setList(JSON.parse(saved));
      } catch (e) {
        setList(DEFAULT_PACKING_LIST);
      }
    }
  }, []);

  const toggleItem = (categoryId: string, itemId: string) => {
    const newList = list.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => {
          if (item.id !== itemId) return item;
          return { ...item, checked: !item.checked };
        })
      };
    });
    setList(newList);
    localStorage.setItem('packing_list_v2', JSON.stringify(newList));
  };

  const resetList = () => {
    if (confirm("確定要重置所有勾選狀態嗎？")) {
      setList(DEFAULT_PACKING_LIST);
      localStorage.setItem('packing_list_v2', JSON.stringify(DEFAULT_PACKING_LIST));
    }
  };

  const calculateProgress = () => {
    let total = 0;
    let checked = 0;
    list.forEach(cat => {
      cat.items.forEach(item => {
        total++;
        if (item.checked) checked++;
      });
    });
    return total === 0 ? 0 : Math.round((checked / total) * 100);
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'docs': return <Briefcase className="w-5 h-5" />;
      case 'clothes': return <Shirt className="w-5 h-5" />;
      case 'tech': return <Plug className="w-5 h-5" />;
      case 'toiletries': return <User className="w-5 h-5" />;
      case 'kids': return <Baby className="w-5 h-5" />;
      case 'meds': return <Pill className="w-5 h-5" />;
      default: return <Luggage className="w-5 h-5" />;
    }
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Luggage className="w-6 h-6" />
            行李清單
          </h2>
          <button onClick={resetList} className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30">
            重置
          </button>
        </div>
        <p className="text-pink-100 opacity-90 mb-4 text-sm">
          出發前檢查一下，什麼都別漏帶囉！
        </p>
        <div className="w-full bg-black/20 rounded-full h-2.5">
          <div className="bg-white h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-right text-xs mt-1 font-bold">{progress}% 完成</div>
      </div>

      <div className="grid gap-4">
        {list.map(category => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2 font-bold text-gray-700">
              {getCategoryIcon(category.id)}
              {category.title}
            </div>
            <div className="divide-y divide-gray-50">
              {category.items.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleItem(category.id, item.id)}
                  className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className={`flex-shrink-0 transition-colors ${item.checked ? 'text-green-500' : 'text-gray-300'}`}>
                    {item.checked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  </div>
                  <span className={`text-sm ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Accommodation List Component ---

const AccommodationList = () => {
  const openMap = (location: string) => {
    const encodedLocation = encodeURIComponent(`台灣 ${location}`);
    window.open(`http://maps.apple.com/?q=${encodedLocation}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <BedDouble className="w-6 h-6" />
          住宿資訊
        </h2>
        <p className="text-indigo-50 opacity-90">
          四個晚上的落腳處，點擊導航可直接前往。
        </p>
      </div>

      <div className="space-y-4">
        {ACCOMMODATION_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <span className="text-indigo-700 font-bold text-xs">{item.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
              <button 
                onClick={() => openMap(item.location)}
                className="flex items-center gap-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                導航
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{item.location}</span>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded border border-gray-100">
                <div className="text-gray-400 mb-0.5">入住/退房</div>
                <div className="font-semibold text-gray-700">
                  {item.checkIn || '15:00'} / {item.checkOut || '11:00'}
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-100">
                <div className="text-gray-400 mb-0.5">訂房代號</div>
                <div className="font-semibold text-gray-700">
                  {item.bookingId || '-'}
                </div>
              </div>
            </div>
            
            {item.note && (
              <div className="text-xs text-indigo-600 font-medium px-1">
                💡 {item.note}
              </div>
            )}
          </div>
        ))}
      </div>
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
  const [newItem, setNewItem] = useState<{title: string, amount: string, category: Expense['category'], payer: string}>({ title: '', amount: '', category: 'food', payer: '爸爸' });
  const [isFirebaseMode, setIsFirebaseMode] = useState(false);
  const [fbFunctions, setFbFunctions] = useState<any>(null);

  // Edit Mode States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Expense>>({});

  // Initialize Data Source (Firebase OR LocalStorage)
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    // Check if Firebase config is present and valid
    if (FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId) {
      const initFirebase = async () => {
        try {
          // DYNAMIC IMPORT: This prevents build tools from failing
          // @ts-ignore
          const { initializeApp } = await import('firebase/app');
          // @ts-ignore
          const { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, updateDoc } = await import('firebase/firestore');

          // Prevent race condition if component unmounted
          if (!isMounted) return;

          const app = initializeApp(FIREBASE_CONFIG);
          const firestore = getFirestore(app);
          
          setFbFunctions({ db: firestore, collection, addDoc, deleteDoc, doc, updateDoc });
          setIsFirebaseMode(true);

          // Subscribe to real-time updates
          const q = query(collection(firestore, "expenses"), orderBy("dateTimestamp", "desc"));
          
          // @ts-ignore
          unsubscribe = onSnapshot(q, (snapshot: any) => {
            if (!isMounted) return;
            const loadedExpenses: Expense[] = snapshot.docs.map((doc: any) => ({
              id: doc.id,
              ...doc.data()
            } as Expense));
            setExpenses(loadedExpenses);
          });
        } catch (error) {
          console.error("Firebase init failed or modules not found:", error);
          if (isMounted) loadFromLocal();
        }
      };
      
      initFirebase();
    } else {
      loadFromLocal();
    }

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
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

  // --- Edit Functions ---

  const startEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditForm({ ...expense });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    // Strict check to ensure all required fields are present
    if (!editForm.title || !editForm.amount || !editForm.category || !editForm.payer) return;

    const updatedData = {
      title: editForm.title,
      amount: Number(editForm.amount),
      // Fix: Type assertion to tell TS we know what we are doing
      category: editForm.category as Expense['category'],
      payer: editForm.payer as string,
    };

    if (isFirebaseMode && fbFunctions) {
      // Update Cloud
      const docRef = fbFunctions.doc(fbFunctions.db, "expenses", id);
      await fbFunctions.updateDoc(docRef, updatedData);
    } else {
      // Update Local
      const updated = expenses.map(ex => 
        ex.id === id ? { ...ex, ...updatedData } : ex
      );
      setExpenses(updated);
      localStorage.setItem('trip_expenses', JSON.stringify(updated));
    }

    setEditingId(null);
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  // Statistics Calculation
  const statsByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const statsByPayer = expenses.reduce((acc, curr) => {
    acc[curr.payer] = (acc[curr.payer] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);


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
            <span className="flex items-center gap-1 text-xs bg-black/20 px-2 py-1 rounded-full animate-pulse">
              <CloudLightning className="w-3 h-3" /> 已雲端同步
            </span>
          ) : (
             <span className="flex items-center gap-1 text-xs bg-black/20 px-2 py-1 rounded-full">
              <WifiOff className="w-3 h-3" /> 僅本機儲存
            </span>
          )}
        </div>
        <div className="text-4xl font-bold mb-4">
          ${totalAmount.toLocaleString()}
        </div>
        
        {/* Statistics Bars */}
        {expenses.length > 0 && (
          <div className="bg-black/10 rounded-xl p-3 backdrop-blur-sm text-xs space-y-3">
             {/* Payer Stats */}
             <div className="flex gap-2">
               {Object.entries(statsByPayer).map(([payer, amount]) => (
                  <div key={payer} className="flex-1 bg-white/20 rounded p-1.5 text-center">
                    <div className="opacity-75 mb-0.5">{payer}</div>
                    <div className="font-bold">${amount.toLocaleString()}</div>
                  </div>
               ))}
             </div>
             {/* Category Viz */}
             <div className="flex h-2 rounded-full overflow-hidden bg-white/20">
                {Object.entries(statsByCategory).map(([cat, amount]) => (
                  <div 
                    key={cat} 
                    style={{ width: `${(amount / totalAmount) * 100}%` }}
                    className={`h-full ${
                      cat === 'food' ? 'bg-orange-300' :
                      cat === 'transport' ? 'bg-blue-300' :
                      cat === 'stay' ? 'bg-indigo-300' :
                      cat === 'play' ? 'bg-green-300' : 'bg-gray-300'
                    }`}
                  />
                ))}
             </div>
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
                onClick={() => setNewItem({...newItem, category: cat as Expense['category']})}
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
            <div 
              key={expense.id} 
              className={`p-3 rounded-xl shadow-sm border transition-all ${
                editingId === expense.id 
                  ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300' 
                  : 'bg-white border-gray-100'
              }`}
            >
              {editingId === expense.id ? (
                // --- Edit Mode ---
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-blue-800 font-bold text-sm bg-blue-50 p-2 rounded">
                    <span>✏️ 正在編輯此項目</span>
                    <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                      <label className="text-xs text-gray-500 ml-1">項目名稱</label>
                      <input 
                        type="text" 
                        value={editForm.title} 
                        onChange={e => setEditForm({...editForm, title: e.target.value})}
                        className="w-full p-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        placeholder="項目名稱"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 ml-1">金額</label>
                      <input 
                        type="number" 
                        value={editForm.amount} 
                        onChange={e => setEditForm({...editForm, amount: Number(e.target.value)})}
                        className="w-full p-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        placeholder="金額"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 ml-1">付款人</label>
                      <select 
                        value={editForm.payer} 
                        onChange={e => setEditForm({...editForm, payer: e.target.value})}
                        className="w-full p-2 border border-blue-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500"
                      >
                         <option value="爸爸">爸爸</option>
                         <option value="媽媽">媽媽</option>
                         <option value="公費">公費</option>
                      </select>
                    </div>
                    <div className="col-span-2 flex gap-1 overflow-x-auto pb-1 pt-1">
                      {['food', 'transport', 'stay', 'play', 'other'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setEditForm({...editForm, category: cat as Expense['category']})}
                          className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap border font-medium ${
                            editForm.category === cat 
                              ? 'bg-blue-600 text-white border-blue-600' 
                              : 'bg-white text-gray-500 border-gray-200'
                          }`}
                        >
                          {getCategoryLabel(cat)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                     <button 
                      onClick={() => saveEdit(expense.id)}
                      className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                    >
                      <Save className="w-4 h-4" /> 儲存
                    </button>
                     <button 
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-200 flex items-center justify-center gap-1 shadow-sm active:scale-[0.98]"
                    >
                      <X className="w-4 h-4" /> 取消
                    </button>
                  </div>
                </div>
              ) : (
                // --- View Mode ---
                <div className="flex items-center justify-between">
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
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-gray-900 font-mono text-lg">
                      ${expense.amount.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => startEdit(expense)}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold hover:bg-blue-100 border border-blue-100 flex items-center gap-1"
                      >
                        <Pencil className="w-3 h-3" /> 編輯
                      </button>
                      <button 
                        onClick={() => removeExpense(expense.id)}
                        className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-bold hover:bg-red-100 border border-red-100 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> 刪除
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'accommodation' | 'packing' | 'expense' | 'deploy'>('itinerary');

  return (
    <div className="min-h-screen pb-12 max-w-md mx-auto sm:max-w-2xl bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Family Trip 2024 v3.0
          </h1>
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
            5 Days
          </span>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-lg overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 py-2 px-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'itinerary' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            行程
          </button>
          <button
            onClick={() => setActiveTab('accommodation')}
            className={`flex-1 py-2 px-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'accommodation' 
                ? 'bg-white text-indigo-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            住宿
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`flex-1 py-2 px-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'packing' 
                ? 'bg-white text-pink-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            行李
          </button>
          <button
            onClick={() => setActiveTab('expense')}
            className={`flex-1 py-2 px-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'expense' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            記帳
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-2 px-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
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

        {activeTab === 'accommodation' && (
          <div className="animate-fade-in">
            <AccommodationList />
          </div>
        )}

        {activeTab === 'packing' && (
          <div className="animate-fade-in">
            <PackingListChecklist />
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
