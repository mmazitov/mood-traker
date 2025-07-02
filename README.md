# Mood Tracker

A modern Next.js application for tracking and analyzing daily emotions. Features comprehensive emotion logging, interactive statistics, drag-and-drop reordering, and time-based theming. Built with Next.js 15, TypeScript, MobX, and Tailwind CSS for a seamless user experience across all devices.

## Tech Stack

- **[Next.js](https://nextjs.org/)**: React framework with App Router and server-side rendering
- **[TypeScript:](https://www.typescriptlang.org/)**: Static typing for enhanced development experience
- **[MobX](https://mobx.js.org/README.html)**: Reactive state management with automatic UI updates
- **[Tailwind CSS:](https://tailwindcss.com/)**: Utility-first CSS framework for rapid styling
- **[React DnD](https://react-dnd.github.io/react-dnd/about)**: Drag and drop functionality for mobile/tablet devices
- **[React Icons](https://react-icons.github.io/react-icons/)**: Comprehensive icon library
- **[Tailwind Merge](https://www.npmjs.com/package/tailwind-merge)**: Utility for merging Tailwind classes
- **[Class Variance Authority](https://cva.style/docs)**: Component variant management
- **[ESLint:](https://eslint.org/)** & **[Prettier:](https://prettier.io/)**: Code quality and formatting
- **[Vite:](https://vite.dev/)** Next generation frontend tooling

## Features

### Emotion Tracking
- **Quick Emotion Logging**: Select from 5 predefined emotions (Happy, Sad, Angry, Surprised, Neutral)
- **Notes Support**: Add optional notes to provide context for each emotion
- **Timestamp Recording**: Automatic timestamp tracking for all entries
- **Local Storage**: Persistent data storage without external dependencies

### Interactive Interface
- **Drag & Drop Reordering**: Reorder emotion cards on mobile and tablet devices
- **Swipe to Delete**: Intuitive swipe-left gesture for quick deletion on mobile
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Touch-Friendly**: Enhanced touch interactions for mobile users

### Statistics & Analytics
- **Multi-Period Analysis**: View statistics for today, this week, this month, or all time
- **Visual Breakdown**: Progress bars and percentage displays for emotion distribution
- **Most Frequent Tracking**: Identify your most commonly recorded emotions
- **Real-time Updates**: Statistics update automatically as you add new entries

### User Experience
- **Time-Based Theming**: Dynamic background gradients based on time of day
  - Morning: Warm yellow gradients
  - Day: Cool blue gradients  
  - Evening: Orange/amber gradients
  - Night: Dark blue gradients
- **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Modal Management**: Smooth modal interactions with focus management
- **Loading States**: Elegant loading animations

## Pages

### Home Page (`/`)
- Today's emotion entries display
- Add new emotion button
- Quick delete all emotions functionality
- Drag & drop reordering (mobile/tablet)
- Swipe to delete individual entries (mobile/tablet)

### Statistics Page (`/statistic`)
- Summary cards showing total, period, and most frequent emotions
- Interactive period filter (Today, Week, Month, All)
- Detailed emotion breakdown with percentages
- Visual progress bars for emotion distribution
- Empty state handling with helpful messages

## Getting Started

Before starting 🏁, you need to have [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) installed.

```bash
# Clone this project
$ git clone https://github.com/mmazitov/mood-traker

# Access the project directory
$ cd mood-traker

# Install dependencies
$ npm install
# or
$ yarn install

# Start development server
$ npm run dev
# or
$ yarn dev

# Build for production
$ npm run build
# or
$ yarn build

# Start production server
$ npm run start
# or
$ yarn start

# Run linting
$ npm run lint
# or
$ yarn lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

### Components
- **EmotionCard**: Individual emotion entry with drag/swipe functionality
- **EmotionList**: Grid layout for displaying emotion entries
- **Summary**: Statistics summary cards component
- **Filter**: Time period filter for statistics
- **Breakdown**: Detailed emotion breakdown with charts
- **Modal System**: Centralized modal management (Add, Delete, Confirm)

### Hooks
- **useStores**: MobX store access hook
- **useDragAndDrop**: Drag and drop functionality (mobile/tablet only)
- **useSwipeToDelete**: Swipe gesture detection for deletion
- **useModal**: Modal state management with accessibility
- **useTheme**: Time-based theme management

### Stores (MobX)
- **EmotionStore**: Manages emotion entries, filtering, and statistics
- **ModalStore**: Handles modal state and confirmation dialogs

### Utilities
- **emotionColor**: Emotion-specific color scheme mapping
- **emotionStatistic**: Statistical calculations and data processing
- **timeDateFormat**: Date/time formatting and time-of-day detection

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── statistic/         # Statistics page
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   ├── emotion/          # Emotion-specific components
│   ├── layout/           # Layout components
│   ├── modal/            # Modal components
│   ├── statistics/       # Statistics components
│   └── ui/               # Generic UI components
├── hooks/                # Custom React hooks
├── lib/                  # Core functionality
│   ├── constants/        # Application constants
│   ├── providers/        # React providers
│   └── stores/           # MobX stores
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Emotion Types

The application supports 5 core emotions:

- **😊 Happy**: Yellow color scheme
- **😢 Sad**: Blue color scheme  
- **😠 Angry**: Red color scheme
- **😮 Surprised**: Purple color scheme
- **😐 Neutral**: Gray color scheme

## Mobile Features

### Drag & Drop (Mobile/Tablet Only)
- Hold and drag emotion cards to reorder
- Visual feedback during dragging
- Automatic saving of new order

### Swipe to Delete (Mobile/Tablet Only)
- Swipe left on any emotion card to delete
- Visual feedback with red background
- Configurable swipe threshold and timing

### Touch Optimizations
- Larger touch targets for better usability
- Touch-friendly modal interactions
- Optimized spacing for finger navigation

## Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useMemo**: Expensive calculations are memoized
- **useCallback**: Event handlers are memoized
- **MobX Observers**: Automatic reactive updates
- **Lazy Loading**: Components load only when needed

## Future Enhancements

- **Data Export**: Export emotion data to CSV/JSON
- **Custom Emotions**: Add user-defined emotions
- **Reminders**: Scheduled emotion check-ins
- **Data Visualization**: Charts and graphs for trends
- **Multiple Users**: Support for multiple user profiles
- **Cloud Sync**: Optional cloud synchronization
- **Emotion Goals**: Set and track emotional wellness goals

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

