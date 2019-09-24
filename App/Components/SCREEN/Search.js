import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import PickerSelect from "react-native-picker-select";
import Indicator from '../Indicator'

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      phoneHeader: 1
    };
  }

  onChangePhone(phone) {
    // if (phone.length < 12 || phone.toSring()[0] !== 0) {
      this.setState({ phone: phone.replace(/[^0-9]/g, '').replace(/^0+/, "") });
    // }
  }

  Submit() {
    const { searchByPhone } = this.props;
    const { phone, phoneHeader } = this.state;
    if (phone.trim() !== "") {
      searchByPhone(phoneHeader + phone);
    }
  }

  render() {
    const { isLoadingSearchPhone } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header>
          <Image source={require("../../Images/Logo.png")} style={styles.logo} />
          <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: '35%' }}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require("../../Images/back-icon.png")}
            />
          </TouchableOpacity>
        </Header>
        <Container>
          <View style={{ width: "80%" }}>
            <Container.Content>
              <Title>Enter phone number</Title>
              <WrapPhone>
                <PickerSelect
                  selectedValue={this.state.phoneHeader}
                  placeholder={{}}
                  onValueChange={itemValue =>
                    this.setState({ phoneHeader: itemValue })
                  }
                  style={pickerStyle}
                  items={[
                    { label: "+1", value: 1 },
                    { label: "+84", value: 84 }
                  ]}
                />
                <Phone
                  value={this.state.phone}
                  onChangeText={phone => this.onChangePhone(phone)}
                  placeholderTextColor="#C4D3D2"
                  placeholder="Phone number"
                />
              </WrapPhone>
            </Container.Content>
          </View>
          <ButtonSubmit onPress={() => this.Submit()}>
          <ButtonSubmit.Text>NEXT</ButtonSubmit.Text>
        </ButtonSubmit>
        </Container>
        {isLoadingSearchPhone && <Indicator />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24244a"
  },
  imgLogo: {
    alignSelf: "center",
    resizeMode: "contain",
    width: "25%",
    height: "12%"
  },
  backIcon: {
    position: "absolute",
    right: "3%",
    top: 25
  },
  logo: {
    resizeMode: 'stretch',
    width: "45%",
    height: "45%"
  },
});

const pickerStyle = {
  inputIOS: {
    color: "#333",
    paddingHorizontal: 10,
    backgroundColor: "white",
    textAlign: "center",
    height: hp("5%"),
    marginRight: 5,
    fontSize: hp("2%"),
    width: wp("14%")
  },
  inputAndroid: {
    color: "white"
  },
  placeholderColor: "grey",
  underline: { borderTopWidth: 0 },
  icon: {
    position: "absolute",
    backgroundColor: "black",
    width: 100,
    height: 30,
    top: 20,
    right: 15,
    color: "blue"
  }
};

const Header = styled.View`
  width : 100%;
  height : 18%;
  justify-content : center;
  align-items : center;
  position : relative;
`;

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  margin-top : 25%;
`;

Container.Text = styled.Text`
  color: white;
  font-size: ${hp("3%")};
`;

Container.Content = styled.View``;
const Title = styled.Text`
  color: #ffffff;
  font-size: ${hp("3.5%")};
  letter-spacing: 0.6;
  font-weight: 600;
  margin-bottom: 20;
  text-align: center;
`;

const WrapPhone = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Phone = styled.TextInput`
  background-color: #ffffff;
  height: ${hp("5%")};
  font-size: ${hp("2%")};
  padding-left: 10;
  color: #3b3b3b;
  font-weight: 400;
  width: 65%;
`;

const ButtonSubmit = styled.TouchableOpacity`
  background : #54D769;
  padding : 20px 30px;
  border-radius : 10px;
  width : ${wp("40%")};
  align-self : center;
  margin-top : ${hp('3%')};
`;
ButtonSubmit.Text = styled.Text`
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  font-size: ${hp("2.8%")};
`;



