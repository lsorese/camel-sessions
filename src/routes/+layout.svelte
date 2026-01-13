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
    font-family: Helvetica, Arial, sans-serif;
    background: white;
    color: black;
    padding-bottom: 180px; /* Space for fixed audio player */
  }

  .app {
    min-height: 100vh;
  }

  header {
    border-bottom: 2px solid black;
    padding: 1.5rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  h1 a {
    color: black;
    text-decoration: none;
  }

  h1 a:hover {
    text-decoration: underline;
  }

  nav a {
    color: black;
    text-decoration: none;
    font-size: 1rem;
    border: 2px solid black;
    padding: 0.5rem 1rem;
    display: inline-block;
  }

  nav a:hover {
    background: black;
    color: white;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  @media (max-width: 640px) {
    :global(body) {
      padding-bottom: 220px;
    }

    .container {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
  }
</style>
