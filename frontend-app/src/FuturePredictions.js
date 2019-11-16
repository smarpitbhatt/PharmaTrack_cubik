import React, { useState, useEffect } from 'react';
import Axios from './axiosConfig';
import { Line } from 'react-chartjs-2';

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

export default function FuturePredictions() {
	// const [done,setDone]=useState(false);
	const [billLogs, setBillLogs] = useState([]);
	const [medicines, setMedicines] = useState([]);
	const [datapoints, setDatapoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	const [selected, setSelected] = useState({ name: 'rd' });
	let getMedicines = async () => {
		await Axios.get('/admin/medicine')
			.then(res => {
				console.log(res.data);
				setMedicines(res.data);
				// setSelected(medicines[0]);
			})
			.catch(err => console.log(err));
	};
	let getLogs = async () => {
		await Axios.get('/admin/bills')
			.then(res => {
				console.log(res.data);
				setBillLogs(res.data);
				// getPredicionsArray();
				// setDone(true);
			})
			.catch(err => console.log(err));
	};
	useEffect(() => {
		getMedicines();
		getLogs();
		// console.log(medicines[0])
		// console.log();
	}, []);

	let getPredicionsArray = () => {
		let tempArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		const currentYear = new Date().getFullYear();
		billLogs.forEach(bill => {
			const billYear = new Date(bill.date).getFullYear();
			const billMonth = new Date(bill.date).getMonth();
			console.log(billYear, currentYear);
			if (billYear === currentYear) {
				return;
			}
			bill.items.forEach(item => {
				if (item.name === selected.name) {
					tempArr[billMonth]++;
				}
			});
		});
		console.log(tempArr);
		setDatapoints(tempArr);

		// // return tempArr.toString();
		return tempArr;
	};

	let getoptions = () => {
		return medicines.map(medicine => <option key={medicine.name}>{medicine.name}</option>);
	};

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
				label: 'Sales in the past year',
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
			<select
				value={selected.name}
				onChange={e => {
					console.log(e.target.value);
					setSelected(medicines.find(medicine => medicine.name === e.target.value));
					getPredicionsArray();
				}}
			>
				{getoptions()}
			</select>
			{<div>selected-{selected.name}</div>}

			{/* {getPredicionsArray()} */}
			<GetBarChart data={data} />
		</div>
	);
}
