import { atom } from 'recoil';
import {
    ResumeDataType,
    ResumeLayoutType,
} from './../../configs/interfaces/resume.interface';

export const resumeSavedState = atom<any>({
    key: 'resumeSavedState',
    default: {},
});

export const resumeLayoutState = atom<ResumeLayoutType>({
    key: 'resumeLayoutState',
    default: [
        {
            main: ['employmentHistories', 'educations'],
            sidebar: ['skills'],
        },
    ],
});
