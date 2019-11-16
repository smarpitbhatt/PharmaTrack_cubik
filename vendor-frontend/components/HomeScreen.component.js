import React, { useState, useEffect } from 'react'
import { Paper } from '@material-ui/core/'
import OrdersTable from './OrdersTable.compoent'
import Axios from '../axiosConfig'

export default function HomeScreen(props) {

	const [ordersArray, setOrdersArray] = useState([]);

	useEffect(() => {
		Axios.get('/admin/vendor/orders/'+encodeURI('smarpit medicos'))
			.then(res => {
				console.log(res.data)
				setOrdersArray(res.data);
			})
			.catch()
	}, []);

	const handleClick = (order) => {
		console.log(order)
		Axios.post('/admin/vendor/orders/setStatus/' + order._id)
			.then(() => {
				props.setSelected(order);
				props.setScreen(2);
			})
			.catch()
	}

	return (
		<div style={{ textAlign: "center" }}>
			{/* <img alt={'d'} src={coverLogo} /> */}
			<Paper style={{ marginTop: 70 }}>
				<OrdersTable ordersArray={ordersArray} handleClick={handleClick} />
			</Paper>
		</div>
	)
}