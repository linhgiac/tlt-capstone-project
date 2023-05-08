import { atom } from "recoil";


export const userLoginState = atom<boolean>({
    key: 'userLoginState',
    default: false,
})

export const userState = atom<any>({
    key: 'userState',
    default: {},
});
