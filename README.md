# A3 Ranker - Table Tennis Ranking System

A3 Ranker is a web application designed to track and rank table tennis players using the ELO rating system. This project allows you to manage player profiles, record match results, and view real-time rankings within your school's table tennis community.

## Features

- **ELO Ranking System**: Calculates and updates player ratings based on match outcomes
- **Player Management**: Create, view, and update player profiles
- **Match Tracking**: Record match results and update player statistics
- **Win-Loss Record**: Track each player's win-loss statistics
- **Real-time Updates**: Firebase integration for real-time data synchronization
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Database & Authentication**: [Firebase](https://firebase.google.com/) (Firestore & Auth)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React hooks with context providers
- **Data Tables**: TanStack Table for displaying player rankings
- **Animations**: Framer Motion

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How the ELO System Works

The ELO rating system used in this application:

1. All new players start with a base rating of 1200
2. After each match, ratings are updated based on the outcome and the difference in ratings between players
3. Players gain more points for defeating higher-rated opponents and lose more points when defeated by lower-rated opponents
4. The K-factor (K=32) determines the maximum possible adjustment per match

## Firebase Setup

The application uses Firebase for data storage and authentication. To set up your own instance:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
2. Enable Firestore and Authentication services
3. Add your Firebase configuration to the firebase.ts file

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the application.

## License

This project is open source and available under the [MIT License](LICENSE).
