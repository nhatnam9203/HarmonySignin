import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      phoneHeader: "Java"
    };
  }

  onChangePhone(phone) {
    this.setState({ phone });
  }

  Submit() {
    this.props.navigation.navigate("Service");
  }

  render() {
    const { Info } = this.props;
    const userFullName = `${Info.firstName} ${Info.lastName}`;
    return (
      <Container>
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
        <Content>
          <View style={{ flex : 1, justifyContent :'center',alignItems :'center', }}>
            <Title>Welcome !</Title>
            <CustomerName>{userFullName}</CustomerName>
            <ButtonSubmit onPress={() => this.Submit()}>
           <ButtonSubmit.Text>BOOK APPOINTMENT</ButtonSubmit.Text>
         </ButtonSubmit>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'stretch',
    width: "45%",
    height: "45%"
  },
  btnBack: {
    position: "absolute",
    right: "3%",
    top: "40%"
  }
});

const Container = styled.View`
  flex : 1;
  background-color : #24244a;
`;

const Header = styled.View`
  width : 100%;
  height : 18%;
  justify-content : center;
  align-items : center;
  position : relative;
`;
const Content = styled.View`
  flex : 1;
`;

const Title = styled.Text`
  color: #ffffff;
  font-size: ${hp("4.3%")};
  letter-spacing: 0.6;
  font-weight: 600;
  margin-bottom: 20;
  width: ${wp("80%")};
  text-align : center;
`;

const CustomerName = styled(Title)`
  font-size: ${hp("5%")};
  font-weight: 700;
  letter-spacing: 1.1;
  margin-top: 5%;
`;

const ButtonSubmit = styled.TouchableOpacity`
  background : #54D769;
  padding : 25px 30px;
  border-radius : 10px;
  align-self : center;
  margin-top : 40px;
`;
ButtonSubmit.Text = styled.Text`
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  font-size: ${hp("2.8%")};
`;
