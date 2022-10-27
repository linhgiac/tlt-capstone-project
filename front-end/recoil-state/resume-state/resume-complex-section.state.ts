import { employmentHistoryTitleValueState } from './resume-title.state';
import { ComplexItemsFieldFormData, ComplexSectionItemDataType, ComplexSectionDataType, ComplexSectionDetailsDataType, EmploymentHistoryItemDataType } from './../../configs/interfaces/resume.interface';
import { atom, selector } from 'recoil';
// const complexSectionValueState = selector<ComplexSectionDataType>({
//     key: 'complexSectionValueState',
//     get: () => {}
// })


export const employmentHistoryChangeItemsState = atom<EmploymentHistoryItemDataType[]>({
    key: 'employmentHistoryChangeValueState',
    default: []
})

export const employmentHistoryItemsState = atom<EmploymentHistoryItemDataType[]>({
    key: 'employmentHistoryItemsState',
    default: []
})
export const employmentHistoriesDetails = atom<ComplexSectionDetailsDataType>({
    key: 'employmentHistoriesDetails',
    default: {
        position: 1,
        sectionType: 'employmentHistories'
    }
})

export const employmentHistoriesValueState = selector<ComplexSectionDetailsDataType>({
    key: 'employmentHistoriesValueState',
    get: ({get}) => {
        const header = get(employmentHistoryTitleValueState)
        const {id, position, sectionType} = get(employmentHistoriesDetails)
        const items = get(employmentHistoryItemsState)

        return {
        id,
        header,
        position,
        sectionType,
        items   
        }
    }
})


