import React, { useState } from 'react';
import { 
  Terminal, ShieldAlert, Key, Users, Server, Database, Settings, RefreshCw, 
  Download, Upload, Eye, EyeOff, Lock, Unlock, Zap, CheckCircle2, AlertTriangle, 
  Activity, Globe, Phone, MapPin, Sliders, LogOut, UserCheck, UserPlus, Cpu, HardDrive
} from 'lucide-react';
import { HIDDEN_ROOT_ACCOUNTS } from '../data/mockData';

export default function DeveloperDashboard({ 
  gymDetails, 
  setGymDetails, 
  members, 
  setMembers, 
  transactions, 
  setTransactions, 
  leads, 
  setLeads, 
  posts,
  setPosts,
  currentUser,
  setCurrentUser,
  setActiveRole, 
  setCurrentView,
  onExitDevDesk 
}) {
  const [activeTab, setActiveTab] = useState('config'); // 'config' | 'audit' | 'staff' | 'db-health'

  // Tab 1: Global System Branding State
  const [brandingForm, setBrandingForm] = useState({
    name: gymDetails?.name || 'Energie Fitness',
    tagline: gymDetails?.tagline || "Bulandshahr's Premier High-Tech Health Club",
    domain: 'energie-fitness.dhruvii.dev',
    phone: gymDetails?.phone || '+91 83848 55909',
    whatsapp: gymDetails?.whatsapp || '918384855909',
    address: gymDetails?.address || 'Shikarpur Bypass Rd, Faislabad',
    city: gymDetails?.city || 'Bulandshahr',
    primaryColor: '#eab308' // Yellow accent
  });
  const [configToast, setConfigToast] = useState('');

  // Tab 2: Security & Credentials State
  const [showPasswords, setShowPasswords] = useState({});
  const [auditSearch, setAuditSearch] = useState('');

  // Tab 3: Staff & Permissions Matrix State
  const [staffAccounts, setStaffAccounts] = useState([
    {
      id: 'STAFF-01',
      name: 'Ravi (Gym Owner)',
      username: 'ravi',
      role: 'GYM_OWNER',
      permissions: { canViewRevenue: true, canAddDeleteMembers: true, canEditPricing: true, canAccessQr: true, canSendSms: true }
    },
    {
      id: 'STAFF-02',
      name: 'Amit Sharma (Senior Trainer)',
      username: 'amit_trainer',
      role: 'HEAD_TRAINER',
      permissions: { canViewRevenue: false, canAddDeleteMembers: true, canEditPricing: false, canAccessQr: true, canSendSms: true }
    },
    {
      id: 'STAFF-03',
      name: 'Priya Verma (Front Desk)',
      username: 'priya_reception',
      role: 'RECEPTIONIST',
      permissions: { canViewRevenue: false, canAddDeleteMembers: true, canEditPricing: false, canAccessQr: true, canSendSms: false }
    }
  ]);

  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    username: '',
    role: 'RECEPTIONIST',
    canViewRevenue: false,
    canAddDeleteMembers: true,
    canEditPricing: false,
    canAccessQr: true,
    canSendSms: false
  });

  // Tab 4: System Health & DB State
  const [dbToast, setDbToast] = useState('');
  const [impersonateToast, setImpersonateToast] = useState('');

  // Handlers for Branding Updates
  const handleSaveBranding = (e) => {
    e.preventDefault();
    setGymDetails(prev => ({
      ...prev,
      name: brandingForm.name,
      tagline: brandingForm.tagline,
      phone: brandingForm.phone,
      whatsapp: brandingForm.whatsapp,
      address: brandingForm.address,
      city: brandingForm.city
    }));
    setConfigToast('System branding parameters updated across platform!');
    setTimeout(() => setConfigToast(''), 4000);
  };

  // Handlers for Staff Account Addition
  const handleAddStaffAccount = (e) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.username) return;

    const newStaff = {
      id: `STAFF-0${staffAccounts.length + 1}`,
      name: newStaffForm.name,
      username: newStaffForm.username.toLowerCase().trim(),
      role: newStaffForm.role,
      permissions: {
        canViewRevenue: newStaffForm.canViewRevenue,
        canAddDeleteMembers: newStaffForm.canAddDeleteMembers,
        canEditPricing: newStaffForm.canEditPricing,
        canAccessQr: newStaffForm.canAccessQr,
        canSendSms: newStaffForm.canSendSms
      }
    };

    setStaffAccounts(prev => [...prev, newStaff]);
    setNewStaffForm({
      name: '',
      username: '',
      role: 'RECEPTIONIST',
      canViewRevenue: false,
      canAddDeleteMembers: true,
      canEditPricing: false,
      canAccessQr: true,
      canSendSms: false
    });
  };

  const handleToggleStaffPermission = (staffId, permKey) => {
    setStaffAccounts(prev => prev.map(s => {
      if (s.id === staffId) {
        return {
          ...s,
          permissions: {
            ...s.permissions,
            [permKey]: !s.permissions[permKey]
          }
        };
      }
      return s;
    }));
  };

  // Database Backup / Export JSON
  const handleExportDatabase = () => {
    const dbPayload = {
      timestamp: new Date().toISOString(),
      gymDetails,
      members,
      transactions,
      leads,
      staffAccounts
    };
    const blob = new Blob([JSON.stringify(dbPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energie_fitness_db_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setDbToast('Database JSON backup downloaded successfully!');
    setTimeout(() => setDbToast(''), 4000);
  };

  // Impersonation Handlers
  const handleImpersonateUser = (targetUser) => {
    setCurrentUser(targetUser);
    setActiveRole('member');
    setCurrentView('portal');
    setImpersonateToast(`Impersonate mode active: Browsing as ${targetUser.name}`);
  };

  const handleImpersonateOwner = () => {
    setActiveRole('admin');
    setCurrentView('home');
    setImpersonateToast('Impersonate mode active: Browsing as Coach Ravi (Owner Desk)');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 font-mono p-4 md:p-8 space-y-8 select-none">
      
      {/* DEVELOPER TERMINAL HEADER BAR */}
      <div className="bg-[#0f172a] border-2 border-cyan-500/50 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glow Line Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-500" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-500/40 px-3.5 py-1.5 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest font-mono">
              <Terminal className="w-4 h-4 text-cyan-400" /> SYSTEM OVERRIDE ACTIVE • ROOT ACCESS LEVEL 0
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white font-['Outfit'] tracking-tight">
              [ ROOT SYSTEM CONTROL PANEL // <span className="text-cyan-400">DHRUVII DEV DESK</span> ]
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Post-sales system maintenance, dynamic rebranding, credential auditing, and database override console.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> VERCEL DEPLOYMENT LIVE
            </span>

            <button
              onClick={onExitDevDesk || (() => { setActiveRole('visitor'); setCurrentView('home'); })}
              className="bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" /> Lock Dev Console
            </button>
          </div>
        </div>

        {/* SYSTEM STATUS STATS MATRIX */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">App Environment</span>
            <strong className="text-cyan-400 font-bold">Vite 5 / React 18 Production</strong>
          </div>
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Active DB Records</span>
            <strong className="text-emerald-400 font-mono font-bold">{members.length} Members • {transactions.length} Txns</strong>
          </div>
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Simulated Latency</span>
            <strong className="text-white font-mono font-bold">14 ms (Optimal)</strong>
          </div>
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Root Operator</span>
            <strong className="text-yellow-400 font-mono font-bold">dhruvii_root (SUPERUSER)</strong>
          </div>
        </div>

      </div>

      {/* DEVELOPER DASHBOARD TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto text-xs font-bold uppercase">
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-3 rounded-2xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'config' 
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20' 
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" /> 1. System Config & Rebranding
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-3 rounded-2xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'audit' 
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20' 
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" /> 2. Credential & Security Audit
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-3 rounded-2xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'staff' 
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20' 
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> 3. Staff & Permissions Matrix
        </button>

        <button
          onClick={() => setActiveTab('db-health')}
          className={`px-4 py-3 rounded-2xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'db-health' 
              ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20' 
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
          }`}
        >
          <HardDrive className="w-4 h-4" /> 4. DB Backup & System Health
        </button>
      </div>

      {/* TAB 1: SYSTEM CONFIG & REBRANDING */}
      {activeTab === 'config' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" /> GLOBAL BRANDING & REBRANDING CONSOLE
            </h3>
            <p className="text-xs text-slate-400">
              Dynamically update site branding, gym name, location details, and primary contact parameters in real time.
            </p>
          </div>

          {configToast && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{configToast}</span>
            </div>
          )}

          <form onSubmit={handleSaveBranding} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1.5">Gym Brand Name *</label>
                <input 
                  type="text"
                  required
                  value={brandingForm.name}
                  onChange={(e) => setBrandingForm({ ...brandingForm, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1.5">Domain / Deployment URL *</label>
                <input 
                  type="text"
                  readOnly
                  value={brandingForm.domain}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-cyan-400 font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1.5">Contact Phone Number *</label>
                <input 
                  type="text"
                  required
                  value={brandingForm.phone}
                  onChange={(e) => setBrandingForm({ ...brandingForm, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase mb-1.5">WhatsApp Dispatch Number *</label>
                <input 
                  type="text"
                  required
                  value={brandingForm.whatsapp}
                  onChange={(e) => setBrandingForm({ ...brandingForm, whatsapp: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1.5">Gym Location Address *</label>
              <input 
                type="text"
                required
                value={brandingForm.address}
                onChange={(e) => setBrandingForm({ ...brandingForm, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold uppercase mb-1.5">Tagline / Subtitle Banner</label>
              <textarea 
                rows="2"
                value={brandingForm.tagline}
                onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-slate-950" /> Save & Commit System Parameters
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: CREDENTIAL & SECURITY AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" /> MASTER CREDENTIAL INSPECTOR & USER AUDIT
              </h3>
              <p className="text-xs text-slate-400">
                Inspect registered user accounts, plain credential tokens, and execute one-click admin resets.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search by User ID, Name, or Phone..."
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400 w-full md:w-64 font-mono"
            />
          </div>

          {/* Hidden Root System Accounts Card */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 space-y-3">
            <h4 className="text-xs font-black uppercase text-cyan-400 flex items-center gap-2 font-['Outfit']">
              <ShieldAlert className="w-4 h-4 text-cyan-400" /> SYSTEM STAFF & ROOT CREDENTIALS (UNEXPOSED)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {HIDDEN_ROOT_ACCOUNTS.map((acc, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span className="text-cyan-400">{acc.username}</span>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">{acc.role}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Password: <span className="text-emerald-400 font-bold">{acc.pass}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Master Members & Users Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-cyan-400 uppercase font-black font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5">User ID</th>
                  <th className="p-3.5">Full Name</th>
                  <th className="p-3.5">Phone Number</th>
                  <th className="p-3.5">Plan / Access</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Credential Token</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950 font-mono">
                {members
                  .filter(m => m.name.toLowerCase().includes(auditSearch.toLowerCase()) || m.id.toLowerCase().includes(auditSearch.toLowerCase()) || m.phone.includes(auditSearch))
                  .slice(0, 10)
                  .map((m) => (
                    <tr key={m.id} className="hover:bg-slate-900/60 transition">
                      <td className="p-3.5 font-bold text-cyan-400">{m.id}</td>
                      <td className="p-3.5 font-bold text-white">{m.name}</td>
                      <td className="p-3.5 text-slate-400">{m.phone}</td>
                      <td className="p-3.5 text-yellow-400">{m.plan || 'Quarterly'}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-red-950 text-red-400'
                        }`}>
                          {m.status || 'Active'}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {showPasswords[m.id] ? (
                          <span className="text-emerald-400 font-bold">Pass@2026! ({m.phone.slice(-4)})</span>
                        ) : (
                          <span>••••••••</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowPasswords(prev => ({ ...prev, [m.id]: !prev[m.id] }))}
                          className="ml-2 text-cyan-400 hover:underline text-[10px]"
                        >
                          {showPasswords[m.id] ? 'Hide' : 'Inspect'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleImpersonateUser(m)}
                          className="bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-400 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase cursor-pointer"
                        >
                          Impersonate
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: STAFF & PERMISSIONS MATRIX */}
      {activeTab === 'staff' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> GRANULAR STAFF PERMISSION MATRIX
            </h3>
            <p className="text-xs text-slate-400">
              Assign staff roles and manage feature authorization toggles for Coach Ravi desk operators.
            </p>
          </div>

          {/* Add Staff Form */}
          <form onSubmit={handleAddStaffAccount} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h4 className="text-sm font-black uppercase text-cyan-400 font-['Outfit']">Add New Staff Operator Account</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Staff Member Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Rahul Desk Operator"
                  value={newStaffForm.name}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Staff Username *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. rahul_desk"
                  value={newStaffForm.username}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, username: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Role Title *</label>
                <select 
                  value={newStaffForm.role}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-400"
                >
                  <option value="RECEPTIONIST">Receptionist / Front Desk</option>
                  <option value="HEAD_TRAINER">Head Coach / Trainer</option>
                  <option value="ACCOUNTANT">Accountant / Cashier</option>
                </select>
              </div>
            </div>

            {/* Permission Checkboxes */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-slate-400 font-bold mb-2">Access Rights & Capabilities Matrix:</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { key: 'canViewRevenue', label: 'View Revenue' },
                  { key: 'canAddDeleteMembers', label: 'Add/Edit Members' },
                  { key: 'canEditPricing', label: 'Edit Packages' },
                  { key: 'canAccessQr', label: 'QR Station Access' },
                  { key: 'canSendSms', label: 'Send SMS Alerts' }
                ].map((perm) => (
                  <label key={perm.key} className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-[11px] cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={newStaffForm[perm.key]}
                      onChange={(e) => setNewStaffForm({ ...newStaffForm, [perm.key]: e.target.checked })}
                      className="accent-cyan-400 w-3.5 h-3.5"
                    />
                    <span className="text-white font-medium">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase px-5 py-3 rounded-xl transition cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Create Staff Account & Authorize
            </button>
          </form>

          {/* Active Staff List with Interactive Permission Switches */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-cyan-400 font-['Outfit']">Active Staff Operators Matrix</h4>
            <div className="space-y-3">
              {staffAccounts.map((staff) => (
                <div key={staff.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{staff.name}</span>
                      <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        @{staff.username} • {staff.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                      ACTIVE OPERATOR
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[11px]">
                    {[
                      { key: 'canViewRevenue', label: 'View Revenue' },
                      { key: 'canAddDeleteMembers', label: 'Add/Edit Members' },
                      { key: 'canEditPricing', label: 'Edit Packages' },
                      { key: 'canAccessQr', label: 'QR Station Access' },
                      { key: 'canSendSms', label: 'Send SMS Alerts' }
                    ].map((perm) => (
                      <button
                        key={perm.key}
                        type="button"
                        onClick={() => handleToggleStaffPermission(staff.id, perm.key)}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                          staff.permissions[perm.key]
                            ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                        }`}
                      >
                        {perm.label}: {staff.permissions[perm.key] ? 'ENABLED' : 'LOCKED'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: DB BACKUP & SYSTEM HEALTH */}
      {activeTab === 'db-health' && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-cyan-400" /> SYSTEM HEALTH MONITOR & DB MAINTENANCE
            </h3>
            <p className="text-xs text-slate-400">
              Export database JSON snapshots, view deployment status, or impersonate roles for troubleshooting.
            </p>
          </div>

          {dbToast && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{dbToast}</span>
            </div>
          )}

          {impersonateToast && (
            <div className="p-4 bg-cyan-950/80 border border-cyan-500/50 rounded-2xl text-cyan-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <UserCheck className="w-5 h-5 shrink-0" />
              <span>{impersonateToast}</span>
            </div>
          )}

          {/* Database Backup Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-black text-cyan-400 uppercase font-['Outfit'] flex items-center gap-2">
                <Download className="w-4 h-4" /> Export Database Backup JSON
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download full state JSON containing all active member rosters, transaction logs, lead submissions, and gym settings.
              </p>
              <button
                type="button"
                onClick={handleExportDatabase}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase px-5 py-3 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-950" /> Download JSON Backup
              </button>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-black text-yellow-400 uppercase font-['Outfit'] flex items-center gap-2">
                <UserCheck className="w-4 h-4" /> Live Role Impersonation Mode
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly switch active role to Coach Ravi (Gym Owner) or sample member to inspect live frontend views without logging out.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleImpersonateOwner}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Impersonate Coach Ravi Desk
                </button>
                <button
                  type="button"
                  onClick={() => handleImpersonateUser(members[0])}
                  className="bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Impersonate Member ({members[0]?.name.split(' ')[0]})
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
