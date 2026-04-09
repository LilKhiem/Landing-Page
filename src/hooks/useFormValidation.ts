import { useState, useCallback } from 'react';

export const useFormValidation = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = useCallback((value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  }, []);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (isSubmitted || value.length > 5) {
      setEmailError(validateEmail(value));
    }
  };

  const handleSubmit = (callback: (email: string) => void) => {
    setIsSubmitted(true);
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) {
      callback(email);
      return true;
    }
    return false;
  };

  return {
    email,
    emailError,
    handleEmailChange,
    handleSubmit,
    isSubmitted,
    setEmail
  };
};
