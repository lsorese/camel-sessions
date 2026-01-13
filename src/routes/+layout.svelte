<script>
  import AudioPlayer from '$lib/AudioPlayer.svelte';
</script>

<div class="app">
  <header>
    <div class="container">
      <h1><a href="/">The Camel Sessions</a></h1>
      <nav>
        <a href="/archive">Archive</a>
      </nav>
    </div>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <div class="container">
      <p>© 2025 Camel Sessions. All music and recordings remain the property of the individual artists.</p>
    </div>
  </footer>

  <AudioPlayer />
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Arial', sans-serif;
    background: #f5f1e8;
    color: #1a1a1a;
    padding-bottom: 140px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app {
    min-height: 100vh;
  }

  header {
    background: #fdfcf9;
    border-bottom: 2px solid #d77b63;
    padding: 0.75rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #d77b63;
  }

  h1 a {
    color: #d77b63;
    text-decoration: none;
  }

  h1 a:hover {
    opacity: 0.7;
  }

  nav a {
    color: #5C4A33;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 600;
    border: 2px solid #5C4A33;
    padding: 0.375rem 0.75rem;
    display: inline-block;
    transition: all 0.15s ease;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  nav a:hover {
    background: #5C4A33;
    color: #f5f1e8;
  }

  nav a:active {
    transform: scale(0.98);
  }

  main {
    max-width: 100%;
    margin: 0 auto;
    padding: 1rem;
  }

  footer {
    background: #fdfcf9;
    border-top: 2px solid #d77b63;
    padding: 1.5rem 0;
    margin-top: 3rem;
  }

  footer p {
    font-size: 0.8125rem;
    color: #666;
    text-align: center;
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    :global(body) {
      padding-bottom: 160px;
    }

    header {
      padding: 0.625rem 0;
    }

    h1 {
      font-size: 1.125rem;
    }

    nav a {
      font-size: 0.8125rem;
      padding: 0.3125rem 0.625rem;
    }
  }
</style>
