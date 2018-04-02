import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ChatBoxItem, ChatInput } from 'components';
import './ChatBox.scss';

import { server as RECEIVE } from 'socket/packetTypes';
// socket
import sender from 'socket/packetSender';
import notify from 'helpers/notify';

class ChatBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ""
        }

    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSend = () => {

        const { socketAuth } = this.props;

        let message = this.state.message;
        
        if(message === '') {
            return;
        }

        if(!socketAuth) {
            notify({type: 'error', message: "Invalid Reguest"});
            return;
        }

        sender.message({
            message
        });

        this.setState({
            message: ''
        });

        document.getElementById('message').value = ''

        this.scrollToBottom();
    }

    scrollToBottom = () => {
        // SCROLL TO BOTTOM
        this
            .scrollBox
            .scrollTop(this.scrollBox.getScrollHeight());
    }

    componentDidMount() {
        try{
            this.props.getRecentMsg();
        }   catch( e ) {
            console.log(e);
        }
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }
  
    render() {

        const { handleSend, handleChange } = this;
        const { messages, socketAuth, logged } = this.props;

        let i = 0

        let chatboxitems = messages.map((msg) => {
            if(String(msg.type) === RECEIVE.MSG) {
                return (
                    <ChatBoxItem key={i++} message={msg.payload.message}/>
                );
            } else if(String(msg.type) === RECEIVE.JOIN && msg.payload.username != null) {
                return (
                    <ChatBoxItem key={i++} message={msg.payload.username + ' joined'}/>
                );
            } else if(String(msg.type) === RECEIVE.LEAVE && msg.payload.username != null) {
                return (
                    <ChatBoxItem key={i++} message={msg.payload.username + ' left'}/>
                );  
            } else {
                return null;
            }
            
            
        });

        return (
            <div className="h-100">
                <div className="chatBoxContainer">
                    <div className="chatBox">
                        <div className="statusBox">
                            <div className="w-100 p-1">
                                <span className='rounded-circle fa fa-circle color-green chat_status' />
                                <p className='color-lighgrey mb-0 d-inline-block chat_status_info'>
                                    <span className="ml-1">799 People</span>
                                    <span className="color-green"> &nbsp;Online</span>
                                </p>
                            </div>
                            <button className="statusButton">
                                <span className="fa fa-chevron-right" />
                            </button>
                        </div>
                        <Scrollbars
                            style={{
                                width: '100%',
                                height: '90%',
                                borderBottom: '1px solid rgba(0,0,0,0.10)',
                                padding: '0 5px 10px 5px'
                            }} 
                            ref={(ref) => {
                                this.scrollBox = ref
                            }}
                        >
                            {chatboxitems}

                        </Scrollbars>
                    </div>
                </div>
                {logged ? <ChatInput socketAuth={socketAuth} onSend={handleSend} onChange={handleChange}/> : <div></div>}
            </div>
        );
    }
};

export default ChatBox;
