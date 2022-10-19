import { personalDetailTitleValueState, professionalSummaryTitleValueState} from './resume-title.state';
import { atom, selector } from 'recoil';
import { FieldFormData, PersonalDetailsDataType, ProfessionalSummaryDataType, ResumeDataType } from '../../configs/interfaces/resume.interface';

export const resumeValueState = selector<ResumeDataType>({
    key: 'resumeValueState',
    get: ({get}) => {
        const personalDetail = get(personalDetailValueState)
        const professionalSummary = get(professionalSummaryValueState)
        return {personalDetail, professionalSummary}
    }
})
export const personalDetailFieldsState = atom<FieldFormData[]>({
    key: 'personalDetailFieldsState',
    default: []
})

export const personalDetailValueState = selector<PersonalDetailsDataType>({
    key: 'personalDetailValueState',
    get: ({get}) => {
        const title = get(personalDetailTitleValueState)
        const fields = get(personalDetailFieldsState)
        let personalDetail = {header: title}
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
        const title = get(professionalSummaryTitleValueState)
        const fields = get(professionalSummaryFieldState)
        let professionalSummary = {header: title}
        fields.forEach((field) => {
            const obj = {[field.name.toString()]: field.value}
            professionalSummary = {...professionalSummary, ...obj}
        })
        return professionalSummary
    }
})