import React, { Component } from 'react';
import {
	View,
	TouchableOpacity,
	ImageBackground,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
	Animated
} from 'react-native';
import SessionExpired from './SessionExpired';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Indicator from '../Indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import { verticalScale } from '../../Services/util';

opacity = {
	0: {
		opacity: 0
	},
	0.5: {
		opacity: 0.5
	},
	1: {
		opacity: 1
	}
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			hide: true,
			animated: {
				scaleLogo: new Animated.Value(1.45),
				marginTopLogo: new Animated.Value(verticalScale(270)),
				opacityForm: new Animated.Value(0)
			}
		};
		this.logo = React.createRef();
		this.FormLogin = React.createRef();
	}


	removeErrorText() {
		const { loginFailed, FailedLogin } = this.props;
		if (FailedLogin === 'Your Email is not exists.' || FailedLogin === 'Password is not correct.') {
			loginFailed('');
		}
	}

	onChangeEmail(email) {
		this.removeErrorText();
		this.setState({ email });
	}

	onChangePassword(password) {
		this.removeErrorText();
		this.setState({ password });
	}

	SignIn() {
		const { email, password } = this.state;
		const { login } = this.props;
		if (email.trim() !== '' && password !== '') {
			login({ email, password });
		}
	}

	forgotPassword() {
		this.props.navigation.navigate('Forgot');
	}

	showPassword() {
		this.setState({ hide: false });
	}
	hidePassword() {
		this.setState({ hide: true });
	}

	renderHidePassword() {
		const { hide } = this.state;
		if (hide === true) {
			return (
				<TouchableOpacity
					style={{ position: 'relative', left: '90%', bottom: '50%' }}
					onPress={() => this.showPassword()}
				>
					<Icon name="ios-eye" size={30} color="#333" />
				</TouchableOpacity>
			);
		}
		return (
			<TouchableOpacity
				style={{ position: 'relative', left: '90%', bottom: '50%' }}
				onPress={() => this.hidePassword()}
			>
				<Icon name="ios-eye-off" size={30} color="#333" />
			</TouchableOpacity>
		);
	}

	componentWillReceiveProps(nextProps) {
		const refresh = nextProps.navigation.getParam('refresh', 0);
		if (refresh === 1) {
			this.forceUpdate();
			this.setState({
				email: '',
				password: ''
			});
		}
	}

	componentDidMount() {
		const { marginTopLogo, scaleLogo, opacityForm } = this.state.animated;
		setTimeout(() => {
				Animated.parallel([
					Animated.spring(marginTopLogo, {
						toValue: verticalScale(100),
						friction : 8,
					}),
					Animated.timing(scaleLogo, {
						toValue: 1,
						duration: 500
					})
				]).start();

				setTimeout(() => {
					Animated.timing(opacityForm, {
						toValue: 1,
						duration: 800
					}).start()
				}, 400);
		}, 700);
	}

	render() {
		const { isLoadingLogin, FailedLogin, isSessionExpired, changeSessionExpired } = this.props;
		return (
			<ImageBackground
				source={require('../../Images/background-login.jpg')}
				style={{ width: '100%', height: '100%' }}
			>
				<Animated.Image
					source={require('../../Images/big-logo.png')}
					style={{
						marginTop: this.state.animated.marginTopLogo,
						alignSelf: 'center',
						resizeMode: 'contain',
						transform: [ { scale: this.state.animated.scaleLogo } ]
					}}
				/>

				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<Animated.View
						pointerEvents={isLoadingLogin === true ? true : false}
						style={{
							flex: 1,
							marginTop: '10%',
							opacity: this.state.animated.opacityForm
						}}
					>
						<Container>
							<Container.Content>
								<Email
									value={this.state.email}
									onChangeText={(email) => this.onChangeEmail(email)}
									placeholderTextColor="#7E7D7F"
									placeholder="merchant ID"
									error={FailedLogin === 'Your Email is not exists.' ? true : false}
								/>
								<View style={{ position: 'relative' }}>
									<Password
										value={this.state.password}
										onChangeText={(password) => this.onChangePassword(password)}
										placeholderTextColor="#7E7D7F"
										secureTextEntry={this.state.hide === true ? true : false}
										placeholder="password"
										error={FailedLogin === 'Password is not correct.' ? true : false}
									/>
									{this.renderHidePassword()}
								</View>
								<TouchableOpacity onPress={() => this.forgotPassword()}>
									<ForgotPassword>Forgot password</ForgotPassword>
								</TouchableOpacity>
								<ButtonSignIn onPress={() => this.SignIn()}>
									<ButtonSignIn.Text>SIGN IN</ButtonSignIn.Text>
								</ButtonSignIn>
							</Container.Content>
						</Container>
					</Animated.View>
				</TouchableWithoutFeedback>
				{isLoadingLogin === true && <Indicator />}
				<SessionExpired isSessionExpired={isSessionExpired} changeSessionExpired={changeSessionExpired} />
			</ImageBackground>
		);
	}
}

export default Login;

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

Container.Content = styled.View``;

const Email = styled.TextInput`
	background-color: ${(props) => (props.error ? '#FADADB' : '#ffffff')};
	border-width: ${(props) => (props.error ? '1px' : '0px')};
	border-color: ${(props) => (props.error ? '#F26B3A' : '#ffffff')};
	height: ${hp('5%')};
	width: ${wp('60%')};
	margin-bottom: 10;
	padding-left: 10;
	padding-top: 5;
	color: #3b3b3b;
	font-weight: 400;
	font-size: ${hp('2.3%')};
`;

const Password = styled(Email)`
  margin-bottom: 0;
`;

const ForgotPassword = styled.Text`
	text-align: right;
	color: #ffffff;
	font-size: ${hp('2%')};
	font-style: italic;
	margin-top: -5;
`;

const ButtonSignIn = styled.TouchableOpacity`
	background: #54d769;
	padding: 25px 30px;
	margin-top: 25px;
	border-radius: 5px;
`;
ButtonSignIn.Text = styled.Text`
	color: #ffffff;
	font-weight: 800;
	text-align: center;
	font-size: ${hp('3%')};
`;
