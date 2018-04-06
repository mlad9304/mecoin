import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { Footer } from 'components';
import { HeaderContainer, 
        HomeLeftSidebarContainer, 
        TopLeadersContainer, 
        BuyTicketBoxContainer, 
        ChatBoxContainer,
        GameRoomContainer 
} from 'containers';
import './Home.scss';

class Home extends Component {
  render() {
    
    return (       

        <div>
            <header>
                <HeaderContainer/>
            </header>
            <main>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className='col-2 bkg-lightdarkblue h-100 pl-0 pr-0 leftBar'>
                            <HomeLeftSidebarContainer/>
                        </div>
                        <div className="col-8 pt-3 position-relative">
                            <div className='position-absolute w-100 topLeadersContainerWrapper'>
                                <TopLeadersContainer/>
                            </div>
                            <div className='bkg-lightdarkblue h-100 ticketBoxContainer'>
                                <Switch>
                                    <Redirect exact from="/" to="/home"/>
                                    <Route path="/home" component={BuyTicketBoxContainer}/>
                                    <Route path="/game/:type/id/:id" component={GameRoomContainer}/>
                                </Switch>
                            </div>
                        </div>
                        <div className='col-2 bkg-lightdarkblue pl-0 pr-0 rightBar'>
                            <ChatBoxContainer/>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
  }
}
export default Home;
