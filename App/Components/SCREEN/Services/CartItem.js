import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";
import * as Animatable from 'react-native-animatable';
import styled from "styled-components/native";
import styles from "./styleCart";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animated from 'react-native-animatable'
export default class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      isModal: false,
      merchantInfo: ''
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('merchantInfo').then((result) => {
      this.setState({ merchantInfo: JSON.parse(result) });
    }).catch((err) => {
      alert(err)
    });
  }

  deleteFromCart(item) {
    const { deleteItemInCart, setAnimatedScroll } = this.props;
    setAnimatedScroll(false);
    deleteItemInCart(item);
  }

  renderImage(item) {
    if (item.serviceId) {
      if (item.imgService) {
        return (
          <Image style={styles.imgLeft} source={{ uri: item.imgService }} />
        );
      }
      return (
        <Image
          style={styles.imgItemCart}
          source={require("../../../Images/service_holder.png")}
        />
      );
    }
    if (item.extraId) {
      if (item.imgExtra) {
        return <Image style={styles.imgLeft} source={{ uri: item.imgExtra }} />;
      }
      return (
        <Image
          style={styles.imgItemCart}
          source={require("../../../Images/service_holder.png")}
        />
      );
    }
    if (item.productId) {
      if (item.imgProduct) {
        return (
          <Image style={styles.imgLeft} source={{ uri: item.imgProduct }} />
        );
      }
      return (
        <Image
          style={styles.imgItemCart}
          source={require("../../../Images/product_holder.png")}
        />
      );
    }
  }

  getTotalPrice() {
    let total = 0;
    const { Cart } = this.props;
    Cart.forEach(item => {
      if (item.productId || item.extraId) {
        total += parseFloat(item.price) * parseFloat(item.quantity)
      }
      if (item.serviceId || item.extraId) {
        total += parseFloat(item.price)
      }
    });
    return parseFloat(total).toFixed(2);
  }

  getTotalDuration() {
    let duration = 0;
    const { Cart } = this.props;
    Cart.forEach(item => {
      if (item.duration) {
        duration += item.duration;
      }
    });
    return duration;
  }


  renderBottomItemCart(item) {
    if (item.serviceId || item.extraId) {
      return (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.titleTotalWrapper}>Duration : </Text>
          <Text style={[styles.titleTotalWrapper, { fontWeight: "600" }]}>
            {item.duration} min
          </Text>
        </View>
      );
    }
    if (item.productId) {
      return (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.titleTotalWrapper}>Quantity : </Text>
          <Text style={[styles.titleTotalWrapper, { fontWeight: "600" }]}>
            {item.quantity}
          </Text>
        </View>
      );
    }
  }

  renderItemCart() {
    const { Cart } = this.props;
    return Cart.map((item, index) => {
      return (
        <Animatable.View
          animation="bounceInRight"
          style={item.extraId ? styles.extra : styles.item}
          key={index}>
          <ItemCart.Left>{this.renderImage(item)}</ItemCart.Left>
          <ItemCart.Right>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.titleItem}>{item.name}</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.titleTotalWrapper}>Price : </Text>
              <Text style={[styles.titleTotalWrapper, { fontWeight: "600" }]}>
                $ {parseFloat(item.price).toFixed(2)}
              </Text>
            </View>
            {this.renderBottomItemCart(item)}
          </ItemCart.Right>
          <TouchableOpacity
            onPress={() => this.deleteFromCart(item)}
            style={styles.btnTrash}
          >
            <Image
              source={require("../../../Images/trash.png")}
              style={{ width: 32, height: 32, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </Animatable.View>
      );
    });
  }

  renderNoItemInCart() {
    return (
      <View style={{
        height: '60%',
        backgroundColor: '#ffffff',
        padding: 10,
        margin: 10,
        borderRadius: 5
      }}>
        <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          <Icon name="ios-cart" size={30} color="#7B99BA" />
          <Text style={[styles.txtSelected,{marginTop:5}]}>0 item selected</Text>
        </View>
        <BookNoItem onPress={() => this.openModal()}>
          <Book.Text>BOOK NOW</Book.Text>
        </BookNoItem>
      </View>
    );
  }

  renderEstimate() {
    const { merchantInfo } = this.state;
    const {WaitingTimeMerchant} = this.props;
    return (
      <TotalWrapper>
        <TotalWrapper.Item>
          <Text style={styles.txtEstimate}>
            Estimate waiting time (min):
          </Text>
          <Text
            style={[styles.txtEstimate, { fontWeight: "600" }]}
          >
            {WaitingTimeMerchant}
          </Text>
        </TotalWrapper.Item>
        <TotalWrapper.Item>
          <Text style={styles.txtEstimate}>
            Total duration (min):
          </Text>
          <Text
            style={[styles.txtEstimate, { fontWeight: "600" }]}
          >
            {this.getTotalDuration()}
          </Text>
        </TotalWrapper.Item>
        <TotalWrapper.Item>
          <Text
            style={styles.txtTotalPrie}
          >
            Total($):
          </Text>
          <Animated.Text
            ref={ref=>this.totalPrice = ref}
            style={styles.txtTotalPrie}
          >
            {this.getTotalPrice()}
          </Animated.Text>
        </TotalWrapper.Item>
      </TotalWrapper>
    );
  }

  closeModal = () => {
    this.setState({ isModal: false });
  };
  Booking() {
    const { InfoLogin, InfoCheckPhone, Cart, addAppointment } = this.props;
    if (Cart.length === 0) {
      return;
    }
    if(this.findServiceInCart(Cart) === -1){
      alert('Please choose service !');
      return ;
    }
    addAppointment({ InfoLogin, InfoCheckPhone, Cart })
    // this.setState({ isModal: false });
  }

  renderModalConfirm() {
    return (
      <Modal
      onBackdropPress={()=>this.closeModal()}
       isVisible={this.state.isModal}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image style={{width:40,height:40}} source={require("../../../Images/confirm.png")} />
            <Text style={styles.confirm}>Confirmation !</Text>
            <Text style={styles.question}>
              Did you check your services? Confirm booking appointment?
            </Text>
          </View>
          <View style={styles.wrapperButton}>
            <View style={styles.btnWrap}>
              <TouchableOpacity
                onPress={() => this.Booking()}
                style={styles.btnYes}
              >
                <Text style={styles.txtButton}>Yes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrap}>
              <TouchableOpacity
                onPress={() => this.closeModal()}
                style={styles.btnNo}
              >
                <Text style={styles.txtButton}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderItemSelected() {
    const { Cart } = this.props;
    return (
      <React.Fragment>
        <View style={styles.wrapperItemSelected}>
          {/* <Image
            source={require("../../../Images/cart-icon.png")}
            style={styles.imgSelected}
          /> */}
          <Icon name="ios-cart" size={30} color="#7B99BA" />
          <Text style={styles.txtSelected}>{Cart.length} item selected</Text>
        </View>
      </React.Fragment>
    );
  }

  findServiceInCart(Cart){
    const pos = Cart.findIndex(el=>el.serviceId);
    return pos;
  }

  openModal() {
    const { Cart } = this.props;
    if(this.findServiceInCart(Cart) === -1){
      alert('Please choose service !');
      return ;
    }
    if (Cart.length > 0) {
      this.setState({
        isModal: true
      })
    }
  }

  render() {
    const { AnimatedScroll, Cart } = this.props;
    // if (Cart.length === 0) {
    //   return this.renderNoItemInCart()
    // }
    return (
      <React.Fragment>
        <View style={{ padding: 10, height: hp("33%") }}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              if (AnimatedScroll)
                return this.scrollView.scrollToEnd({ animated: true });
            }}
            showsVerticalScrollIndicator={false}>
            {this.renderItemCart()}
          </ScrollView>
        </View>
        <View style={styles.estimateWrapper}>
          {this.renderItemSelected()}
          {this.renderEstimate()}
          <Book onPress={() => this.Booking()}>
            <Book.Text>ADD ITEM</Book.Text>
          </Book>
        </View>
        {/* {this.renderModalConfirm()} */}
      </React.Fragment>
    );
  }
}


const ItemCart = styled.View`
  width: 100%;
  height: ${props => props.extra ? hp("13%") : hp("11%")};
  padding: 10px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.13);
  position: relative;
`;
ItemCart.Left = styled.View`
  width: 30%;
  height: 100%;
`;

ItemCart.Right = styled.View`
  padding-left: 8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
`;

const TotalWrapper = styled.View`
  padding: 10px;
  padding-top: 5px;
  border: 1px solid #dddddd;
  background-color: #ffffff;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;
TotalWrapper.Item = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10;
`;

const Book = styled.TouchableOpacity`
  width: 100%;
  background-color: #53d869;
  border-radius: 3px;
  align-self: center;
  margin-top: 8%;
  margin-left: 5;
  padding : 10px;
  height : 22%;

`;

const BookNoItem = styled(Book)`
  height : 15%;
  width : 95%;
  margin : 0;
`;

Book.Text = styled.Text`
  font-size: ${hp("2.3%")};
  color: #ffffff;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.6;
  padding-top: 5%;
`;
