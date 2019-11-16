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
		await Axios.get('/admin/medicine') // /admin/medicine
			.then(res => {
				console.log(res.data);

				this.addBillsToArray(res.data);
				console.log(this.state.bills);
			})
			.catch(err => console.log('Error fetching med stock ' + err));
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
						<span className="header-text">Medicine Stock</span>
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
											<span className="billingTableHeadingText">Medicine</span>
										</th>
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">Price</span>
										</th>
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">Quantity</span>
										</th>
										<th className="billingTableHeading">
											<span className="billingTableHeadingText">Expiry Date</span>
										</th>
									</tr>
									{this.state.bills.map((item, index) => {
										let it = item.quantity < 15 ? 'blue' : 'black';
										let expDate = new Date(item.expiry).getTime();

										it = expDate < Date.now() ? 'red' : it;
										return (
											<tr key={index} className="billingTableRow" style={{ color: it }}>
												<td className="billingTableCol">
													<span className="billingTableColText">{index + 1}</span>
												</td>
												<td className="billingTableCol">
													<span className="billingTableColText">{item.name}</span>
												</td>
												<td className="billingTableCol">
													<span className="billingTableColText" style={{ color: it }}>
														{item.price}
													</span>
												</td>
												<td className="billingTableCol">
													<span className="billingTableColText">{item.quantity}</span>
												</td>
												<td className="billingTableCol">
													<span className="billingTableColText">
														{item.expiry.substring(0, 10)}
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
