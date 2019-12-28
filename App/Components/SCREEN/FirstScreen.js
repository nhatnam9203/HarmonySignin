import React, { Component } from 'react';
import { ImageBackground, AsyncStorage, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Action from '../../Redux/SignIn/SignInRedux'

class FirstScreen extends Component {
	componentWillMount() {
		AsyncStorage.getItem('merchantInfo')
			.then((result) => {
				if (result) {
					this.props.getWaitingList();
				} else {
					this.props.navigation.navigate('Login');
				}
			})
			.catch((err) => {});
	}

	render() {
		// return(
		//     <ImageBackground style={{ flex: 1 }} source={require('../../Images/welcome.jpg')} resizeMode="cover" />
		// )
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return {
        getWaitingList : ()=>dispatch(Action.getWaitingList()),
    };
  }

export default connect(null,mapDispatchToProps)(FirstScreen);