import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const RICHMOND_VA = { latitude: 37.5407, longitude: -77.4360 };

const SESSIONS = [
  { number: 1, date: '2024-01-28' },
  { number: 2, date: '2024-03-25' },
  { number: 3, date: '2024-05-25' },
  { number: 4, date: '2024-07-27' },
  { number: 5, date: '2024-10-19' },
  { number: 6, date: '2025-01-25' },
  { number: 7, date: '2025-03-29' },
  { number: 8, date: '2025-09-27' }
];

const MOOD_POOL = [
  'bright and cheerful',
  'pleasant and calm',
  'comfortable and easy',
  'mellow and contemplative',
  'mysterious and intimate',
  'mystical and close',
  'cozy and soft',
  'introspective and gentle',
  'reflective and moody',
  'pensive and atmospheric',
  'dramatic and expressive',
  'intense and passionate',
  'serene and peaceful',
  'hushed and tranquil',
  'powerful and transformative',
  'delicate and quiet',
  'dynamic and shifting',
  'energetic and alive',
  'fierce and cathartic',
  'fresh and crisp',
  'bold and striking',
  'electric and charged',
  'wild and untamed',
  'raw and powerful',
  'warm and inviting',
  'crisp and refreshing',
  'languid and dreamy',
  'restless and stirring',
  'quiet and reflective',
  'vibrant and alive',
  'subdued and thoughtful',
  'charged and anticipatory',
  'melancholic and wistful',
  'uplifting and free',
  'heavy and brooding',
  'light and breezy',
  'solemn and still',
  'playful and spirited',
  'nostalgic and tender',
  'turbulent and restless'
];

const usedMoods = new Set();

function getRandomMood() {
  if (usedMoods.size >= MOOD_POOL.length) {
    usedMoods.clear();
  }

  let mood;
  do {
    mood = MOOD_POOL[Math.floor(Math.random() * MOOD_POOL.length)];
  } while (usedMoods.has(mood));

  usedMoods.add(mood);
  return mood;
}

const WEATHER_CODES = {
  0: { emoji: '☀️', description: 'Clear sky' },
  1: { emoji: '🌤️', description: 'Mainly clear' },
  2: { emoji: '⛅', description: 'Partly cloudy' },
  3: { emoji: '☁️', description: 'Overcast' },
  45: { emoji: '🌫️', description: 'Foggy' },
  48: { emoji: '🌫️', description: 'Depositing rime fog' },
  51: { emoji: '🌦️', description: 'Light drizzle' },
  53: { emoji: '🌦️', description: 'Moderate drizzle' },
  55: { emoji: '🌧️', description: 'Dense drizzle' },
  61: { emoji: '🌧️', description: 'Slight rain' },
  63: { emoji: '🌧️', description: 'Moderate rain' },
  65: { emoji: '🌧️', description: 'Heavy rain' },
  71: { emoji: '🌨️', description: 'Slight snow' },
  73: { emoji: '🌨️', description: 'Moderate snow' },
  75: { emoji: '🌨️', description: 'Heavy snow' },
  77: { emoji: '🌨️', description: 'Snow grains' },
  80: { emoji: '🌦️', description: 'Slight rain showers' },
  81: { emoji: '🌧️', description: 'Moderate rain showers' },
  82: { emoji: '⛈️', description: 'Violent rain showers' },
  85: { emoji: '🌨️', description: 'Slight snow showers' },
  86: { emoji: '🌨️', description: 'Heavy snow showers' },
  95: { emoji: '⛈️', description: 'Thunderstorm' },
  96: { emoji: '⛈️', description: 'Thunderstorm with slight hail' },
  99: { emoji: '⛈️', description: 'Thunderstorm with heavy hail' }
};

const DEFAULT_WEATHER = { emoji: '🌡️', description: 'Unknown' };

function getWeatherInfo(weatherCode) {
  const weather = WEATHER_CODES[weatherCode] || DEFAULT_WEATHER;
  return {
    emoji: weather.emoji,
    description: weather.description,
    mood: getRandomMood()
  };
}

function getTempEmoji(temp) {
  if (temp < 20) return '❄️';
  if (temp < 32) return '🥶';
  if (temp < 45) return '🧊';
  if (temp < 55) return '🍂';
  if (temp < 65) return '🌿';
  if (temp < 75) return '🌸';
  if (temp < 85) return '☀️';
  if (temp < 95) return '🔥';
  return '🥵';
}

async function fetchWeatherForDate(date) {
  const { latitude, longitude } = RICHMOND_VA;
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean&temperature_unit=fahrenheit&timezone=America%2FNew_York`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Error fetching weather for ${date}: HTTP ${response.status}`);
    return null;
  }

  const data = await response.json();
  return data.daily;
}

const UNAVAILABLE_WEATHER = {
  emoji: '❓',
  description: 'Weather data unavailable',
  mood: 'unknown',
  temp: 'N/A',
  tempEmoji: '🌡️'
};

function formatWeatherData(weatherData) {
  if (!weatherData) {
    return UNAVAILABLE_WEATHER;
  }

  const weatherCode = weatherData.weather_code[0];
  const tempMax = Math.round(weatherData.temperature_2m_max[0]);
  const tempMin = Math.round(weatherData.temperature_2m_min[0]);
  const tempMean = Math.round(weatherData.temperature_2m_mean[0]);

  const weather = getWeatherInfo(weatherCode);

  return {
    emoji: weather.emoji,
    description: weather.description,
    mood: weather.mood,
    temp: `${tempMin}°F - ${tempMax}°F`,
    tempMean: `${tempMean}°F`,
    tempEmoji: getTempEmoji(tempMean)
  };
}

function getSessionPath(sessionNumber) {
  return join(__dirname, `../src/content/sessions/session-${sessionNumber}/session.md`);
}

function hasWeatherData(sessionNumber) {
  const sessionPath = getSessionPath(sessionNumber);
  if (!existsSync(sessionPath)) {
    return false;
  }
  const content = readFileSync(sessionPath, 'utf-8');
  return /^weather:/m.test(content);
}

function removeExistingWeatherFields(content) {
  return content
    .replace(/^weather:.*\n/m, '')
    .replace(/^weatherMood:.*\n/m, '')
    .replace(/^temperature:.*\n/m, '');
}

function buildWeatherFields(weatherInfo) {
  return `\nweather: "${weatherInfo.emoji} ${weatherInfo.description} ${weatherInfo.tempEmoji} ${weatherInfo.tempMean}"\nweatherMood: "${weatherInfo.mood}"\ntemperature: "${weatherInfo.temp}"`;
}

function updateSessionFile(sessionNumber, weatherInfo) {
  const sessionPath = getSessionPath(sessionNumber);
  let content = readFileSync(sessionPath, 'utf-8');
  content = removeExistingWeatherFields(content);

  const dateLineMatch = content.match(/^date: .*$/m);
  if (dateLineMatch) {
    const insertPosition = dateLineMatch.index + dateLineMatch[0].length;
    const weatherFields = buildWeatherFields(weatherInfo);
    content = content.slice(0, insertPosition) + weatherFields + content.slice(insertPosition);
  }

  writeFileSync(sessionPath, content, 'utf-8');
  console.log(`Updated session ${sessionNumber}: ${weatherInfo.emoji} ${weatherInfo.description} (${weatherInfo.tempMean})`);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processSession(session) {
  console.log(`Fetching weather for Session ${session.number} (${session.date})...`);
  const weatherData = await fetchWeatherForDate(session.date);
  const weatherInfo = formatWeatherData(weatherData);
  updateSessionFile(session.number, weatherInfo);
  await delay(100);
}

async function main() {
  console.log('Checking weather data for Richmond, VA...\n');

  const sessionsNeedingUpdate = SESSIONS.filter(session => {
    const hasData = hasWeatherData(session.number);
    if (hasData) {
      console.log(`Session ${session.number} already has weather data (cached)`);
    }
    return !hasData;
  });

  if (sessionsNeedingUpdate.length === 0) {
    console.log('\nAll sessions already have weather data.');
    return;
  }

  console.log(`\nFetching weather for ${sessionsNeedingUpdate.length} session(s)...\n`);

  for (const session of sessionsNeedingUpdate) {
    await processSession(session);
  }

  console.log('\nWeather data fetch complete.');
}

main().catch(console.error);
