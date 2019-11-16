import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from './axiosConfig';

function GetBarChart(props) {
	return (
		<div>
			<Line
				data={props.data}
				options={{
					title: {
						text: 'cccc',
					},
					responsive: true,
					maintainAspectRatio: false,
					layout: {
						padding: {
							left: 100,
							right: 100,
							top: 10,
							bottom: 10,
						},
					},
				}}
			/>
		</div>
	);
}

export default function SalesInfo() {
	let [datapoints, setDatapoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

	useEffect(() => {
		Axios.get('/admin/bills')
			.then(res => {
				let tempArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				res.data.forEach(log => {
					console.log(log);
					let month = new Date(log.date).getMonth();
					console.log(month);
					tempArr[month] += log.total;
				});
				console.log(res.data);
				setDatapoints(tempArr);
			})
			.catch();
	}, []);

	let data = {
		labels: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		datasets: [
			{
				label: 'Sales this year',
				data: datapoints,
				backgroundColor: [
					'rgba(41,132,189,0.5)',
					// 'rgba(54, 162, 235, 0.2)',
					// 'rgba(255, 206, 86, 0.2)',
					// 'rgba(75, 192, 192, 0.2)',
					// 'rgba(153, 102, 255, 0.2)',
					// 'rgba(255, 159, 64, 0.2)'
				],
				// borderColor: [
				// 	'rgba(255, 99, 132, 1)',
				// 	'rgba(54, 162, 235, 1)',
				// 	'rgba(255, 206, 86, 1)',
				// 	'rgba(75, 192, 192, 1)',
				// 	'rgba(153, 102, 255, 1)',
				// 	'rgba(255, 159, 64, 1)'
				// ],
				borderWidth: 1,
			},
		],
	};
	return (
		<div>
			<GetBarChart data={data} />
		</div>
	);
}
