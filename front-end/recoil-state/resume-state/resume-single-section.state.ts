import { selector, atom } from 'recoil';
// import {
//     ResumeDataType,
//     PersonalDetailsDataType,
//     ProfessionalSummaryDataType,
//     ComplexSectionDataType,
// } from '../../configs/interfaces/resume.interface';
// import { complexSectionValueState } from './resume-complex-section.state';
// import { resumeTitleValueState } from './resume-title.state';

// export const resumeValueState = selector<ResumeDataType>({
//     key: 'resumeValueState',
//     get: ({ get }) => {
//         const title = get(resumeTitleValueState);
//         const personalDetails: PersonalDetailsDataType = get(
//             personalDetailValueState
//         );
//         const professionalSummary: ProfessionalSummaryDataType = get(
//             professionalSummaryValueState
//         );
//         const complexSections: ComplexSectionDataType = get(
//             complexSectionValueState
//         );
//         let result = {};
//         if (title) {
//             result = Object.assign(result, { title });
//         }
//         if (Object.keys(personalDetails).length > 1) {
//             result = Object.assign(result, { personalDetails });
//         }
//         if (Object.keys(professionalSummary).length > 1) {
//             result = Object.assign(result, { professionalSummary });
//         }
//         if (complexSections.sectionType?.length) {
//             result = Object.assign(result, { complexSections });
//         }
//         return result;
//     },
// });

// export const personalDetailValueState = atom<PersonalDetailsDataType>({
//     key: 'personalDetailValueState',
//     default: {},
// });

// export const professionalSummaryValueState = atom<ProfessionalSummaryDataType>({
//     key: 'professionalSummaryValueState',
//     default: {},
// });
