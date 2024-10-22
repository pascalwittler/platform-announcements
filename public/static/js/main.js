class PlatformAnnouncementsInterface {
  static LOCAL_STORAGE_KEY = 'platform-announcements-sounds-sequence';
  static KEY_PLAY = 'F9';
  static KEY_CLEAR = 'F2';

  constructor() {
    this.soundsSequenceDomElement = document.querySelector('.sounds-sequence');
    this.formDomElement = document.querySelector('form');
    this.inputDomElement = document.querySelector('form input');
    this.soundsDomElement = document.querySelector('.sounds');
    this.soundsSequence = [];
    this.audioChannels = [];

    this.initialize();
  }

  initialize() {
    this.readLocalStorage();
    this.writeLocalStorage();

    this.formDomElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this.inputDomElement.addEventListener('input', () => {
      if (!this.inputDomElement.value.startsWith('{') || !this.inputDomElement.value.endsWith('}')) {
        return;
      }

      try {
        this.soundsSequence.push(JSON.parse(this.inputDomElement.value));
        this.writeLocalStorage();
        this.inputDomElement.value = '';
      }
      catch {
        return;
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === PlatformAnnouncementsInterface.KEY_PLAY) {
        this.playSoundsSequence();
      }

      if (event.key === PlatformAnnouncementsInterface.KEY_CLEAR) {
        this.clearSoundsSequence();
      }
    });

    this.fillSoundOptions();
  }

  fillSoundOptions() {
    fetch('../../data/sounds.json')
      .then((response) => response.json())
      .then((jsonData) => jsonData.sounds)
      .then((sounds) => {
        sounds.forEach((sound) => {
          let option = document.createElement('option');
          option.value = JSON.stringify(sound);
          option.innerText = sound.text;

          this.soundsDomElement.appendChild(option);
        });
      });
  }

  updateSoundSequenceDomElement() {
    this.soundsSequenceDomElement.innerHTML = '';

    this.soundsSequence.forEach((sound) => {
      let soundSpan = document.createElement('span');
      soundSpan.classList.add('sound');
      soundSpan.innerText = sound.text;

      this.soundsSequenceDomElement.appendChild(soundSpan);
    });
  }

  updateAudioChannels() {
    this.audioChannels = [];

    this.soundsSequence.forEach((sound) => {
      this.audioChannels.push(new Audio(`data/sounds/${sound.file}`));
    });
  }

  playSoundsSequence() {
    const audioElements = this.soundsSequenceDomElement.querySelectorAll('audio');

    audioElements.forEach((audioElement, key) => {
      if (key < audioElements.length) {
        audioElement.addEventListener('ended', () => {
          audioElements[key + 1].play();
        });
      }
    });

    if (audioElements.length) {
      audioElements[0].play();
    }
  }

  clearSoundsSequence() {
    this.soundsSequence = [];
    this.writeLocalStorage();
  }

  readLocalStorage() {
    this.soundsSequence = JSON.parse(window.localStorage.getItem(PlatformAnnouncementsInterface.LOCAL_STORAGE_KEY)) ?? [];
    this.updateAudioChannels();
    this.updateSoundSequenceDomElement();
  }

  writeLocalStorage() {
    window.localStorage.setItem(PlatformAnnouncementsInterface.LOCAL_STORAGE_KEY, JSON.stringify(this.soundsSequence));
    this.updateAudioChannels();
    this.updateSoundSequenceDomElement();
  }
}

new PlatformAnnouncementsInterface();
