import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';

import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Indicator from '../Indicator';
import {verticalScale} from '../../Services/util'
export default class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		};
	}

	onChangeEmai(email) {
		const { resetAlertForgotPassword, AlertForgotPassword } = this.props;
		if (AlertForgotPassword) {
			resetAlertForgotPassword('');
		}
		this.setState({ email });
	}

	Submit() {
		if (this.state.email.trim() !== '') {
			const { email } = this.state;
			const { forgotPassword } = this.props;
			forgotPassword(email);
		}
  }
  
  back() {
		const { resetAlertForgotPassword, AlertForgotPassword } = this.props;
		if (AlertForgotPassword) {
			resetAlertForgotPassword('');
		}
		this.props.navigation.goBack();
	}

	renderAlertMessage() {
		const { AlertForgotPassword } = this.props;
		if (AlertForgotPassword === 'Email is not exists.') {
			return <AlertMessage>{AlertForgotPassword}</AlertMessage>;
		}
		if (AlertForgotPassword === 'Reset password link has been send..') {
			return <AlertMessage success>{AlertForgotPassword}</AlertMessage>;
		}
		return null;
	}

	renderHeader() {
		return (
			<React.Fragment>
				<TouchableOpacity onPress={() => this.back()}>
					<Image
						source={require('../../Images/back-icon.png')}
						style={{ position: 'absolute', right: '3%', top: 15 }}
					/>
				</TouchableOpacity>
				<Image
					source={require('../../Images/big-logo.png')}
					style={{
						marginTop: verticalScale(100),
						alignSelf: 'center',
						resizeMode: 'contain'
					}}
				/>
			</React.Fragment>
		);
	}

	render() {
		const { isLoadingForgot } = this.props;
		return (
			<ImageBackground
				source={require('../../Images/background-login.jpg')}
				style={{ width: '100%', height: '100%' }}
			>
				{this.renderHeader()}

				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={{ flex: 1, marginTop: '7%' }}>
						<Container>
							<Container.Content>
								{this.renderAlertMessage()}
								<Title>Forgot Password</Title>
								<SubTitle>
									Please enter your email address and we'll send you instructions on how to reset your
									password
								</SubTitle>
								<Email
									value={this.state.email}
									onChangeText={(email) => this.onChangeEmai(email)}
									placeholderTextColor="#7E7D7F"
									placeholder="Email"
								/>
								<ButtonSignIn onPress={() => this.Submit()}>
									<ButtonSignIn.Text>SUBMIT</ButtonSignIn.Text>
								</ButtonSignIn>
							</Container.Content>
						</Container>
					</View>
				</TouchableWithoutFeedback>

				{isLoadingForgot && <Indicator />}
			</ImageBackground>
		);
	}
}

const Container = styled.View`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
`;

Container.Text = styled.Text`
	color: white;
	font-size: ${hp('3%')};
`;

Container.Content = styled.View`
	width: 60%;
	align-items: center;
	margin-top: -20px;
`;

const Title = styled.Text`
	color: #ffffff;
	font-size: ${hp('3.8%')};
	font-weight: 800;
	text-align: center;
	margin-bottom: 10;
	letter-spacing: 0.6;
`;

const AlertMessage = styled(Title)`
  color : ${(props) => (props.success ? '#1366AE' : '#DA1A40')}
  font-weight : ${(props) => (props.success ? '600' : '500')}
  font-size: ${hp('2.5%')};
`;

const SubTitle = styled(Title)`
  font-size: ${hp('1.8%')};
  margin-bottom: 20;
  font-weight: 500;
`;

const Email = styled.TextInput`
	background-color: #ffffff;
	height: ${hp('5%')};
	width: ${wp('70%')};
	margin-bottom: 10;
	padding-left: 10;
	padding-top: 5;
	color: #3b3b3b;
	font-weight: 400;
	font-size: ${hp('2%')};
`;

const ButtonSignIn = styled.TouchableOpacity`
	background: #54d769;
	padding: 20px 30px;
	margin-top: 25px;
	border-radius: 5px;
	width: ${wp('40%')};
`;
ButtonSignIn.Text = styled.Text`
	color: #ffffff;
	font-weight: 800;
	text-align: center;
	font-size: ${hp('3%')};
`;
