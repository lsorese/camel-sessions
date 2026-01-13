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
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }

  .sessions-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .session-item {
    background: #fff;
    border: 1px solid #e0e0e0;
    padding: 1rem;
    text-decoration: none;
    color: #000;
    display: block;
    transition: all 0.15s ease;
  }

  .session-item:hover {
    border-color: #000;
    background: #000;
    color: #fff;
  }

  .session-item:active {
    transform: scale(0.99);
  }

  .session-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .session-number {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .session-date {
    font-size: 0.75rem;
    opacity: 0.6;
    font-weight: 500;
  }

  .session-item:hover .session-date {
    opacity: 0.8;
  }

  .artists {
    font-size: 0.875rem;
    line-height: 1.4;
  }

  @media (max-width: 640px) {
    h2 {
      font-size: 1.375rem;
    }

    .session-number {
      font-size: 1.0625rem;
    }
  }
</style>
