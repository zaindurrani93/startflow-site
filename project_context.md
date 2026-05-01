\# StartFlow PROJECT CONTEXT



\## Overview

StartFlow is a beginner-friendly business setup service helping users go from idea → fully launched business.



\## Tech Stack

\- Next.js

\- Tailwind CSS

\- Vercel (deployment)

\- Stripe (payments)

\- Resend (email onboarding)



\## Pricing

\- Starter — $299

\- Growth — $499 (Most Popular)



\## Current Flow

Pricing → Checkout → Success Page → Onboarding Form → Email sent to owner



\## Environment Variables

\- STRIPE\_SECRET\_KEY

\- NEXT\_PUBLIC\_SITE\_URL

\- RESEND\_API\_KEY

\- CONTACT\_TO\_EMAIL

\- CONTACT\_FROM\_EMAIL



\## What’s Working

\- Website deployed on Vercel

\- Pricing page built

\- Stripe checkout working

\- Success page working

\- Onboarding form UI working



\## Current Issue

\- Onboarding form submission failing at email step

\- Error: "Unable to send onboarding details right now"

\- Currently debugging Resend email integration



\## Key Files

\- app/api/checkout/route.ts

\- app/api/onboarding/route.ts

\- lib/stripe.ts

\- pricing page

\- success page



\## Next Steps

1\. Fix Resend email sending

2\. Confirm onboarding emails deliver

3\. Add confirmation email to client

4\. Optional: save leads to CRM / Google Sheets

