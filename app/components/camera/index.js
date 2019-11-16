import React from 'react';
// import { Container, Text, Button } from 'native-base';
import {View, Text, Button, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Camera from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        isReady: false,
    }

    async componentDidMount() {
        this.setState({isReady: true});
        this.getPermissionsAsync();
    }

    render() {
        const { hasCameraPermission, scanned, isReady} = this.state;

        if(hasCameraPermission === null || !isReady) return <View style={{ flex:1, backgroundColor: 'black' }}></View>

        if(hasCameraPermission === false) return <Text>Permission Denied</Text>

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
                    <BarCodeScanner onBarCodeScanned={scanned? undefined: this.handleBarCodeScanned}  style={StyleSheet.absoluteFillObject}  />
                    {   scanned && (
                        <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                    )}
            </View>    
        )
    }

    getPermissionsAsync = async ()=> {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleBarCodeScanned = ({ type, data })=> {
        this.setState({ scanned: true });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.addToStock(JSON.parse(data));
    }

    addToStock = async (items) => {
		console.log('sending', {items: items});
        await axios.post('http://172.16.84.135:5000/admin/medicine/add', {items})
        .then(()=> alert("Medicines Added!"))
        .catch(err=> alert("QR Code error!"))  
	};
}