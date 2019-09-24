
import CustomerInfo from '../Components/SCREEN/CustomerInfo'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'
const mapStateToProps = (state) => ({
    Info : state.signin.InfoCheckPhone,
    isLoadingAddUser : state.signin.isLoadingAddUser,
});

function mapDispatchToProps(dispatch) {
    return {
        addNewUser : (info)=>dispatch(Action.addNewUser(info)),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(CustomerInfo);
