/**
 * EXAMPLE: Contact Form with PostHog Tracking
 *
 * This is an example showing how to implement form tracking
 * Copy this pattern for your service request forms and signup forms
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrackedForm } from "@/components/TrackedForm";
import { trackButtonClick } from "@/utils/analytics";

// Define your form schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  service: z.string(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ExampleContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      service: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    // Your API call here
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    // Success! The TrackedForm will automatically track this
    console.log("Form submitted successfully");
  };

  const handleSuccess = () => {
    // This runs after successful submission
    console.log("Thank you for contacting us!");
    form.reset();
  };

  const handleError = (error: any) => {
    // This runs if submission fails
    console.error("Submission error:", error);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

      {/* 
        TrackedForm automatically tracks:
        - When user starts filling the form
        - Which fields they focus on
        - Which fields they fill
        - If they abandon the form
        - Form submission success/failure
        - Validation errors
      */}
      <TrackedForm
        formName="contact_form"
        formId="contact-form"
        form={form}
        onSubmit={handleSubmit}
        onSubmitSuccess={handleSuccess}
        onSubmitError={handleError}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...form.register("name")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="John Doe"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="john@example.com"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...form.register("phone")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service Interested In *
          </label>
          <select
            id="service"
            {...form.register("service")}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a service</option>
            <option value="web_design">Web Design</option>
            <option value="seo">SEO</option>
            <option value="social_media">Social Media Marketing</option>
            <option value="content">Content Creation</option>
          </select>
          {form.formState.errors.service && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.service.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message *
          </label>
          <textarea
            id="message"
            {...form.register("message")}
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Tell us about your project..."
          />
          {form.formState.errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          onClick={() => {
            // Track button click (optional - form submission is already tracked)
            trackButtonClick("Submit Contact Form", "contact-form-submit");
          }}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </TrackedForm>

      {/* Example: Track a secondary action */}
      <button
        onClick={() => {
          trackButtonClick("Schedule Call Instead", "schedule-call-button");
          // Navigate to scheduling page
        }}
        className="w-full mt-4 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50"
      >
        Or Schedule a Call
      </button>
    </div>
  );
}

/**
 * EXAMPLE: Signup Form with User Identification
 */

import { identifyUser } from "@/lib/posthog";
import { trackAuth } from "@/utils/analytics";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8), // This will be automatically excluded from tracking
  company: z.string().optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function ExampleSignupForm() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (data: SignupFormData) => {
    // Your signup API call
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Identify the user in PostHog
    identifyUser(result.userId, {
      email: data.email,
      name: data.name,
      company: data.company,
      signup_date: new Date().toISOString(),
    });

    // Track the signup event
    trackAuth("signup", result.userId, {
      email: data.email,
      has_company: !!data.company,
    });
  };

  return (
    <TrackedForm
      formName="signup_form"
      form={form}
      onSubmit={handleSignup}
      className="space-y-4"
    >
      <input
        {...form.register("name")}
        placeholder="Full Name"
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        {...form.register("email")}
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        {...form.register("password")}
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border rounded-md"
        // Password fields are automatically excluded from tracking
      />
      <input
        {...form.register("company")}
        placeholder="Company (Optional)"
        className="w-full px-3 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Sign Up
      </button>
    </TrackedForm>
  );
}

/**
 * EXAMPLE: Service Request Form
 */

const serviceRequestSchema = z.object({
  serviceType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  description: z.string(),
  contactEmail: z.string().email(),
});

type ServiceRequestData = z.infer<typeof serviceRequestSchema>;

export function ExampleServiceRequestForm() {
  const form = useForm<ServiceRequestData>({
    resolver: zodResolver(serviceRequestSchema),
  });

  const handleServiceRequest = async (data: ServiceRequestData) => {
    // Your API call
    await fetch("/api/service-request", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <TrackedForm
      formName="service_request_form"
      formId="service-request"
      form={form}
      onSubmit={handleServiceRequest}
      onSubmitSuccess={() => {
        alert("Service request submitted!");
      }}
      className="space-y-4"
    >
      <select
        {...form.register("serviceType")}
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="">Select Service</option>
        <option value="web_development">Web Development</option>
        <option value="mobile_app">Mobile App</option>
        <option value="branding">Branding</option>
      </select>

      <select
        {...form.register("budget")}
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="">Select Budget Range</option>
        <option value="under_5k">Under $5,000</option>
        <option value="5k_10k">$5,000 - $10,000</option>
        <option value="10k_25k">$10,000 - $25,000</option>
        <option value="25k_plus">$25,000+</option>
      </select>

      <select
        {...form.register("timeline")}
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="">Select Timeline</option>
        <option value="asap">ASAP</option>
        <option value="1_month">Within 1 month</option>
        <option value="3_months">Within 3 months</option>
        <option value="flexible">Flexible</option>
      </select>

      <textarea
        {...form.register("description")}
        placeholder="Describe your project..."
        rows={5}
        className="w-full px-3 py-2 border rounded-md"
      />

      <input
        {...form.register("contactEmail")}
        type="email"
        placeholder="Contact Email"
        className="w-full px-3 py-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md"
      >
        Submit Request
      </button>
    </TrackedForm>
  );
}
