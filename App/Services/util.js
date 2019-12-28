
import axios from 'axios'

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => shortDimension / guidelineBaseWidth * size;
export const verticalScale = size => longDimension / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;


export const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export function pad(n, length) {
  var len = length - ('' + n).length;
  return (len > 0 ? new Array(++len).join('0') : '') + n
};

export async function CallAPI_POST(url, token, data) {
  if (token) {
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((result) => {
      if (result.status === 200) {
        return { status: 200, data: result.data,message : result.data.message }
      }
      if (result.status === 500 || result.status === 403 || result.status === 204) {
        return { status: result.status, data: result.data }
      }
    }).catch((err) => {
      alert(err);
      return { error: err }
    });
  }
  return alert('Your token has been expired !!!');
};

export async function CallAPI_GET(url, token) {
  if (token) {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((result) => {
      if (result.status === 200) {
        return { status: 200, data: result.data,message : result.data.message }
      }
      if (result.status === 500 || result.status === 403 || result.status === 204) {
        return { status: result.status, data: result.data }
      }
    }).catch((err) => {
      console.log(err);
      alert(err);
      return { error: err }
    });
  }
  return alert('Your token has been expired !!!');
};

export async function CallAPI_PUT(url, token, data) {
  if (token) {
    return axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((result) => {
      if (result.status === 200) {
        if(result.data.codeStatus !== 1) {
          alert(result.data.message);
        }
        return { status: 200, data: result.data,message : result.data.message }
      }
      if (result.status === 500 || result.status === 403 || result.status === 204) {
        return { status: result.status, data: result.data,}
      }
    }).catch((err) => {
      alert(err);
      return { error: err }
    });
  }
  return alert('Your token has been expired !!!');
};

export function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  // h = h < 10 ? '0' + h : h;
  // m = m < 10 ? '0' + m : m;
  if(h !== 0)
  return `${h} hour ${m} min`;
  return `${m} min`;
}

export function formatUsPhone(phone) {
	phone = phone.replace(/\D/g, '');
	const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
	if (match) {
		phone = `${match[1]}${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
	}
	return phone;
}


