import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginContainer from "../Containers/LoginContainer";
import Forgot from "../Containers/ForgotPasswordContainer";

const Nav = createStackNavigator(
  {
    Login: { screen: LoginContainer },
    Forgot: { screen: Forgot },
  },
  { 
    initialRouteName: "Login",
    headerMode : 'none',
    navigationOptions: {}
  }
);

export default createAppContainer(Nav);