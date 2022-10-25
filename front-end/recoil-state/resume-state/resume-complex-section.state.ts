import { ComplexItemsFieldFormData, ComplexSectionItemDataType, ComplexSectionDataType, ComplexSectionDetailsDataType, EmploymentHistoryItemDataType } from './../../configs/interfaces/resume.interface';
import { atom, selector } from 'recoil';
// const complexSectionValueState = selector<ComplexSectionDataType>({
//     key: 'complexSectionValueState',
//     get: () => {}
// })
export const complexSectionItemFieldsState = atom<ComplexItemsFieldFormData[]>({
    key: 'employmentHistoryItemsFieldsState',
    default:[]
})
export const complexSectionItemValueState = selector<ComplexSectionItemDataType[]>({
    key: 'employmentHistoryItems',
    get: () => {return []}
})

export const complexSectionItemChangeFieldsState = atom<ComplexItemsFieldFormData[]>({
    key: 'employmentHistoryItemsFieldsState',
    default:[]
})
export const complexSectionItemChangeValueState = selector<ComplexSectionItemDataType[]>({
    key: 'employmentHistoryItems',
    get: () => {return []}
})

export const employmentHistoryItemsState = atom<EmploymentHistoryItemDataType[]>({
    key: 'employmentHistoryItemsState',
    default: []
})

export const employmentHistoriesValueState = atom<ComplexSectionDetailsDataType>({
    key: 'employmentHistoriesValueState',
    default: {
        header: 'Employment Histories',
        position: 1,
        sectionType: 'employmentHistories',
        items: []
    }
})


