//! 提前完成数据请求
import request from "Utils/request";
import {
  loginURL,
  cateURL,
  addCarURL,
  getCarURL,
  delCarURL,
  picURL,
  registerURL,
  tokenURL,
  userInfoURL,
  hotURL,
  initMovieURL,
  moreMovieURL
} from "./url";
import { getCookie } from "Utils/cookie";

const token = getCookie("token");
const userId = getCookie("userId");

export function registerReq(data) {
  return request({
    url: registerURL,
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function loginReq(data) {
  return request({
    url: loginURL,
    data,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
// 分类请求
export function cateReq() {
  return request({
    url: cateURL,
    data: {
      r: "class/category",
      type: 1,
    },
  });
}
// 列表请求
export function listReq(data) {
  return request({
    url: cateURL,
    data,
  });
}

// 获取详情页面
export function detailReq(data) {
  return request({
    url: cateURL,
    data,
  });
}

//添加购物车
export function addCarReq(data) {
  return request({
    url: addCarURL,
    data,
    method: "POST",
  });
}

// 获取购物车
export function getCarReq() {
  return request({
    url: getCarURL,
    data: {
      token,
    },
  });
}
// 删除购物车中对应的那一条
export function delCarReq(shopId) {
  console.log("shopId", shopId);
  return request({
    url: delCarURL,
    method: "POST",
    data: {
      token,
      shopId,
    },
  });
}

//头像上传
export function picReq(file) {
  return request({
    url: picURL,
    data: {
      file,
    },
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function tokenReq() {
  return request({
    url: tokenURL,
    data: {
      token,
    },
  });
}
// 获取用户信息
export function userInfoReq() {
  return request({ url: userInfoURL, data: { token, userId } });
}
// 获取热门商品
export function hotReq(cid) {
  return request({ url: hotURL, data: { cid } });
}


//! 获取首页电影初始化数据
export function initMovieReq () {
  return request({url: initMovieURL,data:{
    token: '',
    optimus_uuid: 'F2C8CA50060111E9BE3B2FA6BBC8F42F783446B54C974221B87A48F0BB404BD5',
    optimus_risk_level: 71,
    optimus_code: 10
  }})
}

export function moreMoiveReq (movieIds) {
  return request({
    url: moreMovieURL,
    data: {
      token: '',
      movieIds,
      optimus_uuid: 'F2C8CA50060111E9BE3B2FA6BBC8F42F783446B54C974221B87A48F0BB404BD5',
      optimus_risk_level: 71,
      optimus_code: 10
    }
  })
}