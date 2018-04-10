import React, { Component } from 'react';
import './Deposit.scss';
import notify from 'helpers/notify'

class Deposit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deposit: 0,
            fee: 0
        }
    }

    handleChange = (e) => {
        const gemamount = e.target.value;
        const { FormActions } = this.props;
        FormActions.changeInput({form: 'walletDeposit', name: e.target.name, value: gemamount});

        // validate input
        const regex = /^[1-9]\d*$/;
        
        if (!regex.test(gemamount)) {
            this.setState({
                deposit: 0,
                fee: 0
            });
            return;
        }

        this.setState({
            deposit: gemamount / 1000 + gemamount / 10000,
            fee: gemamount / 10000
        })
    }

    handleSubmit = async () => {

        const { form, FormActions, DashboardActions, logged, userId, history } = this.props;
        const { gemamount } = form;

        if(!logged || userId === null) {
            // alert('login first');
            notify({type: 'error', message: 'Please Login'});
            setTimeout( ()=> {
                history.push('/login');
            }, 700);
            return;
        }

        // validate input
        const regex = /^[1-9]\d*$/;
        
        if (!regex.test(gemamount)) {
            notify({type: 'error', message: 'Wrong Input!'});
            FormActions.formReset();
            return;
        }

        try {
            await DashboardActions.deposit(userId, this.state.deposit, this.state.fee);
        } catch (e) {
            notify({type: 'error', message: "cannot deposit"});
            return;
        }

        notify({type: 'success', message: 'Successfully deposited'});
        
    }

    render() {

        const { handleChange, handleSubmit } = this;
        const { form, balance } = this.props;
        const { gemamount } = form;

        return (
            <div className="deposit_container">
                <p className="deposit_title">
                    <b>Deposit Fund</b>
                </p>
                <hr className="divider" />
                <p className="text-right">
                    My Wallet Balance:{' '}
                    <span className="balance">
                        <b>{balance}</b>
                    </span>
                    &nbsp;eth
                </p>
                <hr className="mb-0 divider" />
                <div className="row h-100">
                    <div className="col h-100 verticalDivider">
                        <br/>
                        <p className="depositRule">1 Gem = 0.001 Eth + 0.0001 Eth (Fee)</p>
                        <p className="gemAmount">Gem Amount</p>
                        <div className="row gemInputContainer">
                            <div className="col-10 pr-0">
                                <input className="gemInput" placeholder="0" onChange={handleChange} name="gemamount" value={gemamount}/>
                            </div>
                            <div className="col-2 text-left pl-2 position-relative">
                                <div className="unit">Gem</div>
                            </div>
                        </div>
                        <br />
                        <p className="depositAmount">Deposit Amount: <span className="number">{this.state.deposit}</span> Eth</p>
                        <br />
                        <a className="btnDeposit" onClick={handleSubmit}>
                            <b>Deposit Now</b>
                        </a>
                    </div>
                    <div className="col h-100">
                        <br />
                        <p className="mb-1">
                            <b>Recently Deposit</b>
                        </p>
                        <hr className="mt-0 subDivider" />
                        <div className="depositHistory">
                            <p>Tom S, deposit $10 Eth at 6:00PM, 10-Jan-2018</p>
                            <hr className="subDivider" />
                            <p>Tom S, deposit $2 Eth at 1:00PM, 08-Jan-2018</p>
                            <hr className="subDivider" />
                            <p>Tom S, deposit $11 Eth at 5:00PM, 06-Jan-2018</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Deposit;
