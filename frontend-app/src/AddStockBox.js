import React from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import Axios from './axiosConfig';

const medicines = [];

export default class OrderBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			quantity: '',
			price: '',
			total: '',
			medicine: null,
			medicine2: 'BMW',
			totalQuantity: '',
			totalCost: '',
			visible: false,
			visible2: false,
			visible3: false,
			visible4: false,
			expiryDate: '',
			index: '',
			items: [],
		};
	}

	componentDidMount() {
		this.getMedicines();
	}

	getMedicines = async () => {
		await Axios.get('/admin/medicine')
			.then(res => {
				console.log(res.data);
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
				// remainingQty: data[i].minstock
			};
			medicines.push(med);
		}
		console.log(medicines);
	};

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

	deleteFuctionCall = () => {
		this.deleteItem();
	};

	addMed = () => {
		// console.log("hey");
		if (
			this.state.medicine2 === '' ||
			this.state.quantity === '' ||
			this.state.price === '' ||
			this.state.expiryDate === ''
		) {
			this.onClick3();
		} else {
			let newMed = {
				medicine: this.state.medicine2,
				quantity: parseInt(this.state.quantity),
				price: this.state.price,
				expiry: this.state.expiryDate,
			};
			this.setState({ items: [...this.state.items, newMed] });
			console.log(this.state.items);
		}
	};

	deleteAllListItems = () => {
		// console.log("heymax");
		this.setState({ items: [], price: '', expiryDate: '' });
		this.setState({ visible: false });
	};

	deleteItem = () => {
		// console.log("heysup");
		let items = this.state.items;
		items.splice(this.state.index, 1);
		this.setState({ items });
		this.setState({ visible2: false });
	};

	deleteFuctionCall = () => {
		this.deleteItem();
	};

	addToStock = async () => {
		console.log('sending', this.state.items);
		await Axios.post('/admin/medicine/add', {
			items: this.state.items,
		})
			.then(res => {
				console.log(res);
				this.onClick4();
				this.setState({ items: [], quantity: '', price: '', expiryDate: '' });
				// window.location.refresh();
			})
			.catch(err => console.log(err));
	};

	render() {
		const footer1 = (
			<div>
				<Button label="Yes" icon="pi pi-check" onClick={this.deleteAllListItems} />
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

		return (
			<div>
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
						Medicines Successfully added to stock.
					</Dialog>
				</div>

				<div className="p-lg-9 p-md-7 p-sm-5 stock-box">
					<div className="header-row">
						<span className="header-text">Add Stock</span>
					</div>

					<div className="addStockBoxDiv">
						<div className="addToStockDiv">
							<table className="addStockBoxTable">
								<tbody>
									<tr className="addStockTableRow">
										<th className="addStockTableHeading">
											<span className="addStockHeadingText">Medicine</span>
										</th>
										<th className="addStockTableHeading">
											<span className="addStockHeadingText">Quantity</span>
										</th>
										<th className="addStockTableHeading">
											<span className="addStockHeadingText">Price</span>
										</th>
										<th className="addStockTableHeading">
											<span className="addStockHeadingText">Expiry Date</span>
										</th>
										<th className="addStockTableHeading"></th>
									</tr>

									<tr className="addStockTableRow">
										<td className="addStockTableCol">
											<Dropdown
												className="addStockTableDropDown"
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
										<td className="addStockTableCol">
											<input
												className="addStockTextInput"
												placeholder="Quantity"
												type="number"
												min={1}
												value={this.state.quantity}
												onChange={e => this.setState({ quantity: e.target.value })}
											/>
										</td>
										<td className="addStockTableCol">
											<input
												className="addStockTextInput"
												placeholder="Price"
												type="number"
												min={1}
												value={this.state.price}
												onChange={e => this.setState({ price: e.target.value })}
											/>
										</td>
										<td className="addStockTableCol">
											<Calendar
												className="addStockDateInput"
												value={this.state.expiryDate}
												onChange={e => this.setState({ expiryDate: e.value })}
												monthNavigator={true}
												yearNavigator={true}
												yearRange="2010:2030"
											/>
										</td>
										<td className="addStockTableCol">
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

						<div className="deleteAllStockListDiv">
							<Button
								icon="pi pi-trash"
								iconPos="left"
								label="Delete"
								onClick={this.onClick}
								className="p-button-raised p-button-danger deleteAllListButton"
							/>
						</div>

						<div hidden={this.state.items.length === 0 ? true : false} className="stockListDiv">
							<table className="stockListTable">
								<tbody>
									<tr className="stockListTableRow">
										<th className="stockListTableHeading">
											<span className="stockListTableHeadingText">SNO</span>
										</th>
										<th className="stockListTableHeading">
											<span className="stockListTableHeadingText">Medicine</span>
										</th>
										<th className="stockListTableHeading">
											<span className="stockListTableHeadingText">Quantity</span>
										</th>
										<th className="stockListTableHeading">
											<span className="stockListTableHeadingText">Price</span>
										</th>
										<th className="stockListTableHeading">
											<span className="stockListTableHeadingText">Expiry Date</span>
										</th>

										<th className="stockListTableHeading">
											<span className="stockListTableHeadingText">Action</span>
										</th>
									</tr>
									{this.state.items.map((item, index) => {
										return (
											<tr key={index} className="stockListTableRow">
												<td className="stockListTableCol">{index + 1}</td>
												<td className="stockListTableCol">{item.medicine}</td>
												<td className="stockListTableCol">{item.quantity}</td>
												<td className="stockListTableCol">{item.price}</td>
												<td className="stockListTableCol">
													{item.expiry.toLocaleString().substring(0, 10)}
												</td>
												<td className="stockListTableCol">
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
										className="stockListTableRow"
									>
										<td className="stockListTableColLast"></td>
										<td className="stockListTableColLast"></td>
										<td className="stockListTableColLast">T.Q={this.state.items.length}</td>
										<td className="stockListTableColLast"></td>
										<td className="stockListTableColLast"></td>

										<td className="stockListTableColLast">
											{' '}
											<Button
												icon="pi pi-money-bill"
												label="Add To Cart"
												onClick={this.addToStock}
												className="p-button-raised p-button-primary"
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
