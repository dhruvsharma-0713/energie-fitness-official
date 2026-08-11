import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Calendar, ShieldCheck, X, CheckCircle2 } from 'lucide-react';

export default function EditMemberModal({ isOpen, onClose, member, plans = [], onSaveMember }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: '',
    endDate: '',
    status: 'Active',
    subRole: 'Standard Member',
    goal: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        phone: member.phone || '',
        email: member.email || '',
        plan: member.plan || (plans[0]?.name || 'Monthly Single Pass'),
        endDate: member.endDate || '',
        status: member.status || 'Active',
        subRole: member.subRole || 'Standard Member',
        goal: member.goal || 'Fitness & Muscle Building'
      });
    }
  }, [member, plans]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!member) return;

    const updatedMember = {
      ...member,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      plan: formData.plan,
      endDate: formData.endDate,
      status: formData.status,
      subRole: formData.subRole,
      goal: formData.goal
    };

    onSaveMember(updatedMember);
    onClose();
  };

  if (!isOpen || !member) return null;

  return (
    <div className="modal-overlay">
      <div className="bg-[#121212] border-2 border-yellow-400/60 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in relative text-white">
        
        {/* Header */}
        <div className="bg-[#0d0d0d] px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-yellow-400">
            <User className="w-5 h-5" />
            <h3 className="text-xl font-black font-['Outfit'] uppercase">
              EDIT MEMBER DETAILS ({member.id})
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div>
            <label className="text-[11px] font-bold uppercase text-neutral-400">Full Member Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-neutral-400">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field mt-1"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-neutral-400">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-neutral-400">Active Package</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="input-field mt-1 bg-neutral-900"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.name}>{p.name} (₹{p.price})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-neutral-400">Membership Expiry Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field mt-1 bg-neutral-900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase text-neutral-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="input-field mt-1 bg-neutral-900"
              >
                <option value="Active">Active</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-neutral-400">Member Sub-Role</label>
              <select
                value={formData.subRole}
                onChange={(e) => setFormData({ ...formData, subRole: e.target.value })}
                className="input-field mt-1 bg-neutral-900 text-yellow-400 font-bold"
              >
                <option value="Standard Member">Standard Gym Member</option>
                <option value="Staff / Trainer">Staff / Certified Trainer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-neutral-400">Target Goals</label>
            <input
              type="text"
              placeholder="e.g. Muscle Building & Weight Loss"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              className="input-field mt-1"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-4 py-2 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase px-6 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-yellow-400/20"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
