import { atom } from "recoil";


export const userLoginState = atom<boolean>({
    key: 'userLoginState',
    default: false,
})
