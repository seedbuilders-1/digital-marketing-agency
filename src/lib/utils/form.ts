export const getFieldValidationClass = (
  hasError: boolean,
  isValid: boolean,
  baseClasses = "border-[#ced4da]"
): string => {
  if (hasError)
    return `${baseClasses.replace("border-[#ced4da]", "")} border-[#dc3545]`;
  if (isValid)
    return `${baseClasses.replace("border-[#ced4da]", "")} border-[#28a745]`;
  return baseClasses;
};

export const formatPhoneNumber = (
  countryCode: string,
  phoneNumber: string
): string => {
  return `${countryCode} ${phoneNumber}`;
};

export const getFormDefaultValues = () => ({
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
  country: "",
  password: "",
  confirmPassword: "",
  userType: undefined as "individual" | "organization" | undefined,
  agreeToTerms: false,
});

export const getLoginDefaultValues = () => ({
  email: "",
  password: "",
});

export const getForgotPasswordDefaultValues = () => ({
  email: "johnsnow@abc",
});

export const getVerifyOTPDefaultValues = () => ({
  otp: "",
});

export const getCreatePasswordDefaultValues = () => ({
  newPassword: "",
  confirmPassword: "",
});

export const getCompleteProfileDefaultValues = () => ({
  ownsBusiness: undefined as "yes" | "no" | undefined,
  registerWithBusiness: undefined as "yes" | "no" | undefined,
});

export const getOrganizationProfileDefaultValues = () => ({
  organizationName: "",
  address: "",
  country: "",
  organizationType: "",
  industry: "",
  rcNumber: "",
  staffSize: "",
});

export const getContactPersonProfileDefaultValues = () => ({
  contactPersonName: "",
});
