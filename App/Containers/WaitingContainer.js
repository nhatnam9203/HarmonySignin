
import WaitingList from '../Components/SCREEN/WaitingList'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'
const mapStateToProps = (state) => ({
    InfoLogin : state.signin.InfoLogin,
    waitingList : state.signin.WaitingList,
    isLoadingWaitingList : state.signin.isLoadingWaitingList,
});

function mapDispatchToProps(dispatch) {
    return {
        getWaitingList : ()=>dispatch(Action.getWaitingList()),
        cancelAppointment : (app)=>dispatch(Action.cancelAppointment(app)),
        logout:()=>dispatch(Action.logout()),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(WaitingList);
