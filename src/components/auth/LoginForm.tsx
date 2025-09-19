import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { mockCountries } from '../../utils/mockData';
import { Country } from '../../types';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  countryCode: z.string().min(1, 'Please select a country code'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(mockCountries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      countryCode: mockCountries[0].idd.root,
    },
  });

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setValue('countryCode', country.idd.root);
    setShowCountryDropdown(false);
  };

  const handleFormSubmit = (data: LoginFormData) => {
    toast.success('Sending OTP...');
    onSubmit(data);
  };

  return (
    <div
      className="space-y-6 max-w-md mx-auto px-6 border-4 border-[#b9090b] rounded-lg shadow-lg"
      style={{
        backgroundImage: "url('/images/blog_gemini_hero_thumbnail.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-vibrantPurple to-vibrantGreen dark:from-vibrantPurple dark:to-vibrantGreen">
          Welcome to Gemini
        </h1>
        <p className="mt-3 text-lg font-semibold text-vibrantPink dark:text-vibrantPink">
          Sign in to continue to your conversations
        </p>
      </div>
      <div className="border-t-2 border-[#b9090b] mt-4 pt-4">
        <p className="text-sm text-vibrantPink dark:text-vibrantPink font-semibold">
          Please enter your email and phone number to receive an OTP.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Input
          {...register('email')}
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          leftIcon={<Mail className="h-5 w-5 text-vibrantPink dark:text-vibrantPink" />}
          error={errors.email?.message}
          className="text-vibrantPink dark:text-vibrantPink border border-[#b9090b]"
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <div className="flex space-x-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center space-x-2 rounded-lg border border-[#b9090b] bg-[#b9090b] px-4 py-2 text-sm dark:border-[#b9090b] dark:bg-[#b9090b] dark:text-gray-300 hover:bg-[#a1080a] dark:hover:bg-[#a1080a]"
              >
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.idd.root}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full left-0 z-10 mt-1 w-64 rounded-lg border border-[#b9090b] bg-[#b9090b] shadow-lg dark:border-[#b9090b] dark:bg-[#b9090b] max-h-60 overflow-y-auto">
                  {mockCountries.map((country) => (
                    <button
                      key={country.cca2}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="flex w-full items-center space-x-3 px-3 py-2 text-left hover:bg-[#a1080a] dark:hover:bg-[#a1080a]"
                    >
                      <span>{country.flag}</span>
                      <span className="text-sm">{country.name.common}</span>
                      <span className="ml-auto text-sm text-gray-400">
                        {country.idd.root}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Input
              {...register('phone')}
              type="tel"
              placeholder="Enter phone number"
              className="flex-1 border border-[#b9090b]"
              leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
              error={errors.phone?.message}
            />
          </div>
        </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-vibrantPurple to-vibrantPink hover:from-vibrantPink hover:to-vibrantPurple text-white font-bold shadow-lg transition-colors duration-300"
              size="lg"
              loading={loading}
            >
              Send OTP
            </Button>
      </form>
    </div>
  );
};

export default LoginForm;
