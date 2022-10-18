import { PersonalDetailData } from './../../mock/resume';
import { atom, selector } from 'recoil';
import { FieldFormData, PersonalDetailsDataType, ProfessionalSummaryDataType, ResumeDataType } from './../../configs/interfaces/resume';

export const resumeValueState = selector<ResumeDataType>({
    key: 'resumeValueState',
    get: ({get}) => {
        const personalDetail = get(personalDetailValueState)
        const professionalSummary = get(professionalSummaryValueState)
        return {personalDetail, professionalSummary}
    }
})
export const personalDetailTitleState = atom<string>({
    key: 'personalDetailTitle',
    default: 'Personal Details'
})
export const personalDetailFieldsState = atom<FieldFormData[]>({
    key: 'personalDetailFieldsState',
    default: []
})

export const personalDetailValueState = selector<PersonalDetailsDataType>({
    key: 'personalDetailValueState',
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
export const professionalSummaryValueState = selector<ProfessionalSummaryDataType>({
    key: 'professionalSummaryValueState',
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