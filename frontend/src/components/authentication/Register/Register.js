import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from 'components';
import notify from 'helpers/notify';
import { withRouter } from 'react-router';

import './Register.scss';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animate: false,
            leave: false,
            path: ''
        };

    }

    handleSubmit = async (e) => {

        e.preventDefault();



        const { form, AuthActions, FormActions, history } = this.props;
        const { firstname, lastname, username, password, confirm_password, email } = form;

        notify.clear();

        AuthActions.setSubmitStatus(true);

        // do username / password regex check
        const regex = {
            firstname: /[a-zA-Z]{3,30}/,
            lastname: /[a-zA-Z]{3,30}/,
            username: /^[0-9a-z_]{4,20}$/,
            password: /^.{5,30}$/,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }

        let error = false;

        if (!regex.firstname.test(firstname)) {
            error = true;

            notify({type: 'error', message: "Firstname should be 3~30 characters."});
            FormActions.setInputError({form: 'register', name: 'firstname', error: true});
        } else {
            FormActions.setInputError({form: 'register', name: 'firstname', error: false});
        }

        if (!regex.lastname.test(lastname)) {
            error = true;

            notify({type: 'error', message: "Lastname should be 3~30 characters."});
            FormActions.setInputError({form: 'register', name: 'lastname', error: true});
        } else {
            FormActions.setInputError({form: 'register', name: 'lastname', error: false});
        }

        if (!regex.password.test(password)) {
            error = true;

            notify({type: 'error', message: "Password should be 5~30 characters."});
            FormActions.setInputError({form: 'register', name: 'password', error: true});
        } else {
            FormActions.setInputError({form: 'register', name: 'password', error: false});
        }

        if(password !== confirm_password) {
            error = true;
            notify({type: 'error', message: "Password not matching"});
            FormActions.setInputError({form: 'register', name: 'password', error: true});
        } else {
            FormActions.setInputError({form: 'register', name: 'password', error: false});
        }

        if (!regex.username.test(username)) {
            error = true;
            notify({type: 'error', message: "Username should be 4~20 alphanumeric characters or an underscore"});
            FormActions.setInputError({form: 'register', name: 'username', error: true});
        } else {
            FormActions.setInputError({form: 'register', name: 'username', error: false});
        }

        if (!regex.email.test(email)) {
            error = true;
            notify({type: 'error', message: "Email invalid"});
            FormActions.setInputError({form: 'register', name: 'email', error: true});
        } else {
            FormActions.setInputError({form: 'register', name: 'email', error: false});
        }

        

        // if (!error) {
        //     try {
        //         const result = await AuthActions.checkUsername(form.username);
        //         if (this.props.status.usernameExists) {
        //             FormActions.setInputError({form: 'register', name: 'username', error: true});
        //             // toastr.error('That username is already taken, please try another one.');
        //             //notify({type: 'error', message: formatMessage(messages.duplicatedUsername)});
        //             error = true;
        //         } else {
        //             FormActions.setInputError({form: 'register', name: 'username', error: false});
        //         }
        //     } catch (e) {
        //         //notify({type: 'error', message: 'Oops!'});
        //     }
        // }

        AuthActions.setSubmitStatus(false);

        // stop at here if there is an error
        if (error) {
            return;
        }

        AuthActions.setSubmitStatus(true);
        try {
            await AuthActions.submit({username, password, firstname, lastname, email});
        } catch ( e ) {
            notify({type: 'error', message: 'Oops, server rejected your request, please try again'});
            AuthActions.setSubmitStatus(false);
            // this.leaveTo('/auth');
            return;
        }

        AuthActions.setSubmitStatus(false);
        notify({type: 'success', message: `Hello, ${username}! Pelase sign in.`});
        history.push('/login');

    }

    handleChange = (e) => {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'register', name: e.target.name, value: e.target.value})
    }

    componentWillUnmount() {
        this
            .props
            .FormActions
            .formReset();
        this
            .props
            .AuthActions
            .resetRegisterStatus();
    }

    render() {

        const { handleChange, handleSubmit } = this;
        let { form, formError, status} = this.props;

        return (
            <div className='card rounded-2 signupform_bkg'>
                <div className='card-header'>
                <p className='text-center mb-0 already'>New User?</p>
                <h3 className="mb-0 text-center text-white">Create an account</h3>
                </div>
                <div className="card-body">
                    <RegisterForm 
                        form={form} 
                        status={status}
                        error={formError}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                    <div className="row mt-2">
                        <p className="text-center color-grey w-100">
                            Already have an account{' '}
                            <Link className="color-yellow" to="/login">
                            Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);