import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import ResumeExport from '../../../../components/page/resume/resume-export';
import ResumeImport from '../../../../components/page/resume/resume-import';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import { MOCKED_RESUME } from '../../../../mock/resume.mock';
import { LAYOUT } from '../../../../configs/constants/misc';
import { useRecoilState } from 'recoil';
import { resumeSavedState } from '../../../../recoil-state/resume-state/resume.state';

type ResumeEditorProps = {
    initialResumeData: ResumeDataType;
};

const ResumeEditor = (props: ResumeEditorProps) => {
    const { initialResumeData } = props;
    const [resumeSaved, setResumeSaved] = useRecoilState(resumeSavedState);
    useEffect(() => {
        setResumeSaved(initialResumeData);
    }, [initialResumeData, setResumeSaved]);
    const [isEditing, setIsEditing] = useState(true);

    const changeLayoutHandler = () => {
        setIsEditing(!isEditing);
    };
    return (
        <>
            {isEditing ? (
                <div className="flex-row">
                    <ResumeImport
                        className="w-50 p-48"
                        initialResume={resumeSaved}
                    />
                    <ResumeExport
                        className="w-50"
                        onChangeLayout={changeLayoutHandler}
                        resumeData={resumeSaved}
                    />
                </div>
            ) : (
                <Button
                    type="primary"
                    onClick={changeLayoutHandler}>
                    Back to Editor
                </Button>
            )}
        </>
    );
};

export default ResumeEditor;

export async function getServerSideProps() {
    const defaultReturnProps = {
        currentLayout: LAYOUT.EDITOR,
    };
    try {
        return {
            props: {
                ...defaultReturnProps,
                initialResumeData: MOCKED_RESUME,
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
