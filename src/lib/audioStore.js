import { writable } from 'svelte/store';

function createAudioStore() {
  const { subscribe, set, update } = writable({
    currentTrack: null, // { artist, filename, sessionNum }
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    audio: null
  });

  return {
    subscribe,
    play: (artist, sessionNum) => update(state => {
      // Stop current audio if playing
      if (state.audio) {
        state.audio.pause();
      }

      // Create new audio element
      const audio = new Audio(`/src/content/sessions/session-${sessionNum}/${artist.filename}`);

      audio.addEventListener('loadedmetadata', () => {
        update(s => ({ ...s, duration: audio.duration }));
      });

      audio.addEventListener('timeupdate', () => {
        update(s => ({ ...s, currentTime: audio.currentTime }));
      });

      audio.addEventListener('ended', () => {
        update(s => ({ ...s, isPlaying: false }));
      });

      audio.play();

      return {
        currentTrack: { ...artist, sessionNum },
        isPlaying: true,
        currentTime: 0,
        duration: 0,
        audio
      };
    }),
    togglePlayPause: () => update(state => {
      if (!state.audio) return state;

      if (state.isPlaying) {
        state.audio.pause();
      } else {
        state.audio.play();
      }

      return { ...state, isPlaying: !state.isPlaying };
    }),
    seek: (time) => update(state => {
      if (state.audio) {
        state.audio.currentTime = time;
      }
      return state;
    })
  };
}

export const audioStore = createAudioStore();
