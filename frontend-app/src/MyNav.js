import React from 'react';
import { Link } from 'react-router-dom';

//importing logo
const logo = require('./images/pharmalogo.svg');

export default class MyNav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	// <li tabIndex="0" style={{ backgroundColor: '#182226', margin: 0 }}>
	// 	<span style={{ padding: 0, margin:  }}>MAIN NAVIGATION</span>
	// </li>

	render() {
		return (
			<div>
				<div className="top-bar"></div>
				<nav className="menu" tabIndex="0">
					<div className="smartphone-menu-trigger">
						<header className="avatar">
							<img src={logo} alt="..." />
							<h2 style={{ color: '#fff' }}>Pharma Track</h2>
						</header>
					</div>
					<ul>
						<li tabIndex="0" className="icon-dashboard">
							<Link
								to="/"
								style={{ color: '#b5c7ce', fontWeight: 600, fontSize: 18 }}
								// className="menu-links"
							>
								<i className="fas fa-tachometer-alt fa-2x" style={{ color: '#fff', marginRight: 20 }} />
								<span style={{ color: '#fff' }} className="menu-links">
									Dashboard
								</span>
							</Link>
						</li>
						<li tabIndex="0" className="icon-customers">
							<Link
								to="/addstock"
								style={{ color: '#b5c7ce', fontWeight: 600, fontSize: 18 }}
								// className="menu-links"
							>
								<i class="fas fa-medkit fa-2x" style={{ color: '#fff', marginRight: 20 }}></i>
								<span style={{ color: '#fff' }} className="menu-links">
									{' '}
									Add Stock{' '}
								</span>
							</Link>
						</li>
						<li tabIndex="0" className="icon-users">
							<Link
								to="/billinglogs"
								style={{ color: '#b5c7ce', fontWeight: 600, fontSize: 18 }}
								// className="menu-links"
							>
								<i class="fas fa-clipboard-list fa-2x" style={{ color: '#fff', marginRight: 20 }} />
								<span style={{ color: '#fff' }} className="menu-links">
									{' '}
									Billing Logs
								</span>
							</Link>
						</li>
						<li tabIndex="0" className="icon-settings">
							<Link
								to="/stocktable"
								style={{ color: '#b5c7ce', fontWeight: 600, fontSize: 18 }}
								// className="menu-links"
							>
								<i class="fas fa-table fa-2x" style={{ color: '#fff', marginRight: 20 }} />
								<span style={{ color: '#fff' }} className="menu-links">
									Stock Table
								</span>
							</Link>
						</li>
						<li tabIndex="0" className="icon-settings">
							<Link
								to="/vendors"
								style={{ color: '#b5c7ce', fontWeight: 600, fontSize: 18 }}
								// className="menu-links"
							>
								<i className="fas fa-users fa-2x" style={{ color: '#fff', marginRight: 20 }} />
								<span style={{ color: '#fff' }} className="menu-links">
									Vendors
								</span>
							</Link>
						</li>
						<li tabIndex="0" className="icon-settings">
							<Link
								to="/salesreport"
								style={{ color: '#b5c7ce', fontWeight: 600, fontSize: 18 }}
								// className="menu-links"
							>
								<i class="fas fa-book-medical fa-2x" style={{ color: '#fff', marginRight: 20 }} />
								<span style={{ color: '#fff' }} className="menu-links">
									Sales Report
								</span>
							</Link>
						</li>
						<li tabIndex="0" className="icon-settings">
							<Link
								to="/futurepredictions"
								style={{ color: '#b5c7ce', fontWeight: 600, fontSize: 18 }}
								// className="menu-links"
							>
								<i class="fas fa-chart-pie fa-2x" style={{ color: '#fff', marginRight: 20 }} />
								<span style={{ color: '#fff' }} className="menu-links">
									Predictions
								</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}
