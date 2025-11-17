'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, BookOpen } from 'lucide-react';

interface SignupProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigateToLogin: () => void;
  onSignupSuccess: () => void;
}

export function Signup({ currentLang, onLanguageChange, t, onNavigateToLogin, onSignupSuccess }: SignupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(currentLang === 'am' ? 'ሁሉንም መስኮች መሙላት አለበት' : 'All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(currentLang === 'am' ? 'የይለፍ ቃላት አይዛመዱም' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError(currentLang === 'am' ? 'የይለፍ ቃል ቢያንስ 6 ቁምፊ ሊኖረው ይገባል' : 'Password must be at least 6 characters');
      return;
    }

    const success = await signup(formData.name, formData.email, formData.password);
    if (success) {
      onSignupSuccess();
    } else {
      setError(currentLang === 'am' 
        ? 'ምዝገባ አልተሳካም፣ እባክዎ እንደገና ይሞክሩ' 
        : 'Signup failed, please try again'
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-emerald-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLang === 'am' ? 'መለያ ይፍጠሩ' : 'Create Account'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {currentLang === 'am' 
                ? 'የአማርኛ ትምህርት ጉዞዎን ይጀምሩ' 
                : 'Start your Amharic learning journey'
              }
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {currentLang === 'am' ? 'ሙሉ ስም' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder={currentLang === 'am' ? 'ስምዎን ያስገቡ' : 'Enter your name'}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {currentLang === 'am' ? 'ኢሜይል' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder={currentLang === 'am' ? 'example@email.com' : 'you@example.com'}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {currentLang === 'am' ? 'የይለፍ ቃል' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder={currentLang === 'am' ? 'የይለፍ ቃል ይፍጠሩ' : 'Create a password'}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {currentLang === 'am' ? 'ቢያንስ 6 ቁምፊ ሊኖረው ይገባል' : 'Must be at least 6 characters'}
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {currentLang === 'am' ? 'የይለፍ ቃል አረጋግጥ' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder={currentLang === 'am' ? 'የይለፍ ቃልዎን እንደገና ያስገቡ' : 'Confirm your password'}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 bg-white dark:bg-gray-700 mt-1"
                  required
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLang === 'am' 
                    ? 'ከአገልግሎት ውሎች እና ከግላዊነት ፖሊሲ ጋር እስማማለሁ' 
                    : 'I agree to the Terms of Service and Privacy Policy'
                  }
                </span>
              </label>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {currentLang === 'am' ? 'በመመዝገብ ላይ...' : 'Creating account...'}
                  </div>
                ) : (
                  currentLang === 'am' ? 'መለያ ይፍጠሩ' : 'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {currentLang === 'am' ? 'ቀድሞውኑ መለያ አለዎት?' : 'Already have an account?'}{' '}
                <button
                  onClick={onNavigateToLogin}
                  className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-medium transition-colors"
                >
                  {currentLang === 'am' ? 'ግባ' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="text-center mt-6">
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'am' : 'en')}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
            >
              {currentLang === 'am' ? 'Switch to English' : 'በአማርኛ ቀጠል'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}