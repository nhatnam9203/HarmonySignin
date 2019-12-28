import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AsyncStorage } from 'react-native'

const { Types, Creators } = createActions({
  loginRequest: ['merchantInfo'],
  loginSuccess: ['data'],
  loginFailed: ['data'],
  getWaitingList: null,
  getWaitingListSuccess: ['data'],
  getWaitingListError: ['data'],
  checkLoginLoading: ['data'],
  loadingForgot: ['data'],
  searchRequest: ['phone'],
  searchSuccess: ['data'],
  searchFailure: null,
  getAppointment: null,
  getAppointmetSuccess: ['data'],
  getAppointmentFailure: null,
  addServiceToCart: ['data'],
  addProductToCart: ['data'],
  addExtraToCart: ['data'],
  addAppointment : ['data'],
  deleteItemInCart: ['data'],
  forgotPassword: ['data'],
  forgotPasswordSuccess: ['data'],
  searchByPhone: ['phone'],
  searchByPhoneSuccess: ['data'],
  addNewUser: ['data'],
  loadingAddUser: ['data'],
  loadingSearchPhone : ['data'],
  getService: null,
  getProduct: null,
  getExtra: null,
  getServiceSuccess: ['data'],
  getProductSuccess: ['data'],
  getExtraSuccess: ['data'],
  getWaitingTime : null,
  getWaitingTimeSuccess : ['data'],
  loadingService: ['data'],
  getCategoryByMerchant: null,
  getCategoryByMerchantSuccess: ['data'],
  getServiceByCategoryId: ['data'],
  getServiceByCategoryIdSuccess: ['data'],
  plusQuantity: ['data'],
  minusQuantity: ['data'],
  setAnimatedScroll : ['data'],
  loadingAddAppointment : ['data'],
  loadingWaitingList : ['data'],
  setCartNull : [],
  cancelAppointment : ['data'],
  logout : null,
  updateAppointment : ['data'],
  changeSessionExpired : ['data'],
  runSignal : null,
  sendGiftcard : ['data']
});
export const SigninTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  FailedLogin: '',
  InfoLogin: {},
  test: '',
  WaitingList: [],
  Customer: '',
  Service: [],
  Product: [],
  Extra: [],
  Cart: [],
  token: '',
  isLoadingLogin: false,
  isLoadingSearch: false,
  isLoadingForgot: false,
  isLoadingAddUser: false,
  isLoadingAddAppointment: false,
  isLoadingService: false,
  isLoadingProduct: false,
  isLoadingSearchPhone : false,
  isLoadingAddAppointment : false,
  isLoadingWaitingList : false,
  isSessionExpired : false,
  PasswordForgot: '',
  InfoCheckPhone: '',
  CustomerInfo: '',
  AlertForgotPassword: '',
  ServiceList: [],
  ProductList: [],
  ExtraList: [],
  CategoryList: [],
  AnimatedScroll : false ,
  WaitingTimeMerchant : '',
})


const login_success = (state, action) => {
  const info = action.data.data;
  AsyncStorage.setItem('token', JSON.stringify(info.token));
  AsyncStorage.setItem('merchantInfo', JSON.stringify(info.merchant));
  return {
    ...state,
    InfoLogin: info.merchant,
    token: info.token
  };
};
const login_failed = (state, action) => {
  const { data } = action.data;
  return {
    ...state,
    FailedLogin: data
  };
}

const checkLoginLoading = (state, action) => {
  const { data } = action;
  return {
    ...state,
    isLoadingLogin: data
  }
}

const findPassword = (state, action) => {
  const { data } = action;
  return {
    ...state,
    ForgotPassword: data
  }
};

const getWaitngListSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    WaitingList: data
  }
};

searchPhoneSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    InfoCheckPhone: data
  }
}

loadingForgot = (state, action) => {
  const { data } = action;
  return {
    ...state,
    isLoadingForgot: data,
  }
}

loadingAddUser = (state, action) => {
  const { data } = action;
  return {
    ...state,
    isLoadingAddUser: data,
  }
}

forgotPasswordSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    AlertForgotPassword: data,
  }
}

getServiceSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    ServiceList: data,
  }
};

getProductSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    ProductList: data,
  }
};

getExtraSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    ExtraList: data,
  }
}

loadingService = (state, action) => {
  const { data } = action;
  return {
    ...state,
    isLoadingService: data,
  }
}

getCategorySuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    CategoryList: data,
  }
}
getServiceByCategoryIdSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    ServiceList: data,
  }
}

const addService_ToCart = (state, action) => {
  const { data } = action;
  const pos = state.Cart.findIndex(item => item.serviceId === data.serviceId);
  if (pos === -1) {
    return {
      ...state,
      Cart: [...state.Cart,data],
    }
  }
  return { ...state };
}

const deleteItemInCart = (state, action) => {
  const { data } = action;

  if (data.serviceId && !data.extraId) {
    const pos = state.Cart.findIndex(item => item.serviceId === data.serviceId);
    if (pos === -1) {
      return {
        ...state,
      }
    }
    return {
      ...state,
      Cart: state.Cart.filter(sv => sv.serviceId !== state.Cart[pos].serviceId),
    };
  }
  if (data.extraId) {
    const pos = state.Cart.findIndex(item => item.extraId === data.extraId);
    if (pos === -1) {
      return {
        ...state,
      }
    }
    return {
      ...state,
      Cart: state.Cart.filter(sv => sv.extraId !== state.Cart[pos].extraId),
    };
  }
  if (data.productId) {
    let ProductList = [...state.ProductList];
    const pos_product = state.ProductList.findIndex(p=>p.productId === data.productId);
    ProductList[pos_product].quantity += data.quantity;
    const pos = state.Cart.findIndex(item => item.productId === data.productId);
    if (pos === -1) {
      return {
        ...state,
      }
    }
    return {
      ...state,
      Cart: state.Cart.filter(sv => sv.productId !== state.Cart[pos].productId),
    };
  }
}

const addExtraToCart = (state, action) => {
  const { data } = action;
  const pos = state.Cart.findIndex(item => item.extraId === data.extraId);
  if (pos === -1) {
    return {
      ...state,
      Cart: [...state.Cart,data],
    }
  }
  return { ...state };
}


const addProductToCart = (state, action) => {
  const { data } = action;
  let { product, quantityCheck } = data;
  let Cart = [...state.Cart];
  let ProductList = [...state.ProductList];
  const pos_product = state.ProductList.findIndex(item => item.productId === product.productId);
  const pos = state.Cart.findIndex(item => item.productId === product.productId);
  if (ProductList[pos_product].quantity - product.quantity < 0) {
    alert('Quantiy is over !!!');
    return { ...state }
  }
  if (pos === -1) {
    ProductList[pos_product].quantity -= product.quantity;
    return {
      ...state,
      Cart: [...state.Cart,product],
      ProductList: [...ProductList]
    }
  }

  ProductList[pos_product].quantity -= product.quantity;
  Cart[pos].quantity += product.quantity;
  return {
    ...state,
    Cart: Cart,
    ProductList: [...ProductList]
  }
}

plusQuantity = (state, action) => {
  const { data } = action;
  const { product, quantity } = data;
  let ProductList = [...state.ProductList];
  const pos = state.ProductList.findIndex(item => item.productId === product.productId);
  if (pos === -1) return { ...state };
  ProductList[pos].quantity -= 1;
  return {
    ...state,
    ProductList
  }
}

minusQuantity = (state, action) => {
  const { data } = action;
  const { product, quantity } = data;
  let ProductList = [...state.ProductList];
  const pos = state.ProductList.findIndex(item => item.productId === product.productId);
  if (pos === -1) return { ...state };
  ProductList[pos].quantity += 1;
  return {
    ...state,
    ProductList
  }
}

setAnimatedScroll=(state,action)=>{
  return {
    ...state,
    AnimatedScroll : action.data
  }
}

loadingAddAppointment=(state,action)=>{
  return {
    ...state,
    isLoadingAddAppointment : action.data
  }
}

setCartNull=(state,action)=>{
  return{
    ...state,
    Cart : []
  }
}

loadingSearchPhone=(state,action)=>{
  return{
    ...state,
    isLoadingSearchPhone : action.data
  }
}

loadingWaitingList=(state,action)=>{
  return{
    ...state,
    isLoadingWaitngList : action.data
  }
}

updateAppointment=(state,action)=>{
  return{
    ...state,
    WaitingList : [action.data,...state.WaitingList]
  }
}

changeSessionExpired=(state,action)=>{
  return{
    ...state,
    isSessionExpired : action.data
  }
}

getWaitingTimeSuccess=(state,action)=>{
  return{
    ...state,
    WaitingTimeMerchant : action.data
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCCESS]: login_success,
  [Types.CHECK_LOGIN_LOADING]: checkLoginLoading,
  [Types.LOGIN_FAILED]: login_failed,
  [Types.FORGOT_PASSWORD]: findPassword,
  [Types.GET_WAITING_LIST_SUCCESS]: getWaitngListSuccess,
  [Types.SEARCH_BY_PHONE_SUCCESS]: searchPhoneSuccess,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.LOADING_FORGOT]: loadingForgot,
  [Types.LOADING_ADD_USER]: loadingAddUser,
  [Types.GET_SERVICE_SUCCESS]: getServiceSuccess,
  [Types.GET_PRODUCT_SUCCESS]: getProductSuccess,
  [Types.GET_EXTRA_SUCCESS]: getExtraSuccess,
  [Types.LOADING_SERVICE]: loadingService,
  [Types.GET_CATEGORY_BY_MERCHANT_SUCCESS]: getCategorySuccess,
  [Types.ADD_SERVICE_TO_CART]: addService_ToCart,
  [Types.DELETE_ITEM_IN_CART]: deleteItemInCart,
  [Types.ADD_EXTRA_TO_CART]: addExtraToCart,
  [Types.ADD_PRODUCT_TO_CART]: addProductToCart,
  [Types.PLUS_QUANTITY]: plusQuantity,
  [Types.MINUS_QUANTITY]: minusQuantity,
  [Types.SET_ANIMATED_SCROLL]: setAnimatedScroll,
  [Types.LOADING_ADD_APPOINTMENT]: loadingAddAppointment,
  [Types.SET_CART_NULL]: setCartNull,
  [Types.LOADING_SEARCH_PHONE]: loadingSearchPhone,
  [Types.LOADING_WAITING_LIST]: loadingWaitingList,
  [Types.UPDATE_APPOINTMENT]: loadingWaitingList,
  [Types.CHANGE_SESSION_EXPIRED]: changeSessionExpired,
  [Types.GET_WAITING_TIME_SUCCESS]: getWaitingTimeSuccess,
});

export const SignInSelectors = {
  InfoLogin: state => state.signin.test
};


