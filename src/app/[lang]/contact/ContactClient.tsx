"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Users,
  Briefcase,
  MessageSquare,
  Loader2,
  Star,
  Clock,
  Shield,
  Copy,
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Calendar,
} from "lucide-react";

type FormValues = {
  email: string;
  phone: string;
  companyName: string;
  contactName: string;
  projectType: string;
  projectTypeOther?: string;
  budgetRange: string;
  industry: string;
  timeline: string;
  designRequirements: string;
  otherInfo: string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    badge: "Get In Touch",
    title: "Let's Bring Your Vision to Life",
    subtitle: "Tell us about your design project and we'll create stunning visuals that elevate your brand. Get a free consultation within 24 hours.",
    email: "Email Address",
    phone: "Phone Number",
    companyName: "Company Name",
    contactName: "Your Name",
    projectTypeLabel: "Project Type",
    projectTypePlaceholder: "Select project type",
    projectTypeOtherLabel: "Describe your project",
    projectTypeOtherPlaceholder: "What design work do you need?",
    budgetRangeLabel: "Budget Range (EUR)",
    budgetRangePlaceholder: "e.g. 5000 - 10000",
    industryLabel: "Industry/Sector",
    timelineLabel: "Project Timeline",
    timelinePlaceholder: "Select timeline",
    designRequirementsLabel: "Design Requirements",
    designRequirementsPlaceholder: "Describe your design needs, brand style, target audience...",
    otherInfoLabel: "Additional Information",
    otherInfoPlaceholder: "Anything else we should know about your project...",
    submit: "Request Free Consultation",
    submitSending: "Sending...",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email",
    phoneRequired: "Phone is required",
    phoneInvalid: "Enter a valid phone number",
    companyNameRequired: "Company name is required",
    contactNameRequired: "Your name is required",
    projectTypeRequired: "Please select project type",
    industryRequired: "Please select industry",
    sideTitle: "Why Choose don-webdesign?",
    stat1Value: "250+",
    stat1Label: "Projects Delivered",
    stat2Value: "2 Weeks",
    stat2Label: "Avg. Turnaround",
    stat3Value: "4.9/5",
    stat3Label: "Client Satisfaction",
    feature1: "Award-winning creative designers",
    feature2: "Unlimited revisions until perfect",
    feature3: "Full ownership of all design files",
    feature4: "DACH region design specialists",
    responseTime: "We respond within 2 hours during business hours",
    contactDirect: "Contact Directly",
    copied: "Copied!",
    formStep1: "Contact Info",
    formStep2: "Project Details",
    formStep3: "Requirements",
    formHeaderTitle: "Start Your Project",
    formHeaderSubtitle: "Fill out the form below and we'll get back to you within 24 hours.",
  },
  ge: {
    badge: "Kontakt aufnehmen",
    title: "Lassen Sie uns Ihre Vision zum Leben erwecken",
    subtitle: "Erzählen Sie uns von Ihrem Design-Projekt und wir erstellen atemberaubende Visuals, die Ihre Marke aufwerten. Kostenlose Beratung innerhalb von 24 Stunden.",
    email: "E-Mail-Adresse",
    phone: "Telefonnummer",
    companyName: "Firmenname",
    contactName: "Ihr Name",
    projectTypeLabel: "Projekttyp",
    projectTypePlaceholder: "Projekttyp wählen",
    projectTypeOtherLabel: "Projekt beschreiben",
    projectTypeOtherPlaceholder: "Welche Design-Arbeit benötigen Sie?",
    budgetRangeLabel: "Budget-Bereich (EUR)",
    budgetRangePlaceholder: "z.B. 5000 - 10000",
    industryLabel: "Branche/Sektor",
    timelineLabel: "Projektzeitraum",
    timelinePlaceholder: "Zeitraum wählen",
    designRequirementsLabel: "Design-Anforderungen",
    designRequirementsPlaceholder: "Beschreiben Sie Ihre Design-Bedürfnisse, Markenstil, Zielgruppe...",
    otherInfoLabel: "Zusätzliche Informationen",
    otherInfoPlaceholder: "Was sollten wir noch über Ihr Projekt wissen...",
    submit: "Kostenlose Beratung anfragen",
    submitSending: "Wird gesendet...",
    emailRequired: "E-Mail ist erforderlich",
    emailInvalid: "Gültige E-Mail eingeben",
    phoneRequired: "Telefon ist erforderlich",
    phoneInvalid: "Gültige Telefonnummer eingeben",
    companyNameRequired: "Firmenname ist erforderlich",
    contactNameRequired: "Ihr Name ist erforderlich",
    projectTypeRequired: "Bitte wählen Sie den Projekttyp",
    industryRequired: "Bitte wählen Sie die Branche",
    sideTitle: "Warum don-webdesign wählen?",
    stat1Value: "250+",
    stat1Label: "Projekte geliefert",
    stat2Value: "2 Wochen",
    stat2Label: "Ø Lieferzeit",
    stat3Value: "4.9/5",
    stat3Label: "Kundenzufriedenheit",
    feature1: "Preisgekrönte Kreativdesigner",
    feature2: "Unbegrenzte Überarbeitungen bis perfekt",
    feature3: "Volle Eigentumsrechte an allen Design-Dateien",
    feature4: "Spezialisten für DACH-Region",
    responseTime: "Wir antworten innerhalb von 2 Stunden während der Geschäftszeiten",
    contactDirect: "Direkt kontaktieren",
    copied: "Kopiert!",
    formStep1: "Kontakt",
    formStep2: "Projektdetails",
    formStep3: "Anforderungen",
    formHeaderTitle: "Projekt starten",
    formHeaderSubtitle: "Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden.",
  },
};

const projectTypeOptions = [
  { value: "branding", label: "Branding / Logo Design" },
  { value: "identity", label: "Complete Brand Identity" },
  { value: "webdesign", label: "Website Design" },
  { value: "print", label: "Print Design / Marketing Materials" },
  { value: "packaging", label: "Packaging Design" },
  { value: "social", label: "Social Media Graphics" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "motion", label: "Motion Graphics / Video" },
  { value: "illustration", label: "Custom Illustration" },
  { value: "other", label: "Other" },
];

const industryOptions = [
  { value: "technology", label: "Technology / IT" },
  { value: "finance", label: "Finance / Banking" },
  { value: "healthcare", label: "Healthcare / Pharma" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "retail", label: "Retail / E-Commerce" },
  { value: "logistics", label: "Logistics / Transport" },
  { value: "energy", label: "Energy / Utilities" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
];

const budgetRangeOptions = [
  { value: "under2500", label: "Under €2,500" },
  { value: "2500to5000", label: "€2,500 - €5,000" },
  { value: "5000to10000", label: "€5,000 - €10,000" },
  { value: "10000to25000", label: "€10,000 - €25,000" },
  { value: "25000plus", label: "€25,000+" },
  { value: "flexible", label: "Flexible / Discuss" },
];

const timelineOptions = [
  { value: "immediate", label: "Immediate / ASAP" },
  { value: "2weeks", label: "Within 2 weeks" },
  { value: "1month", label: "Within 1 month" },
  { value: "2months", label: "Within 2 months" },
  { value: "3months", label: "Within 3 months" },
  { value: "flexible", label: "Flexible" },
];

function FormSection({ step, icon: Icon, title, children }: { step: number; icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 pb-3 border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-amber-500" />
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-black">{step}</span>
          <span className="text-sm font-semibold text-foreground">{title}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-xs font-medium text-destructive mt-1">{message}</p> : null;
}

function ContactCard({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast({ title: "Copied!", description: `${value} copied to clipboard.` });
  };

  const content = (
    <div className="flex items-center gap-3 p-4 bg-card/50 border border-border/40 rounded-xl hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300 group">
      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
        <Icon className="w-4 h-4 text-amber-500" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-foreground truncate">{value}</div>
      </div>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCopy(); }}
        className="p-1.5 rounded-md hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100"
        title="Copy"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

export default function ContactClient({ lang }: { lang: string }) {
  const c = translations[lang] ?? translations.en;
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "", phone: "", companyName: "", contactName: "",
      projectType: "", projectTypeOther: "", budgetRange: "",
      industry: "", timeline: "",
      designRequirements: "", otherInfo: "",
    },
    mode: "onBlur",
  });

  const projectTypeValue = useWatch({ control, name: "projectType" });

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const phonePattern = useMemo(() => /^[0-9+\-()\s]{7,20}$/i, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "8aff1902-6795-4608-ad79-be6702aa7f3a");
    formData.append("to", "hello@don-webdesign.com");
    formData.append("subject", "New Design Project Inquiry - don-webdesign");
    formData.append("companyName", data.companyName);
    formData.append("contactName", data.contactName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("projectType", data.projectType);
    if (data.projectType === "other" && data.projectTypeOther?.trim())
      formData.append("projectTypeOther", data.projectTypeOther.trim());
    formData.append("budgetRange", data.budgetRange);
    formData.append("industry", data.industry);
    formData.append("timeline", data.timeline);
    if (data.designRequirements.trim()) formData.append("designRequirements", data.designRequirements.trim());
    if (data.otherInfo.trim()) formData.append("otherInfo", data.otherInfo.trim());

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) {
        toast({ title: "Success!", description: "Your message has been sent." });
        reset();
      } else {
        toast({ title: "Error", description: json.message || "Please try again." });
      }
    } catch {
      toast({ title: "Network error", description: "Please try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-28 pb-20">
        {/* Page Header */}
        <motion.div
          className="text-left mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {c.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {c.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — Info Panel */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-28 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: c.stat1Value, label: c.stat1Label, icon: Users },
                { value: c.stat2Value, label: c.stat2Label, icon: Clock },
                { value: c.stat3Value, label: c.stat3Label, icon: Star },
              ].map(({ value, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  className="text-center p-4 bg-card border border-border/50 rounded-xl hover:border-amber-500/40 hover:shadow-gold/20 hover:shadow-lg transition-all duration-300 group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                >
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                {c.contactDirect}
              </h3>
              <ContactCard icon={Mail} label="Email" value="hello@don-webdesign.com" href="mailto:hello@don-webdesign.com" />
              <ContactCard icon={Phone} label="Phone" value="+49 123 456 7890" href="tel:+491234567890" />
              <ContactCard icon={Calendar} label="Book a Call" value="Schedule on Calendly" href="https://calendly.com/d/cyhx-wdw-b57" />
              <ContactCard icon={MapPin} label="Location" value="Berlin, Germany" />
            </div>

            {/* Features */}
            <div className="p-6 bg-card border border-border/50 rounded-xl space-y-4 hover:border-amber-500/20 transition-colors duration-300">
              <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                {c.sideTitle}
              </h3>
              <ul className="space-y-3">
                {[c.feature1, c.feature2, c.feature3, c.feature4].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <div className="relative flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>
              <p className="text-sm text-muted-foreground">{c.responseTime}</p>
            </div>

            {/* Testimonial */}
            <div className="p-5 bg-gradient-to-br from-card to-muted/30 border border-border/50 rounded-xl space-y-4 hover:border-amber-500/20 transition-colors duration-300">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &ldquo;don-webdesign transformed our brand identity completely. The team&apos;s creativity and attention to detail exceeded all our expectations.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-border/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/40 to-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">MK</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Michael Keller</div>
                  <div className="text-xs text-muted-foreground">CEO, TechFlow GmbH</div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-500/50 ml-auto" />
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
              <Shield className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Your information is 100% secure and never shared with third parties.</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border/50 rounded-2xl shadow-xl shadow-black/5 overflow-hidden hover:shadow-2xl hover:shadow-black/10 transition-shadow duration-500">
              {/* Form header bar */}
              <div className="px-6 sm:px-8 py-6 border-b border-border/50 bg-gradient-to-r from-amber-500/5 via-amber-500/[0.02] to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground text-lg">{c.formHeaderTitle}</h2>
                    <p className="text-sm text-muted-foreground">{c.formHeaderSubtitle}</p>
                  </div>
                </div>
              </div>

              <form className="px-6 sm:px-8 py-8 space-y-10" onSubmit={handleSubmit(onSubmit)}>

                {/* Contact Info */}
                <FormSection step={1} icon={Mail} title={c.formStep1}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="contactName" className="text-sm font-medium">{c.contactName} <span className="text-amber-500">*</span></Label>
                      <Input
                        id="contactName"
                        type="text"
                        placeholder="John Smith"
                        className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20 transition-all"
                        {...register("contactName", { required: c.contactNameRequired })}
                      />
                      <FieldError message={errors.contactName?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium">{c.email} <span className="text-amber-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20 transition-all"
                        {...register("email", {
                          required: c.emailRequired,
                          pattern: { value: emailPattern, message: c.emailInvalid },
                        })}
                      />
                      <FieldError message={errors.email?.message} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="companyName" className="text-sm font-medium">{c.companyName} <span className="text-amber-500">*</span></Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Your Company GmbH"
                        className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20 transition-all"
                        {...register("companyName", { required: c.companyNameRequired })}
                      />
                      <FieldError message={errors.companyName?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-medium">{c.phone} <span className="text-amber-500">*</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+49 123 456 789"
                        className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20 transition-all"
                        {...register("phone", {
                          required: c.phoneRequired,
                          pattern: { value: phonePattern, message: c.phoneInvalid },
                        })}
                      />
                      <FieldError message={errors.phone?.message} />
                    </div>
                  </div>
                </FormSection>

                {/* Project Details */}
                <FormSection step={2} icon={Briefcase} title={c.formStep2}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">{c.projectTypeLabel} <span className="text-amber-500">*</span></Label>
                      <Select onValueChange={(v) => setValue("projectType", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20">
                          <SelectValue placeholder={c.projectTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("projectType", { required: c.projectTypeRequired })} />
                      <FieldError message={errors.projectType?.message} />
                      <AnimatePresence>
                        {projectTypeValue === "other" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 mt-3"
                          >
                            <Label htmlFor="projectTypeOther" className="text-sm font-medium">{c.projectTypeOtherLabel}</Label>
                            <Textarea
                              id="projectTypeOther"
                              rows={2}
                              placeholder={c.projectTypeOtherPlaceholder}
                              className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20 resize-none"
                              {...register("projectTypeOther")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">{c.budgetRangeLabel}</Label>
                      <Select onValueChange={(v) => setValue("budgetRange", v)}>
                        <SelectTrigger className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20">
                          <SelectValue placeholder={c.budgetRangePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRangeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("budgetRange")} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">{c.industryLabel} <span className="text-amber-500">*</span></Label>
                      <Select onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}>
                        <SelectTrigger className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20">
                          <SelectValue placeholder={c.industryLabel} />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("industry", { required: c.industryRequired })} />
                      <FieldError message={errors.industry?.message} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">{c.timelineLabel}</Label>
                      <Select onValueChange={(v) => setValue("timeline", v)}>
                        <SelectTrigger className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20">
                          <SelectValue placeholder={c.timelinePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register("timeline")} />
                    </div>
                  </div>
                </FormSection>

                {/* Design Requirements */}
                <FormSection step={3} icon={Users} title={c.formStep3}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="designRequirements" className="text-sm font-medium">{c.designRequirementsLabel}</Label>
                      <Textarea
                        id="designRequirements"
                        rows={6}
                        placeholder={c.designRequirementsPlaceholder}
                        className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20 resize-none"
                        {...register("designRequirements")}
                      />
                    </div>
                  </div>
                </FormSection>

                {/* Additional Notes */}
                <FormSection step={3} icon={MessageSquare} title={c.otherInfoLabel}>
                  <div className="space-y-1.5">
                    <Textarea
                      id="otherInfo"
                      rows={4}
                      placeholder={c.otherInfoPlaceholder}
                      className="border-border/60 focus:border-amber-500/60 focus:ring-amber-500/20 resize-none"
                      {...register("otherInfo")}
                    />
                  </div>
                </FormSection>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-3 h-auto bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {c.submitSending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {c.submit}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
