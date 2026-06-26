# ADITA LMS Platform

A modern, multi-role learning and training platform built with Next.js for the Africa Digital & Innovation Technology Academy (ADITA). The project combines a public-facing website with specialized experiences for students, instructors, admins, finance, and program management.

## Overview

This repository powers a digital education ecosystem that includes:

- Public marketing and program pages
- Course and program discovery
- Student and instructor dashboards
- Admin and management workflows
- Finance and approval processes
- Event registration and incubator application flows

## Features

- Responsive landing pages and content sections
- Program and course browsing experience
- Role-based dashboards for different users
- Dynamic forms for enrollment, applications, and approvals
- Theme support and modern UI components
- Calendar, charts, and reporting-related interfaces

## Project Structure

```text
app/                # Application routes and pages
components/         # Reusable UI components and page sections
services/           # API/service layer for auth, courses, and events
helpers/            # Helper functions and content utilities
hooks/              # Custom React hooks
lib/                # Shared library utilities
public/             # Static assets such as images
styles/             # Global styling
```

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- React Hook Form + Zod
- Axios
- Recharts and FullCalendar
- Lucide Icons

## Prerequisites

Make sure you have the following installed:

- Node.js 18+ or newer
- pnpm

## Getting Started

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd LMS_ADITA
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

4. Open the app in your browser
   ```text
   http://localhost:3000
   ```

## Production Build

To create a production build:

```bash
pnpm build
```

To run the production build locally:

```bash
pnpm start
```

## Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the app for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run lint checks

## Notes

This project appears to be under active development and includes a wide range of routes and modules for education, administration, and innovation-focused services.
