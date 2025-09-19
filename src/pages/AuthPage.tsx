import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { OTPForm } from '../components/auth/OTPForm';
import { useAuthStore } from '../stores/authStore';
import { User } from '../types';
import toast from 'react-hot-toast';

type AuthStep = 'login' | 'otp';

interface LoginData {
  email: string;
  phone: string;
  countryCode: string;
}

export const AuthPage: React.FC = () => {
  const [step, setStep] = useState<AuthStep>('login');
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setLoginData(data);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      toast.success('OTP sent successfully!');
    }, 2000);
  };

  const handleOTPVerify = async (otp: string) => {
    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      
      if (otp === '123456') {
        // Create user object
        const user: User = {
          id: Date.now().toString(),
          email: loginData!.email,
          phone: loginData!.phone,
          countryCode: loginData!.countryCode,
          createdAt: new Date().toISOString(),
        };
        
        login(user);
        toast.success('Login successful!');
      } else {
        toast.error('Invalid OTP. Please try 123456');
      }
    }, 2000);
  };

  const handleResendOTP = () => {
    toast.success('OTP resent successfully!');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 z-0" />
      
      <div className="w-full max-w-md relative z-10 px-6 py-8 mx-auto animate-scale-in">
        <div className="glass rounded-3xl p-8 shadow-2xl border border-white/20 hover-lift">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-glow mb-4 animate-glow">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 text-gradient">
              Welcome to Gemini
            </h1>
            <p className="text-gray-300 text-sm">
              {step === 'login' ? 'Sign in to continue your journey' : 'Enter the verification code'}
            </p>
          </div>

          {/* Form Container */}
          <div className="animate-fade-in">
            {step === 'login' ? (
              <LoginForm onSubmit={handleLogin} loading={loading} />
            ) : (
              <OTPForm
                onSubmit={handleOTPVerify}
                onResend={handleResendOTP}
                loading={loading}
              />
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Powered by AI • Secured by Design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
