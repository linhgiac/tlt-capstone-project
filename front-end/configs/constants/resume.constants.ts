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
    jobTitle: 'edit-job-title',
    employer: 'edit-employer',
    startDate: 'edit-start-date',
    endDate: 'edit-end-date',
    city: 'edit-city',
    description: 'edit-description',
};
const EDUCATION_LABEL = {
    school: 'edit-school',
    degree: 'edit-degree',
    startDate: 'edit-start-date',
    endDate: 'edit-end-date',
    city: 'edit-city',
    description: 'edit-description',
};
const LINKS_LABEL = { label: 'edit-label', link: 'edit-link' };

const SKILLS_LABEL = { name: 'edit-skills', level: 'edit-level' };

export const SECTION_TYPE: any = {
    personalDetails: PERSONAL_DETAILS_LABEL,
    employmentHistories: EMPLOYMENT_HISTORY_LABEL,
    educations: EDUCATION_LABEL,
    links: LINKS_LABEL,
    skills: SKILLS_LABEL,
};

export const RESUME_SIZE = {
    width: 1174,
    height: 1660
}
