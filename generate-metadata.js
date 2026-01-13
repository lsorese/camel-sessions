import fs from 'fs';
import path from 'path';

const genres = ['Indie Folk', 'Alt Rock', 'Bedroom Pop', 'Dream Pop', 'Lo-Fi', 'Singer-Songwriter', 'Experimental', 'Ambient'];
const songTitles = [
  'Lorem Ipsum Dolor',
  'Sit Amet Consectetur',
  'Adipiscing Elit Sed',
  'Do Eiusmod Tempor',
  'Incididunt Ut Labore',
  'Et Dolore Magna',
  'Aliqua Ut Enim',
  'Ad Minim Veniam'
];

const loremDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

function extractArtistName(filename) {
  // Extract artist from filename like "cs-1-josh.mp3" -> "Josh"
  const match = filename.match(/cs-\d+-(.+)\.mp3$/);
  if (match) {
    const artist = match[1].replace(/_/g, ' ');
    return artist.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  return 'Unknown Artist';
}

function generateRandomDate(sessionNum) {
  const year = 2024;
  const month = sessionNum; // Session 1 = Jan, Session 8 = Aug, etc.
  const day = Math.floor(Math.random() * 28) + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Get all session folders
const sessionsDir = './sessions';
const sessionFolders = fs.readdirSync(sessionsDir)
  .filter(name => name.startsWith('session-'))
  .sort((a, b) => {
    const numA = parseInt(a.split('-')[1]);
    const numB = parseInt(b.split('-')[1]);
    return numA - numB;
  });

// Create content directory for markdown files
const contentDir = './src/content';
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Process each session
sessionFolders.forEach(sessionFolder => {
  const sessionNum = parseInt(sessionFolder.split('-')[1]);
  const sessionPath = path.join(sessionsDir, sessionFolder);

  // Get all MP3 files in this session
  const mp3Files = fs.readdirSync(sessionPath)
    .filter(file => file.endsWith('.mp3'))
    .sort();

  if (mp3Files.length === 0) return;

  // Generate metadata for each artist/track
  const artists = mp3Files.map(filename => {
    const artistName = extractArtistName(filename);
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const tracks = getRandomItems(songTitles, Math.floor(Math.random() * 3) + 2); // 2-4 songs

    return {
      filename,
      artistName,
      genre,
      tracks,
      links: [
        { label: 'Spotify', url: 'https://open.spotify.com/artist/lorem' },
        { label: 'Apple Music', url: 'https://music.apple.com/artist/ipsum' },
        { label: 'Website', url: 'https://example.com/dolor' }
      ]
    };
  });

  // Create markdown content
  const date = generateRandomDate(sessionNum);
  const markdown = `---
session: ${sessionNum}
date: ${date}
artists:
${artists.map(artist => `  - name: ${artist.artistName}
    filename: ${artist.filename}
    genre: ${artist.genre}
    description: ${loremDescription}
    tracks:
${artist.tracks.map(track => `      - ${track}`).join('\n')}
    links:
${artist.links.map(link => `      - label: ${link.label}
        url: ${link.url}`).join('\n')}`).join('\n')}
---

# Session ${sessionNum}

${loremDescription}
`;

  // Write markdown file
  const outputPath = path.join(contentDir, `session-${sessionNum}.md`);
  fs.writeFileSync(outputPath, markdown);
  console.log(`Generated: ${outputPath}`);
});

console.log('\nMetadata generation complete!');
