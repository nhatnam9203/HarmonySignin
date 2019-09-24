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

export default class ThankYou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            phoneHeader: "Java"
        };
    }

    Submit() {
        this.props.navigation.navigate("WaitingList");
    }

    render() {
        const { Info, WaitingList } = this.props;
        const userFullName = `${Info.firstName} ${Info.lastName}`;
        return (
            <View style={styles.container}>
                <Image source={require("../../Images/Logo.png")} style={styles.logo} />
                <Container>
                    <View style={{ width: "80%" }}>
                        <Container.Content>
                            <View style={styles.content}>
                                <Title>Thank you !</Title>
                                <CustomerName>{userFullName}</CustomerName>
                                <SubTitle>
                                    Your appointment has been placed in the queue.
                                </SubTitle>
                                <SubTitle2>
                                    Your order number is #{parseInt(WaitingList.length)}
                                </SubTitle2>
                            </View>
                        </Container.Content>
                        <ButtonSubmit onPress={() => this.Submit()}>
                            <ButtonSubmit.Text>OK</ButtonSubmit.Text>
                        </ButtonSubmit>
                    </View>
                </Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: "center",
        resizeMode: 'stretch',
        width: "50%",
        height: "8.5%",
        marginTop: '10%'
    },
    container: {
        flex: 1,
        backgroundColor: "#24244a",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBack: {
        position: "absolute",
        right: "3%",
        top: 15
    },
    content: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
    }
});

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  margin-top: 15%;
`;

Container.Content = styled.View`
  display: flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
`;
const Title = styled.Text`
  color: #ffffff;
  font-size: ${hp("4%")};
  letter-spacing: 0.6;
  font-weight: 600;
  margin-bottom: 20;
  text-align: center;
  width: ${wp("80%")};
`;

const CustomerName = styled(Title)`
  font-size: ${hp("4%")};
  font-weight: 600;
  letter-spacing: 1.1;
  margin-top: 5%;
`;

const SubTitle = styled(Title)`
    font-weight : 500;
    margin-bottom :0;
    margin-top : ${hp("7%")};
    font-size: ${hp("2.7%")};
`;
const SubTitle2 = styled(Title)`
     font-weight : 500;
     font-size: ${hp("2.7%")};
`;

const ButtonSubmit = styled.TouchableOpacity`
  background : #54D769;
  padding : 15px;
  border-radius : 10px;
  width : ${wp("40%")};
  align-self : center;
`;
ButtonSubmit.Text = styled.Text`
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  font-size: ${hp("3.5%")};
`;
