export interface UserRegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  password: string;
  confirmPassword: string;
  userType: "individual" | "organization";
  agreeToTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface Country {
  name: string;
  code: string;
  phoneCode: string;
  flag: string;
}
