# PostHog Analytics Implementation Guide

## Overview

This document explains how to use the PostHog analytics implementation in the Digital Marketing Agency application. PostHog is now fully integrated and tracking user behavior across the entire site.

## Setup

### 1. Environment Variables

Add your PostHog credentials to `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_actual_posthog_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com  # or your self-hosted URL
```

**Important:** Replace `your_posthog_project_api_key_here` with your actual PostHog project API key from your PostHog dashboard.

### 2. Finding Your PostHog API Key

1. Log in to your PostHog account
2. Go to Project Settings
3. Copy the "Project API Key"
4. Paste it into your `.env.local` file

---

## Features Enabled

### ✅ Automatic Tracking

The following are tracked automatically without any code changes:

1. **Page Views** - Every page visit is tracked with URL and timestamp
2. **Page Exits** - When users leave the site
3. **Session Duration** - How long users spend on the site
4. **Tab Visibility** - When users switch tabs
5. **User Idle Time** - Detects when users go idle (default: 5 minutes)
6. **Exit Intent** - When mouse leaves viewport (potential exit)

### ✅ Session Recording

Session recording is enabled by default. You can watch actual user sessions in your PostHog dashboard to see exactly how users interact with your site.

**Privacy Settings:**

- Password fields are automatically masked
- Sensitive fields are redacted
- You can add more fields to mask using the `data-sensitive="true"` attribute

---

## Manual Tracking

### 1. Track Form Interactions

#### Option A: Using the `TrackedForm` Component (Recommended)

Replace your regular `<form>` tags with `<TrackedForm>`:

```tsx
import { TrackedForm } from "@/components/TrackedForm";
import { useForm } from "react-hook-form";

function ContactForm() {
  const form = useForm();

  const handleSubmit = async (data) => {
    // Your submission logic
    await api.submitContact(data);
  };

  return (
    <TrackedForm
      formName="contact_form"
      formId="contact-form-id"
      form={form}
      onSubmit={handleSubmit}
      onSubmitSuccess={() => console.log("Success!")}
      onSubmitError={(error) => console.error("Error:", error)}
      className="space-y-4"
    >
      <input {...form.register("name")} placeholder="Name" />
      <input {...form.register("email")} placeholder="Email" />
      <button type="submit">Submit</button>
    </TrackedForm>
  );
}
```

**What gets tracked:**

- ✅ When user starts filling the form
- ✅ Which fields were focused
- ✅ Which fields were filled
- ✅ Which fields were left empty
- ✅ Time spent on each field
- ✅ Form abandonment (if user leaves without submitting)
- ✅ Form submission success/failure
- ✅ Validation errors

#### Option B: Using the `useFormTracking` Hook

For more control, use the hook directly:

```tsx
import { useFormTracking } from "@/hooks/useFormTracking";
import { useForm } from "react-hook-form";

function SignupForm() {
  const form = useForm();

  const { trackSubmit } = useFormTracking({
    formName: "signup_form",
    form,
  });

  const handleSubmit = async (data) => {
    await api.signup(data);
  };

  return (
    <form onSubmit={form.handleSubmit(trackSubmit(handleSubmit))}>
      {/* Your form fields */}
    </form>
  );
}
```

### 2. Track Button Clicks

```tsx
import { trackButtonClick } from "@/utils/analytics";

function CTAButton() {
  return (
    <button
      onClick={() => {
        trackButtonClick("Get Started", "cta-button-hero");
        // Your button logic
      }}
    >
      Get Started
    </button>
  );
}
```

### 3. Track Link Clicks

```tsx
import { trackLinkClick } from "@/utils/analytics";

function ExternalLink() {
  return (
    <a
      href="https://example.com"
      onClick={() => {
        trackLinkClick("Visit Example", "https://example.com", true);
      }}
    >
      Visit Example
    </a>
  );
}
```

### 4. Track File Uploads

```tsx
import { trackFileUpload } from "@/utils/analytics";

function FileUploader() {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      trackFileUpload(file.type, file.size, file.name);
      // Your upload logic
    }
  };

  return <input type="file" onChange={handleFileChange} />;
}
```

### 5. Track Search

```tsx
import { trackSearch } from "@/utils/analytics";

function SearchBar() {
  const handleSearch = (query) => {
    const results = performSearch(query);
    trackSearch(query, results.length);
  };

  return <input onChange={(e) => handleSearch(e.target.value)} />;
}
```

### 6. Track Modal Open/Close

```tsx
import { trackModal } from "@/utils/analytics";

function Modal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      trackModal("signup_modal", "opened");
    }
  }, [isOpen]);

  const handleClose = () => {
    trackModal("signup_modal", "closed");
    onClose();
  };

  return isOpen ? <div>Modal Content</div> : null;
}
```

### 7. Track Custom Events

```tsx
import { useCaptureEvent } from "@/hooks/usePostHog";

function CustomComponent() {
  const captureEvent = useCaptureEvent();

  const handleCustomAction = () => {
    captureEvent("custom_event_name", {
      property1: "value1",
      property2: "value2",
    });
  };

  return <button onClick={handleCustomAction}>Custom Action</button>;
}
```

### 8. Track User Authentication

```tsx
import { trackAuth } from "@/utils/analytics";
import { identifyUser } from "@/lib/posthog";

// On signup
function handleSignup(userData) {
  trackAuth("signup", userData.id, { email: userData.email });
  identifyUser(userData.id, {
    email: userData.email,
    name: userData.name,
    plan: userData.plan,
  });
}

// On login
function handleLogin(userData) {
  trackAuth("login", userData.id);
  identifyUser(userData.id, {
    email: userData.email,
    name: userData.name,
  });
}

// On logout
function handleLogout() {
  trackAuth("logout");
  resetUser(); // Clears user identity
}
```

### 9. Track API Errors

```tsx
import { trackAPIError } from "@/utils/analytics";

async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      trackAPIError("/api/data", response.status, "Failed to fetch data");
    }
  } catch (error) {
    trackAPIError("/api/data", 0, error.message);
  }
}
```

---

## Privacy & Compliance

### Sensitive Fields

The following fields are automatically excluded from tracking:

- `password`
- `confirmPassword`
- `cardNumber`
- `cvv`
- `ssn`

### Adding More Sensitive Fields

To mark a field as sensitive:

```tsx
<input type="text" data-sensitive="true" {...form.register("sensitiveField")} />
```

Or add to the exclusion list in `src/lib/posthog/config.ts`:

```ts
export const EXCLUDED_FIELD_NAMES = [
  "password",
  "confirmPassword",
  "cardNumber",
  "cvv",
  "ssn",
  "yourCustomField", // Add here
];
```

---

## Viewing Analytics

### PostHog Dashboard

1. Log in to your PostHog account
2. Navigate to different sections:
   - **Events** - See all tracked events
   - **Session Recordings** - Watch user sessions
   - **Insights** - Create custom analytics dashboards
   - **Funnels** - Track conversion funnels
   - **Retention** - See user retention metrics

### Common Insights to Create

#### 1. Form Abandonment Rate

- Event: `form_abandoned`
- Filter by: `form_name`
- Metric: Count of abandonments vs. submissions

#### 2. Most Visited Pages

- Event: `$pageview`
- Group by: `path`
- Metric: Count

#### 3. Average Time on Page

- Event: `$pageleave`
- Metric: Average of `session_duration_ms`

#### 4. Form Completion Funnel

- Events: `form_started` → `form_submitted` → `form_submission_success`
- Filter by: `form_name`

---

## Debugging

### Enable Debug Mode

Debug mode is automatically enabled in development. Check your browser console for PostHog logs.

### Verify Events

1. Open browser DevTools
2. Go to Network tab
3. Filter by "posthog"
4. You should see events being sent

### Test Events

```tsx
import { useCaptureEvent } from "@/hooks/usePostHog";

function TestComponent() {
  const captureEvent = useCaptureEvent();

  return (
    <button onClick={() => captureEvent("test_event", { test: true })}>
      Send Test Event
    </button>
  );
}
```

---

## Best Practices

### 1. Consistent Naming

Use snake_case for event names and properties:

```tsx
// Good
captureEvent("form_submitted", { form_name: "contact_form" });

// Bad
captureEvent("FormSubmitted", { FormName: "contactForm" });
```

### 2. Meaningful Properties

Include context that helps you understand user behavior:

```tsx
captureEvent("button_clicked", {
  button_text: "Get Started",
  button_location: "hero_section",
  page_url: window.location.href,
  user_type: "free_tier",
});
```

### 3. Don't Over-Track

Avoid tracking every single interaction. Focus on:

- Key user actions
- Conversion points
- Potential pain points
- Business-critical events

### 4. Test Before Production

Always test tracking in development before deploying to production.

---

## Events Reference

### Automatically Tracked Events

| Event Name                | Description                | Properties                                              |
| ------------------------- | -------------------------- | ------------------------------------------------------- |
| `$pageview`               | User visits a page         | `path`, `search`, `$current_url`                        |
| `$pageleave`              | User leaves a page         | `exit_page`, `session_duration_ms`                      |
| `form_started`            | User starts filling a form | `form_name`, `form_id`                                  |
| `form_field_focused`      | User focuses on a field    | `form_name`, `field_name`                               |
| `form_field_filled`       | User fills a field         | `form_name`, `field_name`, `field_value`                |
| `form_field_blurred`      | User leaves a field        | `form_name`, `field_name`, `is_filled`, `time_spent_ms` |
| `form_abandoned`          | User abandons form         | `form_name`, `last_field`, `completion_percentage`      |
| `form_submitted`          | Form is submitted          | `form_name`, `total_fields`, `time_spent_ms`            |
| `form_submission_success` | Form submission succeeds   | `form_name`                                             |
| `form_submission_error`   | Form submission fails      | `form_name`, `error_message`                            |
| `form_validation_error`   | Form validation fails      | `form_name`, `field_name`, `error_type`                 |
| `user_idle`               | User becomes idle          | `idle_duration_ms`, `page`                              |
| `user_active`             | User becomes active again  | `page`                                                  |
| `tab_visibility_changed`  | User switches tabs         | `is_visible`, `page`                                    |

### Manual Tracking Events

| Event Name         | Function             | Properties                                 |
| ------------------ | -------------------- | ------------------------------------------ |
| `button_clicked`   | `trackButtonClick()` | `button_text`, `button_id`, `page_url`     |
| `link_clicked`     | `trackLinkClick()`   | `link_text`, `link_url`, `is_external`     |
| `file_uploaded`    | `trackFileUpload()`  | `file_type`, `file_size`, `file_name`      |
| `search_performed` | `trackSearch()`      | `search_query`, `results_count`            |
| `modal_opened`     | `trackModal()`       | `modal_name`, `page_url`                   |
| `modal_closed`     | `trackModal()`       | `modal_name`, `page_url`                   |
| `user_signed_up`   | `trackAuth()`        | `user_id`                                  |
| `user_logged_in`   | `trackAuth()`        | `user_id`                                  |
| `user_logged_out`  | `trackAuth()`        | -                                          |
| `api_error`        | `trackAPIError()`    | `endpoint`, `status_code`, `error_message` |

---

## Troubleshooting

### Events Not Showing Up

1. Check that `NEXT_PUBLIC_POSTHOG_KEY` is set correctly
2. Verify the API key in PostHog dashboard
3. Check browser console for errors
4. Ensure you're not blocking PostHog with ad blockers

### Session Recording Not Working

1. Verify session recording is enabled in PostHog project settings
2. Check that you're not in an incognito/private window
3. Clear browser cache and try again

### Forms Not Being Tracked

1. Ensure you're using `react-hook-form`
2. Verify the form has a `name` attribute on inputs
3. Check that `TrackedForm` is properly wrapped around your form
4. Ensure the form is using the `form` prop from `useForm()`

---

## Support

For PostHog-specific issues, refer to:

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Community](https://posthog.com/questions)

For implementation questions, check the code in:

- `src/lib/posthog/` - Core PostHog setup
- `src/hooks/` - Tracking hooks
- `src/components/TrackedForm.tsx` - Form tracking component
- `src/utils/analytics.ts` - Helper functions
