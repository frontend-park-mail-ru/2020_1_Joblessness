import { Header } from './views/Header';
import { Footer } from './views/Footer';
import { LoginPage } from './views/AuthPages/LoginPage';
import { EmployeeSignupPage } from './views/AuthPages/EmployeeSignupPage';
import { EmployerSignupPage } from './views/AuthPages/EmployerSignupPage';

const app = document.getElementById('root');

const header = document.getElementById('header');
const footer = document.getElementById('footer');

const headerPage = new Header(header);
headerPage.render();

const footerPage = new Footer(footer);
footerPage.render();

function createLogin() {
    const loginPage = new LoginPage(app);
    loginPage.render();
}

function createEmployeeSignup() {
    const employeeSignupPage = new EmployeeSignupPage(app);
    employeeSignupPage.render();
}

function createEmployerSignup() {
    const employerSignupPage = new EmployerSignupPage(app);
    employerSignupPage.render();
}

const routes = {
    login: createLogin,
    employeeSignup: createEmployeeSignup,
    employerSignup: createEmployerSignup,
};

document.body.addEventListener('click', (e) => {
    const {target} = e;

    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();

        routes[target.dataset.page]();

        window.history.pushState({}, 'hh.ru', target.dataset.page)
    }
});