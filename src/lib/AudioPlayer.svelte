<script>
  import { audioStore } from './audioStore.js';

  $: ({ currentTrack, isPlaying, currentTime, duration } = $audioStore);
  $: progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) {
      return '0:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function handleSeek(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    audioStore.seek(percentage * duration);
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
          {#if isPlaying}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="2" width="3" height="12" fill="currentColor"/>
              <rect x="10" y="2" width="3" height="12" fill="currentColor"/>
            </svg>
          {:else}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 2L13 8L4 14V2Z" fill="currentColor"/>
            </svg>
          {/if}
        </button>

        <div class="progress-section">
          <div class="time">{formatTime(currentTime)}</div>
          <button class="progress-bar" on:click={handleSeek}>
            <div class="progress-fill" style="width: {progressPercent}%"></div>
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
    background: #fdfcf9;
    border-top: 2px solid #d77b63;
    padding: 0.75rem 1rem;
    z-index: 1000;
    box-shadow: 0 -4px 12px rgba(215, 123, 99, 0.15);
  }

  .player-content {
    max-width: 100%;
    margin: 0 auto;
  }

  .track-info {
    margin-bottom: 0.5rem;
  }

  .artist-name {
    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 700;
    margin-bottom: 0.125rem;
    letter-spacing: 0.01em;
    text-transform: uppercase;
  }

  .session-link {
    font-family: inherit;
    font-size: 0.6875rem;
    color: #4a7c9e;
    text-decoration: none;
    border-bottom: 1px solid #4a7c9e;
    padding-bottom: 1px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .session-link:hover {
    color: #d77b63;
    border-bottom-color: #d77b63;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .play-button {
    background: #5C4A33;
    border: 2px solid #5C4A33;
    color: #f5f1e8;
    width: 40px;
    height: 40px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s ease;
  }

  .play-button:hover {
    background: #d77b63;
    border-color: #d77b63;
  }

  .play-button:active {
    transform: scale(0.95);
  }

  .progress-section {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  .time {
    font-family: inherit;
    font-size: 0.75rem;
    min-width: 36px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #666;
  }

  .progress-bar {
    flex: 1;
    height: 24px;
    background: #f5f1e8;
    border: 2px solid #d4c4a8;
    cursor: pointer;
    position: relative;
    padding: 0;
    transition: border-color 0.15s ease;
  }

  .progress-bar:hover {
    border-color: #d77b63;
  }

  .progress-fill {
    height: 100%;
    background: #d77b63;
    transition: width 0.1s linear;
  }

  @media (max-width: 640px) {
    .audio-player {
      padding: 0.625rem 0.75rem;
    }

    .track-info {
      margin-bottom: 0.375rem;
    }

    .artist-name {
      font-size: 0.875rem;
    }

    .play-button {
      width: 36px;
      height: 36px;
      font-size: 0.875rem;
    }

    .time {
      font-size: 0.6875rem;
      min-width: 32px;
    }

    .progress-bar {
      height: 20px;
    }
  }
</style>
