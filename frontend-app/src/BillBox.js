import React from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import AlertBox from './AlertBox';
import { Dialog } from 'primereact/dialog';
import Axios from './axiosConfig';

const medicines = [];

export default class BillBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			custPhoneNumber: '',
			customerName: '',
			doctorName: '',

			quantity: '',
			price: '',
			discount: '',
			tax: '',
			total: '',
			medicine: null,
			medicine2: 'BMW',
			items: [],
			visible: false,
			visible2: false,
			visible3: false,
			visible4: false,
			visible5: false,
			visible6: false,
			index: 0,
			totalQuantity: 0,
			totalcost: '',
		};
	}

	onClick = () => {
		this.setState({ visible: true });
	};

	onHide = () => {
		this.setState({ visible: false });
	};

	onClick2 = () => {
		this.setState({ visible2: true });
	};

	onHide2 = () => {
		this.setState({ visible2: false });
	};

	onClick3 = () => {
		this.setState({ visible3: true });
	};

	onHide3 = () => {
		this.setState({ visible3: false });
	};

	onClick4 = () => {
		this.setState({ visible4: true });
	};

	onHide4 = () => {
		this.setState({ visible4: false });
	};

	onClick5 = () => {
		this.setState({ visible5: true });
	};

	onHide5 = () => {
		this.setState({ visible5: false });
	};

	onClick6 = () => {
		this.setState({ visible6: true });
	};

	onHide6 = () => {
		this.setState({ visible6: false });
	};

	onMedicineChange = e => {
		this.setState({ medicine: e.value });
	};

	onMedicineChange2 = e => {
		this.setState({ medicine2: e.value });
	};

	medicineTemplate(option) {
		if (!option.value) {
			return option.label;
		} else {
			return (
				<div className="p-clearfix">
					<span style={{ float: 'left' }}>{option.label}</span>
				</div>
			);
		}
	}

	componentDidMount() {
		this.getMedicines();
	}

	getMedicines = async () => {
		await Axios.get('/admin/medicine')
			.then(res => {
				// console.log(res.data);
				this.addMedsToArray(res.data);
			})
			.catch(err => {
				console.log('Error fetching medicines' + err);
			});
	};

	addMedsToArray = data => {
		for (let i = 0; i < data.length; i++) {
			let med = {
				label: data[i].name,
				value: data[i].name,
				remainingQty: data[i].minstock,
			};
			medicines.push(med);
		}
		// console.log(medicines);
	};

	makePayment = async () => {
		if (this.state.custPhoneNumber === '' || this.state.customerName === '' || this.state.doctorName === '') {
			this.onClick4();
		} else {
			await Axios.post('/admin/medicine/purchase', {
				docname: this.state.doctorName,
				custname: this.state.customerName,
				contact: this.state.custPhoneNumber,
				tax: '18',
				// total: total,
				items: this.state.items,
				totalcost: this.state.totalcost,
				date: new Date(),
			})
				.then(res => {
					//   console.log(res);
					if (res.data === 'Not Enough Stock') {
						this.onClick5();
					} else {
						this.onClick6();
						//TODO:
						this.setState({
							items: [],
							custPhoneNumber: '',
							customerName: '',
							doctorName: '',
							quantity: '',
							price: '',
							discount: '',
							tax: '',
							total: '',
							index: '',
							totalcost: '',
						});
						// window.location.reload();
					}
				})
				.catch(err => console.log(err));
		}
	};

	deleteFuctionCall = () => {
		this.deleteItem();
	};

	addMed = () => {
		// console.log("hey");
		// console.log(this.state.quantity);
		if (
			this.state.medicine2 === '' ||
			this.state.quantity === '' ||
			this.state.price === '' ||
			this.state.discount === '' ||
			this.state.tax === ''
		) {
			this.onClick3();
		} else {
			let total = this.getTotal(this.state.quantity, this.state.price, this.state.discount, this.state.tax);
			let totalcost = this.sumAllCost();
			totalcost += parseFloat(total);
			totalcost = totalcost.toFixed(2);
			totalcost += '';
			this.setState({ totalcost });
			let newMed = {
				name: this.state.medicine2,
				quantity: this.state.quantity,
				price: this.state.price,
				discount: this.state.discount,
				tax: this.state.tax,
				total: total,
			};
			this.setState({ items: [...this.state.items, newMed] });
			//   console.log(this.state.items);
		}
	};

	sumAllCost = () => {
		let sum = 0;
		for (let i = 0; i < this.state.items.length; i++) {
			sum += parseFloat(this.state.items[i].total);
		}
		return parseFloat(sum);
	};

	getTotal = (quantity, price, discount, tax) => {
		let x = quantity * price;
		x = x - (discount / 100) * x;
		x = x + (tax / 100) * x;
		return x;
	};

	deleteAllBillItems = () => {
		// console.log("heymax");
		this.setState({ items: [] });
		this.setState({ visible: false });
	};

	deleteItem = () => {
		// console.log("heysup");
		let items = this.state.items;
		items.splice(this.state.index, 1);
		this.setState({ items });
		this.setState({ visible2: false });
	};

	render() {
		const footer1 = (
			<div>
				<Button label="Yes" icon="pi pi-check" onClick={this.deleteAllBillItems} />
				<Button label="No" icon="pi pi-times" onClick={this.onHide} className="p-button-secondary" />
			</div>
		);
		const footer2 = (
			<div>
				<Button label="Yes" icon="pi pi-check" onClick={this.deleteFuctionCall} />
				<Button label="No" icon="pi pi-times" onClick={this.onHide2} className="p-button-secondary" />
			</div>
		);

		const footer3 = (
			<div>
				<Button label="Ok" onClick={this.onHide3} />
			</div>
		);
		const footer4 = (
			<div>
				<Button label="Ok" onClick={this.onHide4} />
			</div>
		);
		const footer5 = (
			<div>
				<Button label="Ok" onClick={this.onHide5} />
			</div>
		);
		const footer6 = (
			<div>
				<Button label="Ok" onClick={this.onHide6} />
			</div>
		);

		return (
			<div>
				<AlertBox />
				<div className="content-section implementation">
					<Dialog
						header="Delete"
						visible={this.state.visible}
						style={{ width: '25vw' }}
						footer={footer1}
						onHide={this.onHide}
					>
						Are you sure you want to delete all items?
					</Dialog>
				</div>
				<div className="content-section implementation">
					<Dialog
						header="Delete"
						visible={this.state.visible2}
						style={{ width: '30vw' }}
						footer={footer2}
						onHide={this.onHide2}
					>
						Are you sure you want to delete this item?
					</Dialog>
				</div>

				<div className="content-section implementation">
					<Dialog
						header="Incomplete Information"
						visible={this.state.visible3}
						style={{ width: '30vw' }}
						footer={footer3}
						onHide={this.onHide3}
					>
						All feilds are mandatory.
					</Dialog>
				</div>

				<div className="content-section implementation">
					<Dialog
						header="Incomplete Information"
						visible={this.state.visible4}
						style={{ width: '30vw' }}
						footer={footer4}
						onHide={this.onHide4}
					>
						Customer details must be filled.
					</Dialog>
				</div>

				<div className="content-section implementation">
					<Dialog
						header="Insufficient Quantity"
						visible={this.state.visible5}
						style={{ width: '30vw' }}
						footer={footer5}
						onHide={this.onHide5}
					>
						Quantity of the ordered product not avaiable.
					</Dialog>
				</div>

				<div className="content-section implementation">
					<Dialog
						header="Order Successfull"
						visible={this.state.visible6}
						style={{ width: '30vw' }}
						footer={footer6}
						onHide={this.onHide6}
					>
						Order successfull.
					</Dialog>
				</div>

				<div className="p-lg-7 p-md-5 p-sm-4 bill-box">
					<div className="header-row">
						<span className="header-text">Billing</span>
					</div>

					<div className="billformDiv">
						<div className="customerDetailDiv">
							<table className="custDetailTable">
								<tbody>
									<tr className="custDetailRow">
										<th className="custDetailHeading">
											<span className="custHeadingText">Doctor Name</span>
										</th>

										<th className="custDetailHeading">
											<span className="custHeadingText">Customer Name</span>
										</th>
										<th className="custDetailHeading">
											<span className="custHeadingText">Customer Contact</span>
										</th>
									</tr>
									<tr className="custDetailRow">
										<td className="custDetailCol">
											<input
												className="custTextInput"
												placeholder="Doctor Name"
												value={this.state.doctorName}
												onChange={e => this.setState({ doctorName: e.target.value })}
											/>
										</td>

										<td className="custDetailCol">
											<input
												className="custTextInput"
												placeholder="Customer Name"
												value={this.state.customerName}
												onChange={e => this.setState({ customerName: e.target.value })}
											/>
										</td>
										<td className="custDetailCol">
											<input
												type="number"
												className="custTextInput"
												placeholder="Customer Contact"
												value={this.state.custPhoneNumber}
												onChange={e => this.setState({ custPhoneNumber: e.target.value })}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="p-lg-7 p-md-5 p-sm-4  medicineTableDiv">
							<table className="medicineTable">
								<tbody>
									<tr className="addMedTableRow">
										<th className="addMedTableHeader">
											<span className="addMedTableHeaderText">Medicine</span>
										</th>

										<th className="addMedTableHeader">
											<span className="addMedTableHeaderText">Quantity</span>
										</th>
										<th className="addMedTableHeader">
											<span className="addMedTableHeaderText">Price</span>
										</th>
										<th className="addMedTableHeader">
											<span className="addMedTableHeaderText">Discount(%)</span>
										</th>
										<th className="addMedTableHeader">
											<span className="addMedTableHeaderText">Tax(%)</span>
										</th>
										<th className="addMedTableHeader">
											<span className="addMedTableHeaderText"></span>
										</th>
									</tr>

									<tr className="addMedTableRow">
										<td className="addMedTableCol">
											<Dropdown
												className="addMedTableDropDown"
												value={this.state.medicine2}
												options={medicines}
												onChange={this.onMedicineChange2}
												itemTemplate={this.medicineTemplate}
												filter={true}
												filterPlaceholder="Select Medicine"
												filterBy="label,value"
												showClear={true}
												required={true}
											/>
										</td>

										<td className="addMedTableCol">
											<input
												type="number"
												min={1}
												className="addMedTableInput"
												value={this.state.quantity}
												required
												onChange={e =>
													this.setState(
														{ quantity: e.target.value }
														// console.log(e.target.value)
													)
												}
											/>
										</td>
										<td className="addMedTableCol">
											<input
												type="number"
												min={1}
												className="addMedTableInput"
												value={this.state.price}
												required={true}
												onChange={e => this.setState({ price: e.target.value })}
											/>
										</td>
										<td className="addMedTableCol">
											<input
												type="number"
												min={1}
												className="addMedTableInput"
												value={this.state.discount}
												onChange={e => this.setState({ discount: e.target.value })}
											/>
										</td>
										<td className="addMedTableCol">
											<input
												type="number"
												min={1}
												className="addMedTableInput"
												value={this.state.tax}
												onChange={e => this.setState({ tax: e.target.value })}
											/>
										</td>
										<td className="addMedTableCol">
											<Button
												icon="pi pi-plus"
												iconPos="left"
												label="ADD"
												onClick={this.addMed}
												className="p-button-raised  p-button-success addMedTableButton"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="deleteAllMedsDiv">
							<Button
								icon="pi pi-trash"
								iconPos="left"
								label="Delete"
								onClick={this.onClick}
								className="p-button-raised p-button-danger deleteAllMedsButton"
							/>
						</div>

						<div hidden={this.state.items.length === 0 ? true : false} className="billListDiv">
							<table className="billListTable">
								<tbody>
									<tr className="billListTableRow">
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">SNO</span>
										</th>
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">Medicine</span>
										</th>
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">Quantity</span>
										</th>
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">Price</span>
										</th>
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">Discount(%)</span>
										</th>
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">Tax(%)</span>
										</th>
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">Total</span>
										</th>
										<th className="billListTableHeading">
											<span className="billListTableHeadingText">Action</span>
										</th>
									</tr>

									{this.state.items.map((item, index) => {
										return (
											<tr className="billListTableRow" key={index}>
												<td className="billListTableCol">
													<span className="billListColText">{index + 1}</span>
												</td>
												<td className="billListTableCol">
													<span className="billListColText">{item.medicine}</span>
												</td>
												<td className="billListTableCol">
													<span className="billListColText">{item.quantity}</span>
												</td>
												<td className="billListTableCol">
													<span className="billListColText">{item.price}</span>
												</td>
												<td className="billListTableCol">
													<span className="billListColText">{item.discount}</span>
												</td>
												<td className="billListTableCol">
													<span className="billListColText">{item.tax}</span>
												</td>
												<td className="billListTableCol">
													<span className="billListColText">{item.total.toFixed(2)}</span>
												</td>
												<td className="billListTableCol">
													<Button
														icon="pi pi-trash"
														className="p-button-danger"
														onClick={e => {
															this.onClick2();
															this.setState({ index: index });
														}}
													/>
												</td>
											</tr>
										);
									})}
									<tr
										hidden={this.state.items.length >= 1 ? false : true}
										className="billListTableRow"
									>
										<td className="billListTableColLast"></td>
										<td className="billListTableColLast"></td>
										<td className="billListTableColLast">T.Q={this.state.items.length}</td>
										<td className="billListTableColLast"></td>
										<td className="billListTableColLast"></td>
										<td className="billListTableColLast"></td>
										<td className="billListTableColLast">{this.state.totalcost}</td>
										<td className="billListTableColLast">
											{' '}
											<Button
												icon="pi pi-money-bill"
												label="Payment"
												className="p-button-raised p-button-primary"
												onClick={this.makePayment}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
