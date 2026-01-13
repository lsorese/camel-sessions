import { writable } from 'svelte/store';

const INITIAL_STATE = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  audio: null
};

function createAudioStore() {
  const { subscribe, update } = writable(INITIAL_STATE);

  function setupAudioEvents(audio, update) {
    audio.addEventListener('loadedmetadata', function() {
      update(s => ({ ...s, duration: audio.duration }));
    });

    audio.addEventListener('timeupdate', function() {
      update(s => ({ ...s, currentTime: audio.currentTime }));
    });

    audio.addEventListener('ended', function() {
      update(s => ({ ...s, isPlaying: false }));
    });
  }

  function play(artist, sessionNum) {
    update(function(state) {
      if (state.audio) {
        state.audio.pause();
      }

      const audio = new Audio(`/sessions/session-${sessionNum}/${artist.filename}`);
      setupAudioEvents(audio, update);
      audio.play();

      return {
        currentTrack: { ...artist, sessionNum },
        isPlaying: true,
        currentTime: 0,
        duration: 0,
        audio
      };
    });
  }

  function togglePlayPause() {
    update(function(state) {
      if (!state.audio) {
        return state;
      }

      if (state.isPlaying) {
        state.audio.pause();
      } else {
        state.audio.play();
      }

      return { ...state, isPlaying: !state.isPlaying };
    });
  }

  function seek(time) {
    update(function(state) {
      if (state.audio) {
        state.audio.currentTime = time;
      }
      return state;
    });
  }

  return {
    subscribe,
    play,
    togglePlayPause,
    seek
  };
}

export const audioStore = createAudioStore();
