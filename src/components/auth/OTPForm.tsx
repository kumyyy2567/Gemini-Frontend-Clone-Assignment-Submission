import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface OTPFormProps {
  onSubmit: (otp: string) => void;
  onResend: () => void;
  loading?: boolean;
}

export const OTPForm: React.FC<OTPFormProps> = ({ onSubmit, onResend, loading = false }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    onSubmit(otpValue);
  };

  const handleResend = () => {
    setTimeLeft(60);
    setOtp(['', '', '', '', '', '']);
    toast.success('OTP resent successfully');
    onResend();
  };

  return (
    <div className="space-y-6 bg-red-500">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-vibrantGreen to-vibrantBlue dark:from-vibrantYellow dark:to-vibrantPurple">
          Verify OTP
        </h1>
        <p className="mt-2 text-lg font-semibold text-vibrantPink dark:text-vibrantGreen">
          Enter the 6-digit code sent to your phone
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-lg border border-gray-300 text-center text-xl font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              maxLength={1}
            />
          ))}
        </div>

        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm font-semibold text-vibrantBlue dark:text-vibrantPink">
              Resend OTP in {timeLeft}s
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-bold text-vibrantGreen hover:text-vibrantBlue dark:text-vibrantYellow dark:hover:text-vibrantPurple transition-colors duration-300"
            >
              Resend OTP
            </button>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-vibrantGreen to-vibrantBlue hover:from-vibrantBlue hover:to-vibrantGreen text-white font-bold shadow-lg transition-colors duration-300"
          size="lg"
          loading={loading}
        >
          Verify OTP
        </Button>
      </form>
    </div>
  );
};
