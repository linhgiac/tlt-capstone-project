import { ComplexItemsFieldFormData } from './../../configs/interfaces/resume.interface';
import { atom } from 'recoil';
const employmentHistoryItemsFieldsState = atom<ComplexItemsFieldFormData[]>({
    key: 'employmentHistoryItemsFieldsState',
    default:[]
})
const employmentHistoryItemsValueState = selector({
    key: 'employmentHistoryItems',
    default = [] 
})