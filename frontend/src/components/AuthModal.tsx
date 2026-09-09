import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Heart, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: '', color: 'bg-transparent', score: 0 };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score < 2) return { label: 'Weak', color: 'bg-red-500', score: 1 };
    if (score < 4) return { label: 'Medium', color: 'bg-yellow-500', score: 2 };
    return { label: 'Strong', color: 'bg-green-500', score: 3 };
  };

  const pwdStrength = getPasswordStrength(password);

  // Error states
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { login } = useAuth();

  if (!isOpen) return null;

  const validate = (): boolean => {
    const tempErrors: typeof errors = {};
    let isValid = true;

    if (mode === 'signup') {
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

      if (phone) {
        const trimmedPhone = phone.trim();
        if (!/^(?:\+?\d{1,3}[- ]?)?\d{10}$/.test(trimmedPhone)) {
          tempErrors.phone = 'Please enter a valid 10-digit mobile number.';
          isValid = false;
        }
      }
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      tempErrors.email = mode === 'signin' ? 'Email or Username is required.' : 'Email address is required.';
      isValid = false;
    } else if (mode === 'signup' && !/^(?:(?![^@]*\.{2})[a-zA-Z0-9._%+-]+@(?!gmail\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?![.])(?!.*[.]{2})[a-zA-Z0-9.]{6,30}(?<![.])@gmail\.com)$/i.test(trimmedEmail)) {
      tempErrors.email = 'Please enter a valid email. Random or sub-addressed Gmail addresses are not allowed.';
      isValid = false;
    }

    if (!password) {
      tempErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters long.';
      isValid = false;
    }

    if (mode === 'signup') {
      if (!confirmPassword) {
        tempErrors.confirmPassword = 'Please confirm your password.';
        isValid = false;
      } else if (password !== confirmPassword) {
        tempErrors.confirmPassword = 'Passwords do not match.';
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      if (mode === 'signin') {
        const data = await authService.login(email.trim(), password);
        login(data.token, data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
        onClose();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        const result = await authService.register(
          name.trim(),
          email.trim(),
          password,
          phone ? phone.trim() : undefined
        );
        toast.success(result.message || 'Registration successful! Logging you in...');
        
        // Auto login after signup
        const loginData = await authService.login(email.trim(), password);
        login(loginData.token, loginData.user);
        toast.success(`Welcome, ${loginData.user.name}!`);
        onClose();
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err: any) {
      const apiMessage = err.response?.data?.message || err.message || 'Authentication failed.';
      toast.error(apiMessage);
      
      // Map API errors to field errors if possible
      if (apiMessage.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: apiMessage }));
      } else if (apiMessage.toLowerCase().includes('name')) {
        setErrors(prev => ({ ...prev, name: apiMessage }));
      } else if (apiMessage.toLowerCase().includes('password')) {
        setErrors(prev => ({ ...prev, password: apiMessage }));
      } else if (apiMessage.toLowerCase().includes('phone')) {
        setErrors(prev => ({ ...prev, phone: apiMessage }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setErrors({});
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-[340px] bg-white dark:bg-darkAshram-card text-ashram-charcoal dark:text-darkAshram-text rounded-3xl p-4 sm:p-5 shadow-2xl border border-ashram-border dark:border-darkAshram-border overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-ashram-border/50 dark:hover:bg-darkAshram-border text-ashram-charcoal dark:text-darkAshram-text transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-3">
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-ashram-saffron to-ashram-gold text-white font-heading font-bold text-lg mx-auto flex items-center justify-center shadow-md mb-1">
            🪷
          </div>
          <h3 className="font-heading font-bold text-lg text-ashram-green dark:text-darkAshram-gold">
            {mode === 'signin' ? 'Sign In to Vatsalya Vatika' : 'Create an Account'}
          </h3>
          <p className="text-[10px] text-ashram-muted dark:text-darkAshram-muted mt-0.5">
            {mode === 'signin'
              ? 'Access student updates, devotion events & admin portal'
              : 'Join our benevolent community of volunteers & patrons'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-ashram-cream dark:bg-darkAshram-surface rounded-2xl mb-3 border border-ashram-border dark:border-darkAshram-border">
          <button
            type="button"
            onClick={() => handleTabChange('signin')}
            className={`flex-1 py-1 text-[11px] font-bold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-ashram-saffron text-white shadow-sm'
                : 'text-ashram-muted hover:text-ashram-charcoal dark:hover:text-darkAshram-text'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('signup')}
            className={`flex-1 py-1 text-[11px] font-bold rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-ashram-saffron text-white shadow-sm'
                : 'text-ashram-muted hover:text-ashram-charcoal dark:hover:text-darkAshram-text'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          
          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] font-semibold text-ashram-charcoal dark:text-darkAshram-text uppercase tracking-wider mb-0.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ashram-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full pl-10 pr-4 py-1.5 rounded-xl border bg-ashram-cream dark:bg-darkAshram-surface text-ashram-charcoal dark:text-darkAshram-text text-sm focus:outline-none focus:border-ashram-saffron ${
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-ashram-border dark:border-darkAshram-border'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-semibold text-ashram-charcoal dark:text-darkAshram-text uppercase tracking-wider mb-0.5">
              {mode === 'signin' ? 'Email or Username' : 'Email Address'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ashram-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={mode === 'signin' ? "name@example.com or Username" : "name@example.com"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
                className={`w-full pl-10 pr-4 py-1.5 rounded-xl border bg-ashram-cream dark:bg-darkAshram-surface text-ashram-charcoal dark:text-darkAshram-text text-sm focus:outline-none focus:border-ashram-saffron ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-ashram-border dark:border-darkAshram-border'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">{errors.email}</p>
            )}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] font-semibold text-ashram-charcoal dark:text-darkAshram-text uppercase tracking-wider mb-0.5">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-ashram-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  className={`w-full pl-10 pr-4 py-1.5 rounded-xl border bg-ashram-cream dark:bg-darkAshram-surface text-ashram-charcoal dark:text-darkAshram-text text-sm focus:outline-none focus:border-ashram-saffron ${
                    errors.phone ? 'border-red-500 focus:border-red-500' : 'border-ashram-border dark:border-darkAshram-border'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">{errors.phone}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-semibold text-ashram-charcoal dark:text-darkAshram-text uppercase tracking-wider mb-0.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ashram-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                }}
                className={`w-full pl-10 pr-10 py-1.5 rounded-xl border bg-ashram-cream dark:bg-darkAshram-surface text-ashram-charcoal dark:text-darkAshram-text text-sm focus:outline-none focus:border-ashram-saffron ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-ashram-border dark:border-darkAshram-border'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ashram-muted hover:text-ashram-charcoal transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {mode === 'signup' && password.length > 0 && (
              <div className="mt-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-medium text-ashram-muted">Password Strength</span>
                  <span className={`text-[10px] font-bold ${
                    pwdStrength.score === 1 ? 'text-red-500' : pwdStrength.score === 2 ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {pwdStrength.label}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex gap-1">
                  <div className={`h-full flex-1 rounded-full ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'}`}></div>
                  <div className={`h-full flex-1 rounded-full ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'}`}></div>
                  <div className={`h-full flex-1 rounded-full ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'}`}></div>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">{errors.password}</p>
            )}
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[10px] font-semibold text-ashram-charcoal dark:text-darkAshram-text uppercase tracking-wider mb-0.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ashram-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                  }}
                  className={`w-full pl-10 pr-10 py-1.5 rounded-xl border bg-ashram-cream dark:bg-darkAshram-surface text-ashram-charcoal dark:text-darkAshram-text text-sm focus:outline-none focus:border-ashram-saffron ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-ashram-border dark:border-darkAshram-border'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ashram-muted hover:text-ashram-charcoal transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[10px] text-red-500 font-medium mt-1 pl-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-xl bg-ashram-saffron hover:bg-ashram-saffronHover text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{mode === 'signin' ? 'Signing In...' : 'Registering...'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Register Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-2 pt-2 border-t border-ashram-border dark:border-darkAshram-border text-center text-[10px] text-ashram-muted dark:text-darkAshram-muted">
          {mode === 'signin' ? (
            <p>Welcome to our online community portal.</p>
          ) : (
            <p>By registering, you agree to support our peaceful Ashram community values.</p>
          )}
        </div>

      </div>
    </div>
  );
};

