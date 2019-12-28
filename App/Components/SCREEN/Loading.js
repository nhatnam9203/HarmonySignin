import React, { Component } from 'react'
import { Text, View,ActivityIndicator } from 'react-native'
import { scale } from '../../Services/util';
const Loading = () => {
	return (
		<View
			style={{
				flex: 1,
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				justifyContent : 'center',
				alignItems : 'center',
				zIndex : 999
			}}
		>
			<View style={{
				width : scale(60),
				height : scale(60),
				borderRadius : 8,
				backgroundColor : 'rgba(0,0,0,0.6)',
				justifyContent : 'center',
				alignItems : 'center'
			}}>
				<ActivityIndicator color={'#ffffff'} size='large' />
			</View>
		</View>
	);
};

export default Loading
