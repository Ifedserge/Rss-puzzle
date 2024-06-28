import data1 from '../wordCollection/wordCollectionLevel1.json';
import { Data } from './interfaces';

class AudioBtn {
  audioBtn: HTMLButtonElement | null;

  private data: Data;

  constructor() {
    this.audioBtn = null;
    this.data = data1;
  }

  create(): void {
    this.audioBtn = document.createElement('button');
    this.audioBtn.classList.add('audio__btn');
    this.audioBtn.innerText = 'Listen';
  }

  render(): void {
    if (!this.audioBtn) return;

    const audioblock = document.querySelector('.audio__block');
    audioblock?.append(this.audioBtn);
  }

  listen(roundIndex: number, wordsIndex: number): void {
    const track = this.data.rounds[roundIndex].words[wordsIndex].audioExample;
    const audio = new Audio(track);
    audio.play();
  }

  setupClickHandler(clickHandler: () => void): void {
    this.audioBtn?.addEventListener('click', clickHandler);
  }

  init(): void {
    this.create();
    this.render();
  }
}

export default AudioBtn;
