export const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phonePattern = /^\d+$/;
  return phonePattern.test(phone);
};

export const validatePasswordStrength = (
  password: string
): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Password should be at least 8 characters long");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one uppercase letter");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one lowercase letter");
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one number");
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Include at least one special character");
  }

  return {
    isValid: score >= 3,
    score,
    feedback,
  };
};
