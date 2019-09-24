import {  createAppContainer,createStackNavigator } from "react-navigation";
import SignIn from './SignInNavigtion';
import Waiting from './WaitingNavigation'
import FirstTime from './FirstScreenNavigation'
// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    SignIn : {screen : SignIn},
    Waiting : {screen : Waiting},
    FirstTime : {screen : FirstTime}
  },
  { 
    initialRouteName: "FirstTime",
    headerMode : 'none',
    navigationOptions: {},
  }
);

export default createAppContainer(PrimaryNav);
