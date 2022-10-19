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