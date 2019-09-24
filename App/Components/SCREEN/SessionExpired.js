import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Ionicons'
export default class SessionExpired extends Component {

    hideModal(){
        const {changeSessionExpired} = this.props;
        changeSessionExpired(false);
    }
    
    render() {
        const {isSessionExpired} = this.props;
        return (
            <Modal isVisible={isSessionExpired}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>Alert</Text>
                        <Icon name="md-alert" size={40} color="#ffffff" />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.textContent}>Sesion is expired !</Text>

                        <TouchableOpacity onPress={()=>this.hideModal()} style={styles.btnOK}>
                            <Text style={styles.txtOK}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp("50%"),
        height: hp("23%"),
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 5,
    },
    header: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A68AC',
        width:'100%',
        paddingVertical : hp("1%"),
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    textHeader : {
        color : '#ffffff',
        marginRight : 10,
        fontSize: hp("3%"),
        fontWeight:'500'
    },
    textContent: {
        color: '#333',
        fontWeight: '400',
        fontSize: hp("2.5%"),
    },
    content: {
        flex: 1,
        display: "flex",
        alignItems: 'center',
        width:'100%',
        paddingTop : hp("3%"),
    },
    btnOK:{
        width : '50%',
        paddingVertical: 15,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius : 3,
        backgroundColor : '#1A68AC',
        marginTop:hp("2.8%"),
        fontWeight : '600'
    },
    txtOK:{
        color :'#ffffff',
        fontSize:hp("2%"),
        fontWeight:'600'
    }
})