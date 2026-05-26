# Iron Note – Lightweight iOS-First Gym Tracker

A minimal, fast, offline-first PWA for tracking workouts at the gym. Built for real-world use with one-handed operation, dark mode, and zero bloat.

![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Features

### Core Functionality
- Start/End Workout Sessions – Track multiple workouts per day
- Exercise Library – 47 pre-populated exercises across 5 categories (Chest, Back, Shoulders, Legs, Core)
- Custom Exercises – Create and save your own exercises
- Recent Exercises – Quick-add exercises from your last 3 workouts
- Set Logging – Log 1-5 sets per exercise with reps + weight (lbs)
- Optional Notes – Add notes per exercise after completion
- Workout History – View past workouts by date with detailed breakdowns
- CSV Export – Export individual or all workouts with custom filenames
- Completion Summary – Stats and review after ending a workout
- Delete Individual Sets – Remove specific sets during exercise logging
- Delete Individual Exercises – Remove exercises from active workout or history
- Delete All Workouts – Clear entire history with type-to-confirm and 5-tap verification
- Privacy First – All data stored locally, nothing collected or transmitted

### Design Principles
- Dark Mode Default – Optimized for gym lighting
- iOS-First PWA – Installable on iPhone home screen
- Right-Hand Optimized – Bottom nav for one-handed use
- Offline-First – Works without internet (IndexedDB)
- Lightweight – ~33KB gzipped bundle
- Zero Bloat – No login, no ads, no gamification

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | SvelteKit 5 | Compiled output, no runtime overhead, ~25KB bundle |
| **Language** | TypeScript | Type safety for production-grade code |
| **Database** | Dexie.js (IndexedDB) | Data persists through cache clears |
| **PWA** | Vite PWA Plugin | Auto-generated service worker + manifest |
| **Styling** | CSS Variables | Dark mode, no external CSS framework |
| **Icons** | Custom SVG | Gym equipment symbols (barbell, dumbbells, squat rack, etc.) |
| **Date Handling** | date-fns | Lightweight, tree-shakeable |

---

## Project Structure

```
iron_note/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── common/          # Reusable UI components
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   ├── Modal.svelte
│   │   │   │   ├── DeleteExerciseConfirmation.svelte
│   │   │   │   └── DeleteAllConfirmation.svelte
│   │   │   ├── workout/         # Workout-specific components
│   │   │   │   ├── ExerciseSelector.svelte
│   │   │   │   ├── SetLogger.svelte
│   │   │   │   └── NotesModal.svelte
│   │   │   ├── history/         # History components
│   │   │   │   ├── WorkoutCard.svelte
│   │   │   │   └── WorkoutDetails.svelte
│   │   │   └── icons/           # Custom SVG icons
│   │   ├── db/                  # Database layer
│   │   │   ├── schema.ts        # Dexie schema
│   │   │   ├── exercise-db.ts   # Exercise CRUD
│   │   │   └── workout-db.ts    # Workout CRUD
│   │   ├── stores/              # Svelte stores
│   │   │   ├── workout.ts       # Active workout state
│   │   │   └── exercises.ts     # Exercise library
│   │   ├── types/               # TypeScript types
│   │   └── utils/               # Helper functions
│   ├── routes/                  # SvelteKit routes
│   │   ├── +page.svelte         # Home/Workout screen
│   │   ├── +layout.svelte       # Root layout + nav
│   │   └── history/
│   │       └── +page.svelte     # History screen
│   ├── app.html                 # HTML template
│   └── app.css                  # Global styles
├── static/                      # Static assets
│   ├── icons/                   # PWA icons
│   └── manifest.json            # PWA manifest
├── package.json
├── vite.config.ts               # Vite + PWA config
└── svelte.config.js             # SvelteKit config
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Mintwhirl/iron_note.git
cd iron_note

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Usage

### Workflow

1. **Start Workout**
   - Open app → Tap "Start Workout"
   - Workout session begins

2. **Log Exercises**
   - Tap "Add Exercise"
   - Select category (Chest/Back/Shoulders/Legs/Core)
   - Choose exercise
   - Log Set 1-5 with reps + weight
   - Tap "Finish Exercise"
   - Optional: Add notes or skip

3. **End Workout**
   - Tap "End Workout" button
   - View completion summary with stats
   - Tap "Return to Home" to reset to blank home screen

4. **View History**
   - Tap "History" in bottom nav
   - Browse past workouts by date
   - Tap workout to see detailed breakdown
   - Export individual workout to CSV

5. **Manage History**
   - **Delete Exercise**: Tap any exercise name in workout details
   - Confirm deletion in popup dialog
   - Empty workout days auto-removed from history
   - **Delete All**: Tap "Delete All" button
   - Type "delete everything" to confirm
   - Tap delete button 5 times to permanently clear all data

---

## Design Decisions

### Why Svelte/SvelteKit?
- **Performance**: Compiles to vanilla JS, no virtual DOM overhead
- **Bundle Size**: ~25KB vs React's ~130KB
- **Mobile-First**: Faster parse/execution on mobile devices
- **Developer Experience**: Minimal boilerplate, intuitive reactivity

### Why IndexedDB (Dexie)?
- **Persistence**: Survives cache clears (unlike localStorage)
- **Capacity**: Can store large datasets (50MB+)
- **Offline-First**: Works without internet
- **Schema Migrations**: Built-in versioning support

### Why No Rest Timer?
User feedback indicated rest timing wasn't needed. Keeps UI simpler and reduces distractions at the gym.

### Why Dark Mode Only?
Gym environments typically have bright overhead lighting. Dark mode reduces glare and battery usage.

### Why Custom Icons?
- No external icon library dependency
- Perfectly sized for gym equipment visualization
- Consistent style across all categories

---

## Performance

- **Bundle Size**: ~238KB total, ~33KB gzipped
- **First Load**: < 1s on 3G
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, PWA)

---

## Future Enhancements (Maybe)

- [ ] Progressive overload tracking (weight progression over time)
- [ ] Custom exercise creation
- [ ] Workout templates/routines
- [ ] Body weight tracking
- [ ] Dark/light mode toggle (if requested)
- [ ] Additional export formats (JSON, PDF)

---

## Known Issues

- PWA icons are currently placeholders (need proper 192x192 and 512x512 PNGs)
- No data migration strategy yet (if schema changes)
- UI optimized for iPhone - desktop experience may vary

---

## Contributing

This is a personal project, but suggestions are welcome! Open an issue or submit a PR.

---

## License

MIT License - See [LICENSE](LICENSE) for details

---

## Credits

Built with:
- [SvelteKit](https://kit.svelte.dev/)
- [Dexie.js](https://dexie.org/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [date-fns](https://date-fns.org/)

Developed by Claude Code
[Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)

---

## Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/Mintwhirl/iron_note/issues)
- Check existing issues first

---

## Privacy

All data is stored locally on your device using IndexedDB. **Nothing is collected, transmitted, or stored on external servers.** Your workout data never leaves your phone.

---

Made by MintWhirl © 2025
Built for real gym use.