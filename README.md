# Jetline Promo UI

Modern UI design prototypes for the Jetline promotional products platform.

## Overview

This project contains two different UI design approaches for the Jetline promo system:

1. **Calendar Idea** - Interactive product selection interface
2. **Calculation Result Idea** - Clean calculation results display

Both designs follow a clean, modern aesthetic with:
- All-white backgrounds
- Subtle borders instead of gradients
- Proper visual hierarchy
- Responsive layouts
- Professional spacing and typography

## Purpose

This repository serves as a **design reference** for developers to follow when implementing the new UI across the Jetline platform. The key principles demonstrated here should be applied consistently:

### Design Principles

- **No gradients** - Use solid colors with borders
- **Clean white backgrounds** - Avoid colored backgrounds
- **Thin borders** - Use 1px borders, not thick ones
- **Proper spacing** - Consistent padding and margins
- **Modern typography** - Clear hierarchy with appropriate font sizes
- **Subtle shadows** - Use sparingly for depth
- **Color for emphasis** - Red for actions, green for success/totals

## Pages

### 1. Calendar Idea (`/calendar`)

An interactive multi-step product configurator for calendars:

- Category selection (Wall Calendars, Tent Calendars, etc.)
- Progressive disclosure (steps appear as you select)
- Step 1: Select promotion type (7-Page or 13-Page)
- Step 2: Select product size (A1, A2, A3)
- Step 3: Select quantity (300, 500, or custom)
- Real-time price calculation
- Clean results panel with product specs and pricing

**Key Features:**
- Bubble button selection interface
- Custom quantity input
- Formatted pricing (no decimals, comma-separated thousands)
- Product specifications display (Size, Colour, Type)
- Animated transitions between steps

### 2. Calculation Result Idea (`/calculation-result`)

A clean, organized display of calculation results with cost breakdown:

- Left column: Summary with quantity, print type, total, and specs
- Right column: Detailed cost breakdown by line item
- Action buttons for submit and assign customer
- Restart quote option

**Key Features:**
- Hardcoded sample data matching existing system
- Clean tabular breakdown
- Prominent total display
- Professional spacing and alignment

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## For Developers

When implementing these designs in the main application:

1. **Follow the visual style** - Match the spacing, colors, and borders exactly
2. **No improvisation** - Stick to the established patterns
3. **Consistent formatting** - Use the `formatPrice` function approach (no decimals, comma-separated)
4. **Responsive design** - Maintain the grid layouts and breakpoints
5. **Component structure** - Break down into reusable components where appropriate

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## Project Structure

```
app/
├── calendar/              # Calendar configurator page
├── calculation-result/    # Results display page
├── components/           # Shared components (Navigation)
├── layout.tsx           # Root layout with navigation
└── globals.css          # Global styles
```

---

**Note:** This is a design prototype. Integrate these patterns into your existing application architecture while maintaining the visual consistency demonstrated here.
