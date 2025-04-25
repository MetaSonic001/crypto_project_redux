# CryptoTrack - Real-time Cryptocurrency Tracker

A responsive real-time cryptocurrency price tracker built with React, Vite, Redux Toolkit, and Shadcn UI.

![CryptoTrack Dashboard](/public/dashboard-preview.png)

## Features

- **Real-time Updates**: Live price updates via WebSocket connection to CoinCap API
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- **Sorting & Filtering**: Sort by price, market cap, or percentage changes; filter by name or symbol
- **State Persistence**: User preferences and data saved to localStorage
- **Modern UI**: Clean, modern interface built with Shadcn UI components
- **Data Visualization**: Price trends visualized with SVG charts
- **Landing Page**: Attractive landing page to showcase features

## Tech Stack

- **React**: UI library
- **Vite**: Build tool
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **Shadcn UI**: Component library
- **Tailwind CSS**: Utility-first CSS framework
- **CoinCap API**: Real-time cryptocurrency data
- **Vitest**: Testing framework

## Project Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/crypto-tracker.git
   cd crypto-tracker
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## State Management Architecture

The application uses Redux Toolkit for state management:

- **Store**: Configured in `lib/store.ts`
- **Slice**: Crypto assets data and reducers in `lib/features/crypto-slice.ts`
- **WebSocket**: Real-time updates in `lib/websocket-service.ts`
- **Persistence**: Local storage in `lib/local-storage.ts`

## API Integration

The app connects to the CoinCap API for real-time cryptocurrency data:

- REST API for initial data loading
- WebSocket for real-time price updates

## Testing

Unit tests are written using Vitest and focus on:

- Redux reducers
- Selectors
- Utility functions

Run tests with:
\`\`\`bash
npm test
\`\`\`

## Deployment

This project can be deployed to any static hosting service:

\`\`\`bash
npm run build
\`\`\`

The build output will be in the `dist` directory, which can be deployed to services like Vercel, Netlify, or GitHub Pages.

## License

MIT
