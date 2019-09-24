import React, { Component } from 'react'
import { ActivityIndicator,View } from 'react-native'

export default class Indicator extends Component {
    render() {
        return (
            <View style={{position :'absolute', top :'50%',right : '50%'}}>
                <ActivityIndicator size="large" color='#1A68AC' />
            </View>
        )
    }
}
