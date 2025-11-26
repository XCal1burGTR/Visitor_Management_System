# Visitor Management System

A modern, elegant Visitor Management System built with Next.js, Prisma, and PostgreSQL. This application allows security personnel to check in visitors, print gate passes, and track visitor history.

## Features

-   **Dashboard**: Real-time statistics (Visitors Inside, Today, Total, Exited).
-   **Check-In**: Streamlined visitor registration with photo capture.
-   **Gate Pass**: Thermal printer-friendly gate pass generation with QR code.
-   **History**: Searchable visitor logs.
-   **Responsive Design**: Works seamlessly on desktop and tablets.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Styling**: Tailwind CSS
-   **UI Components**: Shadcn/UI + Lucide React

## Prerequisites

-   Node.js (v18 or higher)
-   PostgreSQL installed and running locally or a cloud database URL.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/XCal1burGTR/Visitor_Management_System.git
cd Visitor_Management_System
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> Note: `--legacy-peer-deps` is required due to some dependency versions.

### 3. Database Setup

1.  Make sure your PostgreSQL server is running.
2.  Create a new database (e.g., `visitor_management`).
3.  Create a `.env` file in the root directory.
4.  Add your database connection string to `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/visitor_management?schema=public"
```

Replace `username`, `password`, and `visitor_management` with your actual PostgreSQL credentials.

### 4. Run Migrations

Push the database schema to your PostgreSQL instance:

```bash
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1.  **Check In**: Click the "+" button to register a new visitor. Take a photo and fill in details.
2.  **Print Pass**: After check-in, expand the visitor card on the dashboard and click "Print Pass" to generate a thermal gate pass.
3.  **Check Out**: When the visitor leaves, click "Check Out" on their card.
