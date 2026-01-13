<script>
  import { audioStore } from '$lib/audioStore.js';

  export let data;
  const { session } = data;

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  function formatDate(dateString) {
    return dateFormatter.format(new Date(dateString));
  }

  function playTrack(artist) {
    audioStore.play(artist, session.session);
  }
</script>

<svelte:head>
  <title>Session {session.session} - The Camel Sessions</title>
</svelte:head>

<div class="session-detail">
  <div class="session-header">
    <a href="/archive" class="back-link">← Back to Archive</a>
    <h2>Session {session.session}</h2>
    <div class="session-date">{formatDate(session.date)}</div>
    {#if session.weather}
      <div class="weather-info">
        <span class="weather-display">{session.weather}</span>
        {#if session.weatherMood}
          <span class="weather-mood">— {session.weatherMood}</span>
        {/if}
      </div>
    {/if}
    {#if session.description}
      <p class="session-description">{session.description}</p>
    {/if}
  </div>

  <div class="artists-list">
    {#each session.artists as artist}
      <div class="artist-card">
        <div class="artist-header">
          <h3>{artist.name}</h3>
          <button class="play-btn-small" on:click={() => playTrack(artist)}>
            ▶ Play
          </button>
        </div>

        <div class="genre">{artist.genre}</div>
        <p class="description">{artist.description}</p>

        <div class="tracks">
          <h4>Tracks</h4>
          <ul>
            {#each artist.tracks as track}
              <li>{track}</li>
            {/each}
          </ul>
        </div>

        <div class="links">
          {#each artist.links as link}
            <a href={link.url} target="_blank" rel="noopener">{link.label}</a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .session-detail {
    max-width: 100%;
  }

  .session-header {
    background: #fdfcf9;
    border: 2px solid #d77b63;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .back-link {
    color: #4a7c9e;
    text-decoration: none;
    font-size: 0.8125rem;
    display: inline-block;
    margin-bottom: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .back-link:hover {
    color: #d77b63;
  }

  .session-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .session-date {
    font-size: 0.8125rem;
    color: #666;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .weather-info {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: rgba(74, 124, 158, 0.08);
    border-left: 3px solid #4a7c9e;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .weather-display {
    font-weight: 600;
    color: #333;
  }

  .weather-mood {
    font-style: italic;
    color: #4a7c9e;
    font-size: 0.8125rem;
  }

  .session-description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 0.75rem;
    font-style: italic;
    color: #555;
  }

  .artists-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .artist-card {
    background: #fdfcf9;
    border: 2px solid #d4c4a8;
    padding: 1rem;
    transition: all 0.15s ease;
  }

  .artist-card:hover {
    border-color: #d77b63;
    box-shadow: 0 2px 8px rgba(215, 123, 99, 0.15);
  }

  .artist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.625rem;
  }

  .artist-header h3 {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    text-transform: uppercase;
  }

  .play-btn-small {
    background: #5C4A33;
    border: 2px solid #5C4A33;
    color: #f5f1e8;
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .play-btn-small:hover {
    background: #d77b63;
    border-color: #d77b63;
  }

  .play-btn-small:active {
    transform: scale(0.98);
  }

  .genre {
    font-size: 0.6875rem;
    color: #4a7c9e;
    margin-bottom: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 0.875rem;
    color: #333;
  }

  .tracks {
    margin-bottom: 0.875rem;
  }

  .tracks h4 {
    font-size: 0.6875rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #666;
  }

  .tracks ul {
    list-style: none;
    padding-left: 0;
  }

  .tracks li {
    font-size: 0.8125rem;
    padding: 0.1875rem 0;
    border-left: 2px solid #d77b63;
    padding-left: 0.5rem;
    margin-bottom: 0.125rem;
    color: #333;
  }

  .links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .links a {
    color: #4a7c9e;
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 600;
    border-bottom: 1px solid #4a7c9e;
    padding-bottom: 1px;
    transition: all 0.15s ease;
  }

  .links a:hover {
    color: #d77b63;
    border-bottom-color: #d77b63;
  }

  @media (max-width: 640px) {
    .session-header h2 {
      font-size: 1.375rem;
    }

    .artist-header h3 {
      font-size: 1.0625rem;
    }
  }
</style>
