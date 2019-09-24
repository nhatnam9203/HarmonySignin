
import Welcome from '../Components/SCREEN/Welcome'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'
const mapStateToProps = (state) => ({
    Info : state.signin.InfoCheckPhone
});

function mapDispatchToProps(dispatch) {
    return {
        
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Welcome);
