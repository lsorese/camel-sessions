<script>
  import { audioStore } from '$lib/audioStore.js';

  export let data;
  const { sessions } = data;

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
        <div class="session-date">{new Date(session.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

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
    background: #fff;
    border: 1px solid #000;
    padding: 1.25rem 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .hero h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    letter-spacing: -0.03em;
  }

  .tagline {
    font-size: 0.875rem;
    opacity: 0.6;
  }

  .session-block {
    background: #fff;
    border: 1px solid #000;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .session-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e0e0e0;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .session-header h3 {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .session-header a {
    color: #000;
    text-decoration: none;
  }

  .session-header a:hover {
    opacity: 0.6;
  }

  .session-date {
    font-size: 0.8125rem;
    opacity: 0.6;
    font-weight: 500;
  }

  .session-description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    font-style: italic;
    opacity: 0.7;
  }

  .artists-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .artist-card {
    border: 1px solid #e0e0e0;
    padding: 1rem;
    transition: border-color 0.15s ease;
  }

  .artist-card:hover {
    border-color: #000;
  }

  .artist-card h4 {
    font-size: 1.0625rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    letter-spacing: -0.01em;
  }

  .genre {
    font-size: 0.75rem;
    opacity: 0.6;
    margin-bottom: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.45;
    margin-bottom: 0.875rem;
  }

  .tracks {
    margin-bottom: 0.875rem;
  }

  .tracks h5 {
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.375rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.7;
  }

  .tracks ul {
    list-style: none;
    padding-left: 0;
  }

  .tracks li {
    font-size: 0.8125rem;
    padding: 0.1875rem 0;
    border-left: 2px solid #000;
    padding-left: 0.5rem;
    margin-bottom: 0.125rem;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .play-btn {
    background: #fff;
    border: 1px solid #000;
    padding: 0.625rem 1rem;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .play-btn:hover {
    background: #000;
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
    color: #000;
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 500;
    border-bottom: 1px solid #000;
    padding-bottom: 1px;
    transition: opacity 0.15s ease;
  }

  .links a:hover {
    opacity: 0.6;
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
