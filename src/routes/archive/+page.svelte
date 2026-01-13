<script>
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

  function formatArtistNames(artists) {
    return artists.map(a => a.name).join(', ');
  }
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
          <div class="session-date">{formatDate(session.date)}</div>
        </div>
        {#if session.weather}
          <div class="weather-compact">{session.weather}</div>
        {/if}
        <div class="artists">{formatArtistNames(session.artists)}</div>
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
    border-bottom: 2px solid #d77b63;
    padding-bottom: 0.75rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .sessions-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .session-item {
    background: #fdfcf9;
    border: 2px solid #d4c4a8;
    padding: 1rem;
    text-decoration: none;
    color: #1a1a1a;
    display: block;
    transition: all 0.15s ease;
  }

  .session-item:hover {
    border-color: #d77b63;
    background: #d77b63;
    color: #fff;
    box-shadow: 0 2px 8px rgba(215, 123, 99, 0.2);
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
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .session-date {
    font-size: 0.75rem;
    color: #666;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .session-item:hover .session-date {
    color: #fff;
  }

  .weather-compact {
    font-size: 0.8125rem;
    margin: 0.375rem 0;
    color: #4a7c9e;
    font-weight: 600;
  }

  .session-item:hover .weather-compact {
    color: rgba(255, 255, 255, 0.9);
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
