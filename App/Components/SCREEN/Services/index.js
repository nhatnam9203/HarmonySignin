import React, { Component } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import Indicator from "../../Indicator";
import Loading from '../Loading'

import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import Manicure from "./Manicure";
import Products from "./Products";
import CartItem from "./CartItem";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { 
        manicure: false,
        pedicure: false,
        gel: false,
        products: true,
        extra: false
      },
      selectedState: "Service",
      serviceIndex: 0
    };
  }

  componentDidMount() {
    const {
      getProduct,
      getCategoryByMerchant,
      getWaitingTime,
    } = this.props;

    // getProduct();
    getCategoryByMerchant();
    getWaitingTime();
  }

  onChangeMerchantId(merchantId) {
    this.setState({ merchantId });
  }
  onChangePassword(password) {
    this.setState({ password });
  }
  SignIn() {
    this.props.navigation.navigate("Login");
  }
  forgotPassword() {
    this.props.navigation.navigate("Forgot");
  }

  scrollToEndCart(){
    this.scrollView.scrollToEnd({ animated: true });
  }

  switchServices(key) {
    switch (key) {
      case "Products":
        this.setState({
          selected: {
            products: true,
            extra: false
          },
          selectedState: "Products",
          serviceIndex: ""
        });
        break;

      default:
        break;
    }
  }

  effectTotal(){
    if(this.props.Cart.length > 0){
      this.CartItem.totalPrice.flash(); 
    }
  }

  switchServicesItem(service, index) {
    const { getServiceByCategoryId } = this.props;
    this.setState({
      serviceIndex: index,
      selected: {
        products: false,
        extra: false
      },
      selectedState: "Service"
    });
    getServiceByCategoryId(service.categoryId);
  }

  renderCategoryList() {
    const { CategoryList } = this.props;
    return CategoryList.map((ct, index) => {
      return (
        <TabItem
          active={this.state.serviceIndex === index ? true : false}
          onPress={() => this.switchServicesItem(ct, index)}
          key={index}
        >
          <TabItem.Text
            active={this.state.serviceIndex === index ? true : false}
            // numberOfLines={1} ellipsizeMode='head'
          >
            {ct.name}
          </TabItem.Text>
        </TabItem>
      );
    });
  }

  renderTabbar() {
    const { products, extra } = this.state.selected;
    return (
      <React.Fragment>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {/* <TabItem
          onPress={() => this.switchServices("Products")}
          active={products ? true : false}
        >
          <TabItem.Text active={products ? true : false}>Products</TabItem.Text>
        </TabItem>*/}
        {this.renderCategoryList()}
        </ScrollView>
      </React.Fragment>
    );
  }

  renderServices(key) {
    const {
      ProductList,
      ExtraList,
      ServiceList,
      addServiceToCart,
      addExtraToCart,
      addProductToCart,
      plusQuantity,
      minusQuantity,
      AnimatedScroll,
      setAnimatedScroll,
      Cart
    } = this.props;

    switch (key) {
      case "Service":
        return (
          <Manicure
            addServiceToCart={addServiceToCart}
            addExtraToCart={addExtraToCart}
            ServiceList={ServiceList}
            scrollToEndCart={()=>this.scrollToEndCart()}
            AnimatedScroll={AnimatedScroll}
            setAnimatedScroll={setAnimatedScroll}
            effectTotal={()=>this.effectTotal()}
            Cart={Cart}
          />
        );
        break;
      case "Products":
        return (
          <Products
            addProductToCart={addProductToCart}
            ProductList={ProductList}
            plusQuantity={plusQuantity}
            minusQuantity={minusQuantity}
            scrollToEndCart={()=>this.scrollToEndCart()}
            setAnimatedScroll={setAnimatedScroll}
            effectTotal={()=>this.effectTotal()}
            Cart={Cart}
          />
        );
        break;
      case "Extra":
        return <Extra 
        addExtraToCart={addExtraToCart}
         ExtraList={ExtraList} 
         scrollToEndCart={()=>this.scrollToEndCart()}
         setAnimatedScroll={setAnimatedScroll}
         effectTotal={()=>this.effectTotal()}
         Cart={Cart}
         />;
        break;

      default:
        return (
          <Products
            addProductToCart={addProductToCart}
            ProductList={ProductList}
            plusQuantity={plusQuantity}
            minusQuantity={minusQuantity}
            scrollToEndCart={()=>this.scrollToEndCart()}
            effectTotal={()=>this.effectTotal()}
            Cart={Cart}
          />
        );
        break;
    }
  }

  renderLoading(){
    const {isLoadingAddAppointment,isLoadingService} = this.props;
    if(isLoadingAddAppointment || isLoadingService){
      return(
        <Loading />
      )
    }
    return null;
  }

  render() {
    const { selectedState } = this.state;
    const { Cart, deleteItemInCart, setAnimatedScroll,
      AnimatedScroll ,
      addAppointment,
      InfoLogin,
      InfoCheckPhone,
      WaitingTimeMerchant
    } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F6FB" }}>
        <Header>
          <Header.Text>Services</Header.Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
            <Image
              source={require("../../../Images/back-icon.png")}
              style={styles.btnBack}
            />
          </TouchableOpacity>
        </Header>
        <Container>
          <Container.Left>
            <View style={styles.backgroundTabbar}>{this.renderTabbar()}</View>
            <View style={{ padding: 10, flex: 1 }}>
              {this.renderServices(selectedState)}
            </View>
          </Container.Left>
          <Container.Right>
            <View style={styles.backgroundCart}>
              <CartTitle>Basket</CartTitle>
            </View>
            <CardContent>
              <CartItem 
              ref={ref=>this.CartItem = ref}
              scrollEnd={()=>this.scrollToEndCart()}
              deleteItemInCart={deleteItemInCart}
              Cart={Cart}
              setAnimatedScroll={setAnimatedScroll}
              AnimatedScroll={AnimatedScroll}
              addAppointment={addAppointment}
              InfoLogin={InfoLogin}
              InfoCheckPhone={InfoCheckPhone}
              WaitingTimeMerchant={WaitingTimeMerchant}
               />
            </CardContent>
          </Container.Right>
        </Container>
        {this.renderLoading()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundCart: {
    height: "8%",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundTabbar: {
    height: "8%",
    borderBottomWidth: 1,
    borderColor: "#dddddd",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight:10,
  },
  btnBack: {
    position: "absolute",
    right: 10,
    top: -37
  }
});

const Header = styled.View`
  width: 100%;
  height: 10%;
  padding-top: 4.2%;
  position: relative;
  background-color: #1266af;
  box-shadow: 0 0px 2px rgba(182, 182, 182, 0.75);
`;
Header.Text = styled.Text`
  color: #ffffff;
  font-size: ${hp("3%")};
  font-weight: 800;
  letter-spacing: 0.6;
  text-align: center;
`;

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
Container.Left = styled.View`
  width: 60%;
`;
Container.Right = styled(Container.Left)`
  width: 40%;
`;

const TabItem = styled.TouchableOpacity`
  background-color: ${props => (props.active ? "#1366AF" : "transparent")};
  border-radius: 30px;
  padding : 10px;
  padding-left : 15px;
  padding-right : 15px;
  margin-right : 25px;
`;
TabItem.Text = styled.Text`
  color: ${props => (props.active ? "#ffffff" : "#586e82")};
  font-size: ${hp("1.6%")};
  text-align: center;
  font-weight: ${props => (props.active ? "700" : "400")};
  letter-spacing: 0.6;
`;

const CartTitle = styled.Text`
  font-size: ${hp("2%")};
  color: #586e82;
  font-weight: 600;

`;

const CardContent = styled.View`
  height: ${hp("80%")};
  border-left-width: 1;
  border-color: #dddddd;
  position: relative;
`;
