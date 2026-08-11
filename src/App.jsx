import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import Services from './components/Services';
import TrainerRavi from './components/TrainerRavi';
import ClassTimetable from './components/ClassTimetable';
import ClubGallery from './components/ClubGallery';
import BmiCalculator from './components/BmiCalculator';
import ClientStories from './components/ClientStories';
import Pricing from './components/Pricing';
import LocationSchedule from './components/LocationSchedule';
import MemberPortal from './components/MemberPortal';
import AdminDashboard from './components/AdminDashboard';
import FreeTrialModal from './components/FreeTrialModal';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import FitnessFirstFooter from './components/FitnessFirstFooter';
import AdminLoginModal from './components/AdminLoginModal';
import YouTubeShowcase from './components/YouTubeShowcase';
import AuthModal from './components/AuthModal';
import PoliciesModal from './components/PoliciesModal';
import RootPortalModal from './components/RootPortalModal';

// Restructured View Components
import TrainWithUsView from './components/TrainWithUsView';
import MembershipView from './components/MembershipView';
import TryUsView from './components/TryUsView';
import ClubFinderView from './components/ClubFinderView';
import AboutUsView from './components/AboutUsView';
import PoliciesView from './components/PoliciesView';

import { GYM_DETAILS, INITIAL_MEMBERS, INITIAL_TRANSACTIONS, INITIAL_LEADS, generateDemoMembers } from './data/mockData';

const STORAGE_KEYS = {
  members: 'energie-members-v4',
  transactions: 'energie-transactions-v4',
  leads: 'energie-leads-v4',
  gymDetails: 'energie-gym-details-v4',
  socialPosts: 'energie-social-posts-v4',
  friends: 'energie-friends-v4',
  activeRole: 'energie-role-v4',
  adminUnlocked: 'energie-admin-v4',
  portalMemberId: 'energie-portal-member-v4',
  currentView: 'energie-current-view-v4',
  currentUser: 'energie-current-user-v4'
};

const DEFAULT_POSTS = [
  {
    id: 'POST-101',
    authorId: 'EF-1001',
    authorName: 'Amit Sharma',
    authorRole: 'Standard Member',
    authorAvatar: 'A',
    category: 'Physique Progress',
    content: 'Hit a new PR on Incline Dumbbell Press (34kg) today at Coach Ravi’s evening slot! Consistency pays off 🔥',
    image: '/images/strength_zone.jpg',
    createdAt: '2 hours ago',
    likes: ['EF-1002'],
    comments: [
      { id: 'CMT-1', authorName: 'Coach Ravi', text: 'Great form Amit! Next week we push to 36kg 💪', createdAt: '1 hour ago' }
    ]
  },
  {
    id: 'POST-102',
    authorId: 'EF-1002',
    authorName: 'Rohan & Neha Verma',
    authorRole: 'Standard Member',
    authorAvatar: 'R',
    category: 'Workout Challenge',
    content: 'Completed the Sunday Couple Partner Workout Circuit in 24 minutes! Best gym energy in Bulandshahr.',
    image: '/images/couple_training.jpg',
    createdAt: '1 day ago',
    likes: ['EF-1001', 'EF-1003'],
    comments: []
  }
];

function readStoredValue(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeRole, setActiveRole] = useState(() => readStoredValue(STORAGE_KEYS.activeRole, 'visitor'));
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => Boolean(readStoredValue(STORAGE_KEYS.adminUnlocked, false)));
  
  // Routing View state
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const viewParam = urlParams.get('view');
      if (viewParam) return viewParam;
    }
    return 'home';
  });

  // Application Dynamic State
  const [members, setMembers] = useState(() => readStoredValue(STORAGE_KEYS.members, INITIAL_MEMBERS));
  const [transactions, setTransactions] = useState(() => readStoredValue(STORAGE_KEYS.transactions, INITIAL_TRANSACTIONS));
  const [leads, setLeads] = useState(() => readStoredValue(STORAGE_KEYS.leads, INITIAL_LEADS));
  const [gymDetails, setGymDetails] = useState(() => readStoredValue(STORAGE_KEYS.gymDetails, GYM_DETAILS));
  const [posts, setPosts] = useState(() => readStoredValue(STORAGE_KEYS.socialPosts, DEFAULT_POSTS));
  const [friends, setFriends] = useState(() => readStoredValue(STORAGE_KEYS.friends, ['EF-1002']));

  // Authenticated User Session
  const [currentUser, setCurrentUser] = useState(() => readStoredValue(STORAGE_KEYS.currentUser, null));

  // Selected Member for Portal View
  const [currentPortalMember, setCurrentPortalMember] = useState(() => {
    if (currentUser) return currentUser;
    const storedMemberId = readStoredValue(STORAGE_KEYS.portalMemberId, INITIAL_MEMBERS[0].id);
    return INITIAL_MEMBERS.find((member) => member.id === storedMemberId) || INITIAL_MEMBERS[0];
  });

  // Modal States
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);

  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [receiptMember, setReceiptMember] = useState(null);

  // Sync LocalStorage
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(members)); }, [members]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads)); }, [leads]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.gymDetails, JSON.stringify(gymDetails)); }, [gymDetails]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.socialPosts, JSON.stringify(posts)); }, [posts]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.friends, JSON.stringify(friends)); }, [friends]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.activeRole, JSON.stringify(activeRole)); }, [activeRole]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.adminUnlocked, JSON.stringify(isAdminUnlocked)); }, [isAdminUnlocked]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.currentView, JSON.stringify(currentView)); }, [currentView]);
  useEffect(() => { window.localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser)); }, [currentUser]);

  // Browser History popstate Listener
  useEffect(() => {
    const handlePopState = (e) => {
      const urlParams = new URLSearchParams(window.location.search);
      const viewParam = urlParams.get('view') || e.state?.view || 'home';
      setCurrentView(viewParam);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (viewName) => {
    setCurrentView(viewName);
    if (typeof window !== 'undefined') {
      const newUrl = viewName === 'home' ? window.location.pathname : `?view=${viewName}`;
      window.history.pushState({ view: viewName }, '', newUrl);
    }
  };

  useEffect(() => {
    // Secret URL query checker: ?admin=true or ?view=root-portal
    if (typeof window !== 'undefined') {
      if (window.location.search.includes('admin=true')) {
        setActiveRole('admin');
        if (!isAdminUnlocked) setIsAdminLoginOpen(true);
      }
    }
  }, [isAdminUnlocked]);

  // Route Gateway Security: Redirect active logged-in members from 'try-us' view directly to Member Dashboard
  useEffect(() => {
    if ((currentUser || activeRole === 'member') && currentView === 'try-us') {
      setActiveRole('member');
    }
  }, [currentUser, activeRole, currentView]);

  const handleAuthSuccess = (userObj, isNew) => {
    if (isNew) {
      setMembers((prev) => [userObj, ...prev]);
    }
    setCurrentUser(userObj);
    setCurrentPortalMember(userObj);
    setActiveRole('member');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setActiveRole('visitor');
    handleNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecordAttendance = (memberId) => {
    setMembers((prev) => prev.map((m) => {
      if (m.id === memberId || m.phone === currentUser?.phone) {
        return {
          ...m,
          totalCheckIns: (m.totalCheckIns || 1) + 1,
          streak: (m.streak || 1) + 1
        };
      }
      return m;
    }));

    if (currentUser) {
      setCurrentUser((prev) => prev ? {
        ...prev,
        totalCheckIns: (prev.totalCheckIns || 1) + 1,
        streak: (prev.streak || 1) + 1
      } : null);
    }
  };

  const handleSelectPlan = (planObj) => {
    setSelectedPlanForCheckout(planObj);
    setIsCheckoutModalOpen(true);
  };

  const handleCompletePayment = (newMemberObj) => {
    setMembers((previousMembers) => [newMemberObj, ...previousMembers]);
    setCurrentUser(newMemberObj);
    setCurrentPortalMember(newMemberObj);
    setActiveRole('member');
    
    const newTxn = {
      id: `TXN-${Math.floor(8800 + Math.random() * 1000)}`,
      memberId: newMemberObj.id,
      memberName: newMemberObj.name,
      plan: newMemberObj.plan,
      amount: newMemberObj.amountPaid,
      mode: newMemberObj.paymentMethod,
      date: newMemberObj.startDate,
      status: 'Success'
    };
    setTransactions((previousTransactions) => [newTxn, ...previousTransactions]);
  };

  const handleAddLead = (leadObj) => {
    setLeads((previousLeads) => [leadObj, ...previousLeads]);
  };

  const handleViewReceipt = (memberObj) => {
    setReceiptMember(memberObj);
    setIsReceiptModalOpen(true);
  };

  const handleInjectDemoData = () => {
    const demoMembers = generateDemoMembers();
    setMembers(demoMembers);
    setCurrentPortalMember(demoMembers[0]);
  };

  const handleResetData = () => {
    setMembers(INITIAL_MEMBERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setLeads(INITIAL_LEADS);
    setGymDetails(GYM_DETAILS);
    setCurrentUser(null);
    setCurrentPortalMember(INITIAL_MEMBERS[0]);
  };

  const handleOwnerLogin = (username, password) => {
    const inputUser = username.toLowerCase().trim();
    if (
      (inputUser === 'ravi' && password === 'Energie@2026') ||
      (inputUser === 'dhruviii' && password === 'Dhrisha@130723')
    ) {
      setIsAdminUnlocked(true);
      setActiveRole('admin');
      setIsAdminLoginOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }
    return false;
  };

  const handleRoleChange = (role) => {
    if (role === 'admin' && !isAdminUnlocked) {
      setActiveRole('admin');
      setIsAdminLoginOpen(true);
      return;
    }
    setActiveRole(role);
  };

  const handleLogoutAdmin = () => {
    setIsAdminUnlocked(false);
    setActiveRole('visitor');
    handleNavigate('home');
  };

  // Root Storage Update
  const handleUpdateStorageKey = (key, data) => {
    if (key === 'members') setMembers(data);
    if (key === 'transactions') setTransactions(data);
    if (key === 'leads') setLeads(data);
    if (key === 'gymDetails') setGymDetails(data);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-[#FFE600] selection:text-black font-['Plus_Jakarta_Sans']">
      
      {/* Primary Header Navigation */}
      <Navbar 
        activeRole={activeRole} 
        setActiveRole={handleRoleChange} 
        currentView={currentView}
        setCurrentView={handleNavigate}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenPoliciesModal={() => setIsPoliciesModalOpen(true)}
        currentUser={currentUser}
        onUserLogout={handleUserLogout}
        onLogoutAdmin={handleLogoutAdmin}
        isAdminUnlocked={isAdminUnlocked}
      />

      {/* VIEW ROLE 1: PUBLIC BRAND SITE */}
      {activeRole === 'visitor' && (
        <main className="w-full max-w-full overflow-x-hidden grow space-y-0">
          
          {/* HOME VIEW */}
          {currentView === 'home' && (
            <>
              <HeroSlider 
                onOpenTrialModal={() => setIsTrialModalOpen(true)}
                onNavigateToPlans={() => {
                  handleNavigate('membership');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
              <Services 
                services={gymDetails?.services} 
                onOpenTrialModal={() => setIsTrialModalOpen(true)} 
              />
              <YouTubeShowcase />
              <TrainerRavi onOpenTrialModal={() => setIsTrialModalOpen(true)} />
              <ClassTimetable onOpenTrialModal={() => setIsTrialModalOpen(true)} />
              <ClubGallery />
              <Pricing 
                plans={gymDetails?.plans} 
                onSelectPlan={handleSelectPlan} 
              />
              <BmiCalculator onSelectPlan={handleSelectPlan} />
              <ClientStories />
              <LocationSchedule />
            </>
          )}

          {/* TRAIN WITH US VIEW */}
          {currentView === 'train-with-us' && (
            <TrainWithUsView onOpenTrialModal={() => setIsTrialModalOpen(true)} />
          )}

          {/* MEMBERSHIPS VIEW */}
          {currentView === 'membership' && (
            <MembershipView 
              plans={gymDetails?.plans}
              specialOffers={gymDetails?.specialOffers}
              onSelectPlan={handleSelectPlan} 
              onOpenTrialModal={() => setIsTrialModalOpen(true)}
            />
          )}

          {/* TRY US VIEW */}
          {currentView === 'try-us' && (
            <TryUsView onAddLead={handleAddLead} />
          )}

          {/* CLUB FINDER VIEW */}
          {currentView === 'club-finder' && (
            <ClubFinderView onOpenTrialModal={() => setIsTrialModalOpen(true)} />
          )}

          {/* ABOUT US VIEW */}
          {currentView === 'about' && (
            <AboutUsView onOpenTrialModal={() => setIsTrialModalOpen(true)} />
          )}

          {/* POLICIES VIEW */}
          {currentView === 'policies' && (
            <PoliciesView />
          )}

        </main>
      )}

      {/* VIEW ROLE 2: MEMBER PORTAL */}
      {activeRole === 'member' && (
        <main className="w-full max-w-full overflow-x-hidden grow">
          <MemberPortal 
            member={currentUser || currentPortalMember} 
            members={members}
            posts={posts}
            setPosts={setPosts}
            friends={friends}
            setFriends={setFriends}
            onRenewPlan={(m) => {
              setSelectedPlanForCheckout(null);
              setIsCheckoutModalOpen(true);
            }}
            onViewReceipt={handleViewReceipt}
            onRecordAttendance={handleRecordAttendance}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        </main>
      )}

      {/* VIEW ROLE 3: OWNER DASHBOARD */}
      {activeRole === 'admin' && isAdminUnlocked && (
        <main className="w-full max-w-full overflow-x-hidden grow">
          <AdminDashboard 
            members={members} 
            setMembers={setMembers}
            transactions={transactions}
            setTransactions={setTransactions}
            leads={leads}
            setLeads={setLeads}
            gymDetails={gymDetails}
            setGymDetails={setGymDetails}
            onViewReceipt={handleViewReceipt}
            onResetData={handleResetData}
            onInjectDemoData={handleInjectDemoData}
          />
        </main>
      )}

      {/* FOOTER */}
      <FitnessFirstFooter 
        setCurrentView={handleNavigate}
        setActiveRole={handleRoleChange}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
      />

      {/* MODALS */}
      <FreeTrialModal 
        isOpen={isTrialModalOpen} 
        onClose={() => setIsTrialModalOpen(false)} 
        onAddLead={handleAddLead}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        existingMembers={members}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        plan={selectedPlanForCheckout}
        onCompletePayment={handleCompletePayment}
      />

      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        member={receiptMember}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLogin={handleOwnerLogin}
      />

      <PoliciesModal
        isOpen={isPoliciesModalOpen}
        onClose={() => setIsPoliciesModalOpen(false)}
        policies={gymDetails?.gymPolicies}
      />

      {/* Hidden Root User System Entry Point (Requirement 2) */}
      <RootPortalModal
        isOpen={currentView === 'root-portal'}
        onClose={() => handleNavigate('home')}
        storageData={{ members, transactions, leads, gymDetails, posts }}
        onUpdateStorageData={handleUpdateStorageKey}
        onResetAll={handleResetData}
      />

    </div>
  );
}
