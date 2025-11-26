import React, { useState } from 'react';
import { MapPin, Coffee, Car, Moon, Camera, Info, ExternalLink, ChevronDown, ChevronUp, CheckCircle, Smartphone } from 'lucide-react';
import { TRIP_DATA, DEPLOYMENT_STEPS } from './constants';
import { Activity, ActivityType, DayPlan } from './types';

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

const ActivityItem: React.FC<{ activity: Activity; isLast: boolean }> = ({ activity, isLast }) => {
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
          <h4 className="font-bold text-gray-900 text-lg mb-1">{activity.title}</h4>
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
            {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-gray-400" />}
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'deploy'>('itinerary');

  return (
    <div className="min-h-screen pb-12 max-w-md mx-auto sm:max-w-2xl bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
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
            行程表
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'deploy' 
                ? 'bg-white text-green-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            部署教學
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {activeTab === 'itinerary' ? (
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
        ) : (
          <div className="animate-fade-in">
            <DeploymentGuide />
          </div>
        )}
      </main>
    </div>
  );
}
