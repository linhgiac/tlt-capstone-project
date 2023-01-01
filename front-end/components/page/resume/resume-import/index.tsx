import React, { useCallback, useEffect, useState } from 'react';
import ResumeTitle from './resume-title';
import classNames from 'classnames';
import { Button, Input, Modal } from 'antd';
import ResumeImportForm from './resume-import-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    educationItemsState,
    educationsDetailsState,
    employmentHistoriesDetailsState,
    employmentHistoryItemsState,
    linkItemsState,
    linksDetailsState,
    skillItemsState,
    skillsDetailsState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-complex-section.state';
import {
    convertPayloadData,
    convertResumeResponse,
    convertTest,
} from '../../../../configs/utils/format.utils';
import styles from './styles.module.scss';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import { ResumeConstants } from '../../../../configs/constants/resume.constants';
import { resumeTitleValueState } from '../../../../recoil-state/resume-state/resume-title.state';
import {
    personalDetailChangedValueState,
    professionalSummaryChangedValueState,
    resumeChangedValueState,
    resumeInfoState,
} from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { getAuthHeader } from '../../../../configs/restApi/clients';
import { HOST } from '../../../../configs/constants/misc';
import axios from 'axios';
import { resumeSavedState } from '../../../../recoil-state/resume-state/resume.state';
import { isEmpty, get } from 'lodash';
import { useRouter } from 'next/router';

type ResumeImportProps = {
    className?: string;
    // initialResume: ResumeDataType;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className } = props;
    const router = useRouter();
    const [resumeSaved, setResumeSaved] = useRecoilState(resumeSavedState);
    const resumeChangedValue: ResumeDataType = useRecoilValue(
        resumeChangedValueState
    );
    const setResumeInfo = useSetRecoilState(resumeInfoState);
    const [resumeTitle, setResumeTitle] = useRecoilState(resumeTitleValueState);
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
    useEffect(() => {}, [resumeChangedValue]);

    const submitFormHandler = async () => {
        const resumeConvertedValue = await convertPayloadData(
            resumeChangedValue
        );

        try {
            const response = await axios.put(
                `${HOST}resume/update/`,
                resumeConvertedValue,
                {
                    headers: getAuthHeader(),
                }
            );
            console.log('response', response);
            const convertResponse = convertResumeResponse(response.data);
            setResumeSaved(convertResponse);
            console.log('convertResponse :>> ', convertResponse);

            setIsSuccessful(true);
        } catch (error) {
            console.log('error :>> ', error);
        }

        // await resetChangeValue();
    };

    useEffect(() => {
        if (!isEmpty(resumeSaved.personalDetails)) {
            setPersonalDetailsChangedValues(resumeSaved.personalDetails);
        }
        if (!isEmpty(resumeSaved.professionalSummary)) {
            setProfessionalSummaryChangedValues(
                resumeSaved.professionalSummary
            );
        }
    }, [
        resumeSaved.personalDetails,
        resumeSaved.professionalSummary,
        setPersonalDetailsChangedValues,
        setProfessionalSummaryChangedValues,
    ]);

    useEffect(() => {
        const employmentHistories = get(
            resumeSaved,
            'complexSections.sectionDetails.employmentHistories'
        );
        const educations = get(
            resumeSaved,
            'complexSections.sectionDetails.educations'
        );
        const links = get(resumeSaved, 'complexSections.sectionDetails.links');
        const skills = get(
            resumeSaved,
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
            resumeSaved,
            'complexSections.sectionDetails.employmentHistories.items'
        );
        const educationsItems = get(
            resumeSaved,
            'complexSections.sectionDetails.educations.items'
        );
        const linksItems = get(
            resumeSaved,
            'complexSections.sectionDetails.links.items'
        );
        const skillsItems = get(
            resumeSaved,
            'complexSections.sectionDetails.skills.items'
        );
        if (employmentHistoriesItems) {
            setEmploymentHistoryItems(employmentHistoriesItems);
        }
        if (educationsItems) {
            setEducationItems(educationsItems);
        }
        if (linksItems) {
            setLinkItems(linksItems);
        }
        if (skillsItems) {
            setSkillItems(skillsItems);
        }
    }, [
        resumeSaved,
        setEducationItems,
        setEmploymentHistoryItems,
        setLinkItems,
        setSkillItems,
    ]);

    const getDataHandler = async () => {
        // const response = await fetch('/api/resume-editor');
        // const data = await response.json();
        // console.log({ data });
        convertTest();
    };

    // useEffect(() => {
    //     // resetChangeValue();
    //     setResumeInfo({
    //         id: initialResume.id,
    //         template: initialResume.template,
    //     });
    //     if (initialResume.title) {
    //         setResumeInitialTitle(initialResume.title);
    //     }
    // }, [
    //     initialResume.id,
    //     initialResume.template,
    //     initialResume.title,
    //     setResumeInfo,
    //     setResumeInitialTitle,
    // ]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [title, setTitle] = useState(resumeSaved.title);
    const openModalHandler = () => {
        setIsOpenModal(true);
    };
    const [isSuccessful, setIsSuccessful] = useState(false);

    return (
        <div className={classNames(className)}>
            <ResumeTitle onClick={openModalHandler} />
            <Modal
                title={<div> Change Title </div>}
                centered
                open={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false);
                }}
                footer={null}>
                <Input
                    size="large"
                    defaultValue={title}
                    onChange={e => {
                        setTitle(e.target.value);
                    }}
                    onPressEnter={() => {
                        setResumeTitle(title);
                        setIsOpenModal(false);
                    }}
                />
            </Modal>
            <ResumeImportForm />
            <Button
                className={'btn'}
                type="primary"
                size="large"
                onClick={submitFormHandler}>
                Save Resume
            </Button>
            <Modal
                title={<div> Save Successfully</div>}
                centered
                open={isSuccessful}
                onCancel={() => {
                    setIsSuccessful(false);
                    // router.reload();
                }}
                footer={null}></Modal>
            {/* <Button
                className={'btn'}
                type="primary"
                size="large"
                onClick={getDataHandler}>
                Get Resume Data
            </Button> */}
        </div>
    );
};

export default ResumeImport;
