"use client";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
type FormData = {
  // Step 1 — Company information
  companyName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  website: string;
  department: string;
  // Step 2 — Event details
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: string;
  guestCount: number;
  setting: "Indoor" | "Outdoor" | "";
  frequency: "One-time Event" | "Recurring Catering" | "";
  // Step 3 — Catering needs
  cateringPackage: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  otherDietary: string;
  drinks: boolean;
  dessert: boolean;
  // Step 4 — Service type
  serviceType: string;
  staffRequired: boolean;
  tableSetup: boolean;
  cleanup: boolean;
  // Step 5 — Budget & message
  budget: number;
  specialRequests: string;
  notes: string;
  contactMethod: string;
};

const INITIAL: FormData = {
  companyName: "",
  contactName: "",
  workEmail: "",
  phone: "",
  website: "",
  department: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  location: "",
  guestCount: 25,
  setting: "",
  frequency: "",
  cateringPackage: "",
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  otherDietary: "",
  drinks: false,
  dessert: false,
  serviceType: "",
  staffRequired: false,
  tableSetup: false,
  cleanup: false,
  budget: 3000,
  specialRequests: "",
  notes: "",
  contactMethod: "Email",
};

const STEPS = ["Company", "Event", "Catering", "Service", "Budget", "Review"];

const EVENT_TYPES = [
  "Business Meeting",
  "Office Lunch",
  "Conference",
  "Seminar / Training",
  "Product Launch",
  "Networking Event",
  "Executive Meeting",
  "Coffee Break",
  "Company Celebration",
  "Team Event",
];

const PACKAGES: { name: string; perHead: number }[] = [
  { name: "Executive Breakfast", perHead: 28 },
  { name: "Business Lunch", perHead: 34 },
  { name: "Corporate Buffet", perHead: 48 },
  { name: "Coffee Break Package", perHead: 16 },
  { name: "Finger Food & Canapés", perHead: 38 },
  { name: "Healthy Team Meals", perHead: 30 },
  { name: "Premium Platters", perHead: 42 },
  { name: "Drinks & Refreshments", perHead: 12 },
  { name: "Dessert Platters", perHead: 14 },
  { name: "Custom Menu", perHead: 40 },
];

const SERVICE_TYPES = [
  { name: "Delivery Only", note: "Food delivered ready to serve", factor: 1 },
  { name: "Delivery + Setup", note: "We arrange the full spread on site", factor: 1.15 },
  { name: "Full-Service Catering", note: "Setup, service staff & cleanup", factor: 1.35 },
];

const DEPARTMENTS = ["HR", "Office Management", "Events", "Executive Office", "Operations", "Marketing", "Other"];
const CONTACT_METHODS = ["Email", "Phone", "Either"];

const BUDGET_MIN = 500;
const BUDGET_MAX = 50000;

/* ------------------------------------------------------------------ */
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-[#263128]/55 mb-1.5">
        {label} {required && <span className="text-[#c96b3c]">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-[#d05a4e] mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl border-[1.5px] text-left text-sm font-medium transition-all duration-300 ${
        checked
          ? "border-[#4f6f52] bg-[#8faf8b]/12 text-[#2f4632]"
          : "border-[#263128]/12 bg-white text-[#263128]/65 hover:border-[#263128]/25"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center text-[11px] text-white transition-all duration-300 ${
          checked ? "bg-[#4f6f52] border-[#4f6f52]" : "border-[#263128]/25 bg-white"
        }`}
      >
        {checked && "✓"}
      </span>
      {label}
    </button>
  );
}

function CardSelect({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { name: string; note?: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  return (
    <div className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {options.map((opt) => (
        <button
          key={opt.name}
          type="button"
          onClick={() => onChange(opt.name)}
          className={`px-4 py-3.5 rounded-2xl border-[1.5px] text-left transition-all duration-300 ${
            value === opt.name
              ? "border-[#c96b3c] bg-[#c96b3c]/8 soft-shadow"
              : "border-[#263128]/12 bg-white hover:border-[#263128]/25 hover:-translate-y-0.5"
          }`}
        >
          <p className={`text-sm font-semibold ${value === opt.name ? "text-[#c96b3c]" : "text-[#263128]/75"}`}>
            {opt.name}
          </p>
          {opt.note && <p className="text-xs text-[#263128]/45 mt-0.5">{opt.note}</p>}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.workEmail);

  const errors: Record<string, string> = {};
  if (!data.companyName.trim()) errors.companyName = "Company name is required.";
  if (!data.contactName.trim()) errors.contactName = "Contact person is required.";
  if (!data.workEmail.trim()) errors.workEmail = "Work email is required.";
  else if (!emailValid) errors.workEmail = "Enter a valid work email address.";
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.eventType) errors.eventType = "Select an event type.";
  if (!data.eventDate) errors.eventDate = "Pick an event date.";
  if (!data.location.trim()) errors.location = "Event location is required.";
  if (!data.cateringPackage) errors.cateringPackage = "Choose a package.";
  if (!data.serviceType) errors.serviceType = "Choose a service type.";

  const stepValid = (s: number) => {
    if (s === 0) return !errors.companyName && !errors.contactName && !errors.workEmail && !errors.phone;
    if (s === 1) return !errors.eventType && !errors.eventDate && !errors.location;
    if (s === 2) return !errors.cateringPackage;
    if (s === 3) return !errors.serviceType;
    return true;
  };

  const showError = (key: string) => (touched[key] ? errors[key] : undefined);
  const touch = (key: string) => setTouched((t) => ({ ...t, [key]: true }));

  /* Instant estimate */
  const pkg = PACKAGES.find((p) => p.name === data.cateringPackage);
  const svc = SERVICE_TYPES.find((s) => s.name === data.serviceType);
  const extras = (data.drinks ? 6 : 0) + (data.dessert ? 5 : 0);
  const estimate = pkg
    ? Math.round(data.guestCount * (pkg.perHead + extras) * (svc?.factor ?? 1))
    : null;

  const next = () => {
    if (!stepValid(step)) {
      // surface errors of the current step
      const keysByStep: string[][] = [
        ["companyName", "contactName", "workEmail", "phone"],
        ["eventType", "eventDate", "location"],
        ["cateringPackage"],
        ["serviceType"],
      ];
      (keysByStep[step] ?? []).forEach(touch);
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  const budgetProgress = ((data.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  /* ------------------------------ success ------------------------------ */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-[#8faf8b]/20 border-2 border-[#4f6f52]/30 flex items-center justify-center mx-auto mb-6 text-3xl"
        >
          ✓
        </motion.div>
        <h3 className="font-display text-3xl text-[#263128] mb-4">Request Received</h3>
        <p className="text-[#263128]/65 max-w-md mx-auto leading-relaxed mb-8">
          Thank you. Your corporate catering request has been received. Our team
          will contact you shortly with a customized B2B quote.
        </p>
        <div className="card-surface rounded-3xl p-6 max-w-sm mx-auto text-left text-sm space-y-2.5">
          <p className="flex justify-between"><span className="text-[#263128]/50">Company</span><span className="font-medium">{data.companyName}</span></p>
          <p className="flex justify-between"><span className="text-[#263128]/50">Event</span><span className="font-medium">{data.eventType}</span></p>
          <p className="flex justify-between"><span className="text-[#263128]/50">Date</span><span className="font-medium">{data.eventDate}</span></p>
          <p className="flex justify-between"><span className="text-[#263128]/50">Guests</span><span className="font-medium">{data.guestCount}</span></p>
          {estimate && (
            <p className="flex justify-between border-t border-[#263128]/8 pt-2.5">
              <span className="text-[#263128]/50">Estimated from</span>
              <span className="font-semibold text-[#c96b3c]">${estimate.toLocaleString()}</span>
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  /* ------------------------------ form ------------------------------ */
  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute left-0 right-0 top-[15px] h-[2px] bg-[#263128]/10" />
        <motion.div
          className="absolute left-0 top-[15px] h-[2px] bg-[#c96b3c]"
          animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {STEPS.map((label, i) => (
          <div key={label} className="relative z-10 flex flex-col items-center gap-2">
            <motion.div
              animate={{
                scale: i === step ? 1.15 : 1,
                backgroundColor: i < step ? "#4f6f52" : i === step ? "#c96b3c" : "#ffffff",
                color: i <= step ? "#ffffff" : "rgba(38,49,40,0.4)",
                borderColor: i <= step ? "transparent" : "rgba(38,49,40,0.15)",
              }}
              transition={{ duration: 0.35 }}
              className="w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold"
            >
              {i < step ? "✓" : i + 1}
            </motion.div>
            <span
              className={`hidden md:block text-[11px] font-medium ${
                i === step ? "text-[#263128]" : "text-[#263128]/40"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ opacity: 0, x: direction * 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -48 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Company Name" required error={showError("companyName")}>
                <input
                  className={`input-light ${showError("companyName") ? "input-error" : ""}`}
                  value={data.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  onBlur={() => touch("companyName")}
                  placeholder="Acme Corp"
                />
              </Field>
              <Field label="Contact Person Full Name" required error={showError("contactName")}>
                <input
                  className={`input-light ${showError("contactName") ? "input-error" : ""}`}
                  value={data.contactName}
                  onChange={(e) => set("contactName", e.target.value)}
                  onBlur={() => touch("contactName")}
                  placeholder="Jane Smith"
                />
              </Field>
              <Field label="Work Email" required error={showError("workEmail")}>
                <input
                  type="email"
                  className={`input-light ${showError("workEmail") ? "input-error" : ""}`}
                  value={data.workEmail}
                  onChange={(e) => set("workEmail", e.target.value)}
                  onBlur={() => touch("workEmail")}
                  placeholder="jane@company.com"
                />
              </Field>
              <Field label="Phone Number" required error={showError("phone")}>
                <input
                  type="tel"
                  className={`input-light ${showError("phone") ? "input-error" : ""}`}
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onBlur={() => touch("phone")}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>
              <Field label="Company Website">
                <input
                  className="input-light"
                  value={data.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="https://company.com"
                />
              </Field>
              <Field label="Department">
                <select
                  className="input-light"
                  value={data.department}
                  onChange={(e) => set("department", e.target.value)}
                >
                  <option value="">Select department…</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Field label="Corporate Event Type" required error={showError("eventType")}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {EVENT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        set("eventType", t);
                        touch("eventType");
                      }}
                      className={`px-3 py-2.5 rounded-xl border-[1.5px] text-xs font-medium transition-all duration-300 ${
                        data.eventType === t
                          ? "border-[#c96b3c] bg-[#c96b3c]/8 text-[#c96b3c]"
                          : "border-[#263128]/12 bg-white text-[#263128]/60 hover:border-[#263128]/25"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Field label="Event Date" required error={showError("eventDate")}>
                  <input
                    type="date"
                    className={`input-light ${showError("eventDate") ? "input-error" : ""}`}
                    value={data.eventDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => set("eventDate", e.target.value)}
                    onBlur={() => touch("eventDate")}
                  />
                </Field>
                <Field label="Event Time">
                  <input
                    type="time"
                    className="input-light"
                    value={data.eventTime}
                    onChange={(e) => set("eventTime", e.target.value)}
                  />
                </Field>
                <Field label="Event Location" required error={showError("location")}>
                  <input
                    className={`input-light ${showError("location") ? "input-error" : ""}`}
                    value={data.location}
                    onChange={(e) => set("location", e.target.value)}
                    onBlur={() => touch("location")}
                    placeholder="Office address or venue"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
                <Field label="Number of Guests">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => set("guestCount", Math.max(5, data.guestCount - 5))}
                      className="w-11 h-11 rounded-xl border-[1.5px] border-[#263128]/15 bg-white text-lg font-semibold text-[#263128]/70 hover:border-[#c96b3c] hover:text-[#c96b3c] transition-colors"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <motion.span
                        key={data.guestCount}
                        initial={{ scale: 1.25, color: "#c96b3c" }}
                        animate={{ scale: 1, color: "#263128" }}
                        className="font-display text-3xl inline-block"
                      >
                        {data.guestCount}
                      </motion.span>
                    </div>
                    <button
                      type="button"
                      onClick={() => set("guestCount", Math.min(2000, data.guestCount + 5))}
                      className="w-11 h-11 rounded-xl border-[1.5px] border-[#263128]/15 bg-white text-lg font-semibold text-[#263128]/70 hover:border-[#c96b3c] hover:text-[#c96b3c] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </Field>
                <Field label="Setting">
                  <CardSelect
                    options={[{ name: "Indoor" }, { name: "Outdoor" }]}
                    value={data.setting}
                    onChange={(v) => set("setting", v as FormData["setting"])}
                  />
                </Field>
                <Field label="Frequency">
                  <CardSelect
                    options={[{ name: "One-time Event" }, { name: "Recurring Catering" }]}
                    value={data.frequency}
                    onChange={(v) => set("frequency", v as FormData["frequency"])}
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Field label="Catering Package" required error={showError("cateringPackage")}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {PACKAGES.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        set("cateringPackage", p.name);
                        touch("cateringPackage");
                      }}
                      className={`px-3 py-3 rounded-xl border-[1.5px] text-xs font-medium transition-all duration-300 text-left ${
                        data.cateringPackage === p.name
                          ? "border-[#c96b3c] bg-[#c96b3c]/8 text-[#c96b3c]"
                          : "border-[#263128]/12 bg-white text-[#263128]/60 hover:border-[#263128]/25"
                      }`}
                    >
                      {p.name}
                      <span className="block text-[10px] text-[#263128]/40 mt-0.5">
                        from ${p.perHead}/guest
                      </span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Dietary Requirements">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Toggle label="Vegetarian options" checked={data.vegetarian} onChange={(v) => set("vegetarian", v)} />
                  <Toggle label="Vegan options" checked={data.vegan} onChange={(v) => set("vegan", v)} />
                  <Toggle label="Gluten-free options" checked={data.glutenFree} onChange={(v) => set("glutenFree", v)} />
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Other Dietary Restrictions">
                  <input
                    className="input-light"
                    value={data.otherDietary}
                    onChange={(e) => set("otherDietary", e.target.value)}
                    placeholder="Halal, kosher, nut allergies…"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3 items-end">
                  <Toggle label="Drinks required" checked={data.drinks} onChange={(v) => set("drinks", v)} />
                  <Toggle label="Dessert required" checked={data.dessert} onChange={(v) => set("dessert", v)} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Field label="Service Type" required error={showError("serviceType")}>
                <CardSelect
                  options={SERVICE_TYPES}
                  value={data.serviceType}
                  onChange={(v) => {
                    set("serviceType", v);
                    touch("serviceType");
                  }}
                  columns={3}
                />
              </Field>
              <Field label="Additional Services">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Toggle label="Service staff required" checked={data.staffRequired} onChange={(v) => set("staffRequired", v)} />
                  <Toggle label="Table setup required" checked={data.tableSetup} onChange={(v) => set("tableSetup", v)} />
                  <Toggle label="Cleanup required" checked={data.cleanup} onChange={(v) => set("cleanup", v)} />
                </div>
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <Field label={`Estimated Budget Range — $${data.budget.toLocaleString()}`}>
                <input
                  type="range"
                  min={BUDGET_MIN}
                  max={BUDGET_MAX}
                  step={250}
                  value={data.budget}
                  onChange={(e) => set("budget", Number(e.target.value))}
                  className="budget-slider mt-2"
                  style={{ ["--slider-progress" as string]: `${budgetProgress}%` }}
                />
                <div className="flex justify-between text-xs text-[#263128]/40 mt-2">
                  <span>${BUDGET_MIN.toLocaleString()}</span>
                  <span>${BUDGET_MAX.toLocaleString()}+</span>
                </div>
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Special Requests">
                  <textarea
                    rows={4}
                    className="input-light resize-none"
                    value={data.specialRequests}
                    onChange={(e) => set("specialRequests", e.target.value)}
                    placeholder="Branded presentation, live stations, timing constraints…"
                  />
                </Field>
                <Field label="Additional Notes">
                  <textarea
                    rows={4}
                    className="input-light resize-none"
                    value={data.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Anything else our team should know…"
                  />
                </Field>
              </div>
              <Field label="Preferred Contact Method">
                <CardSelect
                  options={CONTACT_METHODS.map((m) => ({ name: m }))}
                  value={data.contactMethod}
                  onChange={(v) => set("contactMethod", v)}
                  columns={3}
                />
              </Field>
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-3 text-sm">
                <h4 className="font-display text-xl text-[#263128] mb-4">Review your request</h4>
                {(
                  [
                    ["Company", data.companyName],
                    ["Contact", `${data.contactName} · ${data.workEmail}`],
                    ["Phone", data.phone],
                    ["Department", data.department || "—"],
                    ["Event", data.eventType],
                    ["Date & time", `${data.eventDate} ${data.eventTime || ""}`],
                    ["Location", `${data.location}${data.setting ? ` (${data.setting})` : ""}`],
                    ["Frequency", data.frequency || "One-time Event"],
                    ["Guests", String(data.guestCount)],
                    ["Package", data.cateringPackage],
                    [
                      "Dietary",
                      [
                        data.vegetarian && "Vegetarian",
                        data.vegan && "Vegan",
                        data.glutenFree && "Gluten-free",
                        data.otherDietary,
                      ]
                        .filter(Boolean)
                        .join(", ") || "None specified",
                    ],
                    [
                      "Extras",
                      [data.drinks && "Drinks", data.dessert && "Dessert"].filter(Boolean).join(", ") || "—",
                    ],
                    ["Service", data.serviceType],
                    [
                      "Add-ons",
                      [data.staffRequired && "Staff", data.tableSetup && "Table setup", data.cleanup && "Cleanup"]
                        .filter(Boolean)
                        .join(", ") || "—",
                    ],
                    ["Budget", `$${data.budget.toLocaleString()}`],
                    ["Contact via", data.contactMethod],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6 border-b border-[#263128]/6 pb-2.5">
                    <span className="text-[#263128]/45">{label}</span>
                    <span className="font-medium text-right text-[#263128]/85">{value}</span>
                  </div>
                ))}
              </div>

              {/* Quote summary panel */}
              <div className="lg:col-span-2">
                <div className="rounded-3xl bg-[#2f4632] text-white p-7 sticky top-28">
                  <p className="text-xs uppercase tracking-widest text-[#8faf8b] font-semibold mb-4">
                    Instant Estimate
                  </p>
                  {estimate ? (
                    <>
                      <p className="font-display text-4xl mb-1">${estimate.toLocaleString()}</p>
                      <p className="text-white/55 text-xs mb-5">
                        approx. for {data.guestCount} guests · {data.cateringPackage}
                      </p>
                    </>
                  ) : (
                    <p className="text-white/60 text-sm mb-5">Select a package to see an estimate.</p>
                  )}
                  <ul className="space-y-2 text-xs text-white/60 mb-6">
                    <li>✓ Final quote tailored by our team within 24h</li>
                    <li>✓ No obligation, no payment required now</li>
                    <li>✓ Invoice-ready B2B billing</li>
                  </ul>
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="btn-primary w-full py-4 rounded-full text-sm disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Sending request…
                      </span>
                    ) : (
                      "Request Corporate Quote →"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      {step < 5 && (
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-6 py-3 rounded-full text-sm font-semibold text-[#263128]/55 hover:text-[#263128] disabled:opacity-0 transition-all"
          >
            ← Back
          </button>

          {/* live estimate chip */}
          {estimate && (
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-[#4f6f52] bg-[#8faf8b]/15 rounded-full px-4 py-2">
              Est. ${estimate.toLocaleString()} for {data.guestCount} guests
            </span>
          )}

          <button onClick={next} className="btn-primary px-8 py-3.5 rounded-full text-sm">
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
