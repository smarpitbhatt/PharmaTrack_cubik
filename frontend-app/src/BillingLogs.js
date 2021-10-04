import React from 'react';
import Axios from './axiosConfig';


export default class BillingLogs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bills: [],
		};
	}

	componentDidMount() {
		this.getBills();
	}

	getBills = async () => {
		await Axios.get('/admin/bills')
			.then(res => {				
				this.addBillsToArray(res.data);
				console.log(this.state.bills);
			})
			.catch(err => console.log('Error fetching bills ' + err));
	};

	addBillsToArray = data => {
		let bills = this.state.bills;
		for (let i = data.length - 1; i >= 0; i--) {
			bills.push(data[i]);
		}
		this.setState({ bills });
	};

	render() {
		return (
			<div>
				<div className="p-lg-9 p-md-7 p-sm-5 billing-box">
					<div className="header-row">
						<span className="header-text">Billing Logs</span>
					</div>
					<div className="billingBoxDiv">
						<div className="billingTableDiv">
							<table className="billingTable">
								<tbody>
									<tr className="billingTableRow">
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">SNO</span>
										</th>
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">Customer Name</span>
										</th>
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">Medicines</span>
										</th>
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">Quantity</span>
										</th>
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">Total Cost</span>
										</th>
										<th className="billingTableHeading">	
											<span className="billingTableHeadingText">Date</span>
										</th>
									</tr>
									{this.state.bills.map((item, index) => {
										return (
											<tr key={index} className="billingTableRow">
												<td className="billingTableCol">
													<span className="billingTableColText">{index + 1}</span>
												</td>
												<td className="billingTableCol">
													<span className="billingTableColText">{item.custname}</span>
												</td>
												<td className="billingTableCol">
													{item.items.map((item, index) => {
														return (
															<tr key={index} className="billingTableRowChildren">
																<td className="billingTableColChildren">
																	<span className="billingTableColText">
																		{item.name}
																	</span>
																</td>
															</tr>
														);
													})}
												</td>
												<td className="billingTableCol">
													{item.items.map((item, index) => {
														return (
															<tr key={index} className="billingTableRowChildren">
																<td className="billingTableColChildren">
																	<span className="billingTableColText">
																		{item.quantity}
																	</span>
																</td>
															</tr>
														);
													})}
												</td>

												<td className="billingTableCol">
													<span className="billingTableColText">{item.total}</span>
												</td>
												<td className="billingTableCol">
													<span className="billingTableColText">
														{(item.date + '').substring(0, 10)}
													</span>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
