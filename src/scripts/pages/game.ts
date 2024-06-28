import data1 from '../wordCollection/wordCollectionLevel1.json';
import { Data } from '../components/interfaces';
import './style/game.css';
import CheckBtn from '../components/checkBtn';
import AutoComplateBtn from '../components/autoComplate';
import TranslationBtn from '../components/translation';
import AudioBtn from '../components/audioBtn';

class Game {
  element: HTMLElement | null;

  private data: Data;

  private roundIndex: number = 0;

  private wordsIndex: number = 0;

  private selectorResults: string = '.block__results';

  private checkButton: CheckBtn;

  private autoComplateBtn: AutoComplateBtn;

  private translationBtn: TranslationBtn;

  private audioBtn: AudioBtn;

  constructor() {
    this.element = null;
    this.data = data1;
    this.checkButton = new CheckBtn();
    this.autoComplateBtn = new AutoComplateBtn();
    this.translationBtn = new TranslationBtn();
    this.audioBtn = new AudioBtn();
  }

  create(): void {
    this.element = document.createElement('div');
    this.element.classList.add('game');
  }

  btnState(): void {
    const text = this.data.rounds[this.roundIndex].words[this.wordsIndex].textExample;
    const resultBlocks = document.querySelectorAll('.result');
    const lastResult = resultBlocks[resultBlocks.length - 1];
    const contineBtn = document.querySelector('.continue__btn') as HTMLButtonElement;

    if (lastResult) {
      const currentSentence = Array.from(lastResult.children)
        .map((card) => card.textContent?.trim())
        .join(' ');

      contineBtn.disabled = text !== currentSentence;
      if (!contineBtn.disabled) {
        this.checkButton.rename('Continue');
      }
    }
  }

  clickContinuebtn(): void {
    if (this.wordsIndex === 9) {
      this.roundIndex += 1;
      this.wordsIndex = 0;
      this.clearResults();
      this.updateGame();
    } else {
      this.wordsIndex += 1;
      this.updateGame();
    }
    this.checkButton.checkResults();
    this.checkButton.rename('Check');
    this.translationBtn.claer();
    this.translationBtn.updateContent(this.roundIndex, this.wordsIndex);
  }

  clearResults(): void {
    const blockresults = document.querySelector(this.selectorResults);
    if (blockresults) {
      blockresults.innerHTML = '';
    }
  }

  updateGame(): void {
    const newResult = document.createElement('div');
    const blockResults = document.querySelector('.block__results');
    const shuffleWords = this.randomWords();
    const wordCards = Game.createWordCards(shuffleWords);
    const blockCards = document.querySelector('.block__cards');

    newResult.classList.add('result');

    if (blockResults) {
      blockResults.append(newResult);
    }

    if (blockCards) {
      wordCards.forEach((card) => {
        card.addEventListener('click', () => {
          if (card.parentNode === blockCards) {
            newResult.appendChild(card);
          } else {
            blockCards.appendChild(card);
          }
          this.checkButton.checkResults();
          this.btnState();
        });
        blockCards.appendChild(card);
      });
    }
    this.btnState();
  }

  randomWords(): string[] {
    const text = this.data.rounds[this.roundIndex].words[this.wordsIndex].textExample;
    const textArr = text.split(' ');

    const shiffleArray = (arr: string[], n: number = arr.length - 1): string[] => {
      if (n <= 0) return arr;

      const arr1 = arr;

      const j = Math.floor(Math.random() * (n + 1));
      [arr1[n], arr1[j]] = [arr1[j], arr1[n]];
      return shiffleArray(arr1, n - 1);
    };

    return shiffleArray(textArr);
  }

  static createWordCards(words: string[]): HTMLElement[] {
    const newWords = words;
    return newWords.map((word) => {
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

  render(): void {
    const wraper = document.querySelector('.wraper');
    const h1 = document.createElement('h1');
    const result = document.createElement('div');
    const blockCards = document.createElement('div');
    const shuffleWords = this.randomWords();
    const wordCards = Game.createWordCards(shuffleWords);
    const blockResults = document.createElement('div');
    const continueBtn = document.createElement('button');
    const blockBtn = document.createElement('div');
    const translateBlock = document.createElement('div');
    const audioBlock = document.createElement('div');

    audioBlock.classList.add('audio__block');
    translateBlock.classList.add('translate__block');
    blockBtn.classList.add('block__btn');
    blockResults.classList.add('block__results');

    continueBtn.classList.add('continue__btn');
    continueBtn.innerText = 'Continue';
    continueBtn.disabled = true;

    result.classList.add('result');
    blockCards.classList.add('block__cards');

    h1.innerText = 'GAME';

    if (blockCards) {
      wordCards.forEach((card) => {
        card.addEventListener('click', () => {
          if (card.parentNode === blockCards) {
            result.appendChild(card);
          } else {
            blockCards.appendChild(card);
          }
          this.checkButton.checkResults();
          this.btnState();
        });
        blockCards.appendChild(card);
      });
    }

    continueBtn.addEventListener('click', () => this.clickContinuebtn());

    if (!wraper || !this.element) return;

    wraper.innerHTML = '';
    blockResults.append(result);
    blockBtn.append(continueBtn);
    this.element.append(h1, audioBlock, blockResults, translateBlock, blockCards, blockBtn);
    wraper.append(this.element);
  }

  init(): void {
    this.create();
    this.render();
    this.checkButton.init();
    this.autoComplateBtn.init();
    this.translationBtn.init();
    this.audioBtn.init();

    const check: HTMLButtonElement | null = document.querySelector('.check__btn');
    this.checkButton.setupClickHandler(() => {
      this.checkButton.compare(this.roundIndex, this.wordsIndex);
      if (check?.innerText === 'Continue') {
        this.clickContinuebtn();
      }
    });

    this.autoComplateBtn.setupClickHandler(() => {
      this.autoComplateBtn.autoCamplate(this.roundIndex, this.wordsIndex);
      this.btnState();
      this.checkButton.compare(this.roundIndex, this.wordsIndex);
    });

    this.translationBtn.setupClickHandler(() => {
      this.translationBtn.translate(this.roundIndex, this.wordsIndex);
    });

    this.audioBtn.setupClickHandler(() => {
      this.audioBtn.listen(this.roundIndex, this.wordsIndex);
    });
  }
}
export default Game;
