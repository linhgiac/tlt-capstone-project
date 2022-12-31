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
    template: 2,
    personalDetails: {
        id: 1,
        header: 'Personal Details',
        jobTitle: 'Freelance Graphic Designer',
        firstName: 'Eleanor',
        lastName: 'Fitzgerald',
        email: 'hello@reallygreatsite.com',
        phone: '+84772463555',
        country: 'Vietnam',
        city: 'Hochiminh',
    },
    professionalSummary: {
        id: 1,
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
                        city: 'HCM',
                        startDate: '2029/06',
                        // endDate: '2029/06',
                    },
                    {
                        id: 2,
                        position: 1,
                        jobTitle: 'Freelance Graphic Designer ',
                        employer: 'Salford & Co. ',
                        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt`,
                        city: 'HCM',
                        startDate: '2028/02',
                        endDate: '2029/02',
                    },
                    {
                        id: 3,
                        position: 2,
                        jobTitle: 'Junior Graphic Designer',
                        employer: 'Larana, Inc.',
                        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt`,
                        city: 'HCM',
                        startDate: '2027/02',
                        endDate: '2028/01',
                    },
                ],
            },
            educations: {
                id: 2,
                header: 'Education',
                position: 3,
                sectionType: 'educations',
                items: [
                    {
                        id: 2,
                        position: 0,
                        school: 'Really Great Universit',
                        degree: 'Bachelor of Multimedia Arts Major in Digital Design',
                        description: 'string',
                        startDate: '2023/09',
                        endDate: '2027/04',
                    },
                ],
            },
            skills: {
                id: 3,
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

// export const MOCKED_RESUME = {
//     id: 2,
//     template: 1,
//     title: 'M_Resume',
//     personal_details: {
//         header: 'Personal Details',
//         job_title: 'Freelance Graphic Designer',
//         first_name: 'Eleanor',
//         last_name: 'Fitzgerald',
//         email: 'hello@reallygreatsite.com',
//         phone: '+123-456-7890',
//         country: 'Vietnam',
//         city: 'Hochiminh',
//     },
//     professional_summary: {
//         header: 'Professional Summary',
//         content:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     },
//     complex_sections: [
//         {
//             id: 1,
//             header: 'Employment History',
//             position: 3,
//             section_type: 'employmentHistories',
//             employment_histories: [
//                 {
//                     id: 1,
//                     position: 0,
//                     job_title: 'Senior Graphic Designer',
//                     employer: 'Studio Shodwe',
//                     description:
//                         'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt',
//                     start_date: 'June 2029',
//                 },
//                 {
//                     id: 2,
//                     position: 1,
//                     job_title: 'Freelance Graphic Designer ',
//                     employer: 'Salford & Co. ',
//                     description:
//                         'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt',
//                     start_date: 'February 2028',
//                     end_date: 'February 2029',
//                 },
//                 {
//                     id: 3,
//                     position: 2,
//                     job_title: 'Junior Graphic Designer',
//                     employer: 'Larana, Inc.',
//                     description:
//                         'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt\n                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt',
//                     start_date: 'January 2027',
//                     end_date: 'January 2028',
//                 },
//             ],
//         },
//         {
//             id: 1,
//             header: 'Education',
//             position: 3,
//             section_type: 'educations',
//             educations: [
//                 {
//                     id: 2,
//                     position: 0,
//                     school: 'Really Great Universit',
//                     degree: 'Bachelor of Multimedia Arts Major in Digital Design',
//                     start_date: '2023',
//                     end_date: '2027',
//                 },
//             ],
//         },
//         {
//             id: 1,
//             header: 'Skills',
//             position: 5,
//             section_type: 'skills',
//             is_shown_level: true,
//             skills: [
//                 {
//                     id: 1,
//                     position: 0,
//                     name: 'Illustrator',
//                     level: 'beginner',
//                 },
//                 {
//                     id: 2,
//                     position: 1,
//                     name: 'Professional Design',
//                     level: 'beginner',
//                 },
//                 {
//                     id: 3,
//                     position: 2,
//                     name: 'Web Design',
//                     level: 'beginner',
//                 },
//                 {
//                     id: 4,
//                     position: 3,
//                     name: 'SEO Copywriting',
//                     level: 'beginner',
//                 },
//                 {
//                     id: 5,
//                     position: 4,
//                     name: 'Photography',
//                     level: 'beginner',
//                 },
//                 {
//                     id: 6,
//                     position: 5,
//                     name: 'Branding Design',
//                     level: 'beginner',
//                 },
//             ],
//         },
//     ],
// };

type MockedTemplatesDataType = {
    all: TemplatesDataType;
    creative: TemplatesDataType;
    simple: TemplatesDataType;
    professional: TemplatesDataType;
    modern: TemplatesDataType;
};

// export const MOCKED_TEMPLATES: MockedTemplatesDataType = {
//     all: {
//         data: [
//             {
//                 id: 1,
//                 category: 'creative',
//                 get_thumnail: './image/template.png',
//                 name: 'Creative_Template',
//                 title: 'Creative Template',
//                 description: 'Something creative description',
//             },
//             {
//                 id: 2,
//                 category: 'simple',
//                 get_thumnail: './image/template.png',
//                 name: 'Simple_Template',
//                 title: 'Simple Template',
//                 description: 'Something simple description',
//             },
//             {
//                 id: 3,
//                 category: 'professional',
//                 thumnail: './image/template.png',
//                 name: 'Professional_Template',
//                 title: 'Professional Template',
//                 description: 'Something professional description',
//             },
//             {
//                 id: 4,
//                 category: 'modern',
//                 thumnail: './image/template.png',
//                 name: 'Modern_Template',
//                 title: 'Modern Template',
//                 description: 'Something modern description',
//             },
//             {
//                 id: 5,
//                 category: 'creative',
//                 thumnail: './image/template.png',
//                 name: 'Creative_Template',
//                 title: 'Creative Template',
//                 description: 'Something creative description',
//             },
//             {
//                 id: 6,
//                 category: 'simple',
//                 thumnail: './image/template.png',
//                 name: 'Simple_Template',
//                 title: 'Simple Template',
//                 description: 'Something simple description',
//             },
//             {
//                 id: 7,
//                 category: 'professional',
//                 thumnail: './image/template.png',
//                 name: 'Professional_Template',
//                 title: 'Professional Template',
//                 description: 'Something professional description',
//             },
//             {
//                 id: 8,
//                 category: 'modern',
//                 thumnail: './image/template.png',
//                 name: 'Modern_Template',
//                 title: 'Modern Template',
//                 description: 'Something modern description',
//             },
//         ],
//     },
//     creative: {
//         data: [
//             {
//                 id: 1,
//                 category: 'creative',
//                 thumnail: './image/template.png',
//                 name: 'Creative_Template',
//                 title: 'Creative Template',
//                 description: 'Something creative description',
//             },
//             {
//                 id: 5,
//                 category: 'creative',
//                 thumnail: './image/template.png',
//                 name: 'Creative_Template',
//                 title: 'Creative Template',
//                 description: 'Something creative description',
//             },
//         ],
//     },
//     simple: {
//         data: [
//             {
//                 id: 2,
//                 category: 'simple',
//                 thumnail: './image/template.png',
//                 name: 'Simple_Template',
//                 title: 'Simple Template',
//                 description: 'Something simple description',
//             },
//             {
//                 id: 6,
//                 category: 'simple',
//                 thumnail: './image/template.png',
//                 name: 'Simple_Template',
//                 title: 'Simple Template',
//                 description: 'Something simple description',
//             },
//         ],
//     },
//     professional: {
//         data: [
//             {
//                 id: 3,
//                 category: 'professional',
//                 thumnail: './image/template.png',
//                 name: 'Professional_Template',
//                 title: 'Professional Template',
//                 description: 'Something professional description',
//             },
//             {
//                 id: 7,
//                 category: 'professional',
//                 thumnail: './image/template.png',
//                 name: 'Professional_Template',
//                 title: 'Professional Template',
//                 description: 'Something professional description',
//             },
//         ],
//     },
//     modern: {
//         data: [
//             {
//                 id: 4,
//                 category: 'modern',
//                 thumnail: './image/template.png',
//                 name: 'Modern_Template',
//                 title: 'Modern Template',
//                 description: 'Something modern description',
//             },
//             {
//                 id: 8,
//                 category: 'modern',
//                 thumnail: './image/template.png',
//                 name: 'Modern_Template',
//                 title: 'Modern Template',
//                 description: 'Something modern description',
//             },
//         ],
//     },
// };
