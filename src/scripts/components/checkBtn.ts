import data1 from '../wordCollection/wordCollectionLevel1.json';
import { Data } from './interfaces';

class CheckBtn {
  checkBtn: HTMLButtonElement | null;

  private data: Data;

  constructor() {
    this.checkBtn = null;
    this.data = data1;
  }

  create(): void {
    this.checkBtn = document.createElement('button');
    this.checkBtn.classList.add('check__btn');
  }

  checkResults(): void {
    const blockCards = document.querySelector('.block__cards');
    const results = document.querySelectorAll('.result');
    const lastResult = results[results.length - 1];

    const isAllCardsMoved = blockCards
     && lastResult && blockCards.children.length === 0 && lastResult.children.length > 0;

    if (this.checkBtn) {
      this.checkBtn.disabled = !isAllCardsMoved;
    }
  }

  compare(roundIndex: number, wordsIndex: number): void {
    if (!this.checkBtn) return;

    const text = this.data.rounds[roundIndex].words[wordsIndex].textExample;
    const originalWords = text.split(' ').map((word) => word.trim());

    const results = document.querySelectorAll('.result');
    const lastResult = results[results.length - 1];

    if (!lastResult) return;

    const cardTexts = Array.from(lastResult.querySelectorAll('.card')).map((card) => card.textContent?.trim());

    cardTexts.forEach((cardText, index) => {
      const card = lastResult.querySelectorAll('.card')[index];
      if (cardText !== originalWords[index]) {
        card.classList.add('bad');
      } else {
        card.classList.remove('bad');
      }
    });
  }

  setupClickHandler(clickHandler: () => void): void {
    this.checkBtn?.addEventListener('click', clickHandler);
  }

  rename(content: string): void {
    if (!this.checkBtn) return;
    this.checkBtn.innerText = content;
  }

  render(): void {
    const gameBlock = document.querySelector('.block__btn');

    if (!gameBlock || !this.checkBtn) return;
    this.checkBtn.innerText = 'Check';
    this.checkBtn.disabled = true;
    gameBlock.append(this.checkBtn);
  }

  init(): void {
    this.create();
    this.render();
  }
}

export default CheckBtn;
