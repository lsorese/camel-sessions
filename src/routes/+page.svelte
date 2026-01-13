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
    border: 2px solid black;
    padding: 2rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  .hero h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .tagline {
    font-size: 1rem;
    opacity: 0.7;
  }

  .session-block {
    border: 2px solid black;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .session-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid black;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .session-header h3 {
    font-size: 1.75rem;
    font-weight: bold;
  }

  .session-header a {
    color: black;
    text-decoration: none;
  }

  .session-header a:hover {
    text-decoration: underline;
  }

  .session-date {
    font-size: 1rem;
    opacity: 0.7;
  }

  .artists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .artist-card {
    border: 2px solid black;
    padding: 1.5rem;
  }

  .artist-card h4 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
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

  .tracks h5 {
    font-size: 0.875rem;
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

  .actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .play-btn {
    background: white;
    border: 2px solid black;
    padding: 0.75rem 1.5rem;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  .play-btn:hover {
    background: black;
    color: white;
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
    .artists-grid {
      grid-template-columns: 1fr;
    }

    .hero h2 {
      font-size: 1.75rem;
    }

    .session-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
