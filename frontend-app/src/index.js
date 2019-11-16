import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './styles/mynav.scss';
import 'primeflex/primeflex.css';
import './styles/login.scss';
import './styles/billbox.scss';
import './styles/addstockbox.scss';
import './styles/alertbox.scss';
import './styles/billlogs.scss';
import './styles/stocktable.scss';
import './styles/vendors.scss';
import './styles/prediction.scss';
import './styles/salesreport.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
