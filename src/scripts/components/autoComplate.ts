import data1 from '../wordCollection/wordCollectionLevel1.json';
import { Data } from './interfaces';

class AutoComplateBtn {
  autoComplateBtn: HTMLButtonElement | null;

  private data: Data;

  constructor() {
    this.autoComplateBtn = null;
    this.data = data1;
  }

  create(): void {
    this.autoComplateBtn = document.createElement('button');
    this.autoComplateBtn.classList.add('complate');
  }

  createCards(roundIndex: number, wordsIndex: number): HTMLElement[] {
    // if (!this.autoComplateBtn) return;

    const text = this.data.rounds[roundIndex].words[wordsIndex].textExample;
    const textArr = text.split(' ');

    return textArr.map((word) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.textContent = word;
      const baseWidth = 30;
      const maxWidth = 300;
      const widthPerChar = 8;
      let cardWidth = baseWidth + maxWidth * widthPerChar;

      cardWidth = Math.max(baseWidth, Math.min(word.length * 20, 300));

      div.style.width = `${cardWidth}px`;

      if (word.length > 10) {
        div.style.fontSize = 'smaller';
      }
      return div;
    });
  }

  autoCamplate(roundIndex: number, wordsIndex: number): void {
    // if (!this.autoComplateBtn) return;

    const arrayWords = this.createCards(roundIndex, wordsIndex);
    const resultBlocks = document.querySelectorAll('.result');
    const lastResult = resultBlocks[resultBlocks.length - 1];
    const blockCards:HTMLElement | null = document.querySelector('.block__cards');
    lastResult.innerHTML = '';

    if (blockCards) {
      blockCards.innerHTML = '';
    }

    arrayWords.forEach((card) => {
      lastResult.append(card);
    });
  }

  setupClickHandler(clickHandler: () => void): void {
    this.autoComplateBtn?.addEventListener('click', clickHandler);
  }

  render(): void {
    const gameBlock = document.querySelector('.block__btn');

    if (!gameBlock || !this.autoComplateBtn) return;
    this.autoComplateBtn.innerText = 'Auto-Compalte';
    gameBlock.append(this.autoComplateBtn);
  }

  init(): void {
    this.create();
    this.render();
  }
}

export default AutoComplateBtn;
