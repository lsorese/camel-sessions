import fs from 'fs';
import path from 'path';

function stripQuotes(value) {
  return value.replace(/^["']|["']$/g, '');
}

function extractValue(line, key) {
  return line.split(key)[1].trim();
}

function parseSessionField(data, trimmed) {
  if (trimmed.startsWith('session:')) {
    data.session = parseInt(extractValue(trimmed, 'session:'));
  } else if (trimmed.startsWith('date:')) {
    data.date = extractValue(trimmed, 'date:');
  } else if (trimmed.startsWith('weather:')) {
    data.weather = stripQuotes(extractValue(trimmed, 'weather:'));
  } else if (trimmed.startsWith('weatherMood:')) {
    data.weatherMood = stripQuotes(extractValue(trimmed, 'weatherMood:'));
  } else if (trimmed.startsWith('temperature:')) {
    data.temperature = stripQuotes(extractValue(trimmed, 'temperature:'));
  } else if (trimmed.startsWith('description:')) {
    data.description = extractValue(trimmed, 'description:');
  }
}

function parseArtistField(artist, trimmed, context) {
  if (trimmed.startsWith('filename:')) {
    artist.filename = extractValue(trimmed, 'filename:');
  } else if (trimmed.startsWith('genre:')) {
    artist.genre = extractValue(trimmed, 'genre:');
  } else if (trimmed.startsWith('description:')) {
    artist.description = extractValue(trimmed, 'description:');
  } else if (trimmed === 'tracks:') {
    context.section = 'tracks';
  } else if (trimmed === 'links:') {
    context.section = 'links';
  } else if (context.section === 'tracks' && trimmed.startsWith('-')) {
    artist.tracks.push(trimmed.substring(1).trim());
  } else if (context.section === 'links') {
    parseArtistLink(artist, trimmed, context);
  }
}

function parseArtistLink(artist, trimmed, context) {
  if (trimmed.startsWith('- label:')) {
    if (context.link) {
      artist.links.push(context.link);
    }
    context.link = { label: extractValue(trimmed, '- label:') };
  } else if (trimmed.startsWith('url:') && context.link) {
    context.link.url = extractValue(trimmed, 'url:');
    artist.links.push(context.link);
    context.link = null;
  }
}

function parseMarkdownFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  const lines = frontmatterMatch[1].split('\n');
  const data = { artists: [] };
  let currentArtist = null;
  const context = { section: null, link: null };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('- name:')) {
      if (currentArtist) {
        data.artists.push(currentArtist);
      }
      currentArtist = { name: extractValue(trimmed, '- name:'), tracks: [], links: [] };
      context.section = null;
    } else if (currentArtist) {
      parseArtistField(currentArtist, trimmed, context);
    } else {
      parseSessionField(data, trimmed);
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

  return sessionDirs
    .map(dir => {
      const sessionFile = path.join(contentDir, dir, 'session.md');
      if (!fs.existsSync(sessionFile)) {
        return null;
      }
      const content = fs.readFileSync(sessionFile, 'utf-8');
      return parseMarkdownFrontmatter(content);
    })
    .filter(Boolean)
    .sort((a, b) => b.session - a.session);
}

export function getSessionByNumber(num) {
  return getAllSessions().find(s => s.session === parseInt(num));
}
