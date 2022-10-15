import { PersonalDetailData } from './../../mock/resume';
import { atom, selector } from 'recoil';
import { FieldFormData, PersonalDetails } from './../../configs/interfaces/resume';


export const personalDetailFieldsState = atom<FieldFormData[]>({
    key: 'personalDetailFieldsState',
    default: []
})

export const personalDetailValueState = selector<PersonalDetails>({
    key: 'personalDetailValue',
    get: ({get}) => {
        const fields = get(personalDetailFieldsState)
        let personalDetail = {}
        fields.forEach((field) => {
            const obj = {[field.name.toString()]: field.value}
            personalDetail = {...personalDetail, ...obj}
        })
        return personalDetail
    }
})

export const professionalSummaryFieldState = atom<FieldFormData[]>({
    key: 'professionalSummaryFieldState',
    default: []
})
export const professionalSummaryValueState = selector<PersonalDetails>({
    key: 'professionalSummaryValue',
    get: ({get}) => {
        const fields = get(professionalSummaryFieldState)
        let professionalSummary = {}
        fields.forEach((field) => {
            const obj = {[field.name.toString()]: field.value}
            professionalSummary = {...professionalSummary, ...obj}
        })
        return professionalSummary
    }
})