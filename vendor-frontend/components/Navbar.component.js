import React from 'react'
// import profileLogo from '../logo/profile.png'
import { Typography } from '@material-ui/core'
// import { Link } from 'react-router-dom'

export default function Navbar(props) {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			{/* <Link to='/' >
				<img src={profileLogo} alt='logo' style={{ height: 70 }} />
				<span className='nav-logo'>CoolKart</span>
			</Link> */}
			<Typography variant='h4'>PharmaTrack</Typography>
			<div style={{ paddingTop: 10 }}>
				<Typography style={{ display: 'inline' }} variant='h5'> Welcome, {props.name ? props.name + ' ' : ''}</Typography>
				<a href='google.com'><Typography style={{ display: 'inline' }} variant='h5'>Logout</Typography></a>
			</div>
		</div>
	)
}