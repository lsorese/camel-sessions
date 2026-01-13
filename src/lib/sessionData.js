import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseMarkdownFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]+?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatterText = match[1];
  const data = { artists: [] };

  const lines = frontmatterText.split('\n');
  let currentArtist = null;
  let currentIndent = 0;
  let inTracks = false;
  let inLinks = false;
  let currentLink = null;

  for (const line of lines) {
    const trimmed = line.trim();
    const indent = line.search(/\S/);

    if (trimmed.startsWith('session:')) {
      data.session = parseInt(trimmed.split(':')[1].trim());
    } else if (trimmed.startsWith('date:')) {
      data.date = trimmed.split(':')[1].trim();
    } else if (trimmed.startsWith('weather:')) {
      data.weather = trimmed.split('weather:')[1].trim().replace(/^["']|["']$/g, '');
    } else if (trimmed.startsWith('weatherMood:')) {
      data.weatherMood = trimmed.split('weatherMood:')[1].trim().replace(/^["']|["']$/g, '');
    } else if (trimmed.startsWith('temperature:')) {
      data.temperature = trimmed.split('temperature:')[1].trim().replace(/^["']|["']$/g, '');
    } else if (trimmed.startsWith('description:') && !currentArtist) {
      data.description = trimmed.split('description:')[1].trim();
    } else if (trimmed.startsWith('- name:')) {
      if (currentArtist) {
        data.artists.push(currentArtist);
      }
      currentArtist = { name: trimmed.split('- name:')[1].trim(), tracks: [], links: [] };
      inTracks = false;
      inLinks = false;
    } else if (currentArtist) {
      if (trimmed.startsWith('filename:')) {
        currentArtist.filename = trimmed.split(':')[1].trim();
      } else if (trimmed.startsWith('genre:')) {
        currentArtist.genre = trimmed.split(':')[1].trim();
      } else if (trimmed.startsWith('description:')) {
        currentArtist.description = trimmed.split('description:')[1].trim();
      } else if (trimmed === 'tracks:') {
        inTracks = true;
        inLinks = false;
      } else if (trimmed === 'links:') {
        inLinks = true;
        inTracks = false;
      } else if (inTracks && trimmed.startsWith('-')) {
        currentArtist.tracks.push(trimmed.substring(1).trim());
      } else if (inLinks && trimmed.startsWith('- label:')) {
        if (currentLink) {
          currentArtist.links.push(currentLink);
        }
        currentLink = { label: trimmed.split('- label:')[1].trim() };
      } else if (inLinks && trimmed.startsWith('url:') && currentLink) {
        currentLink.url = trimmed.split('url:')[1].trim();
        currentArtist.links.push(currentLink);
        currentLink = null;
      }
    }
  }

  if (currentArtist) {
    data.artists.push(currentArtist);
  }

  return data;
}

export function getAllSessions() {
  const contentDir = path.join(process.cwd(), 'src/content/sessions');
  const sessionDirs = fs.readdirSync(contentDir).filter(f => f.startsWith('session-'));

  const sessions = sessionDirs.map(dir => {
    const sessionFile = path.join(contentDir, dir, 'session.md');
    if (!fs.existsSync(sessionFile)) return null;

    const content = fs.readFileSync(sessionFile, 'utf-8');
    const data = parseMarkdownFrontmatter(content);
    return data;
  }).filter(Boolean).sort((a, b) => b.session - a.session); // Newest first

  return sessions;
}

export function getSessionByNumber(num) {
  const sessions = getAllSessions();
  return sessions.find(s => s.session === parseInt(num));
}
