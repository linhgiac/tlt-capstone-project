import { atom } from 'recoil';
import { FieldFormData } from './../../configs/interfaces/resume';


export const personalDetailFieldsState = atom<FieldFormData[]>({
    key: 'personalDetailFormValueState',
    default: []
})