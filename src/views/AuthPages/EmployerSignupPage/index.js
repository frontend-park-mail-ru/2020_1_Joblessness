import {Page} from '../../../Page'
import template from './pug/index.pug'
import {EmployerSignupForm} from './EmployerSignupForm';
import '../style.css'
import {withForm} from "../../../ulils/withForm";
import {uuid} from "../../../ulils";
import {isEmail, isPhoneNumber, isSlavicName} from "../../../ulils/validators";

class EmployerSignupPage extends Page {

    componentDidMount = () => {
        this.form = new EmployerSignupForm();
    };

    render() {
        console.log(this.props.inputFields);
        return template(this.props.inputFields)
    }

}

EmployerSignupPage = withForm(EmployerSignupPage,
    {
        companyName: {
            id: uuid(),
            required: true,
        },
        site: {
            id: uuid(),
            required: true
        },
        city: {
            id: uuid(),
            required: true
            
        },
        firstName: {
            id: uuid(),
            required: true,
            validator: isSlavicName,
        },
        lastName: {
            id: uuid(),
            required: true,
            validator: isSlavicName,
        },
        phone: {
            id: uuid(),
            required: true,
            validator: isPhoneNumber,
        },
        email: {
            id: uuid(),
            required: true,
            validator: isEmail,
        }
    },
    {
        id: uuid()
    },
    (a, b) => {
        console.log(a, b)
    }
);

export {
    EmployerSignupPage
}