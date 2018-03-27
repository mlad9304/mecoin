import React, { Component } from 'react'
import { BuyTicketBox } from 'components';


class BuyTicketBoxContainer extends Component {
  render () {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                    <div className="m-3 d-inline-block">
                        <BuyTicketBox />
                    </div>
                    </td>
                    <td>
                    <div className="m-3 d-inline-block">
                        <BuyTicketBox />
                    </div>
                    </td>
                    <td>
                    <div className="m-3 d-inline-block">
                        <BuyTicketBox />
                    </div>
                    </td>
                </tr>
                <tr>
                    <td>
                    <div className="m-3 d-inline-block">
                        <BuyTicketBox />
                    </div>
                    </td>
                    <td>
                    <div className="m-3 d-inline-block">
                        <BuyTicketBox />
                    </div>
                    </td>
                    <td>
                    <div className="m-3 d-inline-block">
                        <BuyTicketBox />
                    </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
  }
}

export default BuyTicketBoxContainer;



