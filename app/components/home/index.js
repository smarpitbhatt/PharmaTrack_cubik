import React from 'react';
// import { Container, Text, Button } from 'native-base';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

export default class HomeScreen extends React.Component {

    async componentDidMount() {
        // await stockGetRequest
        // .then(res => {

        // })
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>HomeScreen</Text>
            </View>   
        )
    }
}

// let stockGetRequest = async ()=> {
//     let path = 'http://192.168.43.136:5000/admin/medicine/';

//     await axios.get(path)
//         .then(response=> console.log(response))
// }
