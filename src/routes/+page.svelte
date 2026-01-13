<script>
  import { audioStore } from '$lib/audioStore.js';

  export let data;
  const { sessions } = data;

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  function formatDate(dateString) {
    return dateFormatter.format(new Date(dateString));
  }

  function playTrack(artist, sessionNum) {
    audioStore.play(artist, sessionNum);
  }
</script>

<svelte:head>
  <title>The Camel Sessions</title>
</svelte:head>

<div class="homepage">
  <div class="hero">
    <h2>The Camel Sessions</h2>
    <p class="tagline">A songwriter showcase</p>
  </div>

  {#each sessions as session}
    <div class="session-block">
      <div class="session-header">
        <h3>
          <a href="/session/{session.session}">Session {session.session}</a>
        </h3>
        <div class="session-date">{formatDate(session.date)}</div>
      </div>

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

      <div class="artists-grid">
        {#each session.artists as artist}
          <div class="artist-card">
            <h4>{artist.name}</h4>
            <div class="genre">{artist.genre}</div>
            <p class="description">{artist.description}</p>

            <div class="tracks">
              <h5>Tracks</h5>
              <ul>
                {#each artist.tracks as track}
                  <li>{track}</li>
                {/each}
              </ul>
            </div>

            <div class="actions">
              <button class="play-btn" on:click={() => playTrack(artist, session.session)}>
                Play Recording
              </button>
              <div class="links">
                {#each artist.links as link}
                  <a href={link.url} target="_blank" rel="noopener">{link.label}</a>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .homepage {
    max-width: 100%;
  }

  .hero {
    background: #fdfcf9;
    border: 2px solid #d77b63;
    padding: 1.25rem 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .hero h2 {
    font-size: 1.625rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
    letter-spacing: 0.03em;
    color: #d77b63;
    text-transform: uppercase;
  }

  .tagline {
    font-size: 0.8125rem;
    color: #4a7c9e;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 500;
  }

  .session-block {
    background: #fdfcf9;
    border: 2px solid #5C4A33;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .session-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #d77b63;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .session-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .session-header a {
    color: #1a1a1a;
    text-decoration: none;
  }

  .session-header a:hover {
    color: #d77b63;
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
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
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
    margin-bottom: 1rem;
    font-style: italic;
    color: #555;
  }

  .artists-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .artist-card {
    border: 2px solid #d4c4a8;
    padding: 1rem;
    background: #fffef9;
    transition: all 0.15s ease;
  }

  .artist-card:hover {
    border-color: #d77b63;
    box-shadow: 0 2px 8px rgba(215, 123, 99, 0.15);
  }

  .artist-card h4 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
    letter-spacing: 0.01em;
    text-transform: uppercase;
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

  .tracks h5 {
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

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .play-btn {
    background: #5C4A33;
    border: 2px solid #5C4A33;
    color: #f5f1e8;
    padding: 0.625rem 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .play-btn:hover {
    background: #d77b63;
    border-color: #d77b63;
    color: #fff;
  }

  .play-btn:active {
    transform: scale(0.98);
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

  @media (min-width: 641px) {
    .artists-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
  }

  @media (max-width: 640px) {
    .hero h2 {
      font-size: 1.375rem;
    }

    .session-header h3 {
      font-size: 1.125rem;
    }
  }
</style>
