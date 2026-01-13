<script>
  import { audioStore } from '$lib/audioStore.js';

  export let data;
  const { session } = data;

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
    <div class="session-date">{new Date(session.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
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
    background: #fff;
    border: 1px solid #000;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .back-link {
    color: #000;
    text-decoration: none;
    font-size: 0.8125rem;
    display: inline-block;
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  .back-link:hover {
    opacity: 0.6;
  }

  .session-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.375rem;
    letter-spacing: -0.02em;
  }

  .session-date {
    font-size: 0.8125rem;
    opacity: 0.6;
    font-weight: 500;
  }

  .session-description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 0.75rem;
    font-style: italic;
    opacity: 0.7;
  }

  .artists-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .artist-card {
    background: #fff;
    border: 1px solid #e0e0e0;
    padding: 1rem;
    transition: border-color 0.15s ease;
  }

  .artist-card:hover {
    border-color: #000;
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
    letter-spacing: -0.01em;
  }

  .play-btn-small {
    background: #fff;
    border: 1px solid #000;
    padding: 0.375rem 0.75rem;
    font-family: inherit;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .play-btn-small:hover {
    background: #000;
    color: #fff;
  }

  .play-btn-small:active {
    transform: scale(0.98);
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

  .tracks h4 {
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

  @media (max-width: 640px) {
    .session-header h2 {
      font-size: 1.375rem;
    }

    .artist-header h3 {
      font-size: 1.0625rem;
    }
  }
</style>
