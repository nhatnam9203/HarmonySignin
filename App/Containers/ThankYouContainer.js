
import ThankYou from '../Components/SCREEN/ThankYou'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'
const mapStateToProps = (state) => ({
    Info : state.signin.InfoCheckPhone,
    WaitingList : state.signin.WaitingList
});

function mapDispatchToProps(dispatch) {
    return {

    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(ThankYou);
