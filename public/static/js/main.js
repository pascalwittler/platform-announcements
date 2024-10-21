class PlatformAnnouncementsInterface {
  static LOCAL_STORAGE_KEY = 'platform-announcements-sounds-sequence';

  constructor() {
    this.soundsSequenceDomElement = document.querySelector('.sounds-sequence');
    this.formDomElement = document.querySelector('form');
    this.soundsDomElement = document.querySelector('.sounds');
    this.soundsSequence = [];

    this.initialize();
  }

  initialize() {
    this.readLocalStorage();
    this.writeLocalStorage();

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
          option.dataset.file = `data/sounds/${sound.file}`;
          option.dataset.text = sound.text;
          option.dataset.category = sound.category;
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
