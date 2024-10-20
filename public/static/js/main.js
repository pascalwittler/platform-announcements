class PlatformAnnouncementsInterface {
  constructor() {
    this.soundsSequenceDomElement = document.querySelector('.sounds-sequence');
    this.formDomElement = document.querySelector('form');
    this.soundsDomElement = document.querySelector('.sounds');
    this.soundsSequence = [];
  }
}

new PlatformAnnouncementsInterface();
