export const USER_TYPES = {
  INDIVIDUAL: "individual",
  ORGANIZATION: "organisation",
} as const;

export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_OTP: "/verify-otp",
  CREATE_PASSWORD: "/create-password",
} as const;

export const FORM_MESSAGES = {
  SIGNUP_TITLE: "Sign Up",
  SIGNUP_SUBTITLE: "Create your account to get started",
  LOGIN_TITLE: "Welcome Back!",
  LOGIN_SUBTITLE: "Log back into your account",
  FORGOT_PASSWORD_TITLE: "Forget Password?",
  FORGOT_PASSWORD_SUBTITLE:
    "Enter the email linked to your account and we will send you instructions to reset your password.",
  VERIFY_OTP_TITLE: "Verify Your Email Address",
  VERIFY_OTP_SUBTITLE: "Please enter the 4-digit OTP sent to johnsnow@abc.com",
  CREATE_PASSWORD_TITLE: "Create New Password",
  CREATE_PASSWORD_SUBTITLE:
    "Password must be at least 8 characters long and should contain at least one number and one special character",
  FORGOT_PASSWORD: "Forget Password?",
  TERMS_TEXT: "By continuing, you agree to our",
  TERMS_LINK: "Terms & Conditions",
  PRIVACY_LINK: "Privacy Policy",
  GOOGLE_SIGNUP: "Continue with Google",
  GOOGLE_LOGIN: "Continue with Google",
  CREATE_ACCOUNT: "CREATE ACCOUNT",
  LOGIN_BUTTON: "Continue",
  SEND_EMAIL_BUTTON: "SEND EMAIL",
  VERIFY_CODE_BUTTON: "VERIFY CODE",
  HAVE_ACCOUNT: "Have an account already?",
  NO_ACCOUNT: "Don't have an account yet?",
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
} as const;

export const CONTACT_INFO = {
  EMAIL: "support@digitalmarketingagency.ng",
  PHONE: "+234 909 000 8888",
  LOGO_ALT: "Digital Marketing Agency Logo",
} as const;

export const ASSETS = {
  BACKGROUND_IMAGE: "/DMA-uploads/12ff7025-87d4-426c-9a19-eca147fe2274.png",
  FORGOT_PASSWORD_BACKGROUND:
    "/DMA-uploads/27ec01aa-2104-4f9f-9474-c97ad677852c.png",
  SIGNUP_BACKGROUND: "/DMA-uploads/d73df5b9-3489-4658-b8a1-cd4c182998f5.png",
  LOGO_IMAGE: "/DMA-uploads/81f50eda-4cdd-4aa2-b217-a1a96ca6757f.png",
  VERIFY_OTP_BACKGROUND:
    "/DMA-uploads/befc692c-cf56-4860-ae18-5b102cb416c0.png",
  CREATE_PASSWORD_BACKGROUND:
    "/DMA-uploads/aec76fd4-e352-49eb-b87b-68bdb9022190.png",
  COMPLETE_PROFILE_BACKGROUND: `url("/DMA-uploads/0589d284-827d-4b54-96dc-a6b830dded54.png")`,
  CONTACT_PERSON_PROFILE_BACKGROUND: `url("/DMA-uploads/207b1138-6b5c-47f8-a2b1-e26cb35e6f02.png")`,
} as const;
