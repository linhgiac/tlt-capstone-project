import { atom } from "recoil";


export const resumeTitleValueState = atom<string>({
    key: 'resumeTitleValue',
    default: 'Untitled'
})

export const personalDetailTitleValueState = atom<string>({
    key: 'personalDetailTitleValue',
    default: 'Personal Details'
})

export const professionalSummaryTitleValueState = atom<string>({
    key: 'professionalSummaryTitleValueState',
    default: 'Professional Summary'
})

export const employmentHistoryTitleValueState = atom<string>({
    key: 'employmentHistoryTitleValueState',
    default: 'Employment History'
})

export const educationTitleValueState = atom<string>({
    key: 'educationTitleValueState',
    default: 'Education'
})

export const workExperienceTitleValueState = atom<string>({
    key: 'workExperienceTitleValueState',
    default: 'Work Experience'
})

export const linkTitleValueState = atom<string>({
    key: 'linkTitleValueState',
    default: 'Websites & Social Links'
})

export const skillTitleValueState = atom<string>({
    key: 'skillTitleValueState',
    default: 'Skills'
})

export const customTitleValueState = atom<string[]>({
    key: 'customTitleValueState',
    default: []
})