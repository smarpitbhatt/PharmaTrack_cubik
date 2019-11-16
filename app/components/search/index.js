import React from 'react';
// import { Container, Text, Button } from 'native-base';
import {View, Text, Button} from 'react-native';

export default class SearchScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        Search!
                    </Text>
                    {/* <Button title="Home" onPress={()=>{this.props.navigation.navigate('Home')}} /> */}
            </View>    
        )
    }
}