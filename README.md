# ReadQuest

A personal reading tracker and book management application designed to help readers track their reading progress, organize their personal reading list, and stay on top of reading goals.

![UI Showcase](public/ui-showcase.avif)

## Features & Overview

- **Reading Progress Tracking:** Monitor pages read, completion percentages, and active reads in real time.
- **Dashboard & Reading Insights:** View key reading metrics (total books, currently reading, completed, unread) and track progress toward your reading target.
- **Activity Logs & Quotes:** Keep a chronological log of reading updates and save memorable quotes from your books.
- **Personal Library Organization:** Categorize books by reading status and search through your personal reading list effortlessly.
- **Responsive Dark/Light Interface:** Designed for a clean, distraction-free experience across desktop, tablet, and mobile devices.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Next.js
- **Database:** PostgreSQL
- **Tooling:** Docker & VS Code Dev Containers

## Getting Started (Local Setup)

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (for running outside Dev Containers)
- [Docker](https://www.docker.com/) (and [VS Code](https://code.visualstudio.com/) with the **Dev Containers** extension if using containerized development)

### 1. Clone the Repository

```bash
git clone https://github.com/dhaboav/ReadQuest.git
cd ReadQuest
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update the `DB_URL` value in `.env.local` depending on where you run the application:

- Use `localhost` as the database host when running directly on your local machine.
- Use `db` as the database host when running inside the Dev Container.

### 3. Customize Local Settings (Optional)

- **Reading Goal:** Update the `target_goal` variable in `.env.local` to set your target number of books.
- **Dashboard Quote:** Edit the quote text directly inside the `QuotesCard` component to customize the displayed quote.

### 4. Run the Application

#### Option A: Using VS Code Dev Containers (Recommended)

1. Open the project folder in VS Code.
2. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and select **Dev Containers: Reopen in Container**.
3. Start the development server:

   ```bash
   pnpm dev
   ```

#### Option B: Running Directly on Your Local Machine

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Ensure your local PostgreSQL database is running and matches your `DB_URL` in `.env.local`.

3. Start the development server:

   ```bash
   pnpm dev
   ```

## License

This project is open-source and available under the **MIT License**.
