# 🤖 Copilot Instructions for ABO Portfolio / Power Brokerage Platform

**Goal:** Generate code components (Next.js, TypeScript, shadcn/ui) that strictly adhere to the visual design language of the portfolio image while upholding the project's strict architectural and technical standards.

---

## 1. 🖼️ Visual Design Language (Portfolio)

The generated UI must align with the clean, modern, and high-contrast design aesthetic shown in the portfolio image.

### A. General Aesthetic & Layout

- **Design Vibe:** Modern, professional, clean, and balanced, using a grid-based layout with prominent visual containers (cards).
- **Structure:** Primarily a **two-column grid** for major sections (like the hero) and a **flexible/masonry-like grid** for project cards.
- **Spacing:** Use generous padding within components and consistent margins between major blocks to create "air."
- **Borders/Shadows:** Components are contained within soft, rounded containers. Use subtle `box-shadow` or differentiated background colors for separation; avoid hard borders.
- **Corner Radius:** **Crucial Constraint:** **Avoid sharp corners.** All containers, buttons, and input fields must use a noticeable `border-radius`.
  - **Large Containers (Hero):** Use a large, soft radius (e.g., `24px` to `32px`).
  - **Project Cards/Buttons/Inputs:** Use a distinct but smaller radius (e.g., `8px` to `16px`).

### B. Typography

- **Headings:** Large, bold, and highly legible.
- **Body Text:** Smaller, well-spaced, and light.

### C. Component Structure

- **Hero Section:**
  - Structured as two columns with a large, soft outer radius.
  - The text block uses a **soft, desaturated gradient** background (e.g., from light green to light yellow/orange).
  - The image/visual block uses a **solid, high-contrast color** (e.g., vivid yellow/mustard equivalent).
  - The primary CTA button ("Contact me") is **Pill-shaped**, has a **solid black-like background**, and white text.
- **Project Cards:**
  - Must have a consistent small-to-medium corner radius.
  - Example 1 (Flop App): Uses a **solid, vivid background color** (e.g., Purple equivalent) to showcase the product visual.
  - Example 2 (Lenscape Dashboard): Uses a **deep charcoal/dark blue-gray background** for a tech/dashboard feel. Internal UI elements (like the "Swap" button) use a high-contrast interactive color (e.g., cyan/bright blue).

---

## 2. ⚙️ Core Tech Stack Overview

- **Framework**: Next.js 15.3.4 (App Router + Turbopack)
- **Language**: TypeScript (strict — no `any`)
- **UI**: shadcn/ui + Radix primitives + Tailwind CSS v4
- **Database**: PostgreSQL + Drizzle ORM (drizzle-orm ^0.44 + drizzle-kit)
- **Auth**: better-auth
- **State**: React Query (TanStack Query v5) for server state, minimal local `useState`/`useMemo`
- **Styling**: `clsx` + `tailwind-merge` + `cn()` utility
- **Icons**: lucide-react
- **Forms**: react-hook-form + zod + @hookform/resolvers
- **Other notable deps**: Recharts, Nivo charts, MDX Editor, S3 client, csv-parse, winston logging, better-queue etc.

---

## 3. 🚨 Critical Architecture Rules (Never Violate)

### 1. UI Components (shadcn/ui first)

- **Always** prefer existing shadcn/ui components (`Button`, `Input`, `Dialog`, `Table`, `DropdownMenu`, `Accordion`, `Tabs`, `Card`, `Select`, `Tooltip`, etc.).
- Never write raw `<button>`, `<input>`, `<table>`, or `<div>` with manual ARIA when a shadcn component exists.
- All conditional classes must go through the `cn()` utility — **never** use ternary operators directly in `className`.

  ```tsx
  // Correct
  className={cn("text-sm", { "font-bold": isActive }, className)}

  // Forbidden
  className={`text-sm ${isActive ? "font-bold" : ""}`}
  ```

### 2. Data Access Layer (DAL) — Strictly Enforced Separation

- **All** database queries, API calls to external services, S3 operations, queue interactions, etc. **must** live under:
  ```
  src/data-access/
  ```
- UI components and pages are **forbidden** from:
  - Using `fetch`, `ofetch`, or any direct HTTP calls
  - Directly importing `db` from drizzle
  - Accessing `localStorage`/`sessionStorage` for business logic data
  - Containing raw SQL or query logic
- DAL functions must:
  - Be pure, typed, and descriptively named (`getUserPowerPositions`, `createBrokerageTrade`, `uploadSignedContract`, etc.)
  - Return fully typed objects (use drizzle’s inferred types when possible)
  - Normalize/transform data if the DB shape ≠ UI shape

### 3. State Management

- Server state / async data → **React Query** (`useQuery`, `useMutation`, `queryClient`)
- Local component state → `useState` / `useReducer` only when truly local
- Derived data → `useMemo`
- Side effects → `useEffect` (keep minimal)
- Never duplicate data fetching logic between client and server components unless using `await` in Server Components

### 4. General Coding Standards

- 100% TypeScript — no `any` (use `unknown` or generics if needed)
- Functional components + hooks only
- Single responsibility per file/component
- Composition > inheritance
- Keep components small (<300 lines when possible)
- Favor explicit, readable code over clever one-liners
- Prefer early returns and guard clauses

### 5. Project-Specific Conventions

- Do not create db migrations manually — always ask the user to do it
- Logging → winston (configured centrally)
- Background jobs → better-queue + better-queue-memory (in-memory for dev, consider persistent store later)
- Charts → prefer Recharts for standard, Nivo for calendar/heatmap when needed

---

## 🚀 Summary for Copilot

You are working on a professional-grade power brokerage platform. Prioritize:

1.  **Correct Architecture (DAL separation is mandatory)**
2.  **Visual Consistency (Strict adherence to the rounded, grid-based, high-contrast design)**
3.  **shadcn/ui usage**
4.  **Type Safety** (TypeScript strictness and no `any`)
5.  **Readability & Maintainability**

**Never suggest** direct `fetch` in components, raw HTML where shadcn exists, or `any` types.
