import { Header } from './views/Header';
import { Footer } from './views/Footer';
import { IndexPage } from './views/IndexPage';
import { LoginPage } from './views/AuthPages/LoginPage';
import { EmployeeSignupPage } from './views/AuthPages/EmployeeSignupPage';
import { EmployerSignupPage } from './views/AuthPages/EmployerSignupPage';

const root = document.getElementById('root');

const header = document.getElementById('header');
const footer = document.getElementById('footer');

const headerPage = new Header(header);
headerPage.render();

const footerPage = new Footer(footer);
footerPage.render();

const indexPage = new IndexPage(root);
indexPage.render();

function createIndex() {
    const indexPage = new IndexPage(root);
    indexPage.render();
}

function createLogin() {
    const loginPage = new LoginPage(root);
    loginPage.render();
}

function createEmployeeSignup() {
    const employeeSignupPage = new EmployeeSignupPage(root);
    employeeSignupPage.render();
}

function createEmployerSignup() {
    const employerSignupPage = new EmployerSignupPage(root);
    employerSignupPage.render();
}

const routes = {
    index: createIndex,
    login: createLogin,
    employeeSignup: createEmployeeSignup,
    employerSignup: createEmployerSignup,
};

document.body.addEventListener('click', (e) => {
    const {target} = e;

    if (target instanceof HTMLAnchorElement) {
        e.preventDefault();

        routes[target.dataset.page]();
    }
});