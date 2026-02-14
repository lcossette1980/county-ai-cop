# County Gov AI CoP

**AI Community of Practice Platform for County Government**

Full-stack internal platform empowering county government employees to responsibly adopt, track, and measure AI initiatives across departments. Modern Next.js application with Firebase/Firestore backend, real-time admin dashboard, and integrated analytics.

---

## Platform at a Glance

| Metric | Value |
|---|---|
| **Routes** | 28 (14 static + 14 dynamic API) |
| **Pages** | 17 public-facing + admin dashboard |
| **API Endpoints** | 14 RESTful routes |
| **Prompt Templates** | 25+ curated + community submissions |
| **Auth** | Invite-only admin (Firebase Auth + NextAuth.js) |

---

## Architecture

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS v4 (CSS-first config) |
| Icons | Lucide React |
| Charts | Chart.js + react-chartjs-2 |
| Auth | NextAuth.js v4 (credentials provider) |
| Database | Firebase Firestore |
| Auth Backend | Firebase Authentication |
| Admin SDK | Firebase Admin v13 (ADC + service account) |
| Fonts | Inter + JetBrains Mono (next/font) |
| Deployment | Vercel |

### Route Architecture

```
src/app/
├── (public)/           # Public-facing content pages
│   ├── about/
│   ├── best-practices/
│   ├── contact/
│   ├── ethics/
│   ├── events/
│   ├── faq/
│   ├── getting-started/
│   ├── governance/
│   ├── prompt-library/
│   ├── resources/
│   └── roi-calculator/
├── (auth)/             # Authenticated user pages
│   ├── submit-project/
│   ├── submit-prompt/
│   └── roi-history/
├── (admin)/            # Admin dashboard
│   └── admin/
├── api/                # RESTful API routes
│   ├── auth/[...nextauth]/
│   ├── projects/       # CRUD + status history
│   ├── prompts/        # CRUD + approve/reject
│   ├── roi/            # CRUD + project linking
│   ├── contact/        # CRUD + status management
│   └── admin/stats/    # Aggregated analytics
└── login/
```

### Component Architecture

```
src/components/
├── admin/              # Admin dashboard modules
│   ├── AnalyticsTab    — Chart.js visualizations
│   ├── ChartCard       — Reusable chart wrapper
│   ├── ContactsTab     — Message management
│   ├── DashboardTab    — KPIs + recent activity
│   ├── ProjectDetailModal — Full project view + controls
│   ├── ProjectsTab     — Search/filter + project cards
│   ├── PromptsTab      — Approve/reject workflow
│   ├── SettingsTab     — System configuration
│   ├── StatCard        — Reusable stat display
│   ├── StatusBadge     — Status-colored badges
│   └── useAdminData    — Parallel data fetching hook
├── layout/             # Header, Footer
├── shared/             # PageHeader, SectionCard
└── ui/                 # Button, Card, Badge, Input, Modal, etc.
```

---

## Key Features

### Public Platform
- **Prompt Library** — 25+ curated government AI prompts with search, category filtering, favorites (localStorage), and community-submitted prompts merged from Firestore
- **ROI Calculator** — Interactive calculator with efficiency gain, error reduction, payback period, and FTE equivalent projections. Saves to Firestore with optional project linking via URL params
- **Project Submission** — Authenticated form for departments to propose AI initiatives
- **Prompt Submission** — Community prompt contribution pipeline with admin approval workflow
- **Resource Hub** — Getting started guides, best practices, ethics framework, governance policies, FAQ, events calendar

### Admin Dashboard (6 Tabs)
- **Dashboard** — Real-time KPI stat cards, pending action counts with notification badges, recent projects table
- **Projects** — Search and filter by status, project cards with progress bars, detail modal with status/priority/progress controls, admin notes, and status history timeline
- **Prompts** — Approve/reject workflow with expandable detail view, filter by pending/approved/rejected
- **Contacts** — Message inbox with auto-mark-as-read, status management (new → read → replied → archived)
- **Analytics** — Chart.js dashboard: status distribution doughnut, ROI by department horizontal bar, submissions over time line chart, projects by department vertical bar
- **Settings** — System configuration placeholder

### Data Integration
- Bidirectional ROI-to-project linking (`roiCalculationId` ↔ `projectId`)
- ROI calculator accepts URL params (`?projectId&projectName&department`) for seamless linking from admin project detail
- Admin stats API aggregates across all Firestore collections
- Status history tracking with `FieldValue.arrayUnion` for audit trail
- Prompt library merges static data with approved Firestore submissions at runtime

---

## Related Work: WCAG Remediation Platform

This AI CoP platform is one component of a broader county government AI initiative. The same author designed and built a production-grade WCAG 2.1 AA compliance pipeline to meet the April 2026 ADA deadline.

### End-to-End Compliance Pipeline

| Metric | Value |
|---|---|
| **Diagnostic Modules** | 9 |
| **Remediation Agents** | 6 |
| **Department Coverage** | 84% |
| **Files Under Management** | 56,567 |
| **Compliance Deadline** | April 2026 (ADA) |

**Orchestration:** LangGraph · Gemini 2.5 · Claude · Document AI · Vertex AI · Drupal 10

### 9-Module Diagnostic Layer

| Module | Function |
|---|---|
| Flesch-Kincaid Readability | Plain language compliance scoring |
| Heading Validation | H1–H6 hierarchy structure analysis |
| PII Detection | Personally identifiable information flagging |
| SHA-256 Deduplication | Content fingerprinting and duplicate elimination |
| AcroForm/XFA Detection | PDF form type identification and classification |
| Alt Text Audit | Image description presence and quality analysis |
| Color Contrast | WCAG AA ratio validation (4.5:1 / 3:1) |
| Link Text Accessibility | Descriptive link text verification |
| Language Attribute | `lang` tag presence and correctness |

### 6-Agent Remediation Layer

| Agent | Responsibility |
|---|---|
| **Vision Extraction** | OCR and image content analysis for alt text generation |
| **Form Detection** | AcroForm/XFA identification → accessible form conversion |
| **axe-core Validation** | Automated WCAG rule testing against rendered output |
| **Document Restructuring** | Heading hierarchy and reading order correction |
| **Content Simplification** | Readability improvement for plain language compliance |
| **Output Generation** | Schema-first production of accessible HTML, PDF/UA, and Drupal Webforms |

### Key Outcomes
- Department ownership attribution validated **84% content concentration** across 6 departments
- Schema-first output ensures consistent accessible HTML, PDF/UA, and Drupal Webform generation
- End-to-end pipeline from raw document intake through validated, deployable accessible content
- Parallel agent execution via LangGraph for throughput optimization across 56,567 files

---

## Getting Started

### Prerequisites
- Node.js 18+
- Firebase project with Firestore and Authentication enabled
- Google Cloud CLI (for local Application Default Credentials)

### Local Development

```bash
# Clone
git clone https://github.com/lcossette1980/county-ai-cop.git
cd county-ai-cop

# Install
npm install

# Configure environment
cp .env.example .env.local
# Fill in Firebase credentials and generate NextAuth secret

# Authenticate locally (if no service account key)
gcloud auth application-default login
gcloud auth application-default set-quota-project YOUR_PROJECT_ID

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Yes | Firebase client API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Yes | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Yes | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `FIREBASE_ADMIN_PROJECT_ID` | Yes | Admin SDK project ID |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | Prod | Service account email |
| `FIREBASE_ADMIN_PRIVATE_KEY` | Prod | Service account private key |
| `NEXTAUTH_URL` | Yes | App base URL |
| `NEXTAUTH_SECRET` | Yes | NextAuth encryption secret |

### Build & Deploy

```bash
npm run build   # Production build (Turbopack)
npm start       # Start production server
```

Optimized for **Vercel** — connect your GitHub repo, set environment variables, deploy. Vercel auto-detects Next.js and builds with Turbopack.

For Firebase Admin in production: upload service account credentials as environment variables or configure Workload Identity Federation for keyless auth.

---

## License

Private project. All rights reserved.
