import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Lock, Mail, Phone, User as UserIcon, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { AmBrandEmblem } from '../components/brand/AmBrandEmblem';

export const AuthPages: React.FC = () => {
  const { currentPage, setCurrentPage, registerCustomer, loginCustomer, showToast, isAdminLoggedIn, currentUser, settings } = useStore();

  const isRegister = currentPage === 'register';

  const [fullName, setFullName] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

  const brand = settings.brandName || "MEZRAAN PERFUME";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (forgotPasswordMode) {
      setTimeout(() => {
        setIsLoading(false);
        setForgotPasswordMode(false);
        showToast('Password reset link dispatched to your registered email.');
      }, 1000);
      return;
    }

    if (isRegister) {
      const res = await registerCustomer({
        fullName,
        email: emailOrMobile,
        mobile,
        password,
      });
      setIsLoading(false);
      if (res.success) {
        setCurrentPage('customer-dashboard');
      }
    } else {
      const res = await loginCustomer(emailOrMobile, password);
      setIsLoading(false);
      if (res.success) {
        if (res.isAdmin === true) {
          setCurrentPage('admin-dashboard');
        } else {
          setCurrentPage('customer-dashboard');
        }
      } else {
        showToast(res.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto flex flex-col items-center justify-center font-sans selection:bg-amber-300 selection:text-neutral-950">
      
      <div className="w-full bg-white border border-neutral-200 p-8 sm:p-10 rounded-3xl space-y-6 shadow-xl relative">
        
        {/* Brand Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <AmBrandEmblem size="md" showSubtitle={false} />
          
          <div className="space-y-1">
            <span className="text-amber-700 text-[10px] uppercase tracking-[0.25em] font-mono font-bold block">
              {brand}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 tracking-tight uppercase font-bold">
              {forgotPasswordMode
                ? 'Reset Password'
                : isRegister
                ? 'Create Account'
                : 'Customer Login'}
            </h1>
          </div>
          <p className="text-xs text-neutral-500">
            {forgotPasswordMode
              ? 'Enter your email or mobile to receive reset instructions'
              : isRegister
              ? `Join ${brand} to track orders & manage addresses`
              : 'Sign in to access your orders & dispatch tracking'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {isRegister && !forgotPasswordMode && (
            <div className="space-y-1.5">
              <label className="text-neutral-700 uppercase tracking-wider font-semibold">Full Name *</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-amber-500 text-neutral-900 rounded-xl pl-9 pr-3 py-3 focus:outline-none"
                />
              </div>
            </div>
          )}

          {!forgotPasswordMode && isRegister && (
            <div className="space-y-1.5">
              <label className="text-neutral-700 uppercase tracking-wider font-semibold">Mobile Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXXXXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-amber-500 text-neutral-900 rounded-xl pl-9 pr-3 py-3 focus:outline-none font-mono"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-neutral-700 uppercase tracking-wider font-semibold">
              {isRegister ? 'Email Address *' : 'Email or Mobile Number *'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={isRegister ? 'email' : 'text'}
                required
                placeholder={isRegister ? 'name@example.com' : 'Enter email or mobile'}
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-amber-500 text-neutral-900 rounded-xl pl-9 pr-3 py-3 focus:outline-none"
              />
            </div>
          </div>

          {!forgotPasswordMode && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-neutral-700 uppercase tracking-wider font-semibold">Password *</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMode(true)}
                    className="text-[11px] text-amber-700 hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-200 focus:border-amber-500 text-neutral-900 rounded-xl pl-9 pr-3 py-3 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-amber-400 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2 border border-amber-500/30"
          >
            <span>
              {isLoading
                ? 'PLEASE WAIT...'
                : forgotPasswordMode
                ? 'DISPATCH RESET LINK'
                : isRegister
                ? 'CREATE MY ACCOUNT'
                : 'SIGN IN TO ACCOUNT'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="pt-2 border-t border-neutral-200 text-center text-xs text-neutral-500">
          {forgotPasswordMode ? (
            <button
              onClick={() => setForgotPasswordMode(false)}
              className="text-amber-700 hover:underline font-semibold"
            >
              Back to Sign In
            </button>
          ) : isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('auth')}
                className="text-amber-700 hover:underline font-semibold"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to {brand}?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-amber-700 hover:underline font-semibold"
              >
                Create Account
              </button>
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
