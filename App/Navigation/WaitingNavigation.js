import { createStackNavigator, createAppContainer } from "react-navigation";
import Search from '../Containers/SearchContainer'
import Welcome from "../Containers/WelcomeContainer";
import CustomerInfo from "../Containers/CustomerInfoContainer";
import Services from '../Containers/ServiceContainer'
import WaitingList from "../Containers/WaitingContainer"
import ThankYou from "../Containers/ThankYouContainer"
import SendGiftCard from '../Components/SCREEN/SendGiftCard'
import transition from './transition'
const Nav = createStackNavigator(
  {
    Search: { screen: Search },
    Welcome: { screen: Welcome },
    CustomerInfo: { screen: CustomerInfo },
    Service: { screen: Services },
    WaitingList: {screen : WaitingList},
    ThankYou: {screen : ThankYou},
    SendGiftCard : {screen : SendGiftCard}
  },
  { 
    initialRouteName: "WaitingList",
    headerMode : 'none',
    navigationOptions: {},
    // transitionConfig : transition
  }
);

export default createAppContainer(Nav);