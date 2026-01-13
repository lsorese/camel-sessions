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
    background: #fff;
    border-top: 1px solid #000;
    padding: 0.75rem 1rem;
    z-index: 1000;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
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
    letter-spacing: -0.01em;
  }

  .session-link {
    font-family: inherit;
    font-size: 0.75rem;
    color: #000;
    text-decoration: none;
    border-bottom: 1px solid #000;
    padding-bottom: 1px;
    font-weight: 500;
  }

  .session-link:hover {
    opacity: 0.6;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .play-button {
    background: #fff;
    border: 1px solid #000;
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
    background: #000;
    color: #fff;
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
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .progress-bar {
    flex: 1;
    height: 24px;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    position: relative;
    padding: 0;
    transition: border-color 0.15s ease;
  }

  .progress-bar:hover {
    border-color: #000;
  }

  .progress-fill {
    height: 100%;
    background: #000;
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
