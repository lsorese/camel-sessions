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

  <AudioPlayer />
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
    background: #fafafa;
    color: #000;
    padding-bottom: 140px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app {
    min-height: 100vh;
  }

  header {
    background: #fff;
    border-bottom: 1px solid #000;
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
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  h1 a {
    color: #000;
    text-decoration: none;
  }

  h1 a:hover {
    opacity: 0.6;
  }

  nav a {
    color: #000;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid #000;
    padding: 0.375rem 0.75rem;
    display: inline-block;
    transition: all 0.15s ease;
  }

  nav a:hover {
    background: #000;
    color: #fff;
  }

  nav a:active {
    transform: scale(0.98);
  }

  main {
    max-width: 100%;
    margin: 0 auto;
    padding: 1rem;
  }

  @media (max-width: 640px) {
    :global(body) {
      padding-bottom: 160px;
    }

    header {
      padding: 0.625rem 0;
    }

    h1 {
      font-size: 1rem;
    }

    nav a {
      font-size: 0.8125rem;
      padding: 0.3125rem 0.625rem;
    }
  }
</style>
