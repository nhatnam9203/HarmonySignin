import { put, select } from 'redux-saga/effects'
import SigninActions from '../Redux/SignIn/SignInRedux'
import { CallAPI_GET, CallAPI_POST, CallAPI_PUT } from '../Services/util'
import {
  POST_LOGIN,
  GET_SEARCH_PHONE,
  GET_APPOINTMENT_BY_STATUS,
  POST_ADD_APPOINTMENT,
  POST_ADD_NEW_USER,
  GET_BY_PHONE,
  GET_FORGOT_PASSWORD,
  GET_EXTRAS,
  GET_PRODUCTS,
  GET_SERVICES,
  GET_SERVICE_BY_CATEGORY,
  GET_CATEGORY_BY_MERCHANT,
  PUT_UPDATE_STATUS_APPOINTMENT,
  PUT_UPDATE_APPOINTMENT,
  GET_WAITING_TIME,
  GET_SEND_GIFTCARD
} from '../app-constant'
import { NavigationActions } from 'react-navigation'
import axios from 'axios';
import { AsyncStorage } from 'react-native'
import moment from 'moment';

const appointmentAdapter = (appointment) => {
  return {
    id: appointment.appointmentId,
    code : appointment.code,
    userFullName: appointment.firstName + ' ' + appointment.lastName,
    phoneNumber: appointment.phoneNumber,
    services: appointment.services,
    products: appointment.products,
    extras: appointment.extras,
    status: appointment.status,
    staffId: appointment.staffId,
    fromTime: appointment.fromTime,
    toTime: appointment.toTime,
    userId: appointment.userId,
    createDate: appointment.createdDate,
    tipPercent: appointment.tipPercent,
    tipAmount: appointment.tipAmount,
    subTotal: appointment.subTotal,
    tax: appointment.tax,
    giftCard: appointment.giftCard,
    waitingTime: appointment.waitingTime,
    total: appointment.total,
    notes: appointment.notes === null ? [] : appointment.notes,
  };
}

const servicesAdapter = service => {
  return {
    serviceId: service.serviceId,
    name: service.name,
    duration: service.duration,
    price: service.price,
    tax: service.tax,
    discount: service.discount,
    imgService: service.imageUrl,
    description: service.description,
    extras : service.extras
  };
};
const productsAdapter = product => {
  return {
    productId: product.productId,
    name: product.name,
    quantity: product.quantity,
    price: product.price,
    description: product.description,
    imgProduct: product.imageUrl,
  };
};
const extrasAdapter = extra => {
  return {
    duration: extra.duration,
    extraId: extra.extraId,
    name: extra.name,
    price: extra.price,
    quantity: extra.quantity,
    description: extra.description,
    price: extra.price,
    tax: extra.tax,
    discount: extra.discount,
    imgExtra: extra.imageUrl,
  };
};


function checkTimeToAddAppointmdent() {
  let time = moment();
  let time_15 = moment().startOf('hours').add(15, 'minutes');
  let time_30 = moment().startOf('hours').add(30, 'minutes');
  let time_45 = moment().startOf('hours').add(45, 'minutes');
  let time_60 = moment().startOf('hours').add(60, 'minutes');
  if (time.isBefore(time_15)) {
    time = time_15;
  }
  if (time.isBetween(time_15, time_30)) {
    time = time_30;
  }
  if (time.isBetween(time_30, time_45)) {
    time = time_45;
  }
  if (time.isBetween(time_45, time_60)) {
    time = time_60;
  }
  return time.format('YYYY-MM-DD HH:mm');
}

export function* LoginSaga(action) {
  yield put(SigninActions.checkLoginLoading(true));
  const { merchantInfo } = action;
  const { email, password } = merchantInfo;
  const response = yield axios.post(POST_LOGIN, { email, password,isSignIn : 1 }).then((result) => {
    return result;
  }).catch((err) => {
    alert(err);
  });
  if (response && (response.status === 200) && response.data) {
    const data = response.data;
    if (data.data === null) {
      if (data.message === "Your Email is not exists.") {
        yield put(SigninActions.checkLoginLoading(false));
        yield put(SigninActions.loginFailed({ data: data.message }));
        return;
      }
      if (data.message === "Password is not correct.") {
        yield put(SigninActions.checkLoginLoading(false));
        yield put(SigninActions.loginFailed({ data: data.message }));
        return;
      }
    }

    yield put(SigninActions.loginSuccess({ data: data.data }));
    yield put(SigninActions.checkLoginLoading(false));
    yield put(SigninActions.getWaitingList()); //gọi tới get appoointment by status (saga)
    yield put(NavigationActions.navigate({ routeName: 'Waiting' }));
  }
  if (response && response.status === 400) {
    yield put(SigninActions.checkLoginLoading(false));
    alert("Error Network")
  }
  else {
    yield put(SigninActions.checkLoginLoading(false));
    yield put(SigninActions.loginFailed('Error Login'));
  }
}

export function* GetAppointmentByStatusSaga() {
  yield put(SigninActions.loadingWaitingList(true));
  const timeZone = new Date().getTimezoneOffset();
  const url = `${GET_APPOINTMENT_BY_STATUS}waiting&timezone=${timeZone}`;
  const token = yield AsyncStorage.getItem('token');
  const response = yield CallAPI_GET(url, JSON.parse(token));
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    const data = response.data;
    let waitingAppointment = data.codeStatus === 1 ? data.data : [];
    waitingAppointment = waitingAppointment.map(app => appointmentAdapter(app));
    yield put(SigninActions.getWaitingListSuccess(waitingAppointment));
    yield put(NavigationActions.navigate({ routeName: 'Waiting' }));
  } else {
    yield put(SigninActions.getWaitingListError(response.data))
  }
  yield put(SigninActions.loadingWaitingList(false));
}

function* checkToken() {
  
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('merchantInfo');
  yield put(NavigationActions.navigate({ routeName: 'Login',params:{refresh : 1} }));
  yield put(SigninActions.changeSessionExpired(true));
}

export function* searchByPhoneSaga(action) {
  yield put(SigninActions.loadingSearchPhone(true));
  const { phone } = action; // data = phone;
  const token = yield AsyncStorage.getItem('token');
  const url = `${GET_BY_PHONE}/${phone}`;
  const response = yield CallAPI_GET(url, JSON.parse(token));
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    const data = response.data;
    if (data.codeStatus === 2) {// phone ko co trong database
      yield put(SigninActions.searchByPhoneSuccess({ phoneToAdd: phone }));
    }
    if (data.codeStatus === 1) {
      yield put(SigninActions.searchByPhoneSuccess(data.data));
    }
    yield put(NavigationActions.navigate({ routeName: 'CustomerInfo' }));
  } else {
    alert('Error!!!');
  }
  yield put(SigninActions.loadingSearchPhone(false));
}

export function* addNewUserSaga(action) {
  yield put(SigninActions.loadingAddUser(true));
  const { FirstName, LastName, Email, Phone, referrerPhone, favourite } = action.data;
  const info = {
    FirstName,
    LastName,
    Email,
    Phone,
    referrerPhone,
    favourite,
  }

  const token = yield AsyncStorage.getItem('token');
  const url = POST_ADD_NEW_USER;
  const response = yield CallAPI_POST(url, JSON.parse(token), info);
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    const userInfo = response.data;

    yield put(SigninActions.searchByPhoneSuccess(userInfo.data));
    yield put(NavigationActions.navigate({ routeName: 'SendGiftCard',params : {phone : Phone} }));
  } else {
    alert('Error !!!')
  }
  yield put(SigninActions.loadingAddUser(false));
}

export function* ForgotPasswordSaga(action) {
  yield put(SigninActions.loadingForgot(true));
  const email = action.data;
  const url = `${GET_FORGOT_PASSWORD}?email=${email}`;
  const response = yield yield axios.get(url).then((result) => {
    return result;
  }).catch((err) => {
    alert(err);
  });
  if (response.status === 200) {
    if (response.data.codeStatus !== 1) {
      alert(response.data.message)
    }
    else {
      yield put(SigninActions.forgotPasswordSuccess(response.data.message));
    }
  } else {
    alert('Error !!!');
  }
  yield put(SigninActions.loadingForgot(false));
}

export function* getCateggorySaga() {
  const token = yield AsyncStorage.getItem('token');
  let merchantInfo = yield AsyncStorage.getItem('merchantInfo');
  merchantInfo = JSON.parse(merchantInfo);
  const url = `${GET_CATEGORY_BY_MERCHANT}/${merchantInfo.merchantId}`;
  const response = yield CallAPI_GET(url, JSON.parse(token));
  const service_by_category = response.data.data ? response.data.data.filter(ct => ct.categoryType === "Service" && ct.isDisabled === 0) : [];
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    const firstIdService = service_by_category.length > 0 ? service_by_category[0].categoryId : '';

    yield put(SigninActions.getCategoryByMerchantSuccess(service_by_category));
    yield put(SigninActions.getServiceByCategoryId(firstIdService));
  } else {
    alert('Error Get category by merchant!!!');
  }
}

export function* GetServiceSaga() {
  yield put(SigninActions.loadingService(true));
  const token = yield AsyncStorage.getItem('token');

  const url_product = GET_PRODUCTS;
  const response_product = yield CallAPI_GET(url_product, JSON.parse(token));

  if (response_product.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    let productList = response_product.data.data.map(product => productsAdapter(product))
    yield put(SigninActions.getProductSuccess(productList));
  } else {
    alert('Error Get Product!!!');
  }
  const url_extra = GET_EXTRAS;
  const response_extra = yield CallAPI_GET(url_extra, JSON.parse(token));
  if (response_extra.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    console.log(response_extra.data.data);
    let extraList = response_extra.data.data.map(extra => extrasAdapter(extra));
    yield put(SigninActions.getExtraSuccess(extraList));
  } else {
    alert('Error !!!');
  }
  yield put(SigninActions.loadingService(false));
}

export function* GetProductSaga() {
  const token = yield AsyncStorage.getItem('token');
  const url = GET_PRODUCTS;
  const response = yield CallAPI_GET(url, JSON.parse(token));
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    let productList = response.data.data.map(product => productsAdapter(product))
    yield put(SigninActions.getProductSuccess(productList));
  } else {
    alert('Error !!!');
  }
}

export function* GetExtraSaga() {
  const token = yield AsyncStorage.getItem('token');
  const url = GET_EXTRAS;
  const response = yield CallAPI_GET(url, JSON.parse(token));
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    let extraList = response.data.data.map(extra => extrasAdapter(extra));
    yield put(SigninActions.getExtraSuccess(extraList));
  } else {
    alert('Error !!!');
  }
}

export function* GetServiceByCategoryIdSaga(action) {
  const categoryId = action.data;
  const token = yield AsyncStorage.getItem('token');
  const url = `${GET_SERVICE_BY_CATEGORY}/${categoryId}`;
  const response = yield CallAPI_GET(url, JSON.parse(token));
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    let serviceList = response.data.data.map(sv => servicesAdapter(sv));
    yield put(SigninActions.getServiceSuccess(serviceList));
  } else {
    alert('Error !!!');
  }
}

function checkServiceInCart(Cart) {
  Cart.forEach(el => {
    if (el.serviceId) {
      return 1;
    }
  });
  return 0;
}

export function* addAppointmentSaga(action) {
  const { InfoLogin, InfoCheckPhone, Cart } = action.data;
  const token = yield AsyncStorage.getItem('token');
  const url = POST_ADD_APPOINTMENT;

  yield put(SigninActions.loadingAddAppointment(true));
  const dataSubmit = {
    staffId: 0,
    merchantId: InfoCheckPhone.merchantId,
    status: 'waiting',
    userId: InfoCheckPhone.userId,
    customerId : InfoCheckPhone.customerId,
    fromTime: checkTimeToAddAppointmdent(),
    toTime: moment(checkTimeToAddAppointmdent()).add(15, 'minutes').format('YYYY-MM-DD HH:mm'),
    services: Cart.filter(item => item.serviceId && !item.extraId),
    products: Cart.filter(item => item.productId),
    extras: Cart.filter(item => item.extraId),
  }

  const response = yield CallAPI_POST(url, JSON.parse(token), dataSubmit);

  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    yield put(SigninActions.loadingAddAppointment(false));
    yield put(SigninActions.getWaitingList());
    yield put(SigninActions.setCartNull());
    yield put(NavigationActions.navigate({ routeName: 'WaitingList' }));
  } else {
    alert('Error !!!');
  }
  yield put(SigninActions.loadingAddAppointment(false));
}

export function* CancelAppointmentSaga(action) {
  const { id } = action.data;
  const token = yield AsyncStorage.getItem('token');
  const url = `${PUT_UPDATE_APPOINTMENT}/${id}`;
  const dataSubmit = {
    ...action.data,
    status: 'cancel'
  }
  const response = yield CallAPI_PUT(url, JSON.parse(token), dataSubmit);
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    yield put(SigninActions.getWaitingList());
  }
}


export function* SendGiftCardSaga(action) {
  yield put(SigninActions.loadingSearchPhone(true));
  const { phone } = action.data;
  const token = yield AsyncStorage.getItem('token');
  const url = `${GET_SEND_GIFTCARD}${phone}`;
  const response = yield CallAPI_GET(url, JSON.parse(token));
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    if(response.data.codeStatus === 1){
      yield put(SigninActions.loadingSearchPhone(false));
      yield put(NavigationActions.navigate({routeName : 'Service'}));
      return;
    }
  }
  yield put(SigninActions.loadingSearchPhone(false));
}

export function* getWaitingTimeSaga() {
  let merchantInfo = yield AsyncStorage.getItem('merchantInfo');
  merchantInfo = JSON.parse(merchantInfo);
  const token = yield AsyncStorage.getItem('token');
  const timezone = new Date().getTimezoneOffset();
  const url = `${GET_WAITING_TIME}/${merchantInfo.merchantId}?date=${moment().format('YYYY-MM-DD')}&timezone=${timezone}`;
  const response = yield CallAPI_GET(url, JSON.parse(token));
  if (response.status === 200) {
    if (response.message === 'Session is expired!') {
      yield* checkToken();
      return;
    }
    yield put(SigninActions.getWaitingTimeSuccess(response.data.data));
  } else {
    alert('Error !!!');
  }
}

export function* logoutSaga() {
  yield AsyncStorage.removeItem('merchantInfo');
  yield AsyncStorage.removeItem('token');
  yield put(NavigationActions.navigate({ routeName: 'Login',params:{refresh : 1} }));
}

export function* runSignalR(){

}
