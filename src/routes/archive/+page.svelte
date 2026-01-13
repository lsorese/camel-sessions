<script>
  export let data;
  const { sessions } = data;
</script>

<svelte:head>
  <title>Archive - The Camel Sessions</title>
</svelte:head>

<div class="archive">
  <h2>All Sessions</h2>

  <div class="sessions-list">
    {#each sessions as session}
      <a href="/session/{session.session}" class="session-item">
        <div class="session-header">
          <div class="session-number">Session {session.session}</div>
          <div class="session-date">{new Date(session.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div class="artists">
          {#each session.artists as artist, i}
            {artist.name}{i < session.artists.length - 1 ? ', ' : ''}
          {/each}
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .archive {
    max-width: 100%;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    border-bottom: 2px solid black;
    padding-bottom: 1rem;
  }

  .sessions-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .session-item {
    border: 2px solid black;
    padding: 1.5rem;
    text-decoration: none;
    color: black;
    display: block;
    transition: background 0.2s;
  }

  .session-item:hover {
    background: black;
    color: white;
  }

  .session-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .session-number {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .session-date {
    font-size: 0.875rem;
    opacity: 0.7;
  }

  .artists {
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    h2 {
      font-size: 1.5rem;
    }

    .session-number {
      font-size: 1.25rem;
    }
  }
</style>
