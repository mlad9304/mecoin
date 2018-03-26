import React from 'react';
import { Link } from 'react-router-dom';


const RegisterForm = ({
    form,
    status,
    onChange,
    onSubmit,
    error
}) => {

    return (
        <form className="form">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text fa fa-user rounded-0 d-inline-flex" />
                </div>
                <input
                    type="text"
                    className="form-control form-control-lg rounded-0"
                    placeholder="Your Full Name"
                    name="fullname"
                    value={form.fullname}
                    onChange={onChange}
                />
                <div className="input-group-append">
                    <span className="input-group-text span-check rounded-0" />
                </div>
                <div className="invalid-feedback">Oops, you missed this one.</div>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text fa fa-user rounded-0 d-inline-flex" />
                </div>
                <input
                    type="text"
                    className="form-control form-control-lg rounded-0"
                    placeholder="Username"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                />
                <div className="input-group-append">
                    <span className="input-group-text span-check rounded-0" />
                </div>
                <div className="invalid-feedback">Oops, you missed this one.</div>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text fa fa-lock rounded-0 d-inline-flex" />
                </div>
                <input
                    type="text"
                    className="form-control form-control-lg rounded-0"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                />
                <div className="input-group-append">
                    <span className="input-group-text span-check rounded-0" />
                </div>
                <div className="invalid-feedback">Input your Email</div>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text fa fa-lock rounded-0 d-inline-flex" />
                </div>
                <input
                    type="text"
                    className="form-control form-control-lg rounded-0"
                    placeholder="Your password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                />
                <div className="input-group-append">
                    <span className="input-group-text span-check rounded-0" />
                </div>
                <div className="invalid-feedback">Input your password.</div>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text fa fa-lock rounded-0 d-inline-flex" />
                </div>
                <input
                    type="text"
                    className="form-control form-control-lg rounded-0"
                    placeholder="Confirm Your password"
                    name="confirm_password"
                    value={form.confirm_password}
                    onChange={onChange}
                />
                <div className="input-group-append">
                    <span className="input-group-text span-check rounded-0" />
                </div>
                <div className="invalid-feedback">Confirm your password.</div>
            </div>
            <div className="ml-1">
                <label className="custom-checkbox color-grey">
                    By clicking I accept Crypto Gambling Game{' '}
                    <Link className="color-yellow" to="/">
                    {' '}
                    Terms & Conditions.{' '}
                    </Link>
                    <input type="checkbox" />
                    <span className="checkmark" />
                </label>
            </div>
            <div className="row">
                <button 
                    onClick={onSubmit}
                    className='btn btn-lg col-8 mx-auto rounded-0 btn_singup'
                >
                    <b>Create an account</b>
                </button>
            </div>
            
        </form>
    );
}

export default RegisterForm;
