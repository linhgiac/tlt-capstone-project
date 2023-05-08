import {
    educationTitleValueState,
    employmentHistoryTitleValueState,
    linkTitleValueState,
    skillTitleValueState,
} from '../resume-title.state';
import {
    ComplexSectionDataType,
    ComplexSectionDetailsDataType,
    EmploymentHistoryItemDataType,
    ComplexSection,
    EducationItemDataType,
    LinkItemDataType,
} from '../../../configs/interfaces/resume.interface';
import { atom, selector } from 'recoil';

export const complexSectionChangedValueState = selector<ComplexSectionDataType>(
    {
        key: 'complexSectionChangedValueState',
        get: ({ get }) => {
            const employmentHistories = get(
                employmentHistoriesChangedValueState
            );
            const educations = get(educationsChangedValueState);
            const links = get(linksChangedValueState);
            const skills = get(skillsChangedValueState);

            const sectionType: ComplexSection[] = [];
            const sectionDetails: Partial<
                Record<ComplexSection, ComplexSectionDetailsDataType>
            > = {};
            if (employmentHistories.items?.length) {
                sectionType.push('employmentHistories');
                sectionDetails['employmentHistories'] = employmentHistories;
            }
            if (educations.items?.length) {
                sectionType.push('educations');
                sectionDetails['educations'] = educations;
            }
            if (links.items?.length) {
                sectionType.push('links');
                sectionDetails['links'] = links;
            }
            if (skills.items?.length) {
                sectionType.push('skills');
                sectionDetails['skills'] = skills;
            }
            return { sectionType, sectionDetails };
        },
    }
);

//employment history
export const employmentHistoryItemsState = atom<
    EmploymentHistoryItemDataType[]
>({
    key: 'employmentHistoryItemsState',
    default: [],
});
export const employmentHistoriesDetailsState =
    atom<ComplexSectionDetailsDataType>({
        key: 'employmentHistoriesDetailsState',
        default: {
            position: 3,
            sectionType: 'employmentHistories',
        },
    });

export const employmentHistoriesChangedValueState =
    selector<ComplexSectionDetailsDataType>({
        key: 'employmentHistoriesChangedValueState',
        get: ({ get }) => {
            const header = get(employmentHistoryTitleValueState);
            const { id, position, sectionType } = get(
                employmentHistoriesDetailsState
            );
            const items = get(employmentHistoryItemsState);
            return {
                id,
                header,
                position,
                sectionType,
                items,
            };
        },
    });

//education
export const educationItemsState = atom<EducationItemDataType[]>({
    key: 'educationItemsState',
    default: [],
});
export const educationsDetailsState = atom<ComplexSectionDetailsDataType>({
    key: 'educationsDetailsState',
    default: {
        position: 4,
        sectionType: 'educations',
    },
});

export const educationsChangedValueState =
    selector<ComplexSectionDetailsDataType>({
        key: 'educationsChangedValueState',
        get: ({ get }) => {
            const header = get(educationTitleValueState);
            const { id, position, sectionType } = get(educationsDetailsState);
            const items = get(educationItemsState);
            return {
                id,
                header,
                position,
                sectionType,
                items,
            };
        },
    });

//links
export const linkItemsState = atom<LinkItemDataType[]>({
    key: 'linkItemsState',
    default: [],
});
export const linksDetailsState = atom<ComplexSectionDetailsDataType>({
    key: 'linksDetailsState',
    default: {
        position: 5,
        sectionType: 'links',
    },
});

export const linksChangedValueState = selector<ComplexSectionDetailsDataType>({
    key: 'linksChangedValueState',
    get: ({ get }) => {
        const header = get(linkTitleValueState);
        const { id, position, sectionType } = get(linksDetailsState);
        const items = get(linkItemsState);
        return {
            id,
            header,
            position,
            sectionType,
            items,
        };
    },
});

//skills
export const skillItemsState = atom<LinkItemDataType[]>({
    key: 'skillItemsState',
    default: [],
});
export const skillsDetailsState = atom<ComplexSectionDetailsDataType>({
    key: 'skillsDetailsState',
    default: {
        position: 6,
        sectionType: 'skills',
        isShownLevel: true,
    },
});

export const skillsChangedValueState = selector<ComplexSectionDetailsDataType>({
    key: 'skillsChangedValueState',
    get: ({ get }) => {
        const header = get(skillTitleValueState);
        const { id, position, sectionType, isShownLevel } =
            get(skillsDetailsState);
        const items = get(skillItemsState);
        return {
            id,
            header,
            position,
            sectionType,
            isShownLevel,
            items,
        };
    },
});
