'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, BookOpen } from 'lucide-react';

interface LoginProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigateToSignup: () => void;
  onLoginSuccess: () => void;
}

export function Login({ currentLang, onLanguageChange, t, onNavigateToSignup, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(currentLang === 'am' ? 'ኢሜይል እና የይለፍ ቃል ያስፈልጋሉ' : 'Email and password are required');
      return;
    }

    const success = await login(email, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError(currentLang === 'am' 
        ? 'ያስገቡት ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም' 
        : 'Invalid email or password'
      );
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@example.com');
    setPassword('password');
    
    setTimeout(async () => {
      const success = await login('demo@example.com', 'password');
      if (success) {
        onLoginSuccess();
      }
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLang === 'am' ? 'መግቢያ' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {currentLang === 'am' 
                ? 'ወደ አማርኛ ትምህርትዎ ይግቡ' 
                : 'Sign in to your Amharic learning journey'
              }
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {currentLang === 'am' ? 'ኢሜይል' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={currentLang === 'am' ? 'የይለፍ ቃልዎን ያስገቡ' : 'Enter your password'}
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {currentLang === 'am' ? 'አስታውሰኝ' : 'Remember me'}
                  </span>
                </label>
                
                <button
                  type="button"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  {currentLang === 'am' ? 'የይለፍ ቃል ረሳኽ?' : 'Forgot password?'}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {currentLang === 'am' ? 'በመግባት ላይ...' : 'Signing in...'}
                  </div>
                ) : (
                  currentLang === 'am' ? 'ግባ' : 'Sign In'
                )}
              </button>

              {/* Demo Login Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {currentLang === 'am' ? 'የማሳያ መለያ ይጠቀሙ' : 'Use Demo Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {currentLang === 'am' ? 'አዲስ ነዎት?' : "Don't have an account?"}{' '}
                <button
                  onClick={onNavigateToSignup}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  {currentLang === 'am' ? 'ይመዝገቡ' : 'Sign up'}
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