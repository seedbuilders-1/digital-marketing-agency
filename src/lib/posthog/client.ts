import posthog from "posthog-js";
import { posthogConfig } from "./config";

let posthogClient: typeof posthog | null = null;

export const initPostHog = (): typeof posthog | null => {
  if (typeof window === "undefined") {
    return null; // Don't initialize on server
  }

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!apiKey) {
    console.warn(
      "PostHog API key not found. Analytics will not be initialized.",
    );
    return null;
  }

  if (!posthogClient) {
    posthog.init(apiKey, posthogConfig);
    posthogClient = posthog;
  }

  return posthogClient;
};

export const getPostHog = (): typeof posthog | null => {
  return posthogClient;
};

// Helper function to safely capture events
export const captureEvent = (
  eventName: string,
  properties?: Record<string, any>,
) => {
  const client = getPostHog();
  if (client) {
    client.capture(eventName, properties);
  }
};

// Helper function to identify users
export const identifyUser = (
  userId: string,
  properties?: Record<string, any>,
) => {
  const client = getPostHog();
  if (client) {
    client.identify(userId, properties);
  }
};

// Helper function to reset user (on logout)
export const resetUser = () => {
  const client = getPostHog();
  if (client) {
    client.reset();
  }
};

// Helper function to set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  const client = getPostHog();
  if (client) {
    client.people.set(properties);
  }
};

// Helper function to start session recording
export const startSessionRecording = () => {
  const client = getPostHog();
  if (client) {
    client.startSessionRecording();
  }
};

// Helper function to stop session recording
export const stopSessionRecording = () => {
  const client = getPostHog();
  if (client) {
    client.stopSessionRecording();
  }
};

export default posthog;
