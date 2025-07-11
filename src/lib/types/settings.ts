export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  avatar?: string;
}

export interface NotificationSettings {
  activityAlerts: boolean;
  messages: boolean;
  projectUpdates: boolean;
  invoiceBilling: boolean;
  emailDelivery: boolean;
  inAppDelivery: boolean;
}

export interface ThemeSettings {
  theme: "light" | "dark" | "system";
}

export interface PrivacySettings {
  adPersonalization: boolean;
  dataSharing: boolean;
  marketingStatus: boolean;
  activityStatus: boolean;
}

export interface UserSettings {
  profile: UserProfile;
  notifications: NotificationSettings;
  theme: ThemeSettings;
  privacy: PrivacySettings;
}
