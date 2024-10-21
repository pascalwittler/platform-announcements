class PlatformAnnouncementsInterface {
  static LOCAL_STORAGE_KEY = 'platform-announcements-sounds-sequence';
  static KEY_PLAY = 'F9';

  constructor() {
    this.soundsSequenceDomElement = document.querySelector('.sounds-sequence');
    this.formDomElement = document.querySelector('form');
    this.inputDomElement = document.querySelector('form input');
    this.soundsDomElement = document.querySelector('.sounds');
    this.soundsSequence = [];

    this.initialize();
  }

  initialize() {
    this.readLocalStorage();
    this.writeLocalStorage();

    this.formDomElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this.inputDomElement.addEventListener('input', () => {
      try {
        this.soundsSequence.push(JSON.parse(this.inputDomElement.value));
        this.writeLocalStorage();
        this.inputDomElement.value = '';
      }
      catch {
        // do nothing
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === PlatformAnnouncementsInterface.KEY_PLAY) {
        this.playSoundsSequence();
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
      let wrap = document.createElement('span');
      wrap.classList.add('sound');

      let text = document.createElement('span');
      text.classList.add('text');
      text.innerText = sound.text;

      let audio = document.createElement('audio');
      audio.src = `data/sounds/${sound.file}`;

      wrap.appendChild(text);
      wrap.appendChild(audio);
      this.soundsSequenceDomElement.appendChild(wrap);
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

  readLocalStorage() {
    this.soundsSequence = JSON.parse(window.localStorage.getItem(PlatformAnnouncementsInterface.LOCAL_STORAGE_KEY)) ?? [];
    this.updateSoundSequenceDomElement();
  }

  writeLocalStorage() {
    window.localStorage.setItem(PlatformAnnouncementsInterface.LOCAL_STORAGE_KEY, JSON.stringify(this.soundsSequence));
    this.updateSoundSequenceDomElement();
  }
}

new PlatformAnnouncementsInterface();
