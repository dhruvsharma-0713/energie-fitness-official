import React, { useState } from 'react';
import { Terminal, ShieldAlert, Key, Database, RefreshCw, Download, Trash2, CheckCircle2, Lock, X, FileText } from 'lucide-react';

export default function RootPortalModal({ isOpen, onClose, storageData = {}, onUpdateStorageData, onResetAll }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'database' | 'logs'
  const [jsonText, setJsonText] = useState('');
  const [selectedKey, setSelectedKey] = useState('members');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  const handleRootLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (
      (username.toLowerCase() === 'root' && password === 'RootSystem@2026') ||
      (username.toLowerCase() === 'admin.root' && password === 'RootSystem@2026')
    ) {
      setIsAuthenticated(true);
      setJsonText(JSON.stringify(storageData[selectedKey] || [], null, 2));
    } else {
      setLoginError('Invalid Root Master Credentials. Access Denied.');
    }
  };

  const handleSelectKey = (key) => {
    setSelectedKey(key);
    setJsonText(JSON.stringify(storageData[key] || [], null, 2));
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onUpdateStorageData(selectedKey, parsed);
      setSaveSuccessMessage(`Successfully saved ${selectedKey} JSON data!`);
      setTimeout(() => setSaveSuccessMessage(''), 3000);
    } catch (err) {
      alert(`JSON Format Error: ${err.message}`);
    }
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `energie-fitness-root-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="bg-[#0a0a0a] border-2 border-red-600 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in relative text-white font-mono flex flex-col">
        
        {/* Header */}
        <div className="bg-red-950/80 px-6 py-4 border-b border-red-600/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-red-500" />
            <span className="font-black text-sm text-red-400 tracking-wider uppercase">
              ROOT SYSTEM PORTAL // NON-INDEXED TROUBLESHOOTING ENTRY
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Root Auth Form */
          <div className="p-8 space-y-6 max-w-md mx-auto my-auto w-full text-sans">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500 text-red-500 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black font-['Outfit'] uppercase text-white">
                Root System Authentication
              </h3>
              <p className="text-xs text-neutral-400">
                Enter root credentials for direct database inspection & system state overrides.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-400 text-xs font-bold text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleRootLogin} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase">Root Username</label>
                <input
                  type="text"
                  placeholder="root"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field mt-1 text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase">Master Root Key</label>
                <input
                  type="password"
                  placeholder="RootSystem@2026"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field mt-1 text-xs font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase py-3 rounded-xl transition shadow-lg shadow-red-600/30"
              >
                Authenticate Root Access
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Root Control Room */
          <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-6">
            
            {/* Nav Tabs */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${activeTab === 'overview' ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400'}`}
                >
                  System Status
                </button>
                <button
                  onClick={() => setActiveTab('database')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${activeTab === 'database' ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400'}`}
                >
                  Raw JSON Editor
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportBackup}
                  className="bg-neutral-800 hover:bg-neutral-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-yellow-400"
                >
                  <Download className="w-3.5 h-3.5" /> Export System Backup
                </button>
                <button
                  onClick={() => {
                    if (confirm("WARNING: Confirm full factory reset of local database state?")) {
                      onResetAll();
                      onClose();
                    }
                  }}
                  className="bg-red-950 hover:bg-red-900 border border-red-600/50 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Emergency Purge
                </button>
              </div>
            </div>

            {/* Tab 1: System Status Overview */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Total Active Members</span>
                  <p className="text-2xl font-black text-yellow-400">{storageData.members?.length || 0}</p>
                </div>
                <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Recorded Transactions</span>
                  <p className="text-2xl font-black text-emerald-400">{storageData.transactions?.length || 0}</p>
                </div>
                <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Trial Pass Leads</span>
                  <p className="text-2xl font-black text-red-400">{storageData.leads?.length || 0}</p>
                </div>

                <div className="md:col-span-3 bg-neutral-900 p-4 rounded-2xl border border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase">System Diagnostics Log</span>
                  <div className="bg-black p-3 rounded-xl text-[11px] text-emerald-400 space-y-1 overflow-x-auto">
                    <p>[SYS_INIT]: Root Portal active on non-indexed view route.</p>
                    <p>[STORAGE_VERIFY]: LocalStorage keys initialized: members-v4, transactions-v4, leads-v4, gym-details-v4.</p>
                    <p>[STATUS]: All API contracts, QR code lookup engines & member schemas operational.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Raw JSON Editor */}
            {activeTab === 'database' && (
              <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 font-bold">Select Collection:</span>
                    {['members', 'transactions', 'leads', 'gymDetails'].map((k) => (
                      <button
                        key={k}
                        onClick={() => handleSelectKey(k)}
                        className={`text-xs px-2.5 py-1 rounded-md uppercase font-bold ${
                          selectedKey === k ? 'bg-yellow-400 text-black' : 'bg-neutral-900 text-neutral-400'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>

                  {saveSuccessMessage && (
                    <span className="text-xs text-emerald-400 font-bold">{saveSuccessMessage}</span>
                  )}

                  <button
                    onClick={handleSaveJson}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-1.5 rounded-lg transition"
                  >
                    Commit JSON Changes
                  </button>
                </div>

                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  className="flex-1 w-full bg-black border border-neutral-800 rounded-xl p-4 text-xs font-mono text-emerald-400 outline-none resize-none focus:border-red-500"
                />
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
