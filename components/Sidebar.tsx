import React from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  ShoppingBag, 
  Settings, 
  BarChart3, 
  LogOut,
  Activity
} from 'lucide-react';
import { ModuleType } from '../types';

interface SidebarProps {
  currentModule: ModuleType;
  setModule: (module: ModuleType) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, setModule, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: ModuleType.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ModuleType.MEDICAL, label: 'Medical Office', icon: Stethoscope },
    { id: ModuleType.PHARMACY, label: 'Pharmacy POS', icon: ShoppingBag },
    { id: ModuleType.REPORTS, label: 'Reports', icon: BarChart3 },
    { id: ModuleType.ADMIN, label: 'Admin', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-teal-500 p-2 rounded-lg">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">PharmaClic</h1>
            <p className="text-xs text-slate-400">& MEDIC</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setModule(item.id);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${currentModule === item.id 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
          <div className="mt-4 px-4">
            <p className="text-xs text-slate-600 text-center">v2.4.0 (Build 2024)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
