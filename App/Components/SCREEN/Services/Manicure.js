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
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Manicure extends Component {
  constructor() {
    super();
    this.state = {
      itemchoosed: "",
      extrachoosed: "",
      isModal: false,
      extrasOfServices: [],
    };
  }

  chooseItem(index, item) {
    if (item.serviceId)
      this.setState({ itemchoosed: index });
    this.setState({ extrachoosed: index });
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

  async addToCart(item) {
    const { addServiceToCart, setAnimatedScroll, effectTotal, Cart, } = this.props;
    let pos;
    if (!item.extraId) {
      await addServiceToCart(item);
      pos = Cart.findIndex(sv => sv.serviceId === item.serviceId);
    }
    if (pos === -1) {
      effectTotal();
    }
    setAnimatedScroll(true);
    this.setState({ itemchoosed: "", extrachoosed: "" });
  }

  async openModalExtras(service) {
    if (service.serviceId && service.extras.length > 0) {
      let serviceExtras = await service.extras ? service.extras : [];
      for (let i = 0; i < serviceExtras.length; i++) {
        serviceExtras[i].check = false;
        serviceExtras[i].serviceId = service.serviceId;
      }
      this.setState({
        isModal: true,
        extrasOfServices: serviceExtras,
      })
    }
  }

  hideModalExtras() {
    this.setState({
      isModal: false,
      extrasOfServices: [],
    });
  }

  renderModalExtras() {
    const { extrasOfServices } = this.state;
    return extrasOfServices.map((extra, index) => {
      return this.renderItem(extra, index)
    })
  }

  componentWillUnmount() {
    this.setState({
      isModal: false,
      extrasOfServices: [],
      itemchoosed: '',
      extrachoosed: '',
    })
  }

  chooseExtra(item) {
    let { extrasOfServices } = this.state;
    const pos = extrasOfServices.findIndex((extra, index) => item.extraId === extra.extraId);
    if (pos === -1) return;
    extrasOfServices[pos].check = !extrasOfServices[pos].check;
    this.setState({ extrasOfServices });
  }

  addExta() {
    const { extrasOfServices } = this.state;
    const { addExtraToCart } = this.props;
    extrasOfServices.forEach(extra => {
      if (extra.check === true)
        addExtraToCart(extra)
    });
    this.hideModalExtras();
  }

  renderItem(item, index) {
    const { itemchoosed } = this.state;
    const { Cart } = this.props;
    const pos = !item.extraId ? Cart.findIndex(sv => sv.serviceId === item.serviceId) : -1;
    return (
      <Item
        active={index === itemchoosed ? false : true}
        key={index}
        borderColor={pos === -1 ? false : true}
        onPress={() => {
          if (item.extraId) {
            this.chooseExtra(item);
          } else {
            this.chooseItem(index, item);
          }
        }}>
        <View style={{ width: '100%', height: index === itemchoosed ? '70%' : '100%', display: 'flex', flexDirection: 'row' }}>
          <Item.Left>{!item.extraId ? this.renderImage(item.imgService) : this.renderImage(item.imgExtra)}</Item.Left>
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
                  $ {parseFloat(item.price).toFixed(2)}
                </Text>
              </View>
            </Item.Right.Bottom>
          </Item.Right>
        </View>
        {item.extraId && <TouchableOpacity
          onPress={() => this.chooseExtra(item)}
          style={{
            position: 'absolute',
            right: 5,
            bottom: 5
          }}>
          <Icon name={item.check ? "md-checkmark" : "md-square-outline"} color={'#1964A6'} size={30} />
        </TouchableOpacity>}
        {!item.extraId && index === itemchoosed && (
          <ButtonAdd onPress={() => {
            this.addToCart(item, index);
            this.openModalExtras(item)
          }}>
            <ButtonAdd.Text>Add to basket</ButtonAdd.Text>
          </ButtonAdd>
        )}
      </Item>
    );
  }

  renderItems() {
    const { ServiceList } = this.props;
    return ServiceList.map((item, index) => {
      return this.renderItem(item, index);
    });
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={true}>
          {this.renderItems()}
        </ScrollView>
        <Modal
          isVisible={this.state.isModal}
        >
          <View style={styles.containerModal}>
            <View style={styles.headerModal}>
              <Text style={styles.txtModal}>
                Extras
            </Text>
            </View>
            <View style={styles.bodyModal}>
              <View style={{flex : 1,overflow:'scroll'}}>
                {this.renderModalExtras()}
              </View>
              <View style={{height : 80}}></View>
              <TouchableOpacity
                onPress={() => this.addExta()}
                style={styles.btnAddExtra}>
                <Text style={styles.txtAddExtra}>Add to basket</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.hideModalExtras()}
              style={styles.btnCloseModal}>
              <Icon name="md-close" color="#ffffff" size={hp('3.7%')} />
            </TouchableOpacity>
          </View>
        </Modal>
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
  },
  containerModal: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'relative',
  },
  headerModal: {
    backgroundColor: '#1A68AD',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtModal: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: hp('3%')
  },
  bodyModal: {
    flex: 1,
  },
  btnCloseModal: {
    position: 'absolute',
    top: 15,
    right: 10
  },
  btnAddExtra: {
    alignSelf: 'center',
    backgroundColor: '#1964A6',
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 3,
    position: 'absolute',
    bottom: 5,
  },
  txtAddExtra: {
    color: '#ffffff',
    fontSize: hp('2%'),
    fontWeight: '500'
  }

});

const Item = styled.TouchableOpacity`
  width: 100%;
  height: ${props => props.active ? hp('14%') : hp('18%')};
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.13);
  position: relative;
  border : 1px solid ;
  border-color : ${props => props.borderColor ? '#FF851B' : 'white'};
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

