import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  item : {
    width: '100%',
    height: hp("10%"),
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 5,
    position: 'relative',
  },
  extra : {
    width: '100%',
    height: hp("10%"),
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 5,
    position: 'relative',
  },
  imgLeft: {
    width: "100%",
    resizeMode: "cover",
    height: "100%",

  },
  txtEstimate : {
    color: "#546778", fontSize: hp("1.6%") 
  },
  txtTotalPrie : {
    color: "#1266AF", fontWeight: "700", fontSize: hp("1.6%") 
  },

  imgItemCart : {
    width: "100%", resizeMode: "cover", height: "100%"
  },
  titleItem: {
    color: "#1266AF",
    fontWeight: "700",
    fontSize: hp("1.8%")
  },
  titleTotalWrapper: {
    color: "#546778",
    fontSize: hp("1.5%"),
    letterSpacing: 0.1,
    fontWeight:'300'
  },
  estimateWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    bottom: "-10%",
    width: "100%",
    height: "40%",
    paddingHorizontal: 10
  },
  btnTrash: {
    position: "absolute",
    top: "40%",
    right: "5%"
  },
  wrapperItemSelected: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center"
  },
  imgSelected: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 10
  },
  txtSelected: {
    color: "#7B99BA",
    fontWeight: "700",
    marginLeft : 10,
    fontSize:hp('1.5%'),
  },
  container: {
    width: wp("50%"), height: hp("25%"),
    backgroundColor: '#ffffff', alignSelf: 'center',
    borderRadius: 5, justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15
  },
  content: {
    display: 'flex',
    flex: 1, alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 30
  },
  confirm: {
    fontWeight: '700', fontSize: hp("3%"), color: '#1A68AC'
  },
  question: {
    color: '#494949', fontSize: hp("1.8%"), marginTop: 20, textAlign: 'center',letterSpacing:0.5
  },
  wrapperButton: {
    display: 'flex', flexDirection: 'row', height: '16%'
  },
  btnWrap: {
    width: '50%', justifyContent: 'center', alignItems: 'center',
  },
  btnYes: {
    backgroundColor: '#53D869', justifyContent: 'center', alignItems: 'center', width: '55%', paddingVertical: 8, borderRadius: 3
  },
  btnNo: {
    backgroundColor: '#FC0D1B', justifyContent: 'center', alignItems: 'center', width: '55%', paddingVertical: 8, borderRadius: 3
  },
  txtButton: {
    color: '#ffffff', fontWeight: "700", fontSize: hp("2%")
  }
});

export default styles;