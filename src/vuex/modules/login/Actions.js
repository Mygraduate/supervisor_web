import {INPUT_LOGIN_ACCOUNT, INPUT_LOGIN_PWD, RESET_LOGIN_FORM} from './Mutations'

export const login = ({
  commit
}, obj) => {}

export const inputAccount = ({
  commit
}, obj) => {
  obj
    ? commit(Object.assign({
      type: INPUT_LOGIN_ACCOUNT
    }, obj))
    : ''
}

export const inputPWD = ({
  commit
}, obj) => {
  obj
    ? commit(Object.assign({
      type: INPUT_LOGIN_PWD
    }, obj))
    : ''
}
