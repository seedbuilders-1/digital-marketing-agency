# PostHog Analytics - Quick Start

## ✅ Installation Complete!

PostHog analytics has been successfully integrated into your Digital Marketing Agency application.

## 🚀 Next Steps

### 1. Add Your PostHog API Key

Open `.env.local` and replace the placeholder with your actual PostHog API key:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Where to find your API key:**

1. Go to https://app.posthog.com
2. Click on your project
3. Go to Settings → Project Settings
4. Copy the "Project API Key"

### 2. Test the Integration

Start your development server:

```bash
npm run dev
```

Open your browser and:

1. Navigate to any page - page views are automatically tracked
2. Open browser DevTools → Console
3. You should see PostHog debug logs (in development mode)
4. Check Network tab for requests to PostHog

### 3. Verify in PostHog Dashboard

1. Go to your PostHog dashboard
2. Click on "Events" in the sidebar
3. You should see `$pageview` events appearing
4. Click on "Session Recordings" to watch user sessions

## 📊 What's Already Tracking

### Automatic Tracking (No Code Changes Needed)

- ✅ Page views
- ✅ Page exits
- ✅ Session duration
- ✅ User idle time
- ✅ Tab visibility changes
- ✅ Exit intent

### Ready to Use (Requires Implementation)

- ✅ Form tracking (all interactions)
- ✅ Button clicks
- ✅ Link clicks
- ✅ File uploads
- ✅ Search queries
- ✅ Modal interactions
- ✅ User authentication
- ✅ API errors

## 📝 How to Track Your Forms

### For Service Request Forms & Signup Forms

Replace your existing `<form>` with `<TrackedForm>`:

```tsx
import { TrackedForm } from "@/components/TrackedForm";
import { useForm } from "react-hook-form";

function YourForm() {
  const form = useForm();

  const handleSubmit = async (data) => {
    // Your submission logic
  };

  return (
    <TrackedForm
      formName="your_form_name" // e.g., "service_request_form"
      form={form}
      onSubmit={handleSubmit}
    >
      {/* Your form fields */}
      <input {...form.register("fieldName")} />
      <button type="submit">Submit</button>
    </TrackedForm>
  );
}
```

**That's it!** PostHog will now track:

- When users start filling the form
- Which fields they interact with
- Which fields they fill vs. abandon
- Form submission success/failure
- Validation errors

## 📚 Documentation

For complete documentation, see:

- **[POSTHOG_ANALYTICS_GUIDE.md](./POSTHOG_ANALYTICS_GUIDE.md)** - Full documentation
- **[src/components/examples/TrackedFormExamples.tsx](./src/components/examples/TrackedFormExamples.tsx)** - Code examples

## 🔍 Files Created

### Core Files

- `src/lib/posthog/client.ts` - PostHog client initialization
- `src/lib/posthog/config.ts` - Configuration and event constants
- `src/lib/posthog/index.ts` - Exports

### Components

- `src/components/PostHogProvider.tsx` - Provider component (already integrated)
- `src/components/TrackedForm.tsx` - Form tracking wrapper
- `src/components/ExitTracker.tsx` - Exit tracking component

### Hooks

- `src/hooks/usePostHog.ts` - Main PostHog hook
- `src/hooks/useFormTracking.ts` - Form tracking hook
- `src/hooks/useExitTracking.ts` - Exit tracking hook

### Utilities

- `src/utils/analytics.ts` - Helper functions for tracking

### Examples & Documentation

- `POSTHOG_ANALYTICS_GUIDE.md` - Complete guide
- `src/components/examples/TrackedFormExamples.tsx` - Example implementations

## 🎯 Priority Actions

1. **Add your PostHog API key** to `.env.local`
2. **Test page view tracking** by navigating around your site
3. **Update your service request forms** to use `TrackedForm`
4. **Update your signup forms** to use `TrackedForm`
5. **Add user identification** on login/signup (see examples)

## 🛠️ Troubleshooting

### Events not showing up?

- Check that `NEXT_PUBLIC_POSTHOG_KEY` is set correctly
- Verify the API key in PostHog dashboard
- Check browser console for errors
- Disable ad blockers

### Need help?

- Check the full guide: `POSTHOG_ANALYTICS_GUIDE.md`
- Review examples: `src/components/examples/TrackedFormExamples.tsx`
- PostHog docs: https://posthog.com/docs

## 📊 Recommended PostHog Dashboards

Once you have data flowing, create these insights in PostHog:

1. **Form Funnel**
   - Events: `form_started` → `form_submitted` → `form_submission_success`
   - Filter by: `form_name`

2. **Form Abandonment Rate**
   - Compare `form_started` vs `form_abandoned`
   - Group by: `form_name`

3. **Most Visited Pages**
   - Event: `$pageview`
   - Group by: `path`

4. **User Journey**
   - Use Session Recordings
   - Filter by: Users who abandoned forms

---

**You're all set!** 🎉

Just add your API key and start tracking user behavior to optimize your conversion rates.
