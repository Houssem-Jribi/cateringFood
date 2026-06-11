import { IMG } from "./images";

/* ------------------------------------------------------------------ */
/* Corporate Events Catering — the only service. 10 corporate use cases */
/* ------------------------------------------------------------------ */
export const SERVICES = [
  {
    id: "business-meetings",
    title: "Business Meetings",
    icon: "🤝",
    image: IMG.avocadoToast,
    description:
      "Curated boardroom menus that keep discussions sharp — elegant, quiet service and zero disruption.",
  },
  {
    id: "office-lunches",
    title: "Office Lunches",
    icon: "🍱",
    image: IMG.saladBowls,
    description:
      "Daily or weekly team lunches that employees genuinely look forward to. Fresh, varied, reliable.",
  },
  {
    id: "conferences",
    title: "Conferences",
    icon: "🎤",
    image: IMG.eventTables,
    description:
      "Full-day catering for large audiences — synchronized with your agenda from welcome coffee to close.",
  },
  {
    id: "seminars",
    title: "Seminars & Trainings",
    icon: "📋",
    image: IMG.coffee,
    description:
      "Clean, focused refreshment service that keeps attendees energized through long learning sessions.",
  },
  {
    id: "product-launches",
    title: "Product Launches",
    icon: "🚀",
    image: IMG.canapes,
    description:
      "Premium canapés and signature presentation that match the moment your brand steps on stage.",
  },
  {
    id: "networking-events",
    title: "Networking Events",
    icon: "🌐",
    image: IMG.cheeseBoard,
    description:
      "Sophisticated finger food and grazing tables designed to keep conversations flowing effortlessly.",
  },
  {
    id: "executive-meetings",
    title: "Executive Meetings",
    icon: "👔",
    image: IMG.fineDining,
    description:
      "White-glove, C-suite-level service — multi-course plating, premium tableware, discreet staff.",
  },
  {
    id: "coffee-breaks",
    title: "Coffee Breaks",
    icon: "☕",
    image: IMG.croissants,
    description:
      "Specialty coffee, artisan pastries, and refresh stations placed exactly when your schedule needs them.",
  },
  {
    id: "company-celebrations",
    title: "Company Celebrations",
    icon: "🏆",
    image: IMG.dessert,
    description:
      "Milestones, anniversaries, and award nights catered with a premium buffet your whole company remembers.",
  },
  {
    id: "team-events",
    title: "Team Events",
    icon: "🎯",
    image: IMG.grillPlatter,
    description:
      "Relaxed, vibrant menus for team days and offsites — global cuisine stations, BBQ, and sharing platters.",
  },
];

/* ------------------------------------------------------------------ */
/* Corporate Menu Packages                                              */
/* ------------------------------------------------------------------ */
export const PACKAGES = [
  {
    name: "Executive Breakfast",
    image: IMG.croissants,
    description: "Artisan pastries, smoked salmon, seasonal fruit, and specialty coffee to start the business day strong.",
    eventType: "Board meetings · Leadership breakfasts",
    serves: "10–50 guests",
    dietary: ["Vegetarian", "Gluten-free option"],
  },
  {
    name: "Business Lunch",
    image: IMG.saladBowls,
    description: "Gourmet sandwiches, composed salads, and warm mains — individually boxed or family style.",
    eventType: "Client meetings · Office lunches",
    serves: "10–200 guests",
    dietary: ["Vegetarian", "Halal"],
  },
  {
    name: "Corporate Buffet",
    image: IMG.eventTables,
    description: "Hot mains, carving stations, salad bar, and a dessert table — scaled for serious headcounts.",
    eventType: "Conferences · Large events",
    serves: "50–1000 guests",
    dietary: ["All diets catered"],
  },
  {
    name: "Coffee Break Package",
    image: IMG.coffee,
    description: "Specialty coffee and tea, mini pastries, fruit skewers, and energy bites between sessions.",
    eventType: "Seminars · Trainings",
    serves: "10–500 guests",
    dietary: ["Vegan option"],
  },
  {
    name: "Finger Food & Canapés",
    image: IMG.canapes,
    description: "Hand-crafted canapés — truffle crostini, blinis, vegetable tartlets — built for mingling.",
    eventType: "Launches · Networking",
    serves: "20–300 guests",
    dietary: ["Vegetarian option"],
  },
  {
    name: "Healthy Team Meals",
    image: IMG.greenSalad,
    description: "Nutritionist-approved bowls, lean proteins, and superfood salads for recurring office catering.",
    eventType: "Recurring office lunches",
    serves: "10–150 guests",
    dietary: ["Vegan", "Gluten-free"],
  },
  {
    name: "Premium Platters",
    image: IMG.steakPlates,
    description: "Signature sharing platters: seasonal roasts, grain salads, dips, and artisan breads.",
    eventType: "Team events · Celebrations",
    serves: "15–100 guests",
    dietary: ["Halal available"],
  },
  {
    name: "Drinks & Refreshments",
    image: IMG.fruit,
    description: "Fresh juices, infused waters, smoothies, and barista-grade coffee service for any agenda.",
    eventType: "All corporate events",
    serves: "10–1000 guests",
    dietary: ["Sugar-free options"],
  },
  {
    name: "Dessert Platters",
    image: IMG.dessert,
    description: "Mini pâtisserie, seasonal tarts, and chocolate work — an elegant close to any business event.",
    eventType: "Celebrations · Receptions",
    serves: "15–300 guests",
    dietary: ["Nut-free option"],
  },
];

/* ------------------------------------------------------------------ */
export const STATS = [
  { value: 500, suffix: "+", label: "Corporate Events Served" },
  { value: 50000, suffix: "+", label: "Business Guests Catered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "h", label: "Quote Response" },
  { value: 100, suffix: "+", label: "Custom Menus Created" },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "HR Manager",
    company: "TechCorp Solutions",
    event: "Annual Company Conference",
    rating: 5,
    review:
      "Platter Catering made our annual conference feel premium and perfectly organized. The food arrived on time, presentation was flawless, and our 300 employees raved about the menu. We've booked them for every major event since.",
    avatar: "SM",
  },
  {
    name: "Marcus Webb",
    role: "Office Manager",
    company: "Summit Advisory Group",
    event: "Recurring Office Lunches",
    rating: 5,
    review:
      "Organizing weekly catering for 80 people used to be stressful. With Platter it's effortless — dietary requirements, on-time delivery, professional setup, all handled. Our team loves Mondays now.",
    avatar: "MW",
  },
  {
    name: "Elena Vasquez",
    role: "Event Coordinator",
    company: "InnovateMed",
    event: "Product Launch Event",
    rating: 5,
    review:
      "Our product launch had 150 guests and Platter Catering delivered beyond expectations. The canapés were extraordinary, service was seamless, and the branded setup looked incredible.",
    avatar: "EV",
  },
  {
    name: "Priya Sharma",
    role: "Executive Assistant",
    company: "GlobalTech Enterprises",
    event: "Board Meetings & Executive Lunches",
    rating: 5,
    review:
      "The attention to detail, the quality of ingredients, and the discreet professional setup give exactly the right impression to our executive guests. Booking and invoicing are completely painless.",
    avatar: "PS",
  },
  {
    name: "James Okafor",
    role: "Operations Manager",
    company: "Nexus Capital Group",
    event: "Quarterly Town Halls",
    rating: 5,
    review:
      "We scaled from 40 to 400 guests across our quarterly town halls and Platter never missed a beat. Consistent quality, transparent quotes, and a single account manager who knows our needs.",
    avatar: "JO",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How far in advance should a company book catering?",
    answer:
      "We recommend booking at least 5–7 business days in advance for standard events. For large conferences (100+ guests) or complex requirements, 2–3 weeks notice ensures optimal preparation. We accommodate last-minute bookings when capacity allows.",
  },
  {
    question: "Do you provide recurring office catering?",
    answer:
      "Absolutely. Many of our clients use us for daily, weekly, or monthly office meal programs. Recurring contracts include dedicated account management, consistent quality, rotating menus, and streamlined consolidated invoicing.",
  },
  {
    question: "Can we request a custom corporate menu?",
    answer:
      "Yes — custom menus are our specialty. During the quote process our culinary team works with your company to build a menu that fits your brand, guests' preferences, dietary requirements, and budget.",
  },
  {
    question: "Do you offer vegetarian, vegan, or gluten-free options?",
    answer:
      "Every package can accommodate vegetarian, vegan, gluten-free, halal, kosher, nut-free, and other dietary requirements. Specify your needs in the booking form and we'll make sure every guest is catered for.",
  },
  {
    question: "Can you handle large corporate events?",
    answer:
      "Yes. We cater events from 10 to 1,000+ guests, with dedicated teams for large-scale conferences and conventions. Our logistics infrastructure guarantees consistent quality regardless of event size.",
  },
  {
    question: "Do you provide invoices for companies?",
    answer:
      "Yes. We offer full B2B invoicing with company-friendly payment terms. Every booking receives a formal quote, contract, and tax-compliant invoice — with consolidated monthly billing available for recurring clients.",
  },
  {
    question: "Do you offer delivery and setup?",
    answer:
      "We offer three service tiers: Delivery Only (ready to serve), Delivery + Setup (we arrange the full spread), and Full-Service Catering (setup, service staff, and cleanup included). Choose what suits your event.",
  },
  {
    question: "How does the quote process work?",
    answer:
      "Fill out our corporate quote form with your event details, guest count, dietary needs, and service preferences. Our team reviews your requirements and sends a detailed, itemized B2B quote within 24 hours — no obligation.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell Us About Your Company",
    description: "Share your company details, contact person, and the corporate event you're planning.",
    icon: "🏢",
  },
  {
    step: "02",
    title: "Choose Your Catering Package",
    description: "Select breakfast, business lunch, buffet, coffee break — or start from a blank menu.",
    icon: "📦",
  },
  {
    step: "03",
    title: "Customize Your Menu",
    description: "Set guest count, dietary preferences, and tailor every detail to your company's needs.",
    icon: "🥗",
  },
  {
    step: "04",
    title: "Receive a Custom Quote",
    description: "Get a professional B2B quote within 24 hours — itemized, transparent, invoice-ready.",
    icon: "📄",
  },
  {
    step: "05",
    title: "Confirm Your Booking",
    description: "Review and confirm event date, location, service type, and any final adjustments.",
    icon: "✅",
  },
  {
    step: "06",
    title: "Enjoy a Seamless Corporate Event",
    description: "We handle delivery, setup, and service — you focus entirely on your business.",
    icon: "🥂",
  },
];

export const WHY_US = [
  { icon: "⏱️", title: "Reliable Delivery", description: "On time, every time. We've never missed a corporate event window." },
  { icon: "🎨", title: "Professional Presentation", description: "Every platter is styled to impress clients, guests, and leadership." },
  { icon: "🌿", title: "Fresh Ingredients", description: "Sourced daily from trusted suppliers — no frozen shortcuts." },
  { icon: "📋", title: "Custom Corporate Menus", description: "Tailored to your company, guests, and event. No template menus." },
  { icon: "🥗", title: "Dietary Flexibility", description: "Vegan, vegetarian, gluten-free, halal, kosher — every guest covered." },
  { icon: "💼", title: "Easy B2B Quote Process", description: "One form, one account manager, a detailed quote within 24 hours." },
  { icon: "🧾", title: "Invoice-Friendly Service", description: "Formal quotes, flexible payment terms, consolidated monthly billing." },
  { icon: "🔄", title: "Built for Recurring Catering", description: "Weekly or monthly office programs — seamless, consistent, reliable." },
];
