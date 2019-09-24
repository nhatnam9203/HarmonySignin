import { createStackNavigator, createAppContainer } from "react-navigation";
import FirstScreen from '../Components/SCREEN/FirstScreen'

const Nav = createStackNavigator(
  {
    FirstScreen: { screen: FirstScreen },
  },
  { 
    initialRouteName: "FirstScreen",
    headerMode : 'none',
    navigationOptions: {}
  }
);

export default createAppContainer(Nav);