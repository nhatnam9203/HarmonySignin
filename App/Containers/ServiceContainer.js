import {} from 'react-redux';
import Services from '../Components/SCREEN/Services/index'
import { connect } from 'react-redux';
import Action from '../Redux/SignIn/SignInRedux'

const mapStateToProps =  (state) => ({
    ServiceList : state.signin.ServiceList,
    ProductList : state.signin.ProductList,
    ExtraList : state.signin.ExtraList,
    isLoadingService : state.signin.isLoadingService,
    CategoryList : state.signin.CategoryList,
    Cart : state.signin.Cart,
    AnimatedScroll : state.signin.AnimatedScroll,
    InfoCheckPhone : state.signin.InfoCheckPhone,
    InfoLogin : state.signin.InfoLogin,
    isLoadingAddAppointment : state.signin.isLoadingAddAppointment,
    WaitingTimeMerchant : state.signin.WaitingTimeMerchant,
});

function mapDispatchToProps(dispatch) {
    return {
        addServiceToCart : (sv)=>dispatch(Action.addServiceToCart(sv)),
        addProductToCart : (product)=>dispatch(Action.addProductToCart(product)),
        addExtraToCart : (extra)=>dispatch(Action.addExtraToCart(extra)),
        deleteItemInCart : (service)=>dispatch(Action.deleteItemInCart(service)),
        getService : (service)=>dispatch(Action.getService(service)),
        getProduct : (product)=>dispatch(Action.getProduct(product)),
        getExtra : (extra)=>dispatch(Action.getExtra(extra)),
        getCategoryByMerchant : ()=>dispatch(Action.getCategoryByMerchant()),
        getServiceByCategoryId : (idCategory)=>dispatch(Action.getServiceByCategoryId(idCategory)),
        plusQuantity : (data)=>dispatch(Action.plusQuantity(data)),
        minusQuantity : (data)=>dispatch(Action.minusQuantity(data)),
        setAnimatedScroll : (data)=>dispatch(Action.setAnimatedScroll(data)),
        addAppointment : (data)=>dispatch(Action.addAppointment(data)),
        getWaitingTime : (data)=>dispatch(Action.getWaitingTime(data)),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Services);
