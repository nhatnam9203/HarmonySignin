
import ForgotPassword from '../Components/SCREEN/ForgotPassword'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'
const mapStateToProps = (state) => ({
    AlertForgotPassword : state.signin.AlertForgotPassword,
    isLoadingForgot : state.signin.isLoadingForgot,
});

function mapDispatchToProps(dispatch) {
    return {
        forgotPassword : (info)=>dispatch(Action.forgotPassword(info)),
        resetAlertForgotPassword : (data)=>dispatch(Action.forgotPasswordSuccess(data)),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);
