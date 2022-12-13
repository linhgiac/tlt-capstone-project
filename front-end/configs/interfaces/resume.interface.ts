

export type ResumeDataType = {
    id?: number,
    title?: string,
    templateId?: number,
    personalDetails?: PersonalDetailsDataType,
    professionalSummary?: ProfessionalSummaryDataType
    complexSections?: ComplexSectionDataType
}

export type PersonalDetailsDataType = {
    id?: number;
    header?: string;
    jobTitle?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: string;
    city?: string;
    address?: string;
    nationality?: string;
    placeOfBirth?: string;
    dateOfBirth?: string;
};

export type ProfessionalSummaryDataType = {
    id?: number;
    header?: string;
    content?: string;
};

export type ComplexSection =
    | 'employmentHistories'
    | 'educations'
    | 'workExperiences'
    | 'skills'
    | 'links'
    | 'customs';

export type ComplexSectionDataType = {
    sectionType: ComplexSection[];
    sectionDetails: Partial<
        Record<ComplexSection, ComplexSectionDetailsDataType>
    >;
};

export type ComplexSectionDetailsDataType = {
    id?: number;
    header?: string;
    position: number;
    sectionType: ComplexSection;
    items?: ComplexSectionItemDataType[];
    isShownLevel?: boolean;
};

export type ComplexSectionItemDataType =
    | EmploymentHistoryItemDataType
    | EducationItemDataType
    | WorkExperienceItemDataType
    | SkillItemDataType
    | LinkItemDataType
    | CustomItemDataType;

export type EmploymentHistoryItemDataType = {
    id?: number;
    position: number;
    jobTitle?: string;
    employer?: string;
    description?: string;
    city?: string;
    startDate?: string;
    endDate?: string;
};

export type EducationItemDataType = {
    id?: number;
    position: number;
    school?: string;
    degree?: string;
    description?: string;
    city?: string;
    startDate?: string;
    endDate?: string;
};

export type WorkExperienceItemDataType = {
    id?: number;
    position: number;
    title?: string;
    role?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
};
export type SkillLevelType =
    | 'novice'
    | 'beginner'
    | 'skillful'
    | 'experienced'
    | 'expert';
export type SkillItemDataType = {
    id?: number;
    position: number;
    name?: string;
    level?: SkillLevelType;
    // isShown?: boolean;
};

export type LinkItemDataType = {
    id?: number,
    position: number,
    label?: string,
    link?: string
}

export type CustomItemDataType = {
    id?: number,
    position: number,
    title?: string,
    description?: string,
    city?: string,
    startDate?: string,
    endDate?: string
}

export type FieldFormData = {
    name: string | string [],
    value?: any,
    errors?: string[]
}
export type ComplexItemsFieldFormData = {
    itemId?: number,
    sectionType: string,
    position: number
    data?: FieldFormData[] 
}