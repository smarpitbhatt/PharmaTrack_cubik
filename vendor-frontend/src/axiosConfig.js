import Axios from "axios";
const address='http://172.16.84.135:5000/'
// Axios.interceptors.request.use((config)=>{
// 	console.log('sending request');
// 	return config;
// 	//add code for err
// });

let instance = Axios.create({
	baseURL: address,
});

// instance.defaults.withCredentials = true;

export default instance