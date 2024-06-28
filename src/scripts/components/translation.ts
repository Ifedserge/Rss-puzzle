import data1 from '../wordCollection/wordCollectionLevel1.json';
import { Data } from './interfaces';

class TranslationBtn {
  translationBtn: HTMLButtonElement | null;

  private data: Data;

  content: HTMLElement | null;

  constructor() {
    this.translationBtn = null;
    this.data = data1;
    this.content = null;
  }

  create(): void {
    this.translationBtn = document.createElement('button');
    this.translationBtn.classList.add('translate');
    this.content = document.createElement('p');
    this.content.classList.add('content');
  }

  render(): void {
    const translateBlock = document.querySelector('.translate__block');

    if (!translateBlock || !this.translationBtn || !this.content) return;

    this.translationBtn.innerText = 'Translate';

    translateBlock.append(this.translationBtn, this.content);
  }

  translate(roundIndex: number, wordsIndex: number): void {
    if (!this.translationBtn || !this.content) return;

    const text = this.data.rounds[roundIndex].words[wordsIndex].textExampleTranslate;

    if (!this.content.classList.contains('.true')) {
      this.content.classList.add('.true');

      this.content.innerText = text;
    } else {
      this.content.innerText = '';
      this.content.classList.remove('.true');
    }
  }

  updateContent(roundIndex: number, wordsIndex: number): void {
    if (!this.translationBtn || !this.content) return;
    const text = this.data.rounds[roundIndex].words[wordsIndex].textExampleTranslate;

    if (this.content.classList.contains('.true')) {
      this.content.innerText = text;
    } else {
      this.content.innerText = '';
    }
  }

  claer(): void {
    if (!this.content) return;
    this.content.innerText = '';
  }

  setupClickHandler(clickHandler: () => void): void {
    this.translationBtn?.addEventListener('click', clickHandler);
  }

  init(): void {
    this.create();
    this.render();
  }
}

export default TranslationBtn;
