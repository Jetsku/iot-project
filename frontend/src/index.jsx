/* DO NOT DELETE THESE LINES */

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import './assets/stylesheets/style.css';

const { BACKEND_PORT } = process.env;
const baseUrl = window.location.hostname;
const backendUrl = `http://${baseUrl}:${BACKEND_PORT}`;


const getData = (events) => ({
	datasets: [
		{
			label: 'Temperature',
			yAxisID: 'A',
			fill: true,
			precision: 1,
			beginAtZero: true,
			lineTension: 0.1,
			backgroundColor: 'rgba(250,96,96,0)',
			borderColor: 'rgba(250,96,96,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(250,96,96,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(250,96,96,1)',
			pointHoverBorderColor: 'rgba(100,100,100,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: events.slice(events.length - 100).map((event) => {
				let x = new Date(event.timestamp);
				const timestamp = x;
				const temperature = [ event.temperature, event.tag ];
				return { x: timestamp, y: temperature[0] };
			})
		},
		{
			label: 'Humidity',
			fill: true,
			yAxisID: 'B',
			beginAtZero: true,
			lineTension: 0.5,
			backgroundColor: 'rgba(75,192,192,0.25)',
			borderColor: 'rgba(75,255,255,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,255,255,0.7)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,255,255,0.7)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: events.slice(events.length - 100).map((event) => {
				let x = new Date(event.timestamp);
				const timestamp = x;
				const humidity = event.humidity;
				return { x: timestamp, y: humidity };
			})
		}
	]
});



const getEvents = async (id=null, tag=null) => {
	const idParam = (!id) ? "0" : id;
	const tagParam = (!tag) ? "" : "&tag=" + tag;
	const url = `${backendUrl}/api/events?id=${idParam}${tagParam}`;
	const response = await fetch(url);
	return response.json();
};



class Table extends React.Component {
	render() {
		return (
			<Line
				data={getData(this.props.events)}
				width={1000}
				height={500}
				options={{
					scales: {
						xAxes: [
							{
								type: 'time',
								time: { unit: 'second' }
							}
						],
						yAxes: [
							{
								id: 'A',
								type: 'linear',
								position: 'left',
								ticks: {
									suggestedMin: 0
								}
							},
							{
								id: 'B',
								type: 'linear',
								position: 'right',
								ticks: {
									suggestedMin: 0,
									suggestedMax: 100
								},
								gridLines: { color: 'rgb(255, 255, 255,0.9)' }
							}
						]
					},
					legend: {
						labels: {
							fontColor: 'rgb(255, 255, 255,0.9)',
							fontSize: 20
						}
					},
					layout: {
						padding: {
							left: 50,
							right: 50,
							top: 0,
							bottom: 100
						}
					},
					responsive: true,
					maintainAspectRatio: true
				}}
			/>
		);
	}
}



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		};
		this.getUpdate = this.getUpdate.bind(this);
	}

	async getUpdate(tag=null) {
		const update = await getEvents(this.state.events.length, tag);
		this.setState({events: this.state.events.concat(update.results)})
	}

	async componentDidMount() {
		const events = await getEvents();
		this.setState({events: events.results});
		setInterval(this.getUpdate, 5000);

	}

	render() {
		return (
			<Fragment>
				<div className="chart-container">
					<header>weather</header>
					<Table events={this.state.events} getUpdate = {this.getUpdate}/>
				</div>
			</Fragment>
		);
	}
}


ReactDOM.render(<App />, document.getElementById('root'));
