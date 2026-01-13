# The Camel Sessions

A songwriter showcase website built with SvelteKit, featuring a persistent audio player and clean black-and-white wireframe aesthetic.

## Features

- 8 sessions with 25 audio recordings
- Persistent audio player that continues playing when navigating
- Black and white minimal wireframe design
- Mobile responsive
- Static site optimized for Vercel deployment

## Project Structure

```
camel-sessions/
├── src/
│   ├── lib/
│   │   ├── AudioPlayer.svelte      # Persistent audio player component
│   │   ├── audioStore.js           # Audio state management
│   │   └── sessionData.js          # Session data parser
│   ├── routes/
│   │   ├── +layout.svelte          # Main layout with header & audio player
│   │   ├── +page.svelte            # Homepage (latest session)
│   │   ├── archive/                # Archive page (all sessions)
│   │   └── session/[id]/           # Dynamic session detail pages
│   └── content/                    # Generated markdown metadata files
├── static/
│   └── sessions/                   # Audio files (MP3)
└── sessions/                       # Original audio files (source)
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Import the project in Vercel dashboard
3. Vercel will auto-detect SvelteKit and configure build settings
4. Deploy!

### Build Configuration

The site is configured for static deployment using `@sveltejs/adapter-static`. Build settings:
- Build Command: `npm run build`
- Output Directory: `build`

## Regenerating Metadata

To regenerate the metadata files from MP3 filenames:

```bash
node generate-metadata.js
```

This will scan the `sessions/` directory and create/update markdown files in `src/content/`.

## Audio Player Features

- Persistent across page navigation
- Shows current artist name and session number
- Scrubbable progress bar
- Time display (elapsed/total)
- Stops after each track (no auto-advance)
- Fixed position at bottom of page

## Design

- Black and white only
- Helvetica font
- 2px black borders for all containers
- Minimal wireframe aesthetic
- Mobile responsive layout
