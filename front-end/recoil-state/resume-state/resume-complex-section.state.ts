import { employmentHistoryTitleValueState } from './resume-title.state';
import { ComplexSectionDataType, ComplexSectionDetailsDataType, EmploymentHistoryItemDataType, ComplexSection } from './../../configs/interfaces/resume.interface';
import { atom, selector } from 'recoil';


export const complexSectionValueState = selector<ComplexSectionDataType>({
    key: 'complexSectionValueState',
    get: ({get}) => {
        const employmentHistories = get(employmentHistoriesValueState)
        const sectionType: ComplexSection[] = []
        const sectionDetails: Partial<Record<ComplexSection, ComplexSectionDetailsDataType>> = {}
        if(employmentHistories.items?.length) {
            sectionType.push('employmentHistories')
            sectionDetails['employmentHistories'] = employmentHistories
        }
        return {sectionType, sectionDetails}
    }
})

export const employmentHistoryItemsState = atom<EmploymentHistoryItemDataType[]>({
    key: 'employmentHistoryItemsState',
    default: []
})
export const employmentHistoriesDetails = atom<ComplexSectionDetailsDataType>({
    key: 'employmentHistoriesDetails',
    default: {
        position: 2,
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


