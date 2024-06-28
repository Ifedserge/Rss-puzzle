import './style/home.css';

class Home {
  element: HTMLElement | null;

  constructor() {
    this.element = null;
  }

  create(): void {
    this.element = document.createElement('div');
    this.element.classList.add('main');
  }

  render(): void {
    const wraper = document.querySelector('.wraper');
    const h1 = document.createElement('h1');
    const description = document.createElement('p');
    const logout = document.createElement('button');
    const img = document.createElement('img');
    const userName = document.createElement('p');
    const startBtn = document.createElement('button');

    h1.innerText = 'RSS Puzzle';
    description.innerText = 'RSS is an interactive game that will help you learn English. Go through level after level to hone your skills. You have to put together a “puzzle” of words to get a sentence';
    description.classList.add('description');

    img.src = 'https://external-preview.redd.it/2Vsn-5p4mcODyLDgndrfzMPJ1BvbAKBk5aBJAOzBVgg.png?format=pjpg&auto=webp&s=ecaa16643655ee9c7c660c560b8399f2a17ebf87';
    img.alt = 'image fun';

    userName.classList.add('user_name');
    userName.innerText = `Hello, ${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;

    startBtn.classList.add('start');
    startBtn.innerText = 'START';

    startBtn.addEventListener('click', () => {
      window.location.hash = 'game';
    });

    logout.classList.add('logot');
    logout.innerText = 'Log out';
    logout.addEventListener('click', () => {
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      window.location.hash = 'login';
    });

    if (!wraper || !this.element) return;
    wraper.innerHTML = '';

    this.element.append(h1, description, img, userName, startBtn, logout);
    wraper.append(this.element);
  }

  //   logOut(): void {
  //     localStorage.removeItem('firstName');
  //     window.location.hash = 'login';
  //   }

  init(): void {
    this.create();
    this.render();
  }
}

export default Home;
