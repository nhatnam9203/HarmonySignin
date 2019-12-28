import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginContainer from "../Containers/LoginContainer";
import Forgot from "../Containers/ForgotPasswordContainer";
import transition from './transition'
const Nav = createStackNavigator(
  {
    Login: { screen: LoginContainer },
    Forgot: { screen: Forgot },
  },
  { 
    initialRouteName: "Login",
    headerMode : 'none',
    navigationOptions: {},
    transitionConfig : transition
  }
);

export default createAppContainer(Nav);