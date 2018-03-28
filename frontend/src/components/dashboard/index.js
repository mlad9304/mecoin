import React, {Component} from 'react';
import {Redirect, Switch, Route, withRouter} from 'react-router';

import { HeaderContainer } from 'containers';
import { PageTemplate, Footer } from 'components';

import { DashboardLeftbarContainer, ProfileContainer, WalletContainer, DepositContainer } from 'containers';
import DashboardRightbar from './DashboardRightbar';
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
                            </Switch>
                        </div>
                        <div className="rightContainer">
                            <DashboardRightbar />
                        </div>
                    </div>
                </div>
            </PageTemplate>
        
        );
    }
}

export default withRouter(Dashboard);
