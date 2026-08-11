import React, { useState } from 'react';
import { Lock, Key, User, X, ShieldAlert, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!credentials.username || !credentials.password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    const success = onLogin(credentials.username.trim(), credentials.password);
    if (success) {
      setCredentials({ username: '', password: '' });
      onClose();
    } else {
      setErrorMsg('Invalid staff credentials. Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border-2 border-red-600/60 max-w-md w-full p-6 md:p-8 rounded-3xl space-y-6 relative shadow-2xl overflow-hidden">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600" />

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition border border-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header - Requirement 2: Replaced with "Staff Login" */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-red-600/20 border border-red-600/40 px-3 py-1 rounded-full text-yellow-400 text-[10px] font-black uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-red-500" /> SECURE DESK ACCESS
          </div>
          <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
            STAFF <span className="text-yellow-400">LOGIN</span>
          </h3>
          <p className="text-xs text-[#b3b3b3]">
            Protected portal for member management, revenue ledger, and attendance logger.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-600/20 border border-red-600/60 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
              Staff Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input 
                type="text"
                required
                className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none transition" 
                value={credentials.username} 
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
                placeholder="Enter Staff Username" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input 
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:border-yellow-400 focus:outline-none transition" 
                value={credentials.password} 
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                placeholder="••••••••••••" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-neutral-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            Authenticate & Access Dashboard
          </button>
        </form>

      </div>
    </div>
  );
}
