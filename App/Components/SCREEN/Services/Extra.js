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
    };
  }

  chooseItem(index) {
    this.setState({ itemchoosed: index });
  }

  renderImage(imgUrl) {
    if (imgUrl) {
      return (
        <Image
          style={styles.imgLeft}
          source={{ uri: imgUrl }}
        />
      );
    }
    return (
      <Image
        style={styles.imgLeft}
        source={require("../../../Images/service_holder.png")}
      />
    );
  }

  addToCart(item) {
    const { addExtraToCart, setAnimatedScroll,effectTotal,Cart } = this.props;
    addExtraToCart(item);
    setAnimatedScroll(true);
    this.setState({ itemchoosed: "" });
    const pos = Cart.findIndex(sv=>sv.extraId === item.extraId);
    if(pos === -1){
      effectTotal();
    }
  }

  renderItems() {
    const { ExtraList,Cart } = this.props;
    const { itemchoosed } = this.state;
    return ExtraList.map((item, index) => {
      return (
        <Item 
        active={index === itemchoosed ? false : true}
        key={index} onPress={() => this.chooseItem(index)}>
          <View style={{ width: '100%', height: index === itemchoosed ? '70%' : '100%', display: 'flex', flexDirection: 'row' }}>
          <Item.Left>{this.renderImage(item.imgExtra)}</Item.Left>
          <Item.Right>
            <Item.Right.Title>{item.name}</Item.Right.Title>
            <Item.Right.Content>
              <Text
                numberOfLines={2}
                ellipsizeMode='tail'
                style={styles.txtDescription}>
                {item.description}
              </Text>
            </Item.Right.Content>
            <Item.Right.Bottom>
              <View
                style={styles.durationGroup}
              >
                <Text style={styles.itemBottom}>Duration: </Text>
                <Text style={[styles.itemBottom, { fontWeight: "700" }]}>
                  {item.duration} min
                </Text>
              </View>
              <View style={styles.priceGroup}>
                <Text style={styles.itemBottom}>Price: </Text>
                <Text style={[styles.itemBottom, { fontWeight: "700" }]}>
                  $ {Number(item.price).toFixed(2)}
                </Text>
              </View>
            </Item.Right.Bottom>
          </Item.Right>
          </View>
          {index === itemchoosed && (
            <ButtonAdd onPress={() => this.addToCart(item)}>
              <ButtonAdd.Text>Add to basket</ButtonAdd.Text>
            </ButtonAdd>
          )}
        </Item>
      );
    });
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
    fontWeight:'300',
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
  txtDescription: {
    color: "#586e82", fontSize: hp("1.7%")
  },
  durationGroup: {
    display: "flex",
    flexDirection: "row",
    marginRight: 15
  },
  priceGroup: {
    display: "flex", flexDirection: "row"
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
const ButtonAdd = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1266af;
  height: ${hp("4%")};
  border-radius: 3px;
  align-self : flex-end;
  padding : 10px;
  margin-top : 10;
`;

ButtonAdd.Text = styled.Text`
  color: #ffffff;
  font-weight: 700;
  font-size: ${hp("1.7%")};
`;
