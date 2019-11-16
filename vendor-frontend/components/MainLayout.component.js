import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Navbar from './Navbar.component'
import HomeScreen from './HomeScreen.component'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import OrderConfirmed from './OrderConfirmed.component'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgb(80, 163, 251)'
		},
		secondary: {
			main: 'rgb(220, 234, 255)'
		}
	}
});

export default function MainLayout() {
	const [screen, setScreen] = useState(1)
	const [selected, setSelected] = useState({});
	// let localLoginInfo = {}
	// if (localStorage.loginInfo) {
	// 	localLoginInfo = { ...JSON.parse(localStorage.loginInfo) }
	// } else {
	// 	localLoginInfo = { loggedIn: false, username: '' }
	// }
	// console.log(localLoginInfo)
	// const [loginInfo, setLoginInfo] = useState(localLoginInfo);
	// // const { loggedIn, username } = JSON.parse(localStorage.loginInfo);
	// const logout = () => {
	// 	setLoginInfo({ loggedIn: false, username: '' });
	// }

	return (
		<>
			<ThemeProvider theme={theme}>

				<Container maxWidth='lg'>
					<div style={{ paddingTop: 60 }} >
						<Navbar name={'Vendor!'} />
						{screen === 1 && <HomeScreen setSelected={setSelected} setScreen={setScreen} />}
						{screen === 2 && <OrderConfirmed selected={selected} setScreen={setScreen} />}
					</div>
				</Container>
			</ThemeProvider>
		</>
	)
}