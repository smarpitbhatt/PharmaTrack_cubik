import React, { useEffect, useState } from "react";
import Axios from './axiosConfig';

export default function AlertBox(props) {
	const [alerts, changeAlerts] = useState([]);

	useEffect(
		() => {
			Axios.get('/admin/alerts')
				.then(res => {
					console.log(res.data)
					changeAlerts(res.data)
				})
				.catch(err => {
					console.log(err)
				});
		}, []
	);

	let deleteAlert = (id) => {
		Axios.delete('/admin/alerts/' + id)
			.then()
			.catch();
		changeAlerts(alerts.filter(alert => alert._id !== id));
	}

	let getAlertsList = () => {
		if (alerts.length === 0) {
			return <div
				// hidden={fal}
				className="alert"
				style={{ backgroundColor: "#4BB543" }}
			>
				{/* <span className="closebtn">&times;</span> */}
				<strong>{"No Alerts"}</strong>
			</div>
		}
		return alerts.map(alert =>
			<div
				key={alert._id}
				className="alert"
				style={{
					backgroundColor:
						alert.severity === "medium" ? "#ffae42" : "#f44336"
				}}
			>
				<span className="closebtn" onClick={e => deleteAlert(alert._id)}>&times;</span>
				<strong >{alert.text}</strong>
			</div>
		);
	}


	return (
		<div>
			<div dir="rtl" className="p-col-2 alert-box">
				{getAlertsList()}
			</div>
		</div>
	);

}
