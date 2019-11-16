import React from 'react'
import { Paper, Typography, Button } from '@material-ui/core'

export default function OrderConfirmed(props) {

	return (
		<Paper style={{ marginTop: 70, padding: 70, display: 'flex' }} >
			<div>
				<Typography variant='h2'>Order Details:</Typography>
				<br />
				<Typography variant='h4'>Pharmacy: {props.selected.pharmacyName}</Typography>
				<Typography variant='h4'>Medicine: {props.selected.medicineName}</Typography>
				<Typography variant='h4'>Quantity: {props.selected.quantity}</Typography>
				<Typography variant='h4'>Expected delivery date: {props.selected.expectedDelivery.substring(0, 10)}</Typography>
				<Typography variant='h4'>Status: <span style={{ color: 'green' }}>Confirmed!</span></Typography>
				<br/>
				<Button onClick={()=>{props.setScreen(1)}}>Back</Button>
			</div>
			<div style={{ marginLeft: 80,textAlign:'center' }}>
				<img src={`https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=[{"medicine":"${props.selected.medicineName}","quantity":"${props.selected.quantity}","price":"10","expiry":"${props.selected.expiryDate}"}]`} alt='qr' />
				<br />
				<Button variant='outlined'>Print</Button>
			</div>
		</Paper>
	)
}
