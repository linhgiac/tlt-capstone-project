import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { get, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import ResumeExport from '../../../../components/page/resume/resume-export';
import ResumeImport from '../../../../components/page/resume/resume-import';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import { MOCKED_RESUME } from '../../../../mock/resume.mock';
import { HOST, LAYOUT } from '../../../../configs/constants/misc';
import { resumeSavedState } from '../../../../recoil-state/resume-state/resume.state';
import {
    personalDetailChangedValueState,
    professionalSummaryChangedValueState,
    resumeChangedValueState,
    resumeInfoState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import {
    employmentHistoryItemsState,
    educationItemsState,
    linkItemsState,
    skillItemsState,
    employmentHistoriesDetailsState,
    educationsDetailsState,
    linksDetailsState,
    skillsDetailsState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';

import { resumeTitleValueState } from '../../../../recoil-state/resume-state/resume-title.state';
import { getAuthHeader } from '../../../../configs/restApi/clients';
import { convertResumeResponse } from '../../../../configs/utils/format.utils';
import TemplateSelector from '../../../../components/page/resume/select-template';
import { userLoginState } from '../../../../recoil-state/user-state/user-state';

type ResumeEditorProps = {
    initialResumeData: ResumeDataType;
    templateList?: any;
    error?: any;
};

const ResumeEditor = (props: ResumeEditorProps) => {
    const { initialResumeData, templateList, error } = props;
    console.log('initialResumeData :>> ', initialResumeData);

    const isLogged = useRecoilValue(userLoginState);
    const [resumeSaved, setResumeSaved] = useRecoilState(resumeSavedState);

    const resumeData = useRecoilValue(resumeChangedValueState);
    const setResumeInfo = useSetRecoilState(resumeInfoState);
    const setResumeTitle = useSetRecoilState(resumeTitleValueState);
    const setPersonalDetailsChangedValues = useSetRecoilState(
        personalDetailChangedValueState
    );
    const setProfessionalSummaryChangedValues = useSetRecoilState(
        professionalSummaryChangedValueState
    );

    const setEmploymentHistoryDetails = useSetRecoilState(
        employmentHistoriesDetailsState
    );
    const setEducationDetails = useSetRecoilState(educationsDetailsState);
    const setLinkDetails = useSetRecoilState(linksDetailsState);
    const setSkillDetails = useSetRecoilState(skillsDetailsState);

    const setEmploymentHistoryItems = useSetRecoilState(
        employmentHistoryItemsState
    );
    const setEducationItems = useSetRecoilState(educationItemsState);
    const setLinkItems = useSetRecoilState(linkItemsState);
    const setSkillItems = useSetRecoilState(skillItemsState);

    const [isEditing, setIsEditing] = useState(true);

    setResumeSaved(initialResumeData);

    const router = useRouter();

    useEffect(() => {
        if (error || isEmpty(initialResumeData) || !isLogged) {
            router.push('/');
        }
    }, [error, initialResumeData, isLogged, router]);

    useEffect(() => {
        console.log('resumeData', resumeData);
    }, [resumeData]);

    useEffect(() => {
        setResumeInfo({
            id: initialResumeData?.id,
            template: initialResumeData?.template,
        });
        setResumeTitle(
            initialResumeData?.title ? initialResumeData?.title : 'Untitled'
        );
    }, [initialResumeData, setResumeInfo, setResumeSaved, setResumeTitle]);

    useEffect(() => {
        if (!isEmpty(initialResumeData?.personalDetails)) {
            setPersonalDetailsChangedValues(initialResumeData?.personalDetails);
        }
        if (!isEmpty(initialResumeData?.professionalSummary)) {
            setProfessionalSummaryChangedValues(
                initialResumeData?.professionalSummary
            );
        }
    }, [
        initialResumeData?.personalDetails,
        initialResumeData?.professionalSummary,
        setPersonalDetailsChangedValues,
        setProfessionalSummaryChangedValues,
    ]);

    useEffect(() => {
        const employmentHistories = get(
            initialResumeData,
            'complexSections.sectionDetails.employmentHistories'
        );
        const educations = get(
            initialResumeData,
            'complexSections.sectionDetails.educations'
        );
        const links = get(
            initialResumeData,
            'complexSections.sectionDetails.links'
        );
        const skills = get(
            initialResumeData,
            'complexSections.sectionDetails.skills'
        );
        if (employmentHistories) {
            setEmploymentHistoryDetails((prev): any => {
                return { ...prev, id: employmentHistories.id };
            });
        }
        if (educations) {
            setEducationDetails((prev): any => {
                return { ...prev, id: educations.id };
            });
        }
        if (links) {
            setLinkDetails((prev): any => {
                return { ...prev, id: links.id };
            });
        }
        if (skills) {
            setSkillDetails((prev): any => {
                return { ...prev, id: skills.id };
            });
        }
    }, [
        setEducationDetails,
        setEducationItems,
        setEmploymentHistoryDetails,
        setEmploymentHistoryItems,
        setLinkDetails,
        setLinkItems,
        setSkillDetails,
        setSkillItems,
    ]);

    useEffect(() => {
        const employmentHistoriesItems = get(
            initialResumeData,
            'complexSections.sectionDetails.employmentHistories.items'
        );
        const educationsItems = get(
            initialResumeData,
            'complexSections.sectionDetails.educations.items'
        );
        const linksItems = get(
            initialResumeData,
            'complexSections.sectionDetails.links.items'
        );
        const skillsItems = get(
            initialResumeData,
            'complexSections.sectionDetails.skills.items'
        );
        if (employmentHistoriesItems) {
            setEmploymentHistoryItems(
                employmentHistoriesItems.map((item, i) => {
                    return { ...item, position: i + 1 };
                })
            );
        }
        if (educationsItems) {
            setEducationItems(
                educationsItems.map((item, i) => {
                    return { ...item, position: i + 1 };
                })
            );
        }
        if (linksItems) {
            setLinkItems(
                linksItems.map((item, i) => {
                    return { ...item, position: i + 1 };
                })
            );
        }
        if (skillsItems) {
            setSkillItems(
                skillsItems.map((item, i) => {
                    return { ...item, position: i + 1 };
                })
            );
        }
    }, [
        initialResumeData,
        setEducationItems,
        setEmploymentHistoryItems,
        setLinkItems,
        setSkillItems,
    ]);
    const changeLayoutHandler = () => {
        setIsEditing(!isEditing);
    };
    return (
        <>
            {isEditing ? (
                <div className="flex-row">
                    <ResumeImport
                        className="w-50 p-48"
                        // initialResume={resumeSaved}
                    />
                    <ResumeExport
                        className="w-50"
                        onChangeLayout={changeLayoutHandler}
                    />
                </div>
            ) : (
                <TemplateSelector
                    onChangeLayout={changeLayoutHandler}
                    templates={templateList}
                />
            )}
        </>
    );
};

export default ResumeEditor;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { req, res } = ctx;
    const defaultReturnProps = {
        currentLayout: LAYOUT.EDITOR,
    };
    const resumeId = ctx.params?.id;
    // const resumeId = 1;

    try {
        const templates = await axios.get(`${HOST}resume-template/`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        console.log('response :>> ', templates.data);
        const headers = getAuthHeader({ req, res });
        const resume = await axios.get(`${HOST}resume/${resumeId}/`, {
            headers: headers,
        });
        return {
            props: {
                ...defaultReturnProps,
                // initialResumeData: MOCKED_RESUME,
                templateList: templates.data,
                initialResumeData: convertResumeResponse(resume.data),
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                error: JSON.stringify(error),
            },
        };
    }
}
