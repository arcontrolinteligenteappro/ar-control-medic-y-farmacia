import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MedicalModule from './components/MedicalModule';
import PharmacyModule from './components/PharmacyModule';
import { ModuleType } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (currentModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.MEDICAL:
        return <MedicalModule />;
      case ModuleType.PHARMACY:
        return <PharmacyModule />;
      case ModuleType.REPORTS:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-600 mb-2">Reports Module</h3>
              <p>Detailed financial and medical reports would go here.</p>
            </div>
          </div>
        );
      case ModuleType.ADMIN:
        return (
           <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-600 mb-2">System Administration</h3>
              <p>User roles, permissions, and system config would go here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentModule={currentModule} 
        setModule={setCurrentModule} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 p-4 md:hidden flex justify-between items-center z-10">
          <div className="font-bold text-slate-800">PharmaClic</div>
          <button onClick={toggleSidebar} className="text-slate-600">
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
