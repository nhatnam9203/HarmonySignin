import {  createAppContainer,createStackNavigator,createSwitchNavigator, } from "react-navigation";
import SignIn from './SignInNavigtion';
import Waiting from './WaitingNavigation'
import FirstTime from './FirstScreenNavigation'
import transition from './transition'
// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    SignIn : {screen : SignIn},
    Waiting : {screen : Waiting},
    FirstTime : {screen : FirstTime}
  },
  { 
    initialRouteName: "FirstTime",
    headerMode : 'none',
    navigationOptions: {},
    transitionConfig : transition
  }
);

export default createAppContainer(PrimaryNav);
