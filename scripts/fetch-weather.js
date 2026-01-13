import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Richmond, VA coordinates
const LATITUDE = 37.5407;
const LONGITUDE = -77.4360;

// Session configuration
const sessions = [
  { number: 1, date: '2024-01-28' },
  { number: 2, date: '2024-03-25' },
  { number: 3, date: '2024-05-25' },
  { number: 4, date: '2024-07-27' },
  { number: 5, date: '2024-10-19' },
  { number: 6, date: '2025-01-25' },
  { number: 7, date: '2025-03-29' },
  { number: 8, date: '2025-09-27' }
];

// Pool of diverse mood descriptions
const moodPool = [
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

// Used moods tracker to avoid repetition
const usedMoods = new Set();

function getRandomMood() {
  // Reset if we've used all moods
  if (usedMoods.size >= moodPool.length) {
    usedMoods.clear();
  }

  // Find an unused mood
  let mood;
  do {
    mood = moodPool[Math.floor(Math.random() * moodPool.length)];
  } while (usedMoods.has(mood));

  usedMoods.add(mood);
  return mood;
}

// Weather code to emoji and description mapping
function getWeatherEmoji(weatherCode, isDay = true) {
  const weatherMap = {
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

  const weatherInfo = weatherMap[weatherCode] || { emoji: '🌡️', description: 'Unknown' };
  return {
    emoji: weatherInfo.emoji,
    description: weatherInfo.description,
    mood: getRandomMood()
  };
}

// Temperature to emoji
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
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LATITUDE}&longitude=${LONGITUDE}&start_date=${date}&end_date=${date}&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean&temperature_unit=fahrenheit&timezone=America%2FNew_York`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.daily;
  } catch (error) {
    console.error(`Error fetching weather for ${date}:`, error.message);
    return null;
  }
}

function formatWeatherData(weatherData) {
  if (!weatherData) {
    return {
      emoji: '❓',
      description: 'Weather data unavailable',
      mood: 'unknown',
      temp: 'N/A',
      tempEmoji: '🌡️'
    };
  }

  const weatherCode = weatherData.weather_code[0];
  const tempMax = Math.round(weatherData.temperature_2m_max[0]);
  const tempMin = Math.round(weatherData.temperature_2m_min[0]);
  const tempMean = Math.round(weatherData.temperature_2m_mean[0]);

  const weather = getWeatherEmoji(weatherCode);
  const tempEmoji = getTempEmoji(tempMean);

  return {
    emoji: weather.emoji,
    description: weather.description,
    mood: weather.mood,
    temp: `${tempMin}°F - ${tempMax}°F`,
    tempMean: `${tempMean}°F`,
    tempEmoji: tempEmoji
  };
}

function hasWeatherData(sessionNumber) {
  const sessionPath = join(__dirname, `../src/content/sessions/session-${sessionNumber}/session.md`);

  try {
    const content = readFileSync(sessionPath, 'utf-8');
    // Check if weather field exists in the frontmatter
    return /^weather:/m.test(content);
  } catch (error) {
    return false;
  }
}

async function updateSessionFile(sessionNumber, weatherInfo) {
  const sessionPath = join(__dirname, `../src/content/sessions/session-${sessionNumber}/session.md`);

  try {
    let content = readFileSync(sessionPath, 'utf-8');

    // Remove existing weather field if present
    content = content.replace(/^weather:.*\n/m, '');
    content = content.replace(/^weatherMood:.*\n/m, '');
    content = content.replace(/^temperature:.*\n/m, '');

    // Find the end of the frontmatter (after date line)
    const dateLineMatch = content.match(/^date: .*$/m);
    if (dateLineMatch) {
      const insertPosition = dateLineMatch.index + dateLineMatch[0].length;
      const weatherFields = `\nweather: "${weatherInfo.emoji} ${weatherInfo.description} ${weatherInfo.tempEmoji} ${weatherInfo.tempMean}"\nweatherMood: "${weatherInfo.mood}"\ntemperature: "${weatherInfo.temp}"`;
      content = content.slice(0, insertPosition) + weatherFields + content.slice(insertPosition);
    }

    writeFileSync(sessionPath, content, 'utf-8');
    console.log(`✅ Updated session ${sessionNumber} with weather: ${weatherInfo.emoji} ${weatherInfo.description} (${weatherInfo.tempMean})`);
  } catch (error) {
    console.error(`Error updating session ${sessionNumber}:`, error.message);
  }
}

async function main() {
  console.log('🌤️  Checking weather data for Richmond, VA (23220)...\n');

  // Check which sessions need weather data
  const sessionsNeedingUpdate = sessions.filter(session => {
    const hasData = hasWeatherData(session.number);
    if (hasData) {
      console.log(`⏭️  Session ${session.number} already has weather data (cached)`);
    }
    return !hasData;
  });

  if (sessionsNeedingUpdate.length === 0) {
    console.log('\n✨ All sessions already have weather data! No API calls needed.');
    return;
  }

  console.log(`\n📡 Fetching weather for ${sessionsNeedingUpdate.length} session(s)...\n`);

  for (const session of sessionsNeedingUpdate) {
    console.log(`Fetching weather for Session ${session.number} (${session.date})...`);
    const weatherData = await fetchWeatherForDate(session.date);
    const weatherInfo = formatWeatherData(weatherData);
    await updateSessionFile(session.number, weatherInfo);

    // Small delay to be nice to the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n✨ Weather data fetch complete!');
}

main().catch(console.error);
