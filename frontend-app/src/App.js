import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BillBox from './BillBox';
import AddStockBox from './AddStockBox';
import BillingLogs from './BillingLogs';
import StockTables from './StockTables';
import Vendors from './Vendors';
import SalesReport from './SalesReport';
import FuturePredictions from './FuturePredictions.js';
import MyNav from './MyNav';

function App() {
	return (
		<div className="App">
			<Router>
				<MyNav />
				<Route path="/" exact component={BillBox} />
				<Route path="/addstock" component={AddStockBox} />
				<Route path="/billinglogs" component={BillingLogs} />
				<Route path="/stocktable" component={StockTables} />
				<Route path="/vendors" component={Vendors} />
				<Route path="/salesreport" component={SalesReport} />
				<Route path="/futurepredictions" component={FuturePredictions} />
			</Router>
		</div>
	);
}

export default App;
