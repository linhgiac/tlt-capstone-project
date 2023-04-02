import { get, isEmpty, omit, snakeCase } from 'lodash';
import { ResumeDataType } from './../interfaces/resume.interface';
import camelCase from 'camelcase';
import { AccountSettingType } from '../interfaces/user.interface';
import { HOST } from '../constants/misc';
import dateFormat from 'dateformat';

export const convertCamelToSnake = (obj: any, newObj = {}) => {
    for (let key in obj) {
        let value = null;
        if (!(obj[key] instanceof File) && typeof obj[key] === 'object' && typeof obj[key] !== null) {
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
        if (obj[key] === null) continue;
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
            const items = details.items?.map(item => {
                var startDate = get(item, 'startDate', "");
                var endDate = get(item, 'endDate', '');
                if (startDate !== undefined && startDate.length == "1970/01".length) {
                    var itemFixStartDate = { ...item, startDate: (startDate + "/01").replaceAll('/', '-') }
                    item = itemFixStartDate;
                }
                if (endDate !== undefined && endDate.length == "1970/01".length) {
                    var itemFixEndDate = { ...item, endDate: (endDate + "/01").replaceAll('/', '-') }
                    item = itemFixEndDate;
                }
                return item
            });
            delete details.items;
            return {
                ...details,
                [type]: items,
                sectionType: snakeCase(type),
            };
        }
    });
    let result = { id: resumeData.id, template: resumeData.template };
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
    // return result
};

const convertComplexSectionsToFE = (complex_sections: any) => {
    var sectionTypes = [];
    var sectionDetails = {};
    for (var index in complex_sections) {
        var section = get(complex_sections, index);
        var section_type = get(section, 'section_type', '');
        var items = get(section, section_type);
        var sectionType = camelCase(section_type);
        sectionTypes.push(sectionType);
        var id = get(section, 'id');
        var header = get(section, 'header');
        var position = get(section, 'position');
        var detail = {};
        var itemsCamel = Object.values(convertSnakeToCamel(items));

        detail = Object.assign(detail, { id: id });
        detail = Object.assign(detail, { header: header });
        detail = Object.assign(detail, { position: position });
        detail = Object.assign(detail, { sectionType: sectionType });
        detail = Object.assign(detail, { items: itemsCamel });

        if (sectionType == 'employmentHistories') {
            sectionDetails = Object.assign(sectionDetails, {
                employmentHistories: detail,
            });
        } else if (sectionType == 'educations') {
            sectionDetails = Object.assign(sectionDetails, {
                educations: detail,
            });
        } else if (sectionType == 'workExperiences') {
            sectionDetails = Object.assign(sectionDetails, {
                workExperiences: detail,
            });
        } else if (sectionType == 'skills') {
            sectionDetails = Object.assign(sectionDetails, {
                skills: detail,
            });
        } else if (sectionType == 'links') {
            sectionDetails = Object.assign(sectionDetails, {
                links: detail
            });
        } else if (sectionType == 'customs') {
            sectionDetails = Object.assign(sectionDetails, {
                customs: detail,
            });
        }
    }
    return {
        sectionTypes: sectionTypes,
        sectionDetails: sectionDetails,
    };
};

export const convertTest = () => {
    const test = convertResumeResponse(data_test);
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
    const complexSections = convertComplexSectionsToFE(
        get(resume, 'complex_sections')
    );
    return {
        id,
        title,
        template,
        personalDetails,
        professionalSummary,
        complexSections,
    };
};

const data_test: any = {
    "id": 4,
    "title": "Untitled",
    "completeness": 0,
    "template": 1,
    "personal_details": null,
    "professional_summary": null,
    "complex_sections": [
        {
            "id": 14,
            "header": "Employment History",
            "position": 2,
            "section_type": "employment_histories",
            "employment_histories": [
                {
                    "id": 2,
                    "position": 0,
                    "job_title": null,
                    "employer": null,
                    "description": null,
                    "city": null,
                    "start_date": "2022-01-01",
                    "end_date": "2022-01-01"
                },
                {
                    "id": 3,
                    "position": 0,
                    "job_title": null,
                    "employer": null,
                    "description": null,
                    "city": null,
                    "start_date": "2022-02-01",
                    "end_date": "2022-02-01"
                }
            ],
            "educations": [],
            "work_experiences": [],
            "skills": [],
            "links": [],
            "customs": []
        }
    ]
};

export const convertProfilePayloadData = (payloadData: AccountSettingType) => {
    return convertCamelToSnake(payloadData);
};

// export const convertProfileResponse = (responseData: any) => {
//     const { profile, ...dataWithoutProfile } = responseData;
//     // more consideration
//     const newProfile = profile;
//     Object.keys(profile).map((key: any) => {
//         if (isEmpty(newProfile[key])) {
//             newProfile[key] = '';
//         }
//         if (key === 'avatar' && newProfile[key]) {
//             newProfile[key] = `${HOST}${profile.avatar.replace('/', '')}`;
//         }
//     });
//     return convertSnakeToCamel({
//         ...dataWithoutProfile,
//         ...newProfile,
//     });
// };
export const convertProfileResponse = (responseData: any) => {
    const { profile, ...dataWithoutProfile } = responseData;
    if (profile.avatar) {
        profile.avatar = `${HOST}${profile.avatar.replace('/', '')}`;
    }
    // if (profile.avatar) {
    //     const newUrl = `${HOST}${profile.avatar.replace('/', '')}`;
    //     console.log("newUrl", newUrl);
    //     profile.avatar = newUrl;
    //     console.log("avatar", profile.avatar);
    // }
    return convertSnakeToCamel({
        ...dataWithoutProfile,
        ...profile,
    });
};

export const convertDashboardResponse = (responseData: any) => {
    
    const convertedResponseData = []
    for (let dashboardItem of responseData) {
        const { thumbnail, created_at, updated_at, ...restDashboardItem } = dashboardItem
        const fullThumbnailURL = `${HOST}${thumbnail.replace('/', '')}`;
        const createdAt = dateFormat(new Date(created_at.replace('/', ' ')), "mmm dd, HH:MM");
        const updatedAt = dateFormat(new Date(updated_at.replace('/', ' ')), "mmm dd, HH:MM");
        convertedResponseData.push({
            ...restDashboardItem,
            createdAt,
            updatedAt,
            thumbnail: fullThumbnailURL,
        });
    }
    return convertedResponseData;
}