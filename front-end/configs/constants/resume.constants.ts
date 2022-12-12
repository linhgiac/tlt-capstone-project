export namespace ResumeConstants {
    export const TITLE_CONSTANTS = {
        resume: 'Untitled',
        personalDetails: 'Personal Details',
        professionalSummary: 'Professional Summary'
    }
}

const PERSONAL_DETAILS_LABEL = {}
const PROFESSIONAL_SUMMARY_LABEL ={}
const EMPLOYMENT_HISTORY_LABEL = {
    jobTitle: 'Job Title',
    employer: 'Employer',
    startEndDate: 'Start & End Date',
    city: 'City',
    description: 'Description',
};
const EDUCATION_LABEL = {
    school: 'School',
    degree: 'Degree',
    startEndDate: 'Start & End Date',
    city: 'City',
    description: 'Description',
};
const LINKS = { label: 'Label', link: 'Link' };


export const SECTION_TYPE: any = {
    personalDetails: PERSONAL_DETAILS_LABEL,
    employmentHistories: EMPLOYMENT_HISTORY_LABEL,
    educations: EDUCATION_LABEL,
    links: LINKS,
};

export const RESUME_SIZE = {
    width: 1174,
    height: 1660
}
