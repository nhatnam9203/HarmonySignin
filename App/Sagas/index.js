import { takeLatest, all } from 'redux-saga/effects'
import {
  LoginSaga,
  GetAppointmentByStatusSaga,
  searchByPhoneSaga,
  addNewUserSaga,
  ForgotPasswordSaga,
  GetServiceSaga,
  GetProductSaga,
  GetExtraSaga,
  getCateggorySaga,
  GetServiceByCategoryIdSaga,
  addAppointmentSaga,
  CancelAppointmentSaga,
  logoutSaga,
  getWaitingTimeSaga
} from './Saga'
import {SigninTypes} from '../Redux/SignIn/SignInRedux'



export default function * root () {
  yield all([
    takeLatest(SigninTypes.LOGIN_REQUEST,LoginSaga),
    takeLatest(SigninTypes.GET_WAITING_LIST,GetAppointmentByStatusSaga),
    takeLatest(SigninTypes.SEARCH_BY_PHONE,searchByPhoneSaga),
    takeLatest(SigninTypes.ADD_NEW_USER,addNewUserSaga),
    takeLatest(SigninTypes.FORGOT_PASSWORD,ForgotPasswordSaga),
    takeLatest(SigninTypes.GET_SERVICE,GetServiceSaga),
    takeLatest(SigninTypes.GET_PRODUCT,GetProductSaga),
    takeLatest(SigninTypes.GET_EXTRA,GetExtraSaga),
    takeLatest(SigninTypes.GET_CATEGORY_BY_MERCHANT,getCateggorySaga),
    takeLatest(SigninTypes.GET_SERVICE_BY_CATEGORY_ID,GetServiceByCategoryIdSaga),
    takeLatest(SigninTypes.ADD_APPOINTMENT,addAppointmentSaga),
    takeLatest(SigninTypes.CANCEL_APPOINTMENT,CancelAppointmentSaga),
    takeLatest(SigninTypes.LOGOUT,logoutSaga),
    takeLatest(SigninTypes.GET_WAITING_TIME,getWaitingTimeSaga),
    // takeLatest(SigninTypes.ADD_APPOINTMENT,addAppointmentSaga),
  ])
}
