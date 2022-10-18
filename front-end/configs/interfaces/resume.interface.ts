

export type ResumeDataType = {
    personalDetail: PersonalDetailsDataType,
    professionalSummary: ProfessionalSummaryDataType
}

export type PersonalDetailsDataType = {
    id?: number,
    header?: string,
    resumeId?: number
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

export type ProfessionalSummaryDataType = {
    id?: number,
    header?: string,
    content?: string
}

export type FieldFormData = {
    name: string | string [],
    value?: any,
    errors?: string[]
}