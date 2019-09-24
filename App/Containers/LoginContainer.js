
import Login from '../Components/SCREEN/Login'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'
const mapStateToProps = (state) => ({
    test : state.signin.test,
    isLoadingLogin : state.signin.isLoadingLogin,
    FailedLogin : state.signin.FailedLogin,
    isSessionExpired : state.signin.isSessionExpired
});

function mapDispatchToProps(dispatch) {
    return {
        login : (user)=>dispatch(Action.loginRequest(user)),
        loginFailed : (user)=>dispatch(Action.loginFailed(user)),
        changeSessionExpired : (data)=>dispatch(Action.changeSessionExpired(data)),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Login);
