import React from 'react';
import {AppLoading} from 'expo';
import {Container, Content, Header, Text, Title, Left, Right, Subtitle, Body} from 'native-base';
import * as Font from 'expo-font';
import { StyleSheet, View, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './components/home';
import CameraScreen from './components/camera';
import SearchScreen from './components/search';

const tabNavigator = createBottomTabNavigator({
  
  Camera: CameraScreen,
  Search: SearchScreen, 
  Home: HomeScreen,
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `md-home`;
        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
        // IconComponent = HomeIconWithBadge;
      } else if (routeName === 'Camera') {
        iconName = `md-camera`;
      } else if(routeName === 'Search') {
        iconName = 'md-search'
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={40} color={tintColor} style={{ }} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'black',
    style: {
      borderColor: 'lightgrey',
      borderStyle: "dashed",
      borderWidth: 1,
      borderRadius: 25,
      height: 60
    }
  },
})

const AppContainer = createAppContainer(tabNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container style={{ flex: 1 }}>
        <Header style={{ height: 80}}>
          <Left />
          <Body style={{ alignSelf: 'flex-end' }}>
            <Title style={{ fontSize: 25 }}>PharmaTrack</Title>
          </Body>
          <Right />
        </Header>
        <AppContainer />
      </Container>
    );
  }
}


//Footer Tabs