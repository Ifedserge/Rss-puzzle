// import main from './main';
import UserLogin from '../pages/UserLogin';
import Router from './router';
import Home from '../pages/home';
import Game from '../pages/game';

class App {
  element: HTMLElement | null;

  private router: Router;

  private localStarageKeys = {
    firstName: 'firstName',
    lastName: 'lastName',
  };

  constructor() {
    this.element = null;
    this.router = new Router();
  }

  create(): void {
    this.element = document.createElement('div');
    this.element.classList.add('wraper');
  }

  render(): void {
    const body = document.querySelector('body');
    if (!body || !this.element) return;

    body.append(this.element);
  }

  configureRoutes(): void {
    this.router.addRoute('login', () => {
      const userLogin = new UserLogin();
      userLogin.init();
    });
    this.router.addRoute('home', () => {
      const home = new Home();
      home.init();
    });
    this.router.addRoute('', () => {
      window.location.hash = 'login';
    });
    this.router.addRoute('game', () => {
      const game = new Game();
      game.init();
    });
  }

  userАuthorizationCheck(): boolean {
    const firstName = localStorage.getItem(this.localStarageKeys.firstName);
    const lastName = localStorage.getItem(this.localStarageKeys.lastName);

    return Boolean(firstName && lastName);
  }

  init(): void {
    this.create();
    this.render();
    this.configureRoutes();

    if (this.userАuthorizationCheck()) {
      window.location.hash = 'home';
    } else {
      window.location.hash = 'login';
    }

    this.router.init();
  }
}

export default App;
