import { atom } from 'recoil';
import { FieldFormData } from './../../configs/interfaces/resume';


const personalDetailFieldsState = atom<FieldFormData[]>({
    key: 'personalDetailFormValueState',
    default: [{name: 'jobTitle', value: ''}]
})

export {personalDetailFieldsState}