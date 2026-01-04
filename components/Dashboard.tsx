import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Users, DollarSign, PackageAlert, CalendarCheck } from 'lucide-react';
import { SALES_DATA } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Executive Overview</h2>
          <p className="text-slate-500">Welcome back, Administrator.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
             <span className="w-2 h-2 bg-green-500 rounded-full"></span> System Online
           </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Sales (Today)', value: '$2,450.00', icon: DollarSign, color: 'bg-blue-500' },
          { title: 'Appointments', value: '12 Scheduled', icon: CalendarCheck, color: 'bg-teal-500' },
          { title: 'Active Patients', value: '1,234', icon: Users, color: 'bg-indigo-500' },
          { title: 'Low Stock Alerts', value: '3 Products', icon: PackageAlert, color: 'bg-red-500' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg shadow-gray-200`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
              <h3 className="text-xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Pharmacy Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="sales" fill="#0f766e" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Medical Consultations Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="consultations" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
            <h4 className="font-bold text-lg mb-2">New Consultation</h4>
            <p className="text-teal-100 text-sm mb-4">Start a new clinical session directly.</p>
            <button className="bg-white text-teal-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-50 transition-colors">Start Now</button>
         </div>
         <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <h4 className="font-bold text-lg mb-2">Pharmacy POS</h4>
            <p className="text-blue-100 text-sm mb-4">Open the point of sale terminal.</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">Open Register</button>
         </div>
         <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl p-6 text-white shadow-lg">
            <h4 className="font-bold text-lg mb-2">Inventory Audit</h4>
            <p className="text-slate-300 text-sm mb-4">3 items expiring within 30 days.</p>
            <button className="bg-white text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">View Items</button>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
