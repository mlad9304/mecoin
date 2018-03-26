import React from 'react';
import cx from 'classnames';

import './LoginForm.scss';


const LoginForm = ({
    form,
    status,
    onChange,
    onSubmit
}) => (
    <form className="form">
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text fa fa-user rounded-0 d-inline-flex" />
            </div>
            <input
                type="text"
                className="form-control form-control-lg rounded-0"
                placeholder="Username"
                name="username"
                value={form.value}
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
                type="password"
                className="form-control form-control-lg rounded-0"
                placeholder="Your password"
                name="password"
                value={form.value}
                onChange={onChange}
            />
            <div className="input-group-append">
                <span className="input-group-text span-check rounded-0"></span>
            </div>
            <div className="invalid-feedback">Input your password.</div>
        </div>
        <div className="ml-1">
            <label className="custom-checkbox color-grey">
                Remember me
                <input type="checkbox" />
                <span className="checkmark" />
            </label>
        </div>
        <div className="row">
            <button 
                className='btn btn-lg col-8 mx-auto rounded-0 btn_login' 
                onClick={onSubmit}
                >
                <b>Login Now</b>
                <span>&nbsp;</span>
                <i className={cx("fa", "fa-circle-o-notch", "fa-spin", { hidden: !status.submitting})}></i>
            </button>
        </div>
        
    </form>
)

export default LoginForm;