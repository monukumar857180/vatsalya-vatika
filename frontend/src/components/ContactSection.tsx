import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Loader2, Navigation, CheckCircle2, Clock, Users, Heart, GraduationCap, Sparkles } from 'lucide-react';
import { contactService } from '../services/contactService';
import toast from 'react-hot-toast';

// Animated number counter
function useCountUp(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, active, duration]);
  return count;
}

// Quick stat items for contact section
const QUICK_STATS = [
  { icon: Users, value: 200, suffix: '+', label: 'Students Served', color: 'text-ashram-green dark:text-emerald-400' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Always Welcoming', color: 'text-ashram-saffron dark:text-amber-400' },
  { icon: Heart, value: 15, suffix: '+', label: 'Years of Service', color: 'text-rose-500 dark:text-rose-400' },
];

const StatBadge: React.FC<{ icon: React.ElementType; value: number; suffix: string; label: string; color: string; active: boolean; delay: number }> = ({
  icon: Icon, value, suffix, label, color, active, delay,
}) => {
  const count = useCountUp(value, 1200, active);
  return (
    <div
      className={`flex items-center gap-3 transition-all duration-700 ease-out ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-darkAshram-surface shadow-sm border border-ashram-border/40 dark:border-darkAshram-border/30 flex items-center justify-center shrink-0">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <p className={`font-heading font-black text-xl leading-tight ${color}`}>{count}{suffix}</p>
        <p className="text-[11px] text-ashram-muted dark:text-darkAshram-muted font-medium leading-tight">{label}</p>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; message?: string }>({});
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const tempErrors: typeof errors = {};
    let isValid = true;

    const trimmedName = name.trim();
    if (!trimmedName) {
      tempErrors.name = 'Full Name is required.';
      isValid = false;
    } else if (trimmedName.length < 2) {
      tempErrors.name = 'Name must be at least 2 characters long.';
      isValid = false;
    } else if (trimmedName.length > 50) {
      tempErrors.name = 'Name cannot exceed 50 characters.';
      isValid = false;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      tempErrors.email = 'Email address is required.';
      isValid = false;
    } else if (!/^(?:(?![^@]*\.{2})[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?![.])(?!.*[.]{2})[a-zA-Z0-9.]{6,30}(?<![.])@gmail\.com)$/i.test(trimmedEmail)) {
      tempErrors.email = 'Please enter a valid email. Random or sub-addressed Gmail addresses are not allowed.';
      isValid = false;
    }

    if (phone) {
      const trimmedPhone = phone.trim();
      if (!/^(?:\+?\d{1,3}[- ]?)?\d{10}$/.test(trimmedPhone)) {
        tempErrors.phone = 'Please enter a valid 10-digit mobile number.';
        isValid = false;
      }
    }

    const trimmedMsg = message.trim();
    if (!trimmedMsg) {
      tempErrors.message = 'Message is required.';
      isValid = false;
    } else if (trimmedMsg.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setLoading(true);
    setSubmittedMessage(null);

    try {
      const res = await contactService.submitContact({
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : undefined,
        message: message.trim(),
      });
      if (res.success) {
        setSubmittedMessage('Thank you! Your message has been submitted successfully.');
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setErrors({});
      } else {
        toast.error(res.message || 'Unable to submit your message. Please try again.');
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      toast.error(err.response?.data?.message || 'Unable to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl border bg-white dark:bg-darkAshram-surface text-ashram-charcoal dark:text-darkAshram-text text-sm placeholder:text-ashram-muted/60 dark:placeholder:text-darkAshram-muted/50 focus:outline-none focus:ring-2 focus:ring-ashram-saffron/40 transition-all duration-200';
  const inputBorder = (err?: string) =>
    err ? 'border-red-400 dark:border-red-600 focus:border-red-400' : 'border-ashram-border dark:border-darkAshram-border focus:border-ashram-saffron';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-ashram-cream to-white dark:from-darkAshram-surface dark:via-darkAshram-bg dark:to-darkAshram-surface border-t border-ashram-border dark:border-darkAshram-border transition-colors duration-300"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-ashram-saffron/5 dark:bg-amber-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-ashram-green/5 dark:bg-emerald-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-ashram-gold/4 dark:bg-amber-900/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block text-xs font-sans uppercase tracking-widest text-ashram-saffron dark:text-amber-400 font-bold mb-3 px-4 py-1.5 rounded-full bg-ashram-saffron/8 dark:bg-amber-900/20 border border-ashram-saffron/20 dark:border-amber-700/30">
            Reach Out To Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-ashram-green dark:text-darkAshram-gold mt-2 mb-4 leading-tight">
            Contact &amp; Visit<br className="hidden sm:block" /> Vatsalya Vatika
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-ashram-saffron to-ashram-gold rounded-full mx-auto mb-4" />
          <p className="font-sans text-base text-ashram-muted dark:text-darkAshram-muted leading-relaxed">
            We welcome volunteers, devotees, sponsors, and visitors to experience the serene atmosphere of our Ashram.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-5 space-y-6">

            {/* Map Card */}
            <div
              className={`relative rounded-2xl overflow-hidden shadow-xl border border-ashram-border dark:border-darkAshram-border transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="relative overflow-hidden" style={{ paddingTop: '60%' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.123456789!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQ4LjEiTiA4MMKwNTYnNDYuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vatsalya Vatika Ashram Location"
                />
              </div>
              {/* Map footer bar */}
              <div className="p-4 bg-ashram-green dark:bg-ashram-green/90 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading font-bold text-sm text-ashram-goldLight leading-tight">
                    Vatsalya Vatika Campus
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    Brahma Colony, Kurukshetra
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/ae5b9tf7mPSPME9i8?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ashram-saffron hover:bg-ashram-saffronHover text-white text-xs font-bold shadow-lg shrink-0 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Directions
                </a>
              </div>
            </div>

            {/* Contact Info Card */}
            <div
              className={`p-6 rounded-2xl bg-white dark:bg-darkAshram-card border border-ashram-border dark:border-darkAshram-border shadow-lg space-y-5 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: '250ms' }}
            >
              <h3 className="font-heading font-bold text-xl text-ashram-green dark:text-darkAshram-gold border-b border-ashram-border dark:border-darkAshram-border pb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-ashram-saffron" />
                Visit Vatsalya Vatika
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ashram-saffron/15 to-ashram-saffron/5 dark:from-ashram-saffron/20 dark:to-transparent text-ashram-saffron flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ashram-charcoal dark:text-darkAshram-text">Ashram Address</h4>
                  <p className="text-xs text-ashram-muted dark:text-darkAshram-muted mt-0.5 leading-relaxed">
                    Vatsalya Vatika Ashram, Brahma Colony,<br />Kurukshetra, Haryana – 136118
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ashram-saffron/15 to-ashram-saffron/5 dark:from-ashram-saffron/20 dark:to-transparent text-ashram-saffron flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ashram-charcoal dark:text-darkAshram-text mb-3">Phone Directory</h4>
                  <div className="flex flex-col gap-3">
                    {/* Swami Hari Om Das */}
                    <div>
                      <p className="text-xs font-semibold text-ashram-charcoal dark:text-darkAshram-text">
                        Swami Hari Om Das Parivrajak <span className="font-normal text-ashram-muted dark:text-darkAshram-muted text-[10px] ml-1">(Sanchalak)</span>
                      </p>
                      <a href="tel:+919416700220" className="text-xs text-ashram-muted dark:text-darkAshram-muted hover:text-ashram-saffron dark:hover:text-amber-400 transition-colors font-medium block mt-0.5">
                        +91 94167-00220
                      </a>
                    </div>

                    {/* Shri Om Prakash Mittal */}
                    <div>
                      <p className="text-xs font-semibold text-ashram-charcoal dark:text-darkAshram-text">
                        Shri Om Prakash Mittal <span className="font-normal text-ashram-muted dark:text-darkAshram-muted text-[10px] ml-1">(Pradhan)</span>
                      </p>
                      <a href="tel:+919896932891" className="text-xs text-ashram-muted dark:text-darkAshram-muted hover:text-ashram-saffron dark:hover:text-amber-400 transition-colors font-medium block mt-0.5">
                        +91 98969-32891
                      </a>
                    </div>

                    {/* Shri Sant Rajendra Singh */}
                    <div>
                      <p className="text-xs font-semibold text-ashram-charcoal dark:text-darkAshram-text">
                        Shri Sant Rajendra Singh <span className="font-normal text-ashram-muted dark:text-darkAshram-muted text-[10px] ml-1">(Koshadhyaksh)</span>
                      </p>
                      <a href="tel:+919416111944" className="text-xs text-ashram-muted dark:text-darkAshram-muted hover:text-ashram-saffron dark:hover:text-amber-400 transition-colors font-medium block mt-0.5">
                        +91 94161-11944
                      </a>
                    </div>

                    {/* Shri Om Prakash Gera */}
                    <div>
                      <p className="text-xs font-semibold text-ashram-charcoal dark:text-darkAshram-text">
                        Shri Om Prakash Gera <span className="font-normal text-ashram-muted dark:text-darkAshram-muted text-[10px] ml-1">(Sachiv)</span>
                      </p>
                      <a href="tel:+919416837106" className="text-xs text-ashram-muted dark:text-darkAshram-muted hover:text-ashram-saffron dark:hover:text-amber-400 transition-colors font-medium block mt-0.5">
                        +91 94168-37106
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ashram-saffron/15 to-ashram-saffron/5 dark:from-ashram-saffron/20 dark:to-transparent text-ashram-saffron flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-ashram-charcoal dark:text-darkAshram-text">Email</h4>
                  <p className="text-xs text-ashram-muted dark:text-darkAshram-muted mt-0.5">
                    vatsalyavatika2005@gmail.com
                  </p>
                </div>
              </div>
            </div>


          </div>

          {/* ── Right Column: Form ── */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative p-8 sm:p-10 rounded-3xl bg-white dark:bg-darkAshram-card border border-ashram-border dark:border-darkAshram-border shadow-xl overflow-hidden">

              {/* Subtle corner glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-ashram-saffron/5 dark:bg-amber-700/10 rounded-full blur-2xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />

              <div className="relative z-10">
                <div className="mb-7">
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-ashram-green dark:text-darkAshram-gold leading-tight">
                    Send Us a Message
                  </h3>
                  <p className="font-sans text-sm text-ashram-muted dark:text-darkAshram-muted mt-1.5 leading-relaxed">
                    Have questions about student admission, visits, or volunteering? We'd love to hear from you.
                  </p>
                </div>

                {submittedMessage ? (
                  <div className="py-12 flex flex-col items-center text-center gap-4 animate-fadeIn">
                    <div className="w-20 h-20 rounded-full bg-ashram-green/10 dark:bg-emerald-900/30 flex items-center justify-center border border-ashram-green/20 dark:border-emerald-800/40 shadow">
                      <CheckCircle2 className="w-10 h-10 text-ashram-green dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-heading font-black text-xl text-ashram-green dark:text-darkAshram-gold">Message Sent!</p>
                      <p className="text-sm text-ashram-muted dark:text-darkAshram-muted mt-1">{submittedMessage}</p>
                      <p className="text-xs text-ashram-muted/70 dark:text-darkAshram-muted/60 mt-1">Our administrator will review your message promptly.</p>
                    </div>
                    <button
                      onClick={() => setSubmittedMessage(null)}
                      className="mt-2 px-7 py-2.5 rounded-xl bg-ashram-saffron hover:bg-ashram-saffronHover text-white text-sm font-bold shadow-md transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-ashram-green/80 dark:text-darkAshram-gold/80 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
                          className={`${inputBase} ${inputBorder(errors.name)}`}
                        />
                        {errors.name && <p className="text-[11px] text-red-500 font-medium mt-1.5 pl-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-ashram-green/80 dark:text-darkAshram-gold/80 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
                          className={`${inputBase} ${inputBorder(errors.email)}`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 font-medium mt-1.5 pl-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ashram-green/80 dark:text-darkAshram-gold/80 mb-1.5">
                        Phone Number <span className="text-ashram-muted font-normal normal-case">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: undefined })); }}
                        className={`${inputBase} ${inputBorder(errors.phone)}`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 font-medium mt-1.5 pl-1">{errors.phone}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ashram-green/80 dark:text-darkAshram-gold/80 mb-1.5">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Write your inquiry, visit request, or message here..."
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(p => ({ ...p, message: undefined })); }}
                        className={`${inputBase} resize-none ${inputBorder(errors.message)}`}
                      />
                      <div className="flex items-center justify-between mt-1">
                        {errors.message
                          ? <p className="text-[11px] text-red-500 font-medium pl-1">{errors.message}</p>
                          : <span />}
                        <span className="text-[10px] text-ashram-muted dark:text-darkAshram-muted font-medium">{message.length} chars</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-ashram-saffron to-amber-500 hover:from-amber-500 hover:to-ashram-saffron text-white font-bold text-sm shadow-lg hover:shadow-amber-300/30 dark:hover:shadow-amber-700/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* 3 Statistic Cards Below Form to fill empty space */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
              {/* Card 1: 200+ Students */}
              <div className="bg-white dark:bg-darkAshram-card border border-ashram-border dark:border-darkAshram-border rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-[14px] bg-[#14b8a6] text-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="font-heading font-black text-xl sm:text-2xl text-ashram-charcoal dark:text-darkAshram-text">
                  200<span className="text-base sm:text-lg font-medium text-ashram-muted ml-0.5">+</span>
                </h4>
                <p className="text-[11px] sm:text-[13px] font-bold text-ashram-charcoal dark:text-darkAshram-text mt-0.5 sm:mt-1">Students</p>
                <p className="text-[9px] sm:text-[10px] text-ashram-muted dark:text-darkAshram-muted mt-1 sm:mt-1.5 leading-snug">Nurtured with care & free education</p>
              </div>

              {/* Card 2: 100+ Education Support */}
              <div className="bg-white dark:bg-darkAshram-card border border-ashram-border dark:border-darkAshram-border rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-[14px] bg-[#f97316] text-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="font-heading font-black text-xl sm:text-2xl text-ashram-charcoal dark:text-darkAshram-text">
                  100<span className="text-base sm:text-lg font-medium text-ashram-muted ml-0.5">+</span>
                </h4>
                <p className="text-[11px] sm:text-[13px] font-bold text-ashram-charcoal dark:text-darkAshram-text mt-0.5 sm:mt-1">Education Support</p>
                <p className="text-[9px] sm:text-[10px] text-ashram-muted dark:text-darkAshram-muted mt-1 sm:mt-1.5 leading-snug">Complete academic & book assistance</p>
              </div>

              {/* Card 3: A-Z Essential Facilities */}
              <div className="bg-[#f8f5ff] dark:bg-purple-900/10 border border-[#e9d5ff] dark:border-purple-800/30 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-[14px] bg-[#a855f7] text-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="font-heading font-black text-xl sm:text-2xl text-ashram-charcoal dark:text-darkAshram-text">
                  A-Z
                </h4>
                <p className="text-[11px] sm:text-[13px] font-bold text-ashram-charcoal dark:text-darkAshram-text mt-0.5 sm:mt-1">Essential Facilities</p>
                <p className="text-[9px] sm:text-[10px] text-ashram-muted dark:text-darkAshram-muted mt-1 sm:mt-1.5 leading-snug">Food, housing, sports & health</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
