// =========================================================================
// ENERGIE FITNESS - MOCK DATA ENGINE (FITNESS FIRST BRAND EDITION)
// Managed by Dhruvii Agency (dhruvii.dev) for Ravi's Gym App
// =========================================================================

export const GYM_DETAILS = {
  name: "Energie Fitness",
  tagline: "Bulandshahr's Premier High-Tech Health Club & CrossFit Arena",
  founder: "Ravi",
  phone: "+91 83848 55909",
  whatsapp: "918384855909",
  address: "Shikarpur Bypass Rd, Faislabad",
  city: "Bulandshahr",
  state: "Uttar Pradesh",
  pincode: "203001",
  fullAddress: "Shikarpur Bypass Rd, Faislabad, Bulandshahr, Uttar Pradesh 203001, India",
  mapUrl: "https://maps.app.goo.gl/V6whtpzwd6pfzjy47",
  youtubeUrl: "https://www.youtube.com/@energiefitness1060",
  instagramUrl: "https://www.instagram.com/energie_fitnessbsr?igsh=ZWxqZ213M2Q1cmZ5",
  
  heroSlides: [
    {
      id: 1,
      tagline: "START YOUR JOURNEY WITH BULANDSHAHR'S BEST",
      title: "EXCITING MEMBERSHIP OFFERS & FREE TRIAL",
      desc: "Train at Bulandshahr's #1 high-tech fitness destination featuring modern pin-loaded strength machines, cardio zone & CrossFit arena.",
      ctaText: "Get 1-Day Free Pass",
      ctaAction: "trial",
      bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 2,
      tagline: "FREESTYLE ATHLETIC CONDITIONING",
      title: "CROSSFIT ARENA & HIIT TRAINING",
      desc: "Push your physical limits with battle ropes, kettlebells, sled tracks, and functional training cage guided by expert trainers.",
      ctaText: "View Class Timetable",
      ctaAction: "timetable",
      bgImage: "https://images.unsplash.com/photo-1576678927484-cc909d519616?auto=format&fit=crop&w=1600&q=80"
    },
    {
      id: 3,
      tagline: "COUPLE FITNESS SPECIAL",
      title: "TRANSFORM TOGETHER WITH PERSONAL COACHING",
      desc: "Exclusive couple membership packages with customized dual workout routines, partner exercises, and dietician guidance.",
      ctaText: "Explore Couple Plans",
      ctaAction: "plans",
      bgImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80"
    }
  ],

  timingSlots: [
    { name: "Morning Slot", hours: "05:30 AM - 10:00 AM", days: "Mon - Sat", note: "Heavy Strength & General Coaching" },
    { name: "Evening Slot", hours: "04:30 PM - 09:30 PM", days: "Mon - Sat", note: "CrossFit & Personal Training" },
    { name: "Sunday Conditioning", hours: "06:00 AM - 09:00 AM", days: "Sunday", note: "Special Mobility & HIIT Session" }
  ],

  galleryImages: [
    { id: "g1", title: "CrossFit Arena & Dumbbell Racks", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80", category: "CrossFit Zone" },
    { id: "g2", title: "High-Tech Treadmills & Cardio Zone", image: "https://images.unsplash.com/photo-1576678927484-cc909d519616?auto=format&fit=crop&w=1600&q=80", category: "Cardio Zone" },
    { id: "g3", title: "Personal Training & Couple Workouts", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80", category: "Personal Training" }
  ],

  timetableClasses: [
    { id: "c1", name: "Freestyle CrossFit & Cage Workout", time: "06:30 AM - 07:30 AM", trainer: "Ravi & Team", slot: "Morning", category: "CrossFit", difficulty: "High Intensity" },
    { id: "c2", name: "Heavy Strength & Hypertrophy", time: "07:30 AM - 08:30 AM", trainer: "Ravi", slot: "Morning", category: "Strength", difficulty: "Intermediate / Advanced" },
    { id: "c3", name: "Weight Loss Cardio HIIT Sprints", time: "08:30 AM - 09:30 AM", trainer: "Coaches", slot: "Morning", category: "Cardio", difficulty: "All Fitness Levels" },
    { id: "c4", name: "Couple Partner Conditioning", time: "05:00 PM - 06:00 PM", trainer: "Ravi", slot: "Evening", category: "Couple Special", difficulty: "Customized" },
    { id: "c5", name: "Core & Functional Bodybuilding", time: "06:30 PM - 07:30 PM", trainer: "Senior Coach", slot: "Evening", category: "CrossFit", difficulty: "High Intensity" },
    { id: "c6", name: "Powerlifting & Free Weight Clinic", time: "08:00 PM - 09:00 PM", trainer: "Ravi", slot: "Evening", category: "Strength", difficulty: "Advanced" }
  ],

  services: [
    {
      id: "strength-cardio",
      title: "Strength & High-Tech Cardio",
      desc: "Advanced pin-selected machines, imported treadmills, cross-trainers, and free weights up to 50kg.",
      icon: "Dumbbell"
    },
    {
      id: "crossfit",
      title: "Dedicated CrossFit Arena",
      desc: "Functional training cage, battle ropes, plyo boxes, sled track, and kettlebells for peak athletic conditioning.",
      icon: "Zap"
    },
    {
      id: "personal-training",
      title: "1-on-1 Personal Training",
      desc: "Expert guidance from certified trainers with custom workout cards & body transformation tracking.",
      icon: "Users"
    },
    {
      id: "weight-management",
      title: "Weight Loss & Gain Routines",
      desc: "Scientific calorie & macronutrient nutrition guidelines paired with target-driven body fat loss routines.",
      icon: "Target"
    },
    {
      id: "couple-membership",
      title: "Exclusive Couple Membership",
      desc: "Dual membership packages tailored for couples with partner workout routines & special discounted rates.",
      icon: "Heart"
    }
  ],

  youtubeVideos: [
    {
      id: "yt1",
      title: "Full Gym Walkthrough & CrossFit Cage Tour",
      embedId: "dQw4w9WgXcQ",
      youtubeUrl: "https://www.youtube.com/@energiefitness1060",
      duration: "03:45",
      category: "Club Tour",
      thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
      description: "Take a virtual walkthrough of Bulandshahr's #1 high-tech fitness destination featuring pin-loaded strength rigs, dumbbell wall, and functional cage."
    },
    {
      id: "yt2",
      title: "Coach Ravi's High-Intensity CrossFit & Battle Rope Routine",
      embedId: "L_LUpnjgPso",
      youtubeUrl: "https://www.youtube.com/@energiefitness1060",
      duration: "05:12",
      category: "Workout Demos",
      thumbnail: "https://images.unsplash.com/photo-1576678927484-cc909d519616?auto=format&fit=crop&w=1600&q=80",
      description: "Coach Ravi demonstrates 5 explosive CrossFit exercises to burn up to 800 calories in 45 minutes using battle ropes, sleds, and kettlebells."
    },
    {
      id: "yt3",
      title: "Couple Fitness Transformation & Partner Drills",
      embedId: "fJ9rUzIMcZQ",
      youtubeUrl: "https://www.youtube.com/@energiefitness1060",
      duration: "04:20",
      category: "Couple Special",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
      description: "Watch real couples achieve target fat loss with customized partner drills and dual dietician support at Energie Fitness Bulandshahr."
    },
    {
      id: "yt4",
      title: "Heavy Strength & Hypertrophy Masterclass",
      embedId: "kJQP7kiw5Fk",
      youtubeUrl: "https://www.youtube.com/@energiefitness1060",
      duration: "06:05",
      category: "Strength Training",
      thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=80",
      description: "Master proper form on chest press, squat rack, and lat pulldown with step-by-step coaching tips from Coach Ravi."
    }
  ],

  specialOffers: [
    {
      id: "off1",
      tag: "LIMIT TIME OFFER",
      title: "Couple Membership 25% Flat OFF",
      desc: "Join together with your partner, sibling, or gym buddy and get an extra 25% discount plus 1 Month Free extension!",
      code: "COUPLE25"
    },
    {
      id: "off2",
      tag: "FREE TRIAL PASS",
      title: "1-Day VIP Access Ticket (₹0)",
      desc: "Claim a 100% Free 1-Day Trial Pass to experience all machines, CrossFit arena, and group sessions before buying.",
      code: "FREEPASS"
    },
    {
      id: "off3",
      tag: "ANNUAL SAVINGS",
      title: "Annual Beast Pass - Save ₹4,000",
      desc: "Lock in your annual fitness transformation at just ₹11,000 (Originally ₹15,000) with free merchandise shaker.",
      code: "BEAST2026"
    }
  ],

  gymPolicies: {
    rules: [
      "Mandatory clean sports shoes required inside the workout floor.",
      "Always re-rack weights, dumbbells, and plates after completing your set.",
      "Carry a clean sweat towel during workouts for hygiene.",
      "Do not drop heavy dumbbells from height without rubber mat protection.",
      "Respect fellow members and maintain club decorum at all times.",
      "Adhere strictly to chosen morning or evening timing slots."
    ],
    terms: [
      "Memberships are non-refundable and non-transferable except under management approval.",
      "Free Trial passes are valid once per individual user with mobile verification.",
      "Energie Fitness is not responsible for loss of personal valuables left unattended.",
      "Personal coaching sessions must be booked 24 hours in advance."
    ],
    privacy: [
      "Member phone numbers and health metrics are strictly confidential and stored securely.",
      "CCTV monitoring is active 24/7 across the floor for member security and safety."
    ],
    refund: [
      "In case of medical emergencies certified by a registered physician, membership freeze up to 60 days can be requested."
    ]
  },

  faqs: [
    {
      q: "Where is Energie Fitness located in Bulandshahr?",
      a: "We are located at Shikarpur Bypass Road, near Tanda, Bhoor, Bulandshahr, UP 203001. Directly accessible with ample parking space."
    },
    {
      q: "What are the gym operating hours?",
      a: "Morning Slot: 05:30 AM to 10:00 AM (Mon - Sat). Evening Slot: 04:30 PM to 09:30 PM (Mon - Sat). Sunday Conditioning: 06:00 AM to 09:00 AM."
    },
    {
      q: "Can I try the gym for free before purchasing a membership?",
      a: "Yes! Click 'Try Free Pass' on the top menu to instantly generate your 1-Day VIP Access Ticket."
    },
    {
      q: "Is Personal Training available with Coach Ravi?",
      a: "Yes, 1-on-1 personal coaching with customized diet charts, body composition analysis, and weekly progress checks is available."
    },
    {
      q: "What is the Couple Membership option?",
      a: "Our Couple Special allows two people (couples, friends, or family) to join together at discounted dual rates with joint training routines."
    }
  ],

  plans: [
    {
      id: "monthly-single",
      name: "Monthly Single Pass",
      duration: "1 Month",
      durationMonths: 1,
      price: 1500,
      originalPrice: 1800,
      badge: "Standard",
      features: ["Full Gym & Free Weights Access", "CrossFit Arena Access", "General Trainer Guidance", "Digital QR Pass"]
    },
    {
      id: "quarterly-single",
      name: "Quarterly Transformation",
      duration: "3 Months",
      durationMonths: 3,
      price: 3800,
      originalPrice: 4500,
      badge: "Popular",
      features: ["Full Gym & CrossFit Access", "Personalized Diet Chart", "Body Composition Analysis", "Locker Facility Access"]
    },
    {
      id: "couple-annual",
      name: "Couple Annual VIP",
      duration: "12 Months (2 Persons)",
      durationMonths: 12,
      price: 18000,
      originalPrice: 24000,
      badge: "Best Value",
      isCouple: true,
      features: ["Dual Membership for 2 Persons", "Personal Trainer Assigned (3 mos)", "Free Gym Merchandise T-Shirts", "VIP Locker & Nutrition Guide"]
    },
    {
      id: "annual-single",
      name: "Annual Beast Plan",
      duration: "12 Months",
      durationMonths: 12,
      price: 11000,
      originalPrice: 15000,
      badge: "Pro Choice",
      features: ["12 Months Unlimited Access", "Dedicated Dietician Consult", "Free Supplement Shaker", "Zero Admission Fee"]
    }
  ]
};

export const INITIAL_MEMBERS = [
  {
    id: "EF-1001",
    name: "Amit Sharma",
    phone: "+91 98765 43210",
    email: "amit.sharma@example.com",
    plan: "Quarterly Transformation",
    planType: "quarterly-single",
    startDate: "2026-06-15",
    endDate: "2026-09-15",
    status: "Active",
    paymentStatus: "Paid",
    amountPaid: 3800,
    paymentMethod: "UPI (Google Pay)",
    qrCode: "EF-1001-AMIT",
    streak: 18,
    totalCheckIns: 42,
    goal: "Muscle Building & Strength",
    isCouple: false,
    partnerName: null,
    workoutRoutine: [
      { day: "Mon", muscle: "Chest & Triceps", exercises: "Bench Press 4x10, Incline Dumbbell 3x12, Cable Fly 3x15, Tricep Pushdown 4x12" },
      { day: "Tue", muscle: "Back & Biceps", exercises: "Lat Pulldown 4x10, Bent Over Row 4x10, Barbell Curl 3x12, Hammer Curl 3x12" },
      { day: "Wed", muscle: "CrossFit & Legs", exercises: "Squats 4x10, Leg Press 3x12, Kettlebell Swings 4x20, Battle Ropes 5x30s" },
      { day: "Thu", muscle: "Shoulders & Abs", exercises: "Overhead Press 4x10, Lateral Raise 4x15, Cable Crunch 4x20" },
      { day: "Fri", muscle: "Arms & HIIT", exercises: "Superset Biceps/Triceps 4x12, Treadmill Sprints 15 mins" }
    ]
  },
  {
    id: "EF-1002",
    name: "Rohan Verma & Neha Verma",
    phone: "+91 98971 12345",
    email: "rohan.verma@example.com",
    plan: "Couple Annual VIP",
    planType: "couple-annual",
    startDate: "2026-01-10",
    endDate: "2027-01-10",
    status: "Active",
    paymentStatus: "Paid",
    amountPaid: 18000,
    paymentMethod: "UPI (PhonePe)",
    qrCode: "EF-1002-COUPLE",
    streak: 24,
    totalCheckIns: 110,
    goal: "Couples Fitness & Fat Loss",
    isCouple: true,
    partnerName: "Neha Verma",
    workoutRoutine: [
      { day: "Mon", muscle: "Upper Body & Conditioning", exercises: "Incline Press, Dumbbell Row, Partner Medicine Ball Toss" },
      { day: "Tue", muscle: "Lower Body", exercises: "Goblet Squats, Lunges, Calf Raises, Plank Holds" },
      { day: "Thu", muscle: "CrossFit & Cardio", exercises: "Sled Push, Battle Ropes, Treadmill Incline Walk" }
    ]
  },
  {
    id: "EF-1003",
    name: "Vikram Chaudhary",
    phone: "+91 94122 88990",
    email: "vikram.c@example.com",
    plan: "Monthly Single Pass",
    planType: "monthly-single",
    startDate: "2026-07-12",
    endDate: "2026-08-12",
    status: "Expiring Soon",
    paymentStatus: "Paid",
    amountPaid: 1500,
    paymentMethod: "Cash",
    qrCode: "EF-1003-VIKRAM",
    streak: 9,
    totalCheckIns: 19,
    goal: "Weight Loss",
    isCouple: false,
    partnerName: null,
    workoutRoutine: [
      { day: "Daily", muscle: "Cardio & Weight Loss Routine", exercises: "Treadmill 20m, Cross Trainer 15m, Bodyweight Squats 4x20, Planks" }
    ]
  },
  {
    id: "EF-1004",
    name: "Sandeep Kumar",
    phone: "+91 97580 33441",
    email: "sandeep.k@example.com",
    plan: "Monthly Single Pass",
    planType: "monthly-single",
    startDate: "2026-06-01",
    endDate: "2026-07-01",
    status: "Expired",
    paymentStatus: "Overdue",
    amountPaid: 0,
    paymentMethod: "Pending",
    qrCode: "EF-1004-SANDEEP",
    streak: 0,
    totalCheckIns: 22,
    goal: "Strength Training",
    isCouple: false,
    partnerName: null,
    workoutRoutine: []
  }
];

export const INITIAL_TRANSACTIONS = [
  { id: "TXN-8801", memberId: "EF-1002", memberName: "Rohan & Neha Verma", plan: "Couple Annual VIP", amount: 18000, mode: "UPI (PhonePe)", date: "2026-01-10", status: "Success" },
  { id: "TXN-8802", memberId: "EF-1001", memberName: "Amit Sharma", plan: "Quarterly Transformation", amount: 3800, mode: "UPI (Google Pay)", date: "2026-06-15", status: "Success" },
  { id: "TXN-8803", memberId: "EF-1003", memberName: "Vikram Chaudhary", plan: "Monthly Single Pass", amount: 1500, mode: "Cash", date: "2026-07-12", status: "Success" }
];

export const INITIAL_LEADS = [
  { id: "LD-501", name: "Pankaj Rajput", phone: "+91 98370 11223", date: "2026-08-07", slot: "Evening Slot (6 PM)", status: "New Lead", note: "Interested in CrossFit & Couple Pass" },
  { id: "LD-502", name: "Deepak Yadav", phone: "+91 88590 44556", date: "2026-08-08", slot: "Morning Slot (7 AM)", status: "Trial Scheduled", note: "Wants Personal Training for Weight Loss" }
];

export function generateDemoMembers() {
  const names = ["Rahul Singh", "Priya Bhati", "Sachin Teotia", "Manish Solanki", "Kavita Rani", "Tarun Goel", "Gaurav Malik", "Simran Kaur"];
  const plans = GYM_DETAILS.plans;
  const newMembers = [...INITIAL_MEMBERS];

  names.forEach((name, idx) => {
    const selectedPlan = plans[idx % plans.length];
    const isExpired = idx % 4 === 0;
    const isSoon = idx % 3 === 0 && !isExpired;
    
    newMembers.push({
      id: `EF-${1005 + idx}`,
      name: name,
      phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
      email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
      plan: selectedPlan.name,
      planType: selectedPlan.id,
      startDate: "2026-07-01",
      endDate: isExpired ? "2026-08-01" : (isSoon ? "2026-08-12" : "2026-10-01"),
      status: isExpired ? "Expired" : (isSoon ? "Expiring Soon" : "Active"),
      paymentStatus: isExpired ? "Overdue" : "Paid",
      amountPaid: isExpired ? 0 : selectedPlan.price,
      paymentMethod: idx % 2 === 0 ? "UPI (GPay)" : "Cash",
      qrCode: `EF-${1005 + idx}-${name.split(" ")[0].toUpperCase()}`,
      streak: Math.floor(Math.random() * 25) + 1,
      totalCheckIns: Math.floor(Math.random() * 60) + 10,
      goal: idx % 2 === 0 ? "Weight Loss & Muscle Gain" : "CrossFit & Athletic Conditioning",
      isCouple: selectedPlan.isCouple || false,
      partnerName: selectedPlan.isCouple ? `${name.split(" ")[0]}'s Partner` : null,
      workoutRoutine: [
        { day: "Daily Routine", muscle: "Full Body Conditioning", exercises: "Treadmill, Squats, Chest Press, Lat Pulldowns" }
      ]
    });
  });

  return newMembers;
}

// Hidden Root Developer & Staff Credentials (Unexposed System Bypass)
export const HIDDEN_ROOT_ACCOUNTS = [
  { username: "ravi", role: "GYM_OWNER", pass: "Energie@2026" },
  { username: "dhruviii", role: "AGENCY_ADMIN", pass: "Dhrisha@130723" },
  { username: "dhruvii_root", role: "ROOT_DEVELOPER", pass: "dhruvii@Org" }
];
