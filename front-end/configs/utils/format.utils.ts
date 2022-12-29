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

const convertComplexSectionsToFE = (complex_sections: any) => {
    var section_types = []
    var section_details = {}
    for (var index in complex_sections) {
        var section = get(complex_sections, index);
        console.log("section", section);
        var section_type = camelCase(get(section, 'section_type', ""));
        section_types.push(section_type);
        var items = get(section, section_type);
        var id = get(section, "id");
        var header = get(section, "header");
        var position = get(section, "position");
        var detail = {};
        detail = Object.assign(detail, { id: id });
        detail = Object.assign(detail, { header: header });
        detail = Object.assign(detail, { position: position });
        detail = Object.assign(detail, { section_type: section_type });
        detail = Object.assign(detail, { items: items });

        if (section_type == 'employmentHistories') {
            section_details = Object.assign(section_details, { employment_histories: detail })
        }
        else if (section_type == 'educations') {
            section_details = Object.assign(section_details, { educations: detail })
        }
        else if (section_type == 'workExperiences') {
            section_details = Object.assign(section_details, { work_experiences: detail })
        }
        else if (section_type == 'skills') {
            section_details = Object.assign(section_details, { skills: detail })
        }
        else if (section_type == 'links') {
            section_details = Object.assign(section_details, { links: detail })
        }
        else if (section_type == 'customs') {
            section_details = Object.assign(section_details, { customs: detail })
        }
    }
    return convertSnakeToCamel({
        section_types: section_types,
        section_details: section_details
    });
}

export const convertTest = () => {
    const test = convertResumeResponse(data_test);
    console.log("converted: ", test);
}

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
    const complexSections = convertComplexSectionsToFE(get(resume, 'complex_sections'));
    return {
        id,
        title,
        template,
        personalDetails,
        professionalSummary,
        complexSections
    };
};

const data_test: any = {
    "id": 3,
    "title": "Test1",
    "completeness": 99,
    "template": 3,
    "personal_details": {
        "id": 3,
        "header": "Personal Details",
        "position": 1,
        "first_name": "Toan",
        "last_name": "Phan Dinh Minh",
        "job_title": "AI Developer",
        "address": "VNU Dormitory - B Area",
        "country": "Viet Nam",
        "city": "Ho Chi Minh",
        "nationality": "Vietnamse",
        "email": "toan@email.com",
        "place_of_birth": "Binh Dinh",
        "date_of_birth": "2001-01-01",
        "phone": "+84775337992",
        "photo": null
    },
    "professional_summary": {
        "id": 3,
        "header": "Professional Summary",
        "position": 2,
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    "complex_sections": [
        {
            "id": 41,
            "header": "Custom",
            "position": 8,
            "section_type": "customs",
            "employment_histories": [],
            "educations": [],
            "work_experiences": [],
            "skills": [],
            "links": [],
            "customs": [
                {
                    "id": 1,
                    "position": 1,
                    "title": "custom item",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "city": "Ho Chi Minh",
                    "start_date": "2022-10-10",
                    "end_date": "2022-10-31"
                }
            ]
        },
        {
            "id": 11,
            "header": "Skill",
            "position": 6,
            "section_type": "skills",
            "employment_histories": [],
            "educations": [],
            "work_experiences": [],
            "skills": [
                {
                    "id": 11,
                    "position": 1,
                    "name": "Unity",
                    "level": "b"
                },
                {
                    "id": 12,
                    "position": 2,
                    "name": "C#",
                    "level": "b"
                },
                {
                    "id": 13,
                    "position": 3,
                    "name": "Python",
                    "level": "b"
                },
                {
                    "id": 14,
                    "position": 4,
                    "name": "Pytorsh",
                    "level": "b"
                }
            ],
            "links": [],
            "customs": []
        },
        {
            "id": 9,
            "header": "Education",
            "position": 4,
            "section_type": "educations",
            "employment_histories": [],
            "educations": [
                {
                    "id": 3,
                    "position": 1,
                    "school": "HCMUT",
                    "degree": "Computer Science",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "city": "Ho Chi Minh",
                    "start_date": "2022-10-02",
                    "end_date": "2022-10-31"
                }
            ],
            "work_experiences": [],
            "skills": [],
            "links": [],
            "customs": []
        },
        {
            "id": 8,
            "header": "Employment History",
            "position": 3,
            "section_type": "employment_histories",
            "employment_histories": [
                {
                    "id": 3,
                    "position": null,
                    "job_title": "Game Developer",
                    "employer": "VNG",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "city": "Ho Chi Minh",
                    "start_date": "2022-10-02",
                    "end_date": "2022-10-31"
                }
            ],
            "educations": [],
            "work_experiences": [],
            "skills": [],
            "links": [],
            "customs": []
        },
        {
            "id": 10,
            "header": "Project",
            "position": 5,
            "section_type": "work_experiences",
            "employment_histories": [],
            "educations": [],
            "work_experiences": [
                {
                    "id": 1,
                    "position": null,
                    "role": "AI Developer",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "title": "Capstone Project",
                    "start_date": "2022-10-02",
                    "end_date": "2022-10-31"
                },
                {
                    "id": 2,
                    "position": null,
                    "role": "Frontend Developer",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "title": "Delivering System",
                    "start_date": "2022-10-10",
                    "end_date": "2022-10-24"
                },
                {
                    "id": 3,
                    "position": null,
                    "role": "AI Developer",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "title": "Capstone Project",
                    "start_date": "2022-10-02",
                    "end_date": "2022-10-31"
                },
                {
                    "id": 4,
                    "position": null,
                    "role": "Frontend Developer",
                    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    "title": "Delivering System",
                    "start_date": "2022-10-10",
                    "end_date": "2022-10-24"
                }
            ],
            "skills": [],
            "links": [],
            "customs": []
        },
        {
            "id": 13,
            "header": "Link",
            "position": 7,
            "section_type": "links",
            "employment_histories": [],
            "educations": [],
            "work_experiences": [],
            "skills": [],
            "links": [
                {
                    "id": 1,
                    "position": null,
                    "label": "facebook",
                    "link": "https://www.facebook.com/minhtoan2610"
                }
            ],
            "customs": []
        }
    ]
}
