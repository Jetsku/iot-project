/* DO NOT DELETE THESE LINES */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { Table } from './components/Temptable.jsx';
import './assets/stylesheets/style.css';

const { BACKEND_PORT } = process.env;
const baseUrl = window.location.hostname;
const backendUrl = `http://${baseUrl}:${BACKEND_PORT}`;

/* ADD YOUR CODE AFTER THIS LINE */

const getData = (events) => ({
	datasets: [
		{
			label: 'Temperature',
			yAxisID: 'A',
			fill: true,
			precision: 1,
			beginAtZero: true,
			lineTension: 0.1,
			backgroundColor: 'rgba(150,96,96,0)',
			borderColor: 'rgba(150,96,96,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(150,96,96,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(150,96,96,1)',
			pointHoverBorderColor: 'rgba(100,100,100,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: events.slice(events.length - 50).map((event) => {
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
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: events.slice(events.length - 50).map((event) => {
				let x = new Date(event.timestamp);
				const timestamp = x;
				const humidity = event.humidity;
				return { x: timestamp, y: humidity };
			})
		}
	]
});

const getGreetingFromBackend = async () => {
	try {
		const url = `${backendUrl}/api/greeting`;
		console.log(`Getting greeting from ${url}`);
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.error(error);
	}
	return { greeting: 'Could not get greeting from backend' };
};

const getEvents = async () => {
	const url = `${backendUrl}/api/events`;
	const response = await fetch(url);
	return response.json();
};

const BackendGreeting = (props) => (
	<div>
		<p>Backend says: {props.greeting}</p>
	</div>
);

BackendGreeting.propTypes = {
	greeting: PropTypes.string
};

BackendGreeting.defaultProps = {
	greeting: ''
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			greeting: '',
			events: []
		};
	}

	async componentDidMount() {
		const response = await getGreetingFromBackend();
		const events = await getEvents();
		this.setState({ greeting: response.greeting, events: events.results });
	}

	render() {
		return (
			<div style={{ position: 'relative', width: 1400, height: 700 }}>
				<Line
					data={getData(this.state.events)}
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
									ticks: { suggestedMin: 0 },
									gridLines: { color: '#fff' }
								},
								{
									id: 'B',
									type: 'linear',
									position: 'right',
									ticks: { suggestedMin: 0 },
									gridLines: { color: '#fff' }
								}
							]
						}
					}}
				/>
			</div>
		);
	}
}

/* DO NOT DELETE AFTER THIS LINE */

ReactDOM.render(<App />, document.getElementById('root'));
