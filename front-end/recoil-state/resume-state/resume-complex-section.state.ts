import {
    educationTitleValueState,
    employmentHistoryTitleValueState,
    linkTitleValueState,
} from './resume-title.state';
import {
    ComplexSectionDataType,
    ComplexSectionDetailsDataType,
    EmploymentHistoryItemDataType,
    ComplexSection,
    EducationItemDataType,
    LinkItemDataType,
} from './../../configs/interfaces/resume.interface';
import { atom, selector } from 'recoil';

export const complexSectionValueState = selector<ComplexSectionDataType>({
    key: 'complexSectionValueState',
    get: ({ get }) => {
        const employmentHistories = get(employmentHistoriesValueState);
        const educations = get(educationsValueState);
        const links = get(linksValueState);
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
        return { sectionType, sectionDetails };
    },
});

//employment history
export const employmentHistoryItemsState = atom<
    EmploymentHistoryItemDataType[]
>({
    key: 'employmentHistoryItemsState',
    default: [],
});
export const employmentHistoriesDetails = atom<ComplexSectionDetailsDataType>({
    key: 'employmentHistoriesDetails',
    default: {
        position: 2,
        sectionType: 'employmentHistories',
    },
});

export const employmentHistoriesValueState =
    selector<ComplexSectionDetailsDataType>({
        key: 'employmentHistoriesValueState',
        get: ({ get }) => {
            const header = get(employmentHistoryTitleValueState);
            const { id, position, sectionType } = get(
                employmentHistoriesDetails
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
export const educationsDetails = atom<ComplexSectionDetailsDataType>({
    key: 'educationsDetails',
    default: {
        position: 3,
        sectionType: 'educations',
    },
});

export const educationsValueState = selector<ComplexSectionDetailsDataType>({
    key: 'educationsValueState',
    get: ({ get }) => {
        const header = get(educationTitleValueState);
        const { id, position, sectionType } = get(educationsDetails);
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
export const linksDetails = atom<ComplexSectionDetailsDataType>({
    key: 'linksDetails',
    default: {
        position: 4,
        sectionType: 'links',
    },
});

export const linksValueState = selector<ComplexSectionDetailsDataType>({
    key: 'linksValueState',
    get: ({ get }) => {
        const header = get(linkTitleValueState);
        const { id, position, sectionType } = get(linksDetails);
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
