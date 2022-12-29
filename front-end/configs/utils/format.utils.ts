import { get } from 'lodash';
import { ResumeDataType } from './../interfaces/resume.interface';
import camelCase from 'camelcase';

export const convertCamelToSnake = (obj: any, newObj = {}) => {
    for (let key in obj) {
        let value = null;
        if (typeof obj[key] === 'object' && typeof obj[key] !== null) {
            value = convertCamelToSnake(obj[key], {});
        } else {
            value = obj[key];
        }
        key = key
            .split(/\.?(?=[A-Z])/)
            .join('_')
            .toLowerCase();
        const convert = { [key]: value };
        newObj = { ...newObj, ...convert };
    }
    return newObj;
};

export const convertSnakeToCamel = (obj: any, newObj = {}) => {
    for (let key in obj) {
        let value = null;
        if (typeof obj[key] === 'object' && typeof obj[key] !== null) {
            value = convertSnakeToCamel(obj[key], {});
        } else {
            value = obj[key];
        }
        key = camelCase(key);
        const convert = { [key]: value };
        newObj = { ...newObj, ...convert };
    }
    return newObj;
};

export const convertPayloadData = async (resumeData: ResumeDataType) => {
    const { title, personalDetails, professionalSummary, complexSections } =
        resumeData;
    const sectionType = complexSections?.sectionType;
    const sectionDetails = complexSections?.sectionDetails;
    const newComplexSections = complexSections?.sectionType.map(type => {
        if (sectionDetails) {
            const details = { ...sectionDetails[type] };
            // const items = details.items
            // delete details.items
            return { ...details, [type]: details.items };
        }
    });
    let result = {};
    if (title) {
        result = Object.assign(result, { title });
    }
    if (personalDetails) {
        result = Object.assign(result, { personalDetails });
    }
    if (professionalSummary) {
        result = Object.assign(result, { professionalSummary });
    }
    if (newComplexSections) {
        result = Object.assign(result, { complexSections: newComplexSections });
    }
    const convertedResult = convertCamelToSnake(result);
    return convertedResult;
    // console.log('result', result)
    // return result
};

export const convertResumeResponse = (resume: any) => {
    const id = get(resume, 'id');
    const title = get(resume, 'title');
    const template = get(resume, 'template');
    const personalDetails = convertSnakeToCamel(
        get(resume, 'personal_details')
    );
    const professionalSummary = convertSnakeToCamel(
        get(resume, 'professional_summary')
    );
    const employmentHistories: any = convertSnakeToCamel(
        get(
            resume.complex_sections?.filter((section: any, index: any) => {
                const result = section.employment_histories;
                if (result && result.length !== 0) return section;
            }),
            '0'
        )
    );
    employmentHistories.items = employmentHistories.employmentHistories;
    delete employmentHistories.employmentHistories;

    const educations: any = convertSnakeToCamel(
        get(
            resume.complex_sections?.filter((section: any, index: any) => {
                const result = section.educations;
                if (result && result.length !== 0) return section;
            }),
            '0'
        )
    );
    educations.items = educations.educations;
    delete educations.employmentHistories;

    const workExperiences: any = convertSnakeToCamel(
        get(
            resume.complex_sections?.filter((section: any, index: any) => {
                const result = section.work_experiences;
                if (result && result.length !== 0) return section;
            }),
            '0'
        )
    );
    workExperiences.items = workExperiences.workExperiences;
    delete workExperiences.workExperiences;

    const skills: any = convertSnakeToCamel(
        get(
            resume.complex_sections?.filter((section: any, index: any) => {
                const result = section.skills;
                if (result && result.length !== 0) return section;
            }),
            '0'
        )
    );
    skills.items = skills.skills;
    delete skills.skills;

    const links: any = convertSnakeToCamel(
        get(
            resume.complex_sections?.filter((section: any, index: any) => {
                const result = section.links;
                if (result && result.length !== 0) return section;
            }),
            '0'
        )
    );
    links.items = links.links;
    delete links.links;

    //TODO: customs section
    // const customs = convertSnakeToCamel(
    //     get(
    //         resume.complex_sections?.filter((section: any, index: any) => {
    //             const result = section.customs;
    //             if (result && result.length !== 0) return section;
    //         }),
    //         '0'
    //     )
    // );

    return {
        id,
        title,
        template,
        personalDetails,
        professionalSummary,
        employmentHistories,
        educations,
        workExperiences,
        skills,
        links,
        // customs,
    };
};
