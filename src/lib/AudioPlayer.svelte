<script>
  import { audioStore } from './audioStore.js';

  $: ({ currentTrack, isPlaying, currentTime, duration } = $audioStore);

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function handleSeek(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audioStore.seek(newTime);
  }

  function handleToggle() {
    audioStore.togglePlayPause();
  }
</script>

{#if currentTrack}
  <div class="audio-player">
    <div class="player-content">
      <div class="track-info">
        <div class="artist-name">{currentTrack.name}</div>
        <a href="/session/{currentTrack.sessionNum}" class="session-link">Session {currentTrack.sessionNum}</a>
      </div>

      <div class="controls">
        <button class="play-button" on:click={handleToggle}>
          {isPlaying ? '⏸' : '▶'}
        </button>

        <div class="progress-section">
          <div class="time">{formatTime(currentTime)}</div>
          <button class="progress-bar" on:click={handleSeek}>
            <div class="progress-fill" style="width: {(currentTime / duration) * 100}%"></div>
          </button>
          <div class="time">{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .audio-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-top: 2px solid black;
    padding: 1rem;
    z-index: 1000;
  }

  .player-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .track-info {
    margin-bottom: 0.75rem;
  }

  .artist-name {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .session-link {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 0.875rem;
    color: black;
    text-decoration: underline;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .play-button {
    background: white;
    border: 2px solid black;
    width: 48px;
    height: 48px;
    cursor: pointer;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .play-button:hover {
    background: black;
    color: white;
  }

  .progress-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .time {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 0.875rem;
    min-width: 40px;
  }

  .progress-bar {
    flex: 1;
    height: 32px;
    background: white;
    border: 2px solid black;
    cursor: pointer;
    position: relative;
    padding: 0;
  }

  .progress-fill {
    height: 100%;
    background: black;
    transition: width 0.1s linear;
  }

  @media (max-width: 640px) {
    .player-content {
      padding: 0;
    }

    .controls {
      flex-direction: column;
      gap: 0.75rem;
      align-items: stretch;
    }

    .progress-section {
      width: 100%;
    }
  }
</style>
