import React, { Component } from 'react';
import {
	SafeAreaView,
	TouchableOpacity,
	Text,
	View,
	Image,
	StyleSheet,
	Alert,
	AsyncStorage,
	ScrollView,
	RefreshControl,
	StatusBar
} from 'react-native';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { pad, formatUsPhone } from '../../Services/util';
import Icon from 'react-native-vector-icons/Ionicons';
import { URL } from '../../app-constant';
import Indicator from '../Indicator';
import Modal from 'react-native-modal';
import { convertMinsToHrsMins } from '../../Services/util';
const signalR = require('@aspnet/signalr');

export default class WaitingList extends Component {
	constructor() {
		super();
		this.state = {
			itemchoosed: '',
			isModal: false,
			appointmentDetail: '',
			isRefresh: false
		};
	}

	reloadWaiting() {
		const { getWaitingList } = this.props;
		setInterval(() => {
			getWaitingList();
		}, 60000);
	}

	componentDidMount() {
		this.reloadWaiting();
		this.runSignalR();
		setInterval(() => {
			this.runSignalR();
		}, 60000);
	}

	async runSignalR() {
		const { getWaitingList } = this.props;
		let merchantInfo = await AsyncStorage.getItem('merchantInfo');
		merchantInfo = await JSON.parse(merchantInfo);
		const url = `${URL}/notification/?merchantId=${merchantInfo.merchantId}&Title=Merchant&kind=signin`;
		const connection = new signalR.HubConnectionBuilder()
			.configureLogging(signalR.LogLevel.Debug)
			.withUrl(url)
			.build();
		connection.on('ListWaNotification', (response) => {
			let app = JSON.parse(response);
			if (app.data) {
				let type = app.data.Type;
				if (type === 'appointment_update') {
					const appointment = JSON.parse(app.data.appointment);
					if (
						appointment.Status === 'checkin' ||
						appointment.Status === 'waiting' ||
						appointment.Status === 'cancel'
					) {
						getWaitingList();
					}
				}
				if (type === 'appointment_add') {
					const appointment = app.data.Appointment;
					if (appointment.Status === 'waiting') {
						getWaitingList();
					}
				}
				if (type === 'change_item') {
					const appointment = JSON.parse(app.data.appointment);
					if (appointment.Status === 'waiting') {
						getWaitingList();
					}
				}
				if (type === 'signin_reload') {
					getWaitingList();
				}
			}
		});
		connection.start();
	}

	chooseItem(index) {
		this.setState({ itemchoosed: index });
	}

	deleteAppointment(item) {
		const { cancelAppointment } = this.props;
		cancelAppointment(item);
	}

	getTotalWaitingTime() {
		const { waitingList } = this.props;
		if (waitingList.length > 0) {
			return waitingList[waitingList.length - 1].waitingTime;
		}
		return 0;
	}

	logoutApp() {
		const { logout } = this.props;
		Alert.alert(
			'Harmony Logout',
			'Are you sure want to leave ?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'OK', onPress: () => logout() }
			],
			{ cancelable: false }
		);
	}

	renderService(services) {
		return services.map((sv, i) => {
			return <ServiceName key={i}>- {sv.serviceName}</ServiceName>;
		});
	}

	renderProduct(products) {
		return products.map((pd, i) => {
			return <ServiceName key={i}>- {pd.productName}</ServiceName>;
		});
	}

	renderExtra(extras) {
		return extras.map((ex, i) => {
			return <ServiceName key={i}>- {ex.extraName}</ServiceName>;
		});
	}

	openModal(item) {
		this.setState({
			isModal: true,
			appointmentDetail: item
		});
	}

	closeModal() {
		this.setState({
			isModal: false
		});
	}

	renderServiceModal(services) {
		if (services.length > 0) {
			return (
				<React.Fragment>
					<Text style={{ color: '#1266AE', fontWeight: '700', fontSize: hp('2%') }}>Service</Text>

					<View
						style={{
							backgroundColor: '#F1F7FB',
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							padding: 15,
							marginTop: 10
						}}
					>
						<Text style={{ width: '50%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Name
						</Text>
						<Text style={{ width: '35%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Duration
						</Text>
						<Text style={{ width: '15%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Price
						</Text>
					</View>
					{services.map((sv, index) => {
						return (
							<View
								key={index}
								style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 15 }}
							>
								<Text style={{ width: '50%', color: '#333', fontSize: hp('1.6%') }}>
									{sv.serviceName}
								</Text>
								<Text style={{ width: '35%', color: '#333', fontSize: hp('1.6%') }}>
									{sv.duration} min
								</Text>
								<Text style={{ width: '15%', color: '#333', fontSize: hp('1.6%') }}>
									$ {parseFloat(sv.price).toFixed(2)}
								</Text>
							</View>
						);
					})}
				</React.Fragment>
			);
		}
	}

	renderProductModal(products) {
		if (products.length > 0) {
			return (
				<React.Fragment>
					<Text style={{ color: '#1266AE', fontWeight: '700', fontSize: hp('2%'), marginTop: 20 }}>
						Product
					</Text>
					<View
						style={{
							backgroundColor: '#F1F7FB',
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							padding: 15,
							marginTop: 10
						}}
					>
						<Text style={{ width: '50%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Name
						</Text>
						<Text style={{ width: '35%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Amount
						</Text>
						<Text style={{ width: '15%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Price
						</Text>
					</View>
					{products.map((product, index) => {
						return (
							<View
								key={index}
								style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 15 }}
							>
								<Text style={{ width: '50%', color: '#333', fontSize: hp('1.6%') }}>
									{product.productName}
								</Text>
								<Text style={{ width: '35%', color: '#333', fontSize: hp('1.6%') }}>
									{product.quantity}
								</Text>
								<Text style={{ width: '15%', color: '#333', fontSize: hp('1.6%') }}>
									$ {parseFloat(product.price).toFixed(2)}
								</Text>
							</View>
						);
					})}
				</React.Fragment>
			);
		}
	}

	renderExtraModal(extras) {
		if (extras.length > 0) {
			return (
				<React.Fragment>
					<Text style={{ color: '#1266AE', fontWeight: '700', fontSize: hp('2%'), marginTop: 20 }}>
						Extra
					</Text>
					<View
						style={{
							backgroundColor: '#F1F7FB',
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							padding: 15,
							marginTop: 10
						}}
					>
						<Text style={{ width: '50%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Name
						</Text>
						<Text style={{ width: '35%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Duration
						</Text>
						<Text style={{ width: '15%', color: '#333', fontWeight: '500', fontSize: hp('1.6%') }}>
							Price
						</Text>
					</View>
					{extras.map((extra, index) => {
						return (
							<View
								key={index}
								style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: 15 }}
							>
								<Text style={{ width: '50%', color: '#333', fontSize: hp('1.6%') }}>
									{extra.extraName}
								</Text>
								<Text style={{ width: '35%', color: '#333', fontSize: hp('1.6%') }}>
									{extra.duration} min
								</Text>
								<Text style={{ width: '15%', color: '#333', fontSize: hp('1.6%') }}>
									$ {parseFloat(extra.price).toFixed(2)}
								</Text>
							</View>
						);
					})}
				</React.Fragment>
			);
		}
	}

	renderTotalModal(appointmentDetail) {
		if (appointmentDetail) {
			const { services, products, extras } = appointmentDetail;
			let totalDuration = 0;
			let totalPrice = 0;
			for (let i = 0; i < services.length; i++) {
				totalDuration += parseFloat(services[i].duration);
				totalPrice += parseFloat(services[i].price);
			}
			for (let i = 0; i < extras.length; i++) {
				totalDuration += parseFloat(extras[i].duration);
				totalPrice += parseFloat(extras[i].price);
			}
			for (let i = 0; i < products.length; i++) {
				totalPrice += parseFloat(products[i].price) * parseFloat(products[i].quantity);
			}

			return (
				<View
					style={{
						backgroundColor: '#F1F7FB',
						display: 'flex',
						flexDirection: 'row',
						width: '100%',
						padding: 15,
						marginTop: 40
					}}
				>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: '50%',
							justifyContent: 'space-between',
							paddingRight: 50
						}}
					>
						<Text style={{ color: '#1266AF', fontWeight: '500', fontSize: hp('1.6%') }}>
							Total duration :
						</Text>
						<Text style={{ color: '#1266AF', fontWeight: '700', fontSize: hp('1.6%') }}>
							{totalDuration} min
						</Text>
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: '50%',
							justifyContent: 'space-between',
							paddingLeft: 50
						}}
					>
						<Text style={{ color: '#1266AF', fontWeight: '500', fontSize: hp('1.6%') }}>Total price :</Text>
						<Text style={{ color: '#1266AF', fontWeight: '700', fontSize: hp('1.6%') }}>
							$ {parseFloat(totalPrice).toFixed(2)}
						</Text>
					</View>
				</View>
			);
		}
	}

	renderEstimateWaitingModal(appointmentDetail) {
		if (appointmentDetail) {
			return (
				<View style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
					<Text style={{ color: '#333', fontSize: hp('1.6'), fontWeight: '600' }}>
						Estimate waiting time :{' '}
					</Text>
					<Text style={{ color: '#333', fontSize: hp('1.6'), fontWeight: '600' }}>
						{convertMinsToHrsMins(appointmentDetail.waitingTime)}
					</Text>
				</View>
			);
		}
	}

	renderDetailAppointment() {
		const { appointmentDetail } = this.state;
		const { userFullName, phoneNumber, id, products, services, extras, waitingTime, code } = appointmentDetail;
		const phoneHeader = phoneNumber
			? phoneNumber.toString().includes('+1') ? phoneNumber.substring(0, 2) : phoneNumber.substring(0, 3)
			: '';
		const phoneTail = phoneNumber
			? phoneNumber.toString().includes('+1') ? phoneNumber.substring(2) : phoneNumber.substring(3)
			: '';
		const phone = `(${phoneHeader}) ${formatUsPhone(phoneTail)}`;
		return (
			<Modal
				animationIn="zoomInUp"
				animationOut="slideOutDown"
				onBackdropPress={() => this.closeModal()}
				isVisible={this.state.isModal}
			>
				<View style={{ alignSelf: 'center', backgroundColor: '#ffffff', height: '90%', width: '90%' }}>
					<View
						style={{
							width: '100%',
							height: '10%',
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'row',
							backgroundColor: '#1266AF',
							justifyContent: 'center',
							position: 'relative'
						}}
					>
						<Text style={{ color: '#ffffff', fontWeight: '700', fontSize: hp('2.5%') }}>
							Appointment Detail
						</Text>
						<TouchableOpacity
							style={{ position: 'absolute', right: 20, top: '28%' }}
							onPress={() => this.closeModal()}
						>
							<Icon name="md-close" color="#ffffff" size={35} style={{ fontWeight: 900 }} />
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1, padding: 20 }}>
						<View style={{ display: 'flex', flexDirection: 'row' }}>
							<Text style={{ width: '40%', fontSize: hp('1.8%'), color: '#333', fontWeight: '500' }}>
								ID
							</Text>
							<Text style={{ fontSize: hp('1.8%'), color: '#333', fontWeight: '500' }}>#{code}</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
							<Text style={{ width: '40%', fontSize: hp('1.8%'), color: '#333', fontWeight: '500' }}>
								Customer
							</Text>
							<Text style={{ fontSize: hp('1.8%'), color: '#333', fontWeight: '500' }}>
								{userFullName}
							</Text>
						</View>
						<View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
							<Text style={{ width: '40%', fontSize: hp('1.8%'), color: '#333', fontWeight: '500' }}>
								Phone number
							</Text>
							<Text style={{ fontSize: hp('1.8%'), color: '#333', fontWeight: '500' }}>{phone}</Text>
						</View>
						<View style={{ marginTop: 10, borderWidth: 0.5, borderColor: '#dddddd' }} />
					</View>
					<View style={{ flex: 8, padding: 20 }}>
						<ScrollView showsVerticalScrollIndicator={false}>
							{services && this.renderServiceModal(services)}
							{products && this.renderProductModal(products)}
							{extras && this.renderExtraModal(extras)}
							{appointmentDetail && this.renderTotalModal(appointmentDetail)}
							{appointmentDetail && this.renderEstimateWaitingModal(appointmentDetail)}
						</ScrollView>
					</View>
				</View>
			</Modal>
		);
	}

	renderItemService() {
		const { itemchoosed } = this.state;
		const { waitingList } = this.props;
		return waitingList
			.sort(function(a, b) {
				var c = a.id;
				var d = b.id;
				return c - d;
			})
			.map((item, index) => {
				return (
					<Item onPress={() => this.openModal(item)} key={index}>
						<Position>
							<Position.Text>{pad(index + 1, 2)}</Position.Text>
						</Position>
						<CustomerName>{item.userFullName}</CustomerName>
						<AppointmentId>#{item.code}</AppointmentId>
						<RenderService>
							{this.renderService(item.services)}
							{this.renderProduct(item.products)}
							{this.renderExtra(item.extras)}
						</RenderService>
						<TimeWrapper>
							<Icon name="md-time" size={25} color="#586e82" style={{ marginTop: 2, marginRight: 3 }} />
							<Text style={styles.itemWaitingTime}>{convertMinsToHrsMins(item.waitingTime)}</Text>
						</TimeWrapper>
						{/* {index === itemchoosed && (<TouchableOpacity onPress={() => this.deleteAppointment(item)} style={styles.btnClose}>
            <Icon name="md-close" size={35} color="#EA3C39" />
          </TouchableOpacity>)} */}
					</Item>
				);
			});
	}

	renderNoItem() {
		return (
			<NoItem>
				<Text style={{ color: '#DADCDE', fontSize: hp('4%'), fontWeight: '600' }}>+</Text>
			</NoItem>
		);
	}

	renderItemWaiting() {
		const { waitingList } = this.props;
		if (waitingList.length > 0) {
			return this.renderItemService();
		}
		return this.renderNoItem();
	}

	renderBottom() {
		const { waitingList } = this.props;
		return (
			<WrapperSignIn>
				<SignInLeft>
					<SignInLeft.Item>
						<Image
							source={require('../../Images/people.png')}
							style={{ marginTop: -5, width: 20, resizeMode: 'contain' }}
						/>
						<Text style={styles.peopleQueue}>People in queue</Text>
						<Text style={styles.peopleCount}>{waitingList.length}</Text>
					</SignInLeft.Item>
					<SignInLeft.Item>
						<Image
							source={require('../../Images/waiting-icon.png')}
							style={{ marginTop: -5, width: 20, resizeMode: 'contain' }}
						/>
						<Text style={styles.txtEstimste}>Estimate waiting time</Text>
						<Text style={styles.txtWaitingTime}>{convertMinsToHrsMins(this.getTotalWaitingTime())}</Text>
					</SignInLeft.Item>
				</SignInLeft>
				<ButtonSignIn onPress={() => this.props.navigation.navigate('Search')}>
					<ButtonSignIn.Text>SIGN IN</ButtonSignIn.Text>
				</ButtonSignIn>
			</WrapperSignIn>
		);
	}

	onRefresh() {
		const { getWaitingList } = this.props;
		getWaitingList();
		this.setState({ isRefresh: true }, () => {
			setTimeout(() => {
				this.setState({ isRefresh: false });
			}, 300);
		});
	}

	render() {
		const { isLoadingWaitingList } = this.props;
		return (
			<React.Fragment>
				<SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6FC' }}>
					<View style={styles.backgroundHeader}>
						<Title>Waiting List</Title>
						<TouchableOpacity onPress={() => this.logoutApp()}>
							<Image source={require('../../Images/back-icon.png')} style={styles.btnBack} />
						</TouchableOpacity>
					</View>
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.isRefresh}
								onRefresh={() => this.onRefresh()}
								title="Pull to refresh"
							/>
						}
					>
						<Container>{this.renderItemWaiting()}</Container>
					</ScrollView>
					{this.renderBottom()}
					{isLoadingWaitingList && <Indicator />}
					{this.renderDetailAppointment()}
				</SafeAreaView>
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	txtEstimste: {
		color: '#565656',
		fontSize: hp('1.8%'),
		marginHorizontal: 20,
		width: 190
	},
	txtWaitingTime: {
		color: '#565656',
		fontWeight: '700',
		fontSize: hp('1.8%')
	},
	bottomItemLeft: {
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: 30,
		marginTop: 25
	},
	bottomItemLeftTop: {
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: 5
	},
	peopleQueue: {
		color: '#565656',
		fontSize: hp('1.8%'),
		marginHorizontal: 20,
		width: 190
	},
	peopleCount: {
		color: '#565656',
		fontWeight: '700',
		fontSize: hp('1.8%')
	},
	backgroundHeader: {
		height: '10%',
		justifyContent: 'center',
		position: 'relative',
		paddingLeft: 30,
		backgroundColor: '#1266AF'
	},
	btnBack: {
		alignSelf: 'flex-end',
		marginTop: -40,
		marginRight: 40
	},
	itemWaitingTime: {
		marginLeft: 10,
		color: '#565656',
		fontSize: hp('1.8%'),
		fontWeight: '700',
		marginTop: 3
	},
	btnClose: {
		position: 'absolute',
		right: 20,
		bottom: 0
	}
});

const Container = styled.View`
	padding: 30px;
	flex: 1;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const Title = styled.Text`
	font-size: ${hp('3.2%')};
	font-weight: 800;
	color: #ffffff;
	text-align: center;
	letter-spacing: 0.6;
`;
const Item = styled.TouchableOpacity`
	width: 100%;
	height: ${hp('19%')};
	background-color: #ffffff;
	padding: 15px;
	margin-right: 2%;
	margin-bottom: 15px;
	border-radius: 7px;
	box-shadow: 1px 1px 2px #dddddd;
	position: relative;
`;

const RenderService = styled.View`
	height: ${hp('8%')};
	background-color: #ffffff;
	overflow: hidden;
	margin-top: 5;
`;

const NoItem = styled.View`
	width: 100%;
	height: ${hp('21')};
	padding: 10px;
	border-radius: 3px;
	border: 2px dashed #dadcde;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Position = styled.TouchableOpacity`
	background-color: #1266af;
	border-radius: 50px;
	position: absolute;
	right: 10;
	top: 10;
	padding: 10px;
	z-index: 9999;
`;

Position.Text = styled.Text`
	color: #ffffff;
	font-size: ${hp('1.8%')};
	font-weight: 800;
`;

const CustomerName = styled.Text`
	font-weight: 800;
	font-size: ${hp('2.5%')};
	color: #1365af;
	margin-bottom: 5px;
`;

const AppointmentId = styled.Text`
	font-weight: 500;
	font-size: ${hp('2%')};
	color: #586e82;
`;

const ServiceName = styled.Text`
	font-size: ${hp('2%')};
	color: #586e82;
	font-weight: 400;
	margin-top: 3;
	letter-spacing: 0.4;
`;

const NoService = styled(ServiceName)`

  font-weight : 300;
  font-size: ${hp('2.2%')};
`;
const TimeWrapper = styled.View`
	display: flex;
	flex-direction: row;
	position: absolute;
	right: 10px;
	bottom: 3px;
	justify-content: center;
	align-items: stretch;
`;
const WrapperSignIn = styled.View`
	background-color: #ffffff;
	padding: 20px;
	width: 100%;
	height: 11%;
	display: flex;
	flex-direction: row;
	border: 1px solid #dddddd;
`;
WrapperSignIn.Item = styled.View`
	width: 50%;
	background: transparent;
	padding-left: 15px;
	display: flex;
	justify-content: space-between;
	align-items: stretch;
`;
const ButtonSignIn = styled.TouchableOpacity`
	width: 40%;
	justify-content: center;
	align-items: center;
	background-color: #54d76a;
	border-radius: 3px;
	margin-left: 9%;
`;

const SignInLeft = styled.View`
	width: 50%;
	align-items: stretch;
	justify-content: space-between;
	display: flex;
	flex-direction: column;
	padding-left: 20px;
	padding-right: 20px;
`;
SignInLeft.Item = styled.View`
	display: flex;
	flex-direction: row;
`;

ButtonSignIn.Text = styled.Text`
	font-size: ${hp('2.7%')};
	color: #ffffff;
	font-weight: 700;
`;
