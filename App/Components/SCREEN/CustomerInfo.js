import React, { Component } from "react";
import {
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";

import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Indicator from "../Indicator";

export default class CustomerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      refphone: "",
      phone: "",
      note: "",
      email: "",
      checkDisable: true
    };
  }

  onChangeFirstName(firstname) {
    this.setState({ firstname });
  }
  onChangeLastName(lastname) {
    this.setState({ lastname });
  }
  onChangeRefPhone(refphone) {
    this.setState({ refphone: refphone.replace(/[^0-9]/g, '') });
  }
  onChangeEmail(email) {
    this.setState({ email });
  }
  onChangeNote(note) {
    this.setState({ note });
  }
  SignIn() {
    const {
      checkDisable,
      firstname,
      lastname,
      phone,
      refphone,
      note,
      email
    } = this.state;

    if (checkDisable === false) {
      this.props.navigation.navigate("Service");
      return;
    }
    const { addNewUser } = this.props;
    if (firstname.trim() !== '' && lastname.trim() !== '') {
      addNewUser({
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        Phone: "+" + phone,
        favourite: note,
        referrerPhone: "+" + refphone
      });
    }
  }

  componentDidMount() {
    const { Info } = this.props;
    if (Info.phoneToAdd) {
      this.setState({
        phone: Info.phoneToAdd
      })
      return;
    }
    const { firstName, lastName, referrerPhone, phone, email,favourite } = Info;
    this.setState({
      firstname: firstName,
      lastname: lastName,
      refphone: referrerPhone,
      phone: phone,
      email: email,
      checkDisable: false,
      note : favourite
    });
  }

  render() {
    const { checkDisable } = this.state;
    const { isLoadingAddUser } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#24244a" }}>
        <ScrollView showsVerticalScrollIndicator={true}>
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
            <Container.Content>
              <Title>Give us your informations</Title>
              <TextName>Full Name (*)</TextName>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <FirstName
                  value={this.state.firstname}
                  onChangeText={firstname => this.onChangeFirstName(firstname)}
                  placeholderTextColor="#BEC7D5"
                  placeholder="First name"
                  editable={checkDisable ? true : false}
                />
                <LastName
                  value={this.state.lastname}
                  onChangeText={lastname => this.onChangeLastName(lastname)}
                  placeholderTextColor="#BEC7D5"
                  placeholder="Last name"
                  editable={checkDisable ? true : false}
                />
              </View>
              <TextEmail>Email</TextEmail>
              <Email
                value={this.state.email}
                onChangeText={email => this.onChangeEmail(email)}
                placeholderTextColor="#BEC7D5"
                placeholder="Email"
                editable={checkDisable ? true : false}
              />
              <TextRefPhone>Referer Phone Number</TextRefPhone>
              <RefPhone
                value={this.state.refphone}
                onChangeText={refphone => this.onChangeRefPhone(refphone)}
                placeholderTextColor="#BEC7D5"
                placeholder="Referer phone number"
                editable={checkDisable ? true : false}
              />
              <TextNote>Note</TextNote>
              <Note
                value={this.state.note}
                onChangeText={note => this.onChangeNote(note)}
                placeholderTextColor="#BEC7D5"
                placeholder="Your note will help us provide better service."
                multiline={true}
                editable={checkDisable ? true : false}
              />
              <ButtonSignIn Submit onPress={() => this.SignIn()}>
                <ButtonSignIn.Text Submit>NEXT</ButtonSignIn.Text>
              </ButtonSignIn>
              <View style={{ height: 150 }}></View>
            </Container.Content>
          </Container>
        </ScrollView>
        {isLoadingAddUser && <Indicator />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'stretch',
    width: "40%",
    height: "45%"
  },
})

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
  margin-top: 5%;
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
  font-weight: 700;
  margin-bottom: 20;
  text-align: center;
`;

const TextName = styled.Text`
  color: #ffffff;
  font-size: ${hp("2.6%")};
  letter-spacing: 0.6;
  font-weight: 600;
  margin-bottom: 12;
  margin-top: 12;
`;
const TextRefPhone = styled(TextName)``;
const TextNote = styled(TextName)``;
const TextEmail = styled(TextName)``;

const FirstName = styled.TextInput`
  background-color: #ffffff;
  height: ${hp("5%")};
  width: ${wp("31.8%")};
  margin-bottom: 10;
  padding-left: 10;
  padding-top: 5;
  color: #565656;
  font-weight: 500;
  font-size: ${hp("2%")};
`;

const LastName = styled(FirstName)`
  margin-left: 10;
`;
const RefPhone = styled(FirstName)`
  width: ${wp("65%")};
`;
const Email = styled(RefPhone)``;
const Note = styled(FirstName)`
  height: ${hp("12%")};
  font-style: italic;
  font-weight: 400;
  width: ${wp("65%")};
  padding-top: 15;
`;

const ButtonSignIn = styled.TouchableOpacity`
  background : ${props => (props.Submit ? "#54D76A" : "#F3F7FC")}
  padding : 20px 30px;
  border-radius : 10px;
  width : ${wp("40%")};
  align-self : center;
  margin-top : ${hp("4%")};
`;
ButtonSignIn.Text = styled.Text`
  color: ${props => (props.Submit ? "#ffffff" : "#8097B3")};
  font-weight: 700;
  text-align: center;
  font-size: ${hp("3%")};
`;
