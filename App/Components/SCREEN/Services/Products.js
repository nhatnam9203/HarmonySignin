import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class Manicure extends Component {
  constructor() {
    super();
    this.state = {
      itemchoosed: "",
      quantity: 1
    };
  }

  chooseItem(index) {
    this.setState({ itemchoosed: index, quantity: 1 });
  }

  renderImage(imgUrl) {
    if (imgUrl) {
      return (
        <Image
          style={{ width: "100%", resizeMode: "cover", height: "100%" }}
          source={{ uri: imgUrl }}
        />
      );
    }
    return (
      <Image
        style={{ width: "100%", resizeMode: "cover", height: "100%" }}
        source={require("../../../Images/product_holder.png")}
      />
    );
  }

  renderItems() {
    const { ProductList } = this.props;
    const { itemchoosed } = this.state;
    return ProductList.map((item, index) => {
      return (
        <Item
          active={index === itemchoosed ? false : true}
          key={index} onPress={() => this.chooseItem(index)}>
          <View style={{ width: '100%', height: index === itemchoosed ? '70%' : '100%', display: 'flex', flexDirection: 'row' }}>
            <Item.Left>{this.renderImage(item.imgProduct)}</Item.Left>
            <Item.Right>
              <Item.Right.Title>{item.name}</Item.Right.Title>
              <Item.Right.Content>
                <Text numberOfLines={1} style={styles.itemContent}>{item.description}</Text>
              </Item.Right.Content>
              <Item.Right.Bottom>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: 15
                  }}
                >
                  <Text style={styles.itemBottom}>Quantity : </Text>
                  <Text style={[styles.itemBottom, { fontWeight: "700" }]}>
                    {item.quantity}
                  </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={styles.itemBottom}>Price: </Text>
                  <Text style={[styles.itemBottom, { fontWeight: "700" }]}>
                    $ {parseFloat(item.price).toFixed(2)}
                  </Text>
                </View>
              </Item.Right.Bottom>
            </Item.Right>
          </View>
          {index === itemchoosed && this.renderAddProduct(item)}
        </Item>
      );
    });
  }

  plusQuantity(item) {
    const { plusQuantity } = this.props;
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
    // plusQuantity({product : item,quantity})
  }
  
  minusQuantity(item) {
    const { minusQuantity } = this.props;
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState({ quantity: quantity - 1 });
      // minusQuantity({product : item,quantity})
    }
  }

  addToCart(item) {
    const { addProductToCart, setAnimatedScroll, effectTotal, } = this.props;
    const { quantity } = this.state;
    let product = { ...item, quantity };
    addProductToCart({ product, quantityCheck: item.quantity });
    setAnimatedScroll(true);
    this.setState({ itemchoosed: "", quantity: 1 });
    effectTotal()
  }

  renderAddProduct(item) {
    const { quantity } = this.state;
    return (
      <WrapperAdd>
        <WrapperAddQuantity>
          <TouchableOpacity onPress={() => this.minusQuantity(item)}>
            <Image
              source={require("../../../Images/minus.png")}
              style={styles.imgQuantity}
            />
          </TouchableOpacity>
          <Text style={styles.txtQuantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => this.plusQuantity(item)}>
            <Image
              source={require("../../../Images/plus.png")}
              style={styles.imgQuantity}
            />
          </TouchableOpacity>
        </WrapperAddQuantity>
        <ButtonAdd onPress={() => this.addToCart(item)}>
          <ButtonAdd.Text>Add to cart</ButtonAdd.Text>
        </ButtonAdd>
      </WrapperAdd>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={true}>
          {this.renderItems()}
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  itemBottom: {
    color: "#586e82",
    fontSize: hp("1.5%"),
    letterSpacing: 0.1,
    fontWeight: '300',
  },
  imgLeft: {
    width: "100%",
    resizeMode: "cover",
    height: "100%"
  },
  itemContent: {
    color: "#586e82",
    fontSize: hp("1.7%"),
    letterSpacing: 0.2
  },
  imgQuantity: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  txtQuantity: {
    fontWeight: "600",
    fontSize: hp("1.8%"),
    color: "#818181"
  }
});

const Item = styled.TouchableOpacity`
  width: 100%;
  height: ${props => props.active ? hp('12%') : hp('18%')};
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.13);
  position: relative;
`;
Item.Left = styled.View`
  width: 25%;
  height: 100%;
`;
Item.Right = styled.View`
  padding-left: 8;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
  height: 100%;
`;
Item.Right.Title = styled.Text`
  font-size: ${hp("2.1%")};
  color: #2568a0;
  margin-bottom: 10px;
  font-weight: 700;
`;
Item.Right.Content = styled.Text`
  width: 60%;
`;
Item.Right.Bottom = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const WrapperAdd = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: ${wp("22%")};
  align-self : flex-end;
  margin-top : 10;
  margin-right : 90;
`;

const WrapperAddQuantity = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${wp("15%")};
  margin-right : 20;
`;

const ButtonAdd = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1266af;
  width : 120;
  height: ${hp("4%")};
  border-radius: 3px;
`;

ButtonAdd.Text = styled.Text`
  color: #ffffff;
  font-weight: 700;
  font-size: ${hp("1.7%")};
`;
