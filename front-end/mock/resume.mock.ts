import {
    PersonalDetailsDataType,
    ResumeDataType,
} from './../configs/interfaces/resume.interface';
import { TemplatesDataType } from '../configs/interfaces/template.interface';

export const PersonalDetailData: PersonalDetailsDataType = {
    id: 1,
    header: 'Personal Detail',
    jobTitle: 'Web Developer',
    firstName: 'Giac',
    lastName: 'Linh',
    email: 'hoanglyhayt@gmail.com',
    phone: '0123456789',
    country: 'Viet Nam',
    address: '',
    nationality: '',
    placeOfBirth: '',
    dateOfBirth: new Date(2001, 0o5, 0o3),
};

export const MOCKED_RESUME: ResumeDataType = {
    id: 1,
    title: 'M_Resume',
    templateId: 1,
    personalDetails: {
        header: 'Personal Details',
        jobTitle: 'Web Developer',
        firstName: 'Giac',
        // lastName:'Linh',
        email: 'linhgiac@gmail.com',
        phone: '0123456789',
        country: 'Vietnam',
        city: 'Hochiminh',
    },
    professionalSummary: {
        header: 'Professional Summary',
        content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    complexSections: {
        sectionType: ['employmentHistories'],
        sectionDetails: {
            employmentHistories: {
                id: 1,
                header: 'Employment',
                position: 3,
                sectionType: 'employmentHistories',
                items: [
                    {
                        id: 1,
                        position: 0,
                        jobTitle: 'Web',
                        employer: 'VNG',
                        description: 'Hello',
                        city: 'HCM',
                        startDate: '2022 May',
                        endDate: '2023 May',
                    },
                ],
            },
        },
    },
};

type MockedTemplatesDataType = {
    all: TemplatesDataType;
    creative: TemplatesDataType;
    simple: TemplatesDataType;
    professional: TemplatesDataType;
    modern: TemplatesDataType;
};

export const MOCKED_TEMPLATES: MockedTemplatesDataType = {
    all: {
        data: [
            {
                id: 1,
                type: 'creative',
                thumnail: './image/template.png',
                name: 'Creative_Template',
                title: 'Creative Template',
                description: 'Something creative description',
            },
            {
                id: 2,
                type: 'simple',
                thumnail: './image/template.png',
                name: 'Simple_Template',
                title: 'Simple Template',
                description: 'Something simple description',
            },
            {
                id: 3,
                type: 'professional',
                thumnail: './image/template.png',
                name: 'Professional_Template',
                title: 'Professional Template',
                description: 'Something professional description',
            },
            {
                id: 4,
                type: 'modern',
                thumnail: './image/template.png',
                name: 'Modern_Template',
                title: 'Modern Template',
                description: 'Something modern description',
            },
            {
                id: 5,
                type: 'creative',
                thumnail: './image/template.png',
                name: 'Creative_Template',
                title: 'Creative Template',
                description: 'Something creative description',
            },
            {
                id: 6,
                type: 'simple',
                thumnail: './image/template.png',
                name: 'Simple_Template',
                title: 'Simple Template',
                description: 'Something simple description',
            },
            {
                id: 7,
                type: 'professional',
                thumnail: './image/template.png',
                name: 'Professional_Template',
                title: 'Professional Template',
                description: 'Something professional description',
            },
            {
                id: 8,
                type: 'modern',
                thumnail: './image/template.png',
                name: 'Modern_Template',
                title: 'Modern Template',
                description: 'Something modern description',
            },
        ],
    },
    creative: {
        data: [
            {
                id: 1,
                type: 'creative',
                thumnail: './image/template.png',
                name: 'Creative_Template',
                title: 'Creative Template',
                description: 'Something creative description',
            },
            {
                id: 5,
                type: 'creative',
                thumnail: './image/template.png',
                name: 'Creative_Template',
                title: 'Creative Template',
                description: 'Something creative description',
            },
        ],
    },
    simple: {
        data: [
            {
                id: 2,
                type: 'simple',
                thumnail: './image/template.png',
                name: 'Simple_Template',
                title: 'Simple Template',
                description: 'Something simple description',
            },
            {
                id: 6,
                type: 'simple',
                thumnail: './image/template.png',
                name: 'Simple_Template',
                title: 'Simple Template',
                description: 'Something simple description',
            },
        ],
    },
    professional: {
        data: [
            {
                id: 3,
                type: 'professional',
                thumnail: './image/template.png',
                name: 'Professional_Template',
                title: 'Professional Template',
                description: 'Something professional description',
            },
            {
                id: 7,
                type: 'professional',
                thumnail: './image/template.png',
                name: 'Professional_Template',
                title: 'Professional Template',
                description: 'Something professional description',
            },
        ],
    },
    modern: {
        data: [
            {
                id: 4,
                type: 'modern',
                thumnail: './image/template.png',
                name: 'Modern_Template',
                title: 'Modern Template',
                description: 'Something modern description',
            },
            {
                id: 8,
                type: 'modern',
                thumnail: './image/template.png',
                name: 'Modern_Template',
                title: 'Modern Template',
                description: 'Something modern description',
            },
        ],
    },
};
