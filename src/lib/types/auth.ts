export interface UserRegistrationData {
  name: string;
  email: string;
  tel: string;
  address: string;
  country: string;
  // city: string;
  password: string;
  confirmPassword: string;
  category: "individual" | "organisation";
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
