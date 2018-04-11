import React, { Component } from 'react';
import './Withdraw.scss';
import notify from 'helpers/notify'

class Withdraw extends Component {

    componentWillMount() {
        const { DashboardActions, userId } = this.props;
        DashboardActions.getWithdrawHistory(userId);
    }

    handleChange = (e) => {
        const { FormActions } = this.props;
        FormActions.changeInput({form: 'withdraw', name: e.target.name, value: e.target.value});
    }

    handleSubmit = async () => {
        const { form, FormActions, DashboardActions, logged, userId, balance, history } = this.props;
        const { balanceGem, balanceEth } = balance;
        const { amount } = form;

        if(!logged || userId === null) {
            // alert('login first');
            notify({type: 'error', message: 'Please Login'});
            setTimeout( ()=> {
                history.push('/login');
            }, 700);
            return;
        }

        // validate input
        const regex = /^(0|([1-9]\d*))(\.\d+)?$/;
        
        if (!regex.test(amount) || amount <= 0) {
            notify({type: 'error', message: 'Wrong Input!'});
            FormActions.formReset();
            return;
        }

        if(balanceEth < amount) {
            notify({type: 'error', message: 'Too much!'});
            FormActions.formReset();
            return;
        }

        try {
            await DashboardActions.withdraw(userId, amount);
        } catch (e) {
            notify({type: 'error', message: "cannot withdraw"});
            return;
        }

        notify({type: 'success', message: 'Successfully withdrawed'});

        FormActions.formReset();

        DashboardActions.getWithdrawHistory(userId);
    }

    render() {

        const { handleChange, handleSubmit } = this;
        const { form, balance, withdrawHistory } = this.props;
        const { balanceGem, balanceEth } = balance;
        const { amount } = form;

        const withdrawHistoryView = withdrawHistory.map(item => {
            return (
                <div key={item._id}>
                    <p>Withdraw {Math.abs(item.amount/1000)} Eth at {item.createdAt}</p>
                    <hr className="subDivider" />
                </div>
            )
        });

        return (
            <div className="withdraw_container">
                <p className="withdraw_title">
                    <b>Withdraw Fund</b>
                </p>
                <hr className='mb-0 divider' />
                <div className="row h-100">
                    <div className='col h-100 verticalDivider'>
                        <p>
                            My Wallet Balance: <span className="value">{balanceEth}</span>
                            &nbsp;eth
                        </p>
                        <div>
                            <p className="mb-1">Withdrawal Amount</p>
                            <div className='row withdrawInputContainer'>
                                <div className="col-10 pr-0">
                                    <input className="withdrawInput" placeholder="00.00" onChange={handleChange} name="amount" value={amount} />
                                </div>
                                <div className="col-2 text-left pl-2 position-relative">
                                    <div className="unit">Eth</div>
                                </div>
                            </div>
                            <br/>
                            <div className="row text-center">
                                <a className="btnWithdraw" onClick={handleSubmit}>Withdraw Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col h-100">
                        <br />
                        <p className="mb-1">
                            <b>Recently Withdraw</b>
                        </p>
                        <hr className='mt-0 subDivider' />
                        <div className="withdrawHistory">
                            { withdrawHistoryView }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Withdraw;
