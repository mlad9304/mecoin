import React, { Component } from 'react';
import Script from 'react-load-script';
import './TicketStatusChart.scss';
import ReactHighcharts from 'react-highcharts';

class TicketStatusChart extends Component {

    render() {

        const { total, sold, ticketsOfCurrentUser, mode } = this.props;
        const others = sold - ticketsOfCurrentUser;
        const remaining = total - sold;

        let config;

        if(mode === 'default') {
            config = {
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent'
                },
                title: {
                    text: ''
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}'
                        },
                    },
                    
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },
            
                "series": [
                    {
                        "name": "Browsers",
                        "colorByPoint": true,
                        "data": [
                            {
                                "name": "I bought",
                                "y": ticketsOfCurrentUser,
                                "drilldown": "I bought"
                            },
                            {
                                "name": "Others",
                                "y": others,
                                "drilldown": "Others"
                            },
                            {
                                "name": "Remaining",
                                "y": remaining,
                                "drilldown": "Remaining"
                            },
                        ]
                    }
                ],                
            }
        }     
        if(mode === 'simple') {
            config = {
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent',
                    width: 150,
                    height: 100,
                    padding: 0,
                    margin: 0
                },
                title: {
                    text: ''
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        animation: false
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'sold',
                        y: sold,
                    }, {
                        name: 'remaining',
                        y: remaining
                    }]
                }]
            }
        }   

        return(
            <ReactHighcharts config={config}/>
        );
    }
}

export default TicketStatusChart;