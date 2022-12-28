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
    dateOfBirth: '2001/05/03',
};

export const MOCKED_RESUME: ResumeDataType = {
    id: 1,
    title: 'M_Resume',
    templateId: 1,
    personalDetails: {
        header: 'Personal Details',
        jobTitle: 'Freelance Graphic Designer',
        firstName: 'Eleanor',
        lastName: 'Fitzgerald',
        email: 'hello@reallygreatsite.com',
        phone: '+123-456-7890',
        country: 'Vietnam',
        city: 'Hochiminh',
    },
    professionalSummary: {
        header: 'Professional Summary',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    complexSections: {
        sectionType: ['employmentHistories', 'educations', 'skills'],
        sectionDetails: {
            employmentHistories: {
                id: 1,
                header: 'Employment History',
                position: 3,
                sectionType: 'employmentHistories',
                items: [
                    {
                        id: 1,
                        position: 0,
                        jobTitle: 'Senior Graphic Designer',
                        employer: 'Studio Shodwe',
                        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt`,
                        // city: 'HCM',
                        startDate: 'June 2029',
                        // endDate: '2023 May',
                    },
                    {
                        id: 2,
                        position: 1,
                        jobTitle: 'Freelance Graphic Designer ',
                        employer: 'Salford & Co. ',
                        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt`,
                        // city: 'HCM',
                        startDate: 'February 2028',
                        endDate: 'February 2029',
                    },
                    {
                        id: 3,
                        position: 2,
                        jobTitle: 'Junior Graphic Designer',
                        employer: 'Larana, Inc.',
                        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt`,
                        // city: 'HCM',
                        startDate: 'January 2027',
                        endDate: 'January 2028',
                    },
                ],
            },
            educations: {
                id: 1,
                header: 'Education',
                position: 3,
                sectionType: 'educations',
                items: [
                    {
                        id: 2,
                        position: 0,
                        school: 'Really Great Universit',
                        degree: 'Bachelor of Multimedia Arts Major in Digital Design',
                        // description: 'string',
                        startDate: '2023',
                        endDate: '2027',
                    },
                ],
            },
            skills: {
                id: 1,
                header: 'Skills',
                position: 5,
                sectionType: 'skills',
                isShownLevel: true,
                items: [
                    {
                        id: 1,
                        position: 0,
                        name: 'Illustrator',
                        level: 'beginner',
                    },
                    {
                        id: 2,
                        position: 1,
                        name: 'Professional Design',
                        level: 'beginner',
                    },
                    {
                        id: 3,
                        position: 2,
                        name: 'Web Design',
                        level: 'beginner',
                    },
                    {
                        id: 4,
                        position: 3,
                        name: 'SEO Copywriting',
                        level: 'beginner',
                    },
                    {
                        id: 5,
                        position: 4,
                        name: 'Photography',
                        level: 'beginner',
                    },
                    {
                        id: 6,
                        position: 5,
                        name: 'Branding Design',
                        level: 'beginner',
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
                category: 'creative',
                get_thumbnail: './image/template.png',            
                title: 'Creative Template',
                description: 'Something creative description',
            },
            {
                id: 2,
                category: 'simple',
                get_thumbnail: './image/template.png',            
                title: 'Simple Template',
                description: 'Something simple description',
            },
            {
                id: 3,
                category: 'professional',
                get_thumbnail: './image/template.png',            
                title: 'Professional Template',
                description: 'Something professional description',
            },
            {
                id: 4,
                category: 'modern',
                get_thumbnail: './image/template.png',            
                title: 'Modern Template',
                description: 'Something modern description',
            },
            {
                id: 5,
                category: 'creative',
                get_thumbnail: './image/template.png',            
                title: 'Creative Template',
                description: 'Something creative description',
            },
            {
                id: 6,
                category: 'simple',
                get_thumbnail: './image/template.png',            
                title: 'Simple Template',
                description: 'Something simple description',
            },
            {
                id: 7,
                category: 'professional',
                get_thumbnail: './image/template.png',            
                title: 'Professional Template',
                description: 'Something professional description',
            },
            {
                id: 8,
                category: 'modern',
                get_thumbnail: './image/template.png',            
                title: 'Modern Template',
                description: 'Something modern description',
            },
        ],
    },
    creative: {
        data: [
            {
                id: 1,
                category: 'creative',
                get_thumbnail: './image/template.png',            
                title: 'Creative Template',
                description: 'Something creative description',
            },
            {
                id: 5,
                category: 'creative',
                get_thumbnail: './image/template.png',            
                title: 'Creative Template',
                description: 'Something creative description',
            },
        ],
    },
    simple: {
        data: [
            {
                id: 2,
                category: 'simple',
                get_thumbnail: './image/template.png',            
                title: 'Simple Template',
                description: 'Something simple description',
            },
            {
                id: 6,
                category: 'simple',
                get_thumbnail: './image/template.png',            
                title: 'Simple Template',
                description: 'Something simple description',
            },
        ],
    },
    professional: {
        data: [
            {
                id: 3,
                category: 'professional',
                get_thumbnail: './image/template.png',            
                title: 'Professional Template',
                description: 'Something professional description',
            },
            {
                id: 7,
                category: 'professional',
                get_thumbnail: './image/template.png',            
                title: 'Professional Template',
                description: 'Something professional description',
            },
        ],
    },
    modern: {
        data: [
            {
                id: 4,
                category: 'modern',
                get_thumbnail: './image/template.png',            
                title: 'Modern Template',
                description: 'Something modern description',
            },
            {
                id: 8,
                category: 'modern',
                get_thumbnail: './image/template.png',            
                title: 'Modern Template',
                description: 'Something modern description',
            },
        ],
    },
};

type MockedProfessionalSummarySuggestionsType = {
    tokens: string[];
    sequences: string[];
    paragraph: string[];
};

export const MOCKED_SUGGESTIONS: MockedProfessionalSummarySuggestionsType = {
    tokens: [
        'Token1 Token1 Token1 Token1 Token1',
        'Token2 Token2 Token2 Token2 Token2',
        'Token3 Token3 Token3 Token3 Token3',
        'Token4 Token4 Token4 Token4 Token4',
        'Token5 Token5 Token5 Token5 Token5',
    ],
    sequences: [
        'Sequences1 Sequences1 Sequences1 Sequences1 Sequences1',
        'Sequences2 Sequences2 Sequences2 Sequences2 Sequences2',
        'Sequences3 Sequences3 Sequences3 Sequences3 Sequences3',
        'Sequences4 Sequences4 Sequences4 Sequences4 Sequences4',
        'Sequences5 Sequences5 Sequences5 Sequences5 Sequences5',
    ],
    paragraph: [
        'Paragraph1 Paragraph1 Paragraph1 Paragraph1 Paragraph1',
        'Paragraph2 Paragraph2 Paragraph2 Paragraph2 Paragraph2',
        'Paragraph3 Paragraph3 Paragraph3 Paragraph3 Paragraph3',
        'Paragraph4 Paragraph4 Paragraph4 Paragraph4 Paragraph4',
        'Paragraph5 Paragraph5 Paragraph5 Paragraph5 Paragraph5',
    ]
};