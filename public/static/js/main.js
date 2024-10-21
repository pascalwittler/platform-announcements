class PlatformAnnouncementsInterface {
  static LOCAL_STORAGE_KEY = 'platform-announcements-sounds-sequence';

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

  readLocalStorage() {
    this.soundsSequence = JSON.parse(window.localStorage.getItem(PlatformAnnouncementsInterface.LOCAL_STORAGE_KEY)) ?? [];
  }

  writeLocalStorage() {
    window.localStorage.setItem(PlatformAnnouncementsInterface.LOCAL_STORAGE_KEY, JSON.stringify(this.soundsSequence));
  }
}

new PlatformAnnouncementsInterface();
