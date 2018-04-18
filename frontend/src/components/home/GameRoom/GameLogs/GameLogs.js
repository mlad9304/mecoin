import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './GameLogs.scss';
import GameLogsItem from '../GameLogsItem';

class GameLogs extends Component {

    render() {

        const { logs, total } = this.props;

        const logsView = logs && logs.map(log => {
            const gems = log[2]-log[1]+1;
            const percent = gems * 100 / total;
            const roundedPercent = Math.round(percent * 100) / 100;
            const tickets = log[1] === log[2] ? log[1] : log[1]+"-"+log[2];
            return (
                <GameLogsItem message={log[0] + " Deposited "+gems+" Gems giving him "+roundedPercent+"% to win. Owns #"+tickets}/>
            )
        })

        return(
            <div className="h-100 w-100 p-2 gameLogsContainer">

                <div className="gameLogsHeader mb-1 ">

                    <p className="text-center p-3">
                        George won the last game with number #55 winning 100 Jackpot!
                    </p>

                </div>
                <div className="gameLogsBody">
                    <Scrollbars className="gameLogsScrollbarContainer"
                        ref={(ref) => {
                            this.scrollBox = ref
                        }}
                    >
                        {logsView}

                    </Scrollbars>
                </div>

            </div>
        );
    }

}

export default GameLogs;