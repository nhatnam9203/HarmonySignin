import React, { Component } from 'react'
import {ImageBackground,AsyncStorage } from 'react-native'

export default class FirstScreen extends Component {

    componentDidMount(){
        AsyncStorage.getItem("merchantInfo").then((result) => {
            if(result){
                setTimeout(() => {
                    this.props.navigation.navigate("WaitingList");
                }, 2000);
            }else{
                setTimeout(() => {
                    this.props.navigation.navigate("Login");
                }, 2000);
            }
        }).catch((err) => {
            
        });
    }

    render() {
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../Images/welcome.jpg')}
                resizeMode='cover'
            />
        )
    }
}
 


