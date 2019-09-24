
import Search from '../Components/SCREEN/Search'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'
const mapStateToProps = (state) => ({
    isLoadingSearchPhone : state.signin.isLoadingSearchPhone,
});

function mapDispatchToProps(dispatch) {
    return {
        searchByPhone : (phone)=>dispatch(Action.searchByPhone(phone)),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Search);
