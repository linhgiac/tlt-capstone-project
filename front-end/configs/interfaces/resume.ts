export enum ResumeTitleType {
    Fixed = 'FIXED',
    Changeable = 'CHANGEABLE'
}

export type PersonalDetailsFormValue = {
    jobTitle?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    country?: string,
    address?: string,
    nationality?: string,
    placeOfBirth?: string,
    dateOfBirth?: Date
}

export type PersonalDetails = {
    id: number,
    header: string,
    jobTitle?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    country?: string,
    address?: string,
    nationality?: string,
    placeOfBirth?: string,
    dateOfBirth?: Date
}

export type FieldFormData = {
    name: string | string [],
    value?: any,
    errors?: string[]
}