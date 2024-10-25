import base from "./base";
import $NormalUser from "./normalUser";
import client from './ajax.js'
import $Store from "../utils/store";
import {$} from "../utils/tools";
import $Router from "../utils/router";

const modelName = 'user';
const userBaeModel = {
  expirationTime: "",
  passTime: [],
  permissions: [],
  phoneNumber: "",
  removeTime: [],
  token: null,
  usableCount: 0,
  userName: "",
}
const baseModel = {
  token: $Store.Storage.get('token') || '',
  ...userBaeModel
}

class userModel extends base {
  constructor () {
    super(modelName, baseModel)
  }

}

export default new userModel()
