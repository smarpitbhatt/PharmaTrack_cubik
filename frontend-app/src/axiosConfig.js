import Axios from 'axios';
import ip from './ip'

let instance = Axios.create({
	baseURL: ip
});

export default instance;