import React from 'react';
// import { Container, Text, Button } from 'native-base';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

export default class HomeScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Alerts</Text>
            </View>   
        )
    }

}

let alertGetRequest = ()=> {
    let path = 'http://192.168.43.136:5000/admin/alerts/';

    return axios.get(path);
}