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
    border: 2px solid black;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .back-link {
    color: black;
    text-decoration: none;
    font-size: 0.875rem;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .session-header h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .session-date {
    font-size: 1rem;
    opacity: 0.7;
  }

  .session-description {
    font-size: 1rem;
    line-height: 1.6;
    margin-top: 1rem;
    font-style: italic;
    opacity: 0.8;
  }

  .artists-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .artist-card {
    border: 2px solid black;
    padding: 1.5rem;
  }

  .artist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .artist-header h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .play-btn-small {
    background: white;
    border: 2px solid black;
    padding: 0.5rem 1rem;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 0.875rem;
    font-weight: bold;
    cursor: pointer;
  }

  .play-btn-small:hover {
    background: black;
    color: white;
  }

  .genre {
    font-size: 0.875rem;
    opacity: 0.7;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .tracks {
    margin-bottom: 1.5rem;
  }

  .tracks h4 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .tracks ul {
    list-style: none;
    padding-left: 0;
  }

  .tracks li {
    font-size: 0.875rem;
    padding: 0.25rem 0;
    border-left: 2px solid black;
    padding-left: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .links a {
    color: black;
    text-decoration: underline;
    font-size: 0.875rem;
  }

  @media (max-width: 640px) {
    .session-header h2 {
      font-size: 1.5rem;
    }

    .artist-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
