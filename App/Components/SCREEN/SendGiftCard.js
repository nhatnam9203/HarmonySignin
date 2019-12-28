import React, { PureComponent } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { scale } from '../../Services/util';
import { connect } from 'react-redux';
import Action from '../../Redux/SignIn/SignInRedux';
import Loading from './Loading';

class SendGiftCard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			phone: ''
		};
	}

	sendLink() {
		const { phone } = this.state;
		this.props.sendGiftCard({ phone });
	}

	goToService() {
		this.props.navigation.navigate('Service');
	}

	componentDidMount() {
		const { navigation } = this.props;
		let phone = navigation.getParam('phone', '');
		console.log(phone)
		if (phone) {
			phone = phone.toString().substring(1);
			this.setState({ phone });
		}
	}

	componentWillReceiveProps(nextProps) {
		const { navigation } = nextProps;
		let phone = navigation.getParam('phone', '');
		if (phone) {
			phone = phone.toString().substring(1);
			this.setState({ phone });
		}
	}

	render() {
		const { isLoadingSearchPhone } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: '#24244a', alignItems: 'center', paddingTop: scale(15) }}>
				<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1, width: '100%' }}>
					<Image source={require('../../Images/Logo.png')} style={styles.logo} />
					<View style={{ width: '64%', marginTop: scale(8) }}>
						<View style={styles.row}>
							<Image style={styles.imageConsumer} source={require('../../Images/Consumer.png')} />
							<View style={{ justifyContent: 'space-between', marginLeft: scale(8) }}>
								<Text style={styles.HPConsumer}>HP Consumer</Text>
								<Text style={styles.AppForConsumer}>App for consumer</Text>
							</View>
						</View>

						<Image style={styles.imageGiftCard} source={require('../../Images/BannerGiftCard.png')} />

						<Text style={styles.textBottom}>
							{`Book Appointment, Gift-card, and earn rewards when you use HarmonyPay App :-)`}
						</Text>

						<Text style={[ styles.textBottom, { fontWeight: '400' } ]}>
							Click "Yes" below to receive download link of HarmonyPay App via text message.
						</Text>

						<View style={[ styles.row, styles.containerButton ]}>
							<Button onPress={() => this.sendLink()} title="Yes" backgroundColor={'#5EBE61'} />
							<Button onPress={() => this.goToService()} title="No" backgroundColor={'#B71E13'} />
						</View>
					</View>
					<View style={{ width: 450 }} />
				</ScrollView>
				{isLoadingSearchPhone && <Loading />}
			</View>
		);
	}
}

const Button = ({ title = '', backgroundColor, onPress }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				width: scale(80),
				padding: scale(8),
				borderRadius: 5,
				backgroundColor,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text style={{ color: '#ffffff', fontWeight: '600', fontSize: scale(12) }}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	logo: {
		resizeMode: 'stretch',
		width: scale(100),
		height: scale(22)
	},
	row: {
		display: 'flex',
		flexDirection: 'row'
	},
	imageGiftCard: {
		width: '100%',
		height: '85%',
		marginTop: scale(8),
		resizeMode: 'contain'
	},
	imageConsumer: {
		width: scale(38),
		height: scale(38)
	},
	textBottom: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: scale(10),
		marginTop: scale(8)
	},
	containerButton: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: scale(15),
		paddingHorizontal: scale(10)
	},
	HPConsumer: {
		color: '#ffffff',
		fontWeight: '600',
		fontSize: scale(16)
	},
	AppForConsumer: {
		color: '#ffffff',
		fontWeight: '500',
		fontSize: scale(11)
	}
});

const mapStateToProps = (state) => ({
	isLoadingSearchPhone: state.signin.isLoadingSearchPhone
});

function mapDispatchToProps(dispatch) {
	return {
		sendGiftCard: (phone) => dispatch(Action.sendGiftcard(phone))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SendGiftCard);
