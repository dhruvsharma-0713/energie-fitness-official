import React, { useState } from 'react';
import { Users, UserPlus, QrCode, CreditCard, Flame, TrendingUp, Search, Plus, Filter, CheckCircle2, AlertCircle, Phone, MessageCircle, Download, Sparkles, RefreshCw, BarChart2, ShieldCheck, Heart, X, Eye, Calendar, Award, Printer, Edit, Trash2, Tag, Settings, Layers, FileText } from 'lucide-react';
import EditMemberModal from './EditMemberModal';
import LiveQrScannerModal from './LiveQrScannerModal';

export default function AdminDashboard({ 
  members, 
  setMembers, 
  transactions, 
  setTransactions, 
  leads, 
  setLeads, 
  gymDetails,
  setGymDetails,
  onViewReceipt, 
  onResetData, 
  onInjectDemoData,
  onRecordAttendance 
}) {
  const [adminTab, setAdminTab] = useState('members'); // 'members' | 'cms-plans' | 'cms-services' | 'cms-discounts' | 'cms-policies' | 'leads' | 'transactions'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modals state
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMemberPassCard, setSelectedMemberPassCard] = useState(null);
  const [showUniversalQrModal, setShowUniversalQrModal] = useState(false);

  // Form states for CMS items
  const [newPlan, setNewPlan] = useState({ name: '', duration: '1 Month', durationMonths: 1, price: 1500, originalPrice: 1800, badge: 'Standard', features: '' });
  const [newService, setNewService] = useState({ title: '', desc: '', icon: 'Dumbbell' });
  const [newOffer, setNewOffer] = useState({ title: '', tag: 'SPECIAL OFFER', desc: '', code: 'PROMO10' });

  // Form State for Adding New Member
  const [newMemberData, setNewMemberData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: gymDetails?.plans?.[0]?.name || 'Monthly Single Pass',
    amountPaid: gymDetails?.plans?.[0]?.price || 1500,
    paymentMethod: 'UPI (Google Pay)',
    subRole: 'Standard Member',
    goal: 'Muscle Building & Weight Loss'
  });

  // Calculate Stats
  const activeMembersCount = members.filter(m => m.status === 'Active').length;
  const expiringCount = members.filter(m => m.status === 'Expiring Soon').length;
  const expiredCount = members.filter(m => m.status === 'Expired').length;
  const totalRevenue = members.reduce((sum, m) => sum + (m.amountPaid || 0), 0);
  const newLeadsCount = leads.length;

  // Filtered Members
  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.phone.includes(searchTerm) || 
                          m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split('T')[0];
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    const endDateStr = end.toISOString().split('T')[0];

    const newId = `EF-${1000 + members.length + 1}`;

    const memberObj = {
      id: newId,
      name: newMemberData.name,
      phone: newMemberData.phone,
      email: newMemberData.email || `${newMemberData.name.toLowerCase().replace(' ', '.')}@example.com`,
      plan: newMemberData.plan,
      startDate: todayStr,
      endDate: endDateStr,
      status: 'Active',
      paymentStatus: 'Paid',
      amountPaid: Number(newMemberData.amountPaid),
      paymentMethod: newMemberData.paymentMethod,
      subRole: newMemberData.subRole,
      qrCode: `${newId}-${newMemberData.name.split(' ')[0].toUpperCase()}`,
      streak: 1,
      totalCheckIns: 1,
      goal: newMemberData.goal,
      workoutRoutine: [
        { day: "Mon - Sat", muscle: "Full Body Gym Routine", exercises: "Treadmill 15m, Dumbbell Press 4x12, Squats 4x15" }
      ]
    };

    setMembers([memberObj, ...members]);

    setTransactions([
      {
        id: `TXN-${Math.floor(8800 + Math.random() * 1000)}`,
        memberId: newId,
        memberName: memberObj.name,
        plan: memberObj.plan,
        amount: memberObj.amountPaid,
        mode: memberObj.paymentMethod,
        date: todayStr,
        status: 'Success'
      },
      ...transactions
    ]);

    setShowAddMemberModal(false);
  };

  const handleSaveMemberDetails = (updated) => {
    setMembers(members.map(m => m.id === updated.id ? updated : m));
    setEditingMember(null);
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Are you sure you want to delete this member record?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  // CMS Handlers
  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlan.name.trim()) return;
    const planObj = {
      id: `plan-${Date.now()}`,
      name: newPlan.name,
      duration: newPlan.duration,
      durationMonths: Number(newPlan.durationMonths),
      price: Number(newPlan.price),
      originalPrice: Number(newPlan.originalPrice),
      badge: newPlan.badge,
      features: newPlan.features.split(',').map(f => f.trim()).filter(Boolean)
    };
    setGymDetails({
      ...gymDetails,
      plans: [...(gymDetails.plans || []), planObj]
    });
    setNewPlan({ name: '', duration: '1 Month', durationMonths: 1, price: 1500, originalPrice: 1800, badge: 'Standard', features: '' });
  };

  const handleDeletePlan = (planId) => {
    setGymDetails({
      ...gymDetails,
      plans: gymDetails.plans.filter(p => p.id !== planId)
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.title.trim()) return;
    const serviceObj = {
      id: `service-${Date.now()}`,
      title: newService.title,
      desc: newService.desc,
      icon: newService.icon
    };
    setGymDetails({
      ...gymDetails,
      services: [...(gymDetails.services || []), serviceObj]
    });
    setNewService({ title: '', desc: '', icon: 'Dumbbell' });
  };

  const handleDeleteService = (serviceId) => {
    setGymDetails({
      ...gymDetails,
      services: gymDetails.services.filter(s => s.id !== serviceId)
    });
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!newOffer.title.trim()) return;
    const offerObj = {
      id: `offer-${Date.now()}`,
      title: newOffer.title,
      tag: newOffer.tag,
      desc: newOffer.desc,
      code: newOffer.code
    };
    setGymDetails({
      ...gymDetails,
      specialOffers: [...(gymDetails.specialOffers || []), offerObj]
    });
    setNewOffer({ title: '', tag: 'SPECIAL OFFER', desc: '', code: 'PROMO10' });
  };

  const handleDeleteOffer = (offerId) => {
    setGymDetails({
      ...gymDetails,
      specialOffers: gymDetails.specialOffers.filter(o => o.id !== offerId)
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white pt-6 pb-20">
      
      {/* Top Banner */}
      <section className="bg-neutral-900 border-b border-neutral-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-xl shadow-red-600/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-white font-['Outfit'] uppercase">COACH RAVI DESK</h1>
                <span className="bg-yellow-400 text-black font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full">Gym Owner CMS Active</span>
              </div>
              <p className="text-xs text-[#b3b3b3]">Energie Fitness Bulandshahr Owner Dashboard & Live Content Manager</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowUniversalQrModal(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" /> Gym QR Station
            </button>

            <button
              onClick={() => setShowAddMemberModal(true)}
              className="bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase px-4 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Member
            </button>

            <button
              onClick={onInjectDemoData}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs uppercase px-3 py-2.5 rounded-xl border border-neutral-700 transition"
              title="Inject Sample Members"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" /> Demo Data
            </button>
          </div>

        </div>
      </section>

      {/* KPI Stats Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl">
            <span className="text-xs text-[#b3b3b3] uppercase font-black block">Active Members</span>
            <p className="text-3xl font-black text-white mt-2 font-mono">{activeMembersCount}</p>
          </div>
          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl">
            <span className="text-xs text-[#b3b3b3] uppercase font-black block">Expiring Soon</span>
            <p className="text-3xl font-black text-yellow-400 mt-2 font-mono">{expiringCount}</p>
          </div>
          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl">
            <span className="text-xs text-[#b3b3b3] uppercase font-black block">Expired Plans</span>
            <p className="text-3xl font-black text-red-500 mt-2 font-mono">{expiredCount}</p>
          </div>
          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl">
            <span className="text-xs text-[#b3b3b3] uppercase font-black block">Total Revenue</span>
            <p className="text-2xl font-black text-white mt-2 font-mono">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl col-span-2 md:col-span-1">
            <span className="text-xs text-[#b3b3b3] uppercase font-black block">Fresh Leads</span>
            <p className="text-3xl font-black text-white mt-2 font-mono">{newLeadsCount}</p>
          </div>
        </div>
      </section>

      {/* Owner CMS Navigation Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-800 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 text-xs font-black uppercase tracking-wider">
          <button
            onClick={() => setAdminTab('members')}
            className={`px-5 py-2.5 rounded-xl transition ${adminTab === 'members' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
          >
            Member Roster ({members.length})
          </button>
          <button
            onClick={() => setAdminTab('cms-plans')}
            className={`px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${adminTab === 'cms-plans' ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
          >
            <Tag className="w-4 h-4" /> Manage Packages
          </button>
          <button
            onClick={() => setAdminTab('cms-services')}
            className={`px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${adminTab === 'cms-services' ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
          >
            <Layers className="w-4 h-4" /> Manage Services
          </button>
          <button
            onClick={() => setAdminTab('cms-discounts')}
            className={`px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${adminTab === 'cms-discounts' ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
          >
            <Sparkles className="w-4 h-4" /> Special Discounts
          </button>
          <button
            onClick={() => setAdminTab('leads')}
            className={`px-5 py-2.5 rounded-xl transition ${adminTab === 'leads' ? 'bg-yellow-400 text-black' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setAdminTab('transactions')}
            className={`px-5 py-2.5 rounded-xl transition ${adminTab === 'transactions' ? 'bg-yellow-400 text-black' : 'bg-neutral-900 text-neutral-300 border border-neutral-800'}`}
          >
            Financial Ledger ({transactions.length})
          </button>
        </div>
      </section>

      {/* TAB 1: MEMBER DIRECTORY (Requirement 3 - Eye icon removed, row click opens pass card, edit modal functional) */}
      {adminTab === 'members' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121212] p-4 rounded-2xl border border-neutral-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by name, phone, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-yellow-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-[#b3b3b3] font-bold">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#1a1a1a] border border-neutral-800 text-white text-xs py-2 px-3 rounded-xl font-bold cursor-pointer"
              >
                <option value="all">All Members</option>
                <option value="active">Active</option>
                <option value="expiring soon">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="bg-[#121212] border border-neutral-800 rounded-3xl overflow-x-auto shadow-2xl">
            <table className="w-full text-left text-xs text-neutral-300 border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#050505] text-neutral-400 font-black uppercase border-b border-neutral-800">
                  <th className="p-4">Member Info</th>
                  <th className="p-4">Sub-Role</th>
                  <th className="p-4">Package</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filteredMembers.map((m) => (
                  <tr 
                    key={m.id} 
                    className="hover:bg-neutral-900/80 transition cursor-pointer" 
                    onClick={() => setSelectedMemberPassCard(m)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/20 text-yellow-400 font-black flex items-center justify-center border border-yellow-400/30 font-['Outfit']">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <strong className="text-white font-bold block">{m.name}</strong>
                          <span className="text-[11px] text-neutral-400 font-mono">{m.id} • {m.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        m.subRole === 'Staff / Trainer' ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-300'
                      }`}>
                        {m.subRole || 'Standard Member'}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-neutral-200">{m.plan}</td>
                    <td className="p-4 font-mono text-neutral-300">{m.endDate}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        m.status === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                        m.status === 'Expiring Soon' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40' :
                        'bg-red-600/20 text-red-400 border border-red-600/40'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setEditingMember(m)}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-yellow-400 transition"
                        title="Edit Member Details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(m.id)}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-red-400 transition"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 2: CMS PACKAGES MANAGER */}
      {adminTab === 'cms-plans' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Add Plan Form */}
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
              <Plus className="w-5 h-5 text-yellow-400" /> Add New Membership Package
            </h3>

            <form onSubmit={handleAddPlan} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 font-bold block mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Beast 6-Month Pass"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1">Price (₹)</label>
                <input
                  type="number"
                  required
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1">Badge Label</label>
                <input
                  type="text"
                  placeholder="e.g. Best Value / Popular"
                  value={newPlan.badge}
                  onChange={(e) => setNewPlan({ ...newPlan, badge: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-neutral-400 font-bold block mb-1">Included Features (comma separated)</label>
                <input
                  type="text"
                  placeholder="Full Gym Access, Diet Chart, Locker Facility"
                  value={newPlan.features}
                  onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase py-3 rounded-xl transition"
                >
                  Create Live Package
                </button>
              </div>
            </form>
          </div>

          {/* Active Plans List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gymDetails?.plans?.map((plan) => (
              <div key={plan.id} className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl space-y-4 relative">
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-900 transition"
                  title="Remove Plan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  {plan.badge}
                </span>

                <h4 className="text-xl font-black text-white font-['Outfit'] uppercase">{plan.name}</h4>
                <p className="text-2xl font-black text-yellow-400 font-mono">₹{plan.price}</p>

                <ul className="space-y-2 text-xs text-neutral-300">
                  {plan.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* TAB 3: CMS SERVICES MANAGER */}
      {adminTab === 'cms-services' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
              <Plus className="w-5 h-5 text-yellow-400" /> Add New Gym Service
            </h3>

            <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 font-bold block mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CrossFit Functional Cage"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-neutral-400 font-bold block mb-1">Service Description</label>
                <input
                  type="text"
                  required
                  placeholder="Description of equipment and guidance provided..."
                  value={newService.desc}
                  onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase px-6 py-3 rounded-xl transition"
                >
                  Add Gym Service
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gymDetails?.services?.map((svc) => (
              <div key={svc.id} className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl space-y-3 relative">
                <button
                  onClick={() => handleDeleteService(svc.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-900 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <h4 className="text-lg font-black text-white font-['Outfit'] uppercase">{svc.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* TAB 4: CMS DISCOUNTS & OFFERS MANAGER */}
      {adminTab === 'cms-discounts' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase flex items-center gap-2">
              <Plus className="w-5 h-5 text-yellow-400" /> Create Special Discount Promo Code
            </h3>

            <form onSubmit={handleAddOffer} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 font-bold block mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monsoon Special 20% OFF"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1">Promo Code</label>
                <input
                  type="text"
                  required
                  placeholder="MONSOON20"
                  value={newOffer.code}
                  onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value })}
                  className="input-field font-mono uppercase"
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-neutral-400 font-bold block mb-1">Description</label>
                <input
                  type="text"
                  required
                  placeholder="Details of discount code..."
                  value={newOffer.desc}
                  onChange={(e) => setNewOffer({ ...newOffer, desc: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase px-6 py-3 rounded-xl transition"
                >
                  Publish Promo Code
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gymDetails?.specialOffers?.map((off) => (
              <div key={off.id} className="bg-[#121212] border border-neutral-800 p-6 rounded-3xl space-y-3 relative">
                <button
                  onClick={() => handleDeleteOffer(off.id)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-900 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <span className="bg-red-600/20 text-red-400 border border-red-600/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded">
                  {off.tag}
                </span>

                <h4 className="text-base font-black text-white font-['Outfit'] uppercase">{off.title}</h4>
                <p className="text-xs text-neutral-400">{off.desc}</p>
                <div className="pt-2">
                  <span className="bg-yellow-400 text-black font-mono font-black text-xs px-3 py-1 rounded-lg">
                    CODE: {off.code}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* TAB 5: LEADS MANAGER */}
      {adminTab === 'leads' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase mb-4">Prospect Trial Pass Leads</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{lead.name}</h4>
                      <p className="text-xs text-yellow-400 font-mono">{lead.phone}</p>
                    </div>
                    <span className="bg-red-600/20 text-red-400 text-[10px] font-black px-2.5 py-1 rounded-full uppercase border border-red-600/30">
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400">
                    Visit Date: <strong className="text-white">{lead.date} ({lead.slot})</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 6: FINANCIAL LEDGER */}
      {adminTab === 'transactions' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase mb-4">Payment & Receipt Ledger</h3>
            <div className="space-y-3">
              {transactions.map((txn) => (
                <div key={txn.id} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-yellow-400 font-mono font-bold">{txn.id}</span>
                    <h4 className="text-white font-bold text-sm">{txn.memberName} ({txn.plan})</h4>
                    <p className="text-neutral-400 text-[11px]">Date: {txn.date} • Mode: {txn.mode}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-white font-mono block">₹{txn.amount}</span>
                    <span className="text-green-400 font-bold text-[10px] uppercase">Paid</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDIT MEMBER DETAILS MODAL */}
      <EditMemberModal
        isOpen={Boolean(editingMember)}
        onClose={() => setEditingMember(null)}
        member={editingMember}
        plans={gymDetails?.plans || []}
        onSaveMember={handleSaveMemberDetails}
      />

      {/* MEMBER DIRECTORY PASS CARD POPUP MODAL */}
      {selectedMemberPassCard && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border-2 border-yellow-400 max-w-lg w-full p-6 md:p-8 rounded-3xl space-y-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedMemberPassCard(null)} 
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <span className="bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full">
                OFFICIAL DIGITAL MEMBER PASS CARD
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] uppercase">
                {selectedMemberPassCard.name}
              </h3>
              <p className="text-xs text-yellow-400 font-mono">Member ID: {selectedMemberPassCard.id}</p>
            </div>

            <div className="bg-black p-5 rounded-2xl border border-neutral-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-bold">Contact Phone:</span>
                <strong className="text-white font-mono">{selectedMemberPassCard.phone}</strong>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-bold">Membership Package:</span>
                <strong className="text-yellow-400">{selectedMemberPassCard.plan}</strong>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-bold">Joining & Expiry:</span>
                <strong className="text-white">{selectedMemberPassCard.startDate} to {selectedMemberPassCard.endDate}</strong>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-bold">Member Sub-Role:</span>
                <strong className="text-yellow-400">{selectedMemberPassCard.subRole || 'Standard Member'}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onViewReceipt(selectedMemberPassCard)}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase py-3 rounded-xl transition"
              >
                View Tax Receipt
              </button>
              <button
                onClick={() => setSelectedMemberPassCard(null)}
                className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl transition"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border-2 border-red-600 max-w-md w-full p-6 rounded-3xl space-y-4 relative shadow-2xl">
            <button onClick={() => setShowAddMemberModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">✕</button>
            <h3 className="text-xl font-black text-white font-['Outfit'] uppercase">Add New Gym Member</h3>
            
            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-bold mb-1">Member Name *</label>
                <input required type="text" value={newMemberData.name} onChange={(e) => setNewMemberData({...newMemberData, name: e.target.value})} className="input-field" placeholder="e.g. Vikram Chaudhary" />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1">Mobile Number *</label>
                <input required type="tel" value={newMemberData.phone} onChange={(e) => setNewMemberData({...newMemberData, phone: e.target.value})} className="input-field" placeholder="+91 98765 43210" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Plan Package</label>
                  <select value={newMemberData.plan} onChange={(e) => setNewMemberData({...newMemberData, plan: e.target.value})} className="input-field">
                    {gymDetails?.plans?.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Sub-Role</label>
                  <select value={newMemberData.subRole} onChange={(e) => setNewMemberData({...newMemberData, subRole: e.target.value})} className="input-field">
                    <option value="Standard Member">Standard Member</option>
                    <option value="Staff / Trainer">Staff / Trainer</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider py-3 rounded-xl transition">
                Register Member & Generate QR Pass
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Gym QR Station & Scanner Modal */}
      <LiveQrScannerModal
        isOpen={showUniversalQrModal}
        onClose={() => setShowUniversalQrModal(false)}
        members={members}
        onScanSuccess={(mId) => {
          if (onRecordAttendance) {
            onRecordAttendance(mId);
          }
        }}
      />

    </div>
  );
}
