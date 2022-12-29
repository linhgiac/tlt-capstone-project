import { ResumeInfoType } from './../../../configs/interfaces/resume.interface';
import {
    ComplexSectionDataType,
    // PersonalDetailsDataType,
} from '../../../configs/interfaces/resume.interface';
import {
    personalDetailTitleValueState,
    professionalSummaryTitleValueState,
    resumeTitleValueState,
} from '../resume-title.state';
import { atom, selector } from 'recoil';
import {
    FieldFormData,
    PersonalDetailsDataType,
    ProfessionalSummaryDataType,
    ResumeDataType,
} from '../../../configs/interfaces/resume.interface';
import { complexSectionChangedValueState } from './resume-changed-complex-section.state';

export const resumeChangedValueState = selector<ResumeDataType>({
    key: 'resumeChangedValueState',
    get: ({ get }) => {
        const info = get(resumeInfoState);
        const title = get(resumeTitleValueState);
        const personalDetails: PersonalDetailsDataType = get(
            personalDetailChangedValueState
        );
        const professionalSummary: ProfessionalSummaryDataType = get(
            professionalSummaryChangedValueState
        );
        const complexSections: ComplexSectionDataType = get(
            complexSectionChangedValueState
        );
        let result = { ...info };
        if (title) {
            result = Object.assign(result, { title });
        }
        if (Object.keys(personalDetails).length > 1) {
            result = Object.assign(result, { personalDetails });
        }
        if (Object.keys(professionalSummary).length > 1) {
            result = Object.assign(result, { professionalSummary });
        }
        if (complexSections.sectionType?.length) {
            result = Object.assign(result, { complexSections });
        }
        return result;
    },
});

export const resumeInfoState = atom<ResumeInfoType>({
    key: 'resumeInfo',
    default: {},
});

export const personalDetailChangedValueState = atom<PersonalDetailsDataType>({
    key: 'personalDetailChangedValueState',
    default: {},
});

export const professionalSummaryChangedValueState =
    atom<ProfessionalSummaryDataType>({
        key: 'professionalSummaryChangedValueState',
        default: {},
    });
