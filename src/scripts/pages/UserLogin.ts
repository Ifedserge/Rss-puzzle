import './style/userLogin.css';

class UserLogin {
  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement;

  constructor() {
    this.firstNameInput = document.createElement('input');
    this.lastNameInput = document.createElement('input');

    this.initEventListeners();
  }

  private initEventListeners = () => {
    this.firstNameInput.addEventListener('input', () => this.validateInput(this.firstNameInput, 3));
    this.lastNameInput.addEventListener('input', () => this.validateInput(this.lastNameInput, 4));
  };

  public init = () => {
    const wraper = document.querySelector('.wraper');
    const container = document.createElement('div');
    const loginButton = document.createElement('button');
    container.classList.add('container');

    const labelName = document.createElement('label');
    labelName.title = 'The name must begin with a capital letter and be at least three letters long in English';

    const labelLastName = document.createElement('label');
    labelLastName.title = 'Last name must begin with a capital letter and be at least four letters long in English';

    this.firstNameInput.placeholder = 'Name';
    this.firstNameInput.required = true;

    this.lastNameInput.placeholder = 'Surname';
    this.lastNameInput.required = true;

    loginButton.textContent = 'Log in';
    loginButton.disabled = true;
    loginButton.addEventListener('click', this.handleSubmit);

    labelName.append(this.firstNameInput);
    labelLastName.append(this.lastNameInput);
    container.append(labelName, labelLastName, loginButton);

    if (wraper) {
      wraper.innerHTML = '';
      wraper.append(container);
    }
  };

  private validateInput = (inputElement: HTMLInputElement, minLength: number) => {
    const { value } = inputElement;
    const isValidName = /^[A-Za-z-]+$/.test(value);
    const hasUppercaseFirst = /^[A-Z]/.test(value);
    const isValidLength = value.length >= minLength;

    if (!isValidName || !hasUppercaseFirst || !isValidLength) {
      inputElement.classList.add('error');
      this.updateButtonState();
      return false;
    }
    inputElement.classList.remove('error');
    this.updateButtonState();
    return true;
  };

  private updateButtonState = () => {
    const loginButton = document.querySelector('button');
    if (loginButton) {
      const isFirstNameInput = this.firstNameInput.value.length >= 3 && /^[A-Za-z-]+$/.test(this.firstNameInput.value) && /^[A-Z]/.test(this.firstNameInput.value);
      const isLastNameInput = this.lastNameInput.value.length >= 4 && /^[A-Za-z-]+$/.test(this.lastNameInput.value) && /^[A-Z]/.test(this.lastNameInput.value);
      loginButton.disabled = !(isFirstNameInput && isLastNameInput);
    }
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    const firstName = this.firstNameInput.value;
    const lastName = this.lastNameInput.value;

    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    window.location.hash = 'home';
  };
}

export default UserLogin;
