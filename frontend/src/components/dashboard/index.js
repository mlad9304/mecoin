import React, {Component} from 'react';
import {Redirect, Switch, Route, withRouter} from 'react-router';

import { HeaderContainer } from 'containers';
import { PageTemplate, Footer } from 'components';

import { DashboardLeftbarContainer, 
            ProfileContainer, 
            WalletContainer, 
            DepositContainer,
            WithdrawContainer,
            TransactionsReportContainer,
            SupportTicketContainer,
            AffiliateContainer,
            SettingsContainer,
            DashboardRightbarConainer,
            BuyTicketBoxContainer
        } from 'containers';
import './Dashboard.scss';

class Dashboard extends Component {
    
    render() {

        const { match } = this.props;

        return (
            <PageTemplate header={<HeaderContainer/>} footer={<Footer/>}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="leftContainer">
                            <DashboardLeftbarContainer />
                        </div>
                        <div className="col">
                            <Switch>
                                <Redirect exact from={`${match.url}`} to={`${match.url}/wallet`}/>
                                <Route path={`${match.url}/wallet`} component={WalletContainer}/>
                                <Route path={`${match.url}/profile`} component={ProfileContainer}/>
                                <Route path={`${match.url}/deposit`} component={DepositContainer}/>
                                <Route path={`${match.url}/withdraw`} component={WithdrawContainer}/>
                                <Route path={`${match.url}/report`} component={TransactionsReportContainer}/>
                                <Route path={`${match.url}/ticket`} component={SupportTicketContainer}/>
                                <Route path={`${match.url}/affiliate`} component={AffiliateContainer}/>
                                <Route path={`${match.url}/settings`} component={SettingsContainer}/>
                            </Switch>
                        </div>
                        <div className="rightContainer">
                            <BuyTicketBoxContainer mode="dashboard"/>
                        </div>
                    </div>
                </div>
            </PageTemplate>
        
        );
    }
}

export default withRouter(Dashboard);
