# Footer Component Documentation

## Overview

The comprehensive Footer component has been added to your EduMesh website. It includes newsletter subscription, company information, links, contact details, and social media integration.

## Files Created

### 1. **Footer Component**

- **Location:** `src/components/layout/Footer.tsx`
- **Features:**
  - Newsletter email subscription form
  - Product, Company, Resources, and Legal link sections
  - Social media links (Facebook, Twitter, Instagram, LinkedIn, GitHub)
  - Contact information (Email, Phone, Address)
  - Responsive grid layout
  - Dark/Light theme support
  - Animated elements and hover effects

### 2. **Privacy Policy Page**

- **Location:** `src/pages/Privacy.tsx`
- **Route:** `/privacy`
- **Features:**
  - Full privacy policy content
  - COPPA compliance information
  - Data collection and usage explanation
  - Back navigation button
  - Integrated Footer

### 3. **Terms of Service Page**

- **Location:** `src/pages/Terms.tsx`
- **Route:** `/terms`
- **Features:**
  - Complete terms and conditions
  - Use license and disclaimer
  - Liability limitations
  - Governing law section
  - Professional header with timestamp
  - Integrated Footer

## Component Structure

```tsx
<Footer />
```

### Main Sections:

#### 1. Newsletter Section

- Email input field
- Subscribe button
- Success confirmation message
- Responsive design for mobile/desktop

#### 2. Footer Content Grid

- **Brand Section** (Left)

  - Company logo and name
  - Description
  - Social media icons (5 platforms)

- **Link Sections** (4 columns)
  - Product links (Features, Pricing, Security, Changelog)
  - Company links (About, Blog, Careers, Press)
  - Resources links (Docs, Help, Community, API)
  - Legal links (Privacy, Terms, Cookies, GDPR)

#### 3. Contact Section

- Email contact with mailto link
- Phone contact with tel link
- Address with location icon
- Hover effects and animations

#### 4. Bottom Footer

- Copyright information with dynamic year
- Status indicator (All systems operational)
- Quick links (Status, Sitemap, Contact)

## Customization Guide

### 1. Update Social Media Links

Edit in `src/components/layout/Footer.tsx`:

```tsx
const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com/your-page", // Update this
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  // ... other social links
];
```

### 2. Update Contact Information

```tsx
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "your-email@edumesh.com", // Update this
    href: "mailto:your-email@edumesh.com",
  },
  // ... other contact info
];
```

### 3. Update Footer Links

```tsx
const footerSections = {
  product: {
    title: "Product",
    links: [
      { label: "Your Link", href: "/your-path" }, // Add your links
      // ...
    ],
  },
  // ... other sections
};
```

### 4. Update Company Information

```tsx
<p className="text-sm text-muted-foreground mb-6 leading-relaxed">
  Your company description here...
</p>
```

### 5. Newsletter Handler

The footer includes a working newsletter subscription form:

```tsx
const [email, setEmail] = useState("");
const [subscribed, setSubscribed] = useState(false);

const handleSubscribe = (e: React.FormEvent) => {
  e.preventDefault();
  // TODO: Connect to your email service (e.g., Mailchimp, SendGrid)
  if (email.trim()) {
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  }
};
```

**To integrate with a real email service:**

```tsx
// Example: Using a backend API
const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  } catch (error) {
    console.error("Subscribe error:", error);
  }
};
```

## Usage

### On Index Page (Landing Page)

The footer is already integrated at the bottom of the Index page:

```tsx
import { Footer } from "@/components/layout/Footer";

export default function Index() {
  return (
    <div>
      {/* ... page content ... */}
      <Footer />
    </div>
  );
}
```

### On Custom Pages

To add the footer to other pages:

```tsx
import { Footer } from "@/components/layout/Footer";

export default function CustomPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{/* Your content here */}</main>
      <Footer />
    </div>
  );
}
```

## Styling & Theme Support

The footer uses your existing Tailwind CSS configuration and supports:

- ✅ Dark mode (default)
- ✅ Light mode (via next-themes)
- ✅ Custom color variables from your theme
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions

## Features List

✅ **Newsletter Subscription**

- Email validation
- Success confirmation
- Responsive design

✅ **Product Links**

- Organized in columns
- Hover animations
- Arrow indicators on hover

✅ **Social Media Integration**

- 5 social platforms
- Custom hover colors
- Open in new tab

✅ **Contact Information**

- Interactive contact cards
- Clickable links (email, phone)
- Location information

✅ **Legal Pages**

- Privacy Policy (/privacy)
- Terms of Service (/terms)
- Styled with custom headers
- Full integration with Footer

✅ **Responsive Design**

- Mobile: Single column
- Tablet: 2 columns
- Desktop: 6 columns
- Flexible layout

✅ **Accessibility**

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliant

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Performance

- Optimized component size
- Lazy-loadable
- No external dependencies (uses existing libraries)
- Smooth animations (CSS-based)

## Future Enhancements

Potential additions:

- [ ] Language selector
- [ ] Theme switcher
- [ ] Sitemap links
- [ ] Blog/News section
- [ ] FAQ section
- [ ] Support chat
- [ ] Back to top button
- [ ] Secondary footer menu

## Support

For questions about customizing the footer, refer to:

- Component code: `src/components/layout/Footer.tsx`
- Tailwind CSS docs: https://tailwindcss.com
- shadcn-ui docs: https://ui.shadcn.com
- React Router docs: https://reactrouter.com
