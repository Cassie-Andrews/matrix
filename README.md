<picture>
  <source srcset="./public/submark-landscape-primary.svg" media="(prefers-color-scheme: light)">
  <source srcset="./public/submark-landscape-light.svg" media="(prefers-color-scheme: dark)">
  <img src="./public/submark-landscape-primary.svg" alt="Matrix logo">
</picture>

# Matrix – _Your punch card study companion_
[View the live site](https://matrix-ivory-nu.vercel.app/)
(Note: you must make an account to access Matrix)

_Matrix_ is a productivity-focused study companion with a punch card habit-tracking system and a customizable focus timer. Designed with busy students in mind, this web-based application provides a simple, satisfying way to structure your time and build positive habits.

All too often, students struggle to maintain consistent routines while balancing competing priorities. Existing productivity tools are often clunky, expensive, and difficult to learn. _Matrix_ is a free web app that allows users to visualize success and build positive habits over time, with habit-tracking punch cards and custom focus timers.

<br>

## Core Features

### 👩🏻‍💻 User Accounts
Create a free account to save your progress across sessions and devices.

### ⏲️ Focus Timer
A customizable focus timer allows users to break their time into manageable sessions.

### 🍅 Pomodoro Mode
Automatically cycle between focus blocks and breaks based on the [Pomodoro Method](https://www.todoist.com/productivity-methods/pomodoro-technique). 

### ☑️ Punch Cards
Record your progress with a simple tap or click, and watch your hard work compound over time. Create, edit, reset, and delete cards with custom titles, maximum punches, and tags. 

### 🗃️ Organize Cards
Organize your punch cards with sorted views and group by tags.

### 📱 Responsive Design
Enjoy Matrix on desktop, tablet, and mobile.

<br>

## Tech Stack
- **Framework:** Next.js
- **Frontend:** React, CSS Modules
- **Backend:** Next.js API routes
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Session-based auth (iron-session)
- **Deployment:** Vercel

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) and [IBM Plex Serif](https://fonts.google.com/specimen/IBM+Plex+Serif) from Google Fonts.

<br>

## Getting Started
1. **Clone the repo**
   ```bash
   git clone https://github.com/Cassie-Andrews/matrix.git
   cd matrix
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
5. **Set up environmental variables**<br>
   Create an `.env.local` file in the root directory and add any required env variables<br>
   Example:
   ```bash
   MONGODB_URI=your_mongodb_connection_string_goes_here
   SESSION_SECRET=your_secret_session_key_goes_here
   ```
7. **Run the development server**
   ```bash
   npm run dev
   ```
   Open the application locally at [http://localhost:3000](http://localhost:3000) in your browser

<br>

## Contributions
Contributions and suggestions are welcome! To contribute to Matrix, please follow the best practices outlined in [Contributing to GitHub Docs documentation](https://docs.github.com/en/contributing) and refer to [Collaborating with pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests).

<br>

## Future Improvements
- Analytics and stats for timer sessions and punch cards
- Collaborative features and sharing
- Customizations for punch card designs
- Personalized dashboard views
- Mobile widgets
- Social sharing

<br>

## Contact
[Report a bug](#)  |  [Request a feature](#)
