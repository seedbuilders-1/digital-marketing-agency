# 💰 Pricing & Discount System Documentation

## Overview

This document explains how the pricing display, dynamic discount percentage, and slashed pricing work across the Digital Marketing Agency application.

---

## 🎯 Core Pricing Logic

### **Dynamic Discount System**

The discount percentage is now **dynamic per plan**, configurable by the admin.

- **Default:** 50% (if not changed)
- **Database Field:** `Plan.discountPercentage` (Int, 0-100)

### **Formula:**

```javascript
const discountPercentage = plan.discountPercentage || 0;
const discountedPrice = originalPrice * (1 - discountPercentage / 100);
```

---

## 📍 Where Pricing is Displayed

### **1. Public Service Page** (`/service/[slug]`)

**File:** `src/app/service/[slug]/page.tsx`

**Lines:** 338-363

```tsx
const discountPercentage = selectedOption?.discountPercentage || 0;
const discountedPrice = Number(price) * (1 - discountPercentage / 100);

// Display
<div className="flex flex-col">
  {/* Only show strikethrough if there IS a discount */}
  {discountPercentage > 0 && (
    <span className="text-2xl text-gray-400 line-through">
      ₦{Number(price).toLocaleString()}
    </span>
  )}

  {/* Discounted price */}
  <span className="text-4xl font-bold text-gray-900">
    ₦{discountedPrice.toLocaleString()}
  </span>
</div>;

{
  /* Dynamic Badge */
}
{
  discountPercentage > 0 && <Badge>{discountPercentage}% OFF</Badge>;
}
```

---

### **2. Dashboard Service Page** (`/dashboard/services/[slug]`)

**File:** `src/app/(dashboard)/dashboard/services/[slug]/page.tsx`

Updated to use the same dynamic logic as the public page.

---

### **3. Order Summary Page** (`/dashboard/services/[slug]/request/summary`)

**File:** `src/app/(dashboard)/dashboard/services/[slug]/request/summary/page.tsx`

**Referral Logic:**

- The referral system now uses the **plan's configured discount**.
- Text updates dynamically: "Refer a Friend & Get {X}% Off!"
- If the plan has 100% discount, the calculated price is ₦0.

```tsx
const discountPercentage = selectedPlan?.discountPercentage || 0;
const discountedPrice = useMemo(
  () => originalPrice * (1 - discountPercentage / 100),
  [originalPrice, discountPercentage],
);

const finalPrice = discountApplied ? discountedPrice : originalPrice;
```

---

## 🛠️ How to Modify Pricing

### **Change Discount Percentage**

1. Go to **Admin Dashboard** > **Service Management**.
2. Edit a Service.
3. In the **Plans** section, you will see a "Discount %" field.
4. Enter a value between 0 and 100.
5. Save the service.

---

## 🎨 Styling

Styling remains consistent with the previous design, respecting the existing design tokens.

---

## 🐛 Tested Scenarios

- **0% Discount:** Only original price shown, no badge.
- **50% Discount:** Strikethrough price + discounted price + "50% OFF" badge.
- **100% Discount:** Price becomes ₦0. Summary page detects `isFree` and skips payment.
