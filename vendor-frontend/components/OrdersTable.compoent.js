import React from 'react'
// import { } from '@material-ui/styles'
import { Table, TableBody, TableCell, TableRow, TableHead, Button } from '@material-ui/core'

export default function OrdersTable(props) {



	const getTableData = () => {
		return props.ordersArray.map(order =>
			<TableRow key={order._id}>
				<TableCell>{order.pharmacyName}</TableCell>
				<TableCell>{order.medicineName}</TableCell>
				<TableCell>{order.quantity}</TableCell>
				<TableCell>{order.expectedDelivery.toString().substring(0, 10)}</TableCell>
				<TableCell>{order.status === 'pending' ? <span>pending <Button variant='outlined' onClick={() => { props.handleClick(order) }}>process</Button></span> : <span>{'processed'}</span>}</TableCell>
			</TableRow>
		)
	}

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Pharmacy Name</TableCell>
					<TableCell>Medicine Name</TableCell>
					<TableCell>Quantity</TableCell>
					<TableCell>Expected Delivery</TableCell>
					<TableCell>Status</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{getTableData()}
			</TableBody>
		</Table>
	)
}
