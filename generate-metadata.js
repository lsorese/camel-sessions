import fs from 'fs';
import path from 'path';

const GENRES = [
  'Indie Folk',
  'Alt Rock',
  'Bedroom Pop',
  'Dream Pop',
  'Lo-Fi',
  'Singer-Songwriter',
  'Experimental',
  'Ambient'
];

const SONG_TITLES = [
  'Lorem Ipsum Dolor',
  'Sit Amet Consectetur',
  'Adipiscing Elit Sed',
  'Do Eiusmod Tempor',
  'Incididunt Ut Labore',
  'Et Dolore Magna',
  'Aliqua Ut Enim',
  'Ad Minim Veniam'
];

const LOREM_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const DEFAULT_LINKS = [
  { label: 'Spotify', url: 'https://open.spotify.com/artist/lorem' },
  { label: 'Apple Music', url: 'https://music.apple.com/artist/ipsum' },
  { label: 'Website', url: 'https://example.com/dolor' }
];

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function extractArtistName(filename) {
  const match = filename.match(/cs-\d+-(.+)\.mp3$/);
  if (!match) return 'Unknown Artist';

  return match[1]
    .replace(/_/g, ' ')
    .split(' ')
    .map(capitalizeWord)
    .join(' ');
}

function generateRandomDate(sessionNum) {
  const day = Math.floor(Math.random() * 28) + 1;
  const month = String(sessionNum).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return `2024-${month}-${dayStr}`;
}

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(function() {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, count);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSessionNumber(folderName) {
  return parseInt(folderName.split('-')[1]);
}

function formatArtistYaml(artist) {
  const tracksYaml = artist.tracks.map(function(track) {
    return `      - ${track}`;
  }).join('\n');

  const linksYaml = artist.links.map(function(link) {
    return `      - label: ${link.label}\n        url: ${link.url}`;
  }).join('\n');

  return `  - name: ${artist.artistName}
    filename: ${artist.filename}
    genre: ${artist.genre}
    description: ${LOREM_DESCRIPTION}
    tracks:
${tracksYaml}
    links:
${linksYaml}`;
}

function createArtistFromFile(filename) {
  const trackCount = Math.floor(Math.random() * 3) + 2;
  return {
    filename,
    artistName: extractArtistName(filename),
    genre: pickRandom(GENRES),
    tracks: getRandomItems(SONG_TITLES, trackCount),
    links: DEFAULT_LINKS
  };
}

function generateSessionMarkdown(sessionNum, artists) {
  const date = generateRandomDate(sessionNum);
  const artistsYaml = artists.map(formatArtistYaml).join('\n');

  return `---
session: ${sessionNum}
date: ${date}
artists:
${artistsYaml}
---

# Session ${sessionNum}

${LOREM_DESCRIPTION}
`;
}

function processSession(sessionFolder, sessionsDir, contentDir) {
  const sessionNum = getSessionNumber(sessionFolder);
  const sessionPath = path.join(sessionsDir, sessionFolder);

  const mp3Files = fs.readdirSync(sessionPath)
    .filter(function(file) {
      return file.endsWith('.mp3');
    })
    .sort();

  if (mp3Files.length === 0) return;

  const artists = mp3Files.map(createArtistFromFile);
  const markdown = generateSessionMarkdown(sessionNum, artists);
  const outputPath = path.join(contentDir, `session-${sessionNum}.md`);

  fs.writeFileSync(outputPath, markdown);
  console.log(`Generated: ${outputPath}`);
}

function main() {
  const sessionsDir = './sessions';
  const contentDir = './src/content';

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const sessionFolders = fs.readdirSync(sessionsDir)
    .filter(function(name) {
      return name.startsWith('session-');
    })
    .sort(function(a, b) {
      return getSessionNumber(a) - getSessionNumber(b);
    });

  sessionFolders.forEach(function(folder) {
    processSession(folder, sessionsDir, contentDir);
  });

  console.log('\nMetadata generation complete!');
}

main();
