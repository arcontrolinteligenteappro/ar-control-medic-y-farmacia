import React, { useState } from 'react';
import { MedicalTab, Patient, Appointment } from '../types';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS, MOCK_DOCTORS } from '../constants';
import { 
  UserPlus, 
  Calendar, 
  FileText, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle,
  Stethoscope,
  Pill,
  Sparkles,
  Printer,
  ChevronRight
} from 'lucide-react';
import { analyzeSymptoms } from '../services/geminiService';

const MedicalModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MedicalTab>(MedicalTab.PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAIAnalysis = async () => {
    if (!symptoms) return;
    setIsAnalyzing(true);
    // Mocking patient history for the context
    const history = "Patient has a history of seasonal allergies and mild asthma.";
    const result = await analyzeSymptoms(symptoms, history);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const renderTabs = () => (
    <div className="flex overflow-x-auto gap-2 mb-6 border-b border-slate-200 pb-2">
      {[
        { id: MedicalTab.PATIENTS, label: 'Patients Directory', icon: UserPlus },
        { id: MedicalTab.APPOINTMENTS, label: 'Appointments', icon: Calendar },
        { id: MedicalTab.CONSULTATION, label: 'Consultation Room', icon: Stethoscope },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
            ${activeTab === tab.id 
              ? 'bg-teal-50 text-teal-700 border border-teal-200' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
          `}
        >
          <tab.icon size={16} />
          {tab.label}
        </button>
      ))}
    </div>
  );

  const renderPatientList = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Patient Records</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search name, ID..." 
            className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-500 font-medium">
          <tr>
            <th className="px-6 py-3">Patient Name</th>
            <th className="px-6 py-3">Contact</th>
            <th className="px-6 py-3">Last Visit</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_PATIENTS.map((patient) => (
            <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                    {patient.name.charAt(0)}
                  </div>
                  {patient.name}
                </div>
              </td>
              <td className="px-6 py-4 text-slate-500">{patient.phone}</td>
              <td className="px-6 py-4 text-slate-500">{patient.lastVisit}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => { setSelectedPatient(patient); setActiveTab(MedicalTab.CONSULTATION); }}
                  className="text-teal-600 hover:text-teal-800 font-medium"
                >
                  Start Consult
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Daily Schedule</h3>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2">
          <Calendar size={16} /> New Appointment
        </button>
      </div>
      <div className="grid gap-4">
        {MOCK_APPOINTMENTS.map((apt) => (
          <div key={apt.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex flex-col items-center justify-center border border-blue-100">
                <span className="text-xs font-bold uppercase">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-lg font-bold leading-none">{new Date(apt.date).getDate()}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{apt.patientName}</h4>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                  <Clock size={14} /> {apt.time}
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{MOCK_DOCTORS.find(d => d.id === apt.doctorId)?.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                apt.status === 'Completed' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                apt.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                'bg-red-50 text-red-600 border-red-200'
              }`}>
                {apt.status}
              </span>
              <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConsultation = () => {
    if (!selectedPatient) {
      return (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl border border-slate-200 border-dashed">
          <UserPlus size={48} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-600">No Patient Selected</h3>
          <p className="text-slate-400 text-sm mb-4">Select a patient from the directory to start a consultation.</p>
          <button 
            onClick={() => setActiveTab(MedicalTab.PATIENTS)}
            className="text-teal-600 font-medium hover:underline"
          >
            Go to Directory
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Left Col: Patient Info & History */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-600">
                {selectedPatient.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{selectedPatient.name}</h3>
                <p className="text-sm text-slate-500">ID: {selectedPatient.id} • {selectedPatient.dob}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                <p className="text-xs text-red-500 font-bold uppercase tracking-wide mb-1">Allergies</p>
                <p className="text-sm text-red-800 font-medium">
                  {selectedPatient.allergies.length > 0 ? selectedPatient.allergies.join(', ') : 'No known allergies'}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-700 text-sm mb-2">Vitals (Last Visit)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-slate-400 text-xs">BP</span>
                    <span className="font-medium">120/80</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="block text-slate-400 text-xs">Weight</span>
                    <span className="font-medium">70 kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Consultation Form */}
        <div className="lg:col-span-2 space-y-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <FileText size={20} className="text-teal-500" /> Clinical Note
              </h3>
              <span className="text-xs text-slate-400">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subjective (Symptoms)</label>
                <textarea 
                  className="w-full h-32 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none text-sm"
                  placeholder="Patient complains of..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                ></textarea>
                <div className="mt-2 flex justify-end">
                   <button 
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing || !symptoms}
                    className="flex items-center gap-2 text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                   >
                     <Sparkles size={14} />
                     {isAnalyzing ? 'Analyzing with Gemini...' : 'AI Analysis Assistant'}
                   </button>
                </div>
                {aiAnalysis && (
                  <div className="mt-3 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl text-sm text-slate-700 whitespace-pre-wrap">
                    <h5 className="font-bold text-indigo-800 mb-2 flex items-center gap-2"><Sparkles size={14}/> Gemini Insight</h5>
                    {aiAnalysis}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Objective (Findings)</label>
                   <textarea className="w-full h-24 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none text-sm"></textarea>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Assessment (Diagnosis)</label>
                   <textarea className="w-full h-24 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none text-sm"></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plan (Treatment & Rx)</label>
                 <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <div className="flex gap-2 mb-3">
                      <input type="text" placeholder="Search medication database..." className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                      <button className="bg-slate-200 text-slate-700 px-4 rounded-lg font-medium text-sm hover:bg-slate-300">+</button>
                    </div>
                    <div className="space-y-2">
                       {/* Mock Rx Item */}
                       <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                          <div className="flex items-center gap-3">
                             <div className="bg-teal-100 p-2 rounded text-teal-600"><Pill size={16}/></div>
                             <div>
                                <p className="text-sm font-bold text-slate-800">Amoxicillin 500mg</p>
                                <p className="text-xs text-slate-500">1 tablet every 8 hours for 7 days</p>
                             </div>
                          </div>
                          <button className="text-red-400 hover:text-red-600"><XCircle size={18} /></button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200">
                   <Printer size={16} /> Print Prescription
                </button>
                <button 
                  className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-bold hover:bg-teal-700 shadow-lg shadow-teal-200"
                  onClick={() => {
                    alert("Consultation saved successfully!");
                    setSymptoms('');
                    setAiAnalysis('');
                  }}
                >
                   <CheckCircle size={16} /> Finalize Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      {renderTabs()}
      {activeTab === MedicalTab.PATIENTS && renderPatientList()}
      {activeTab === MedicalTab.APPOINTMENTS && renderAppointments()}
      {activeTab === MedicalTab.CONSULTATION && renderConsultation()}
    </div>
  );
};

export default MedicalModule;
