import { Button } from 'antd';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import ResumeExport from '../../../../components/page/resume/resume-export';
import ResumeImport from '../../../../components/page/resume/resume-import';
import { ResumeDataType } from '../../../../configs/interfaces/resume.interface';
import { server } from '../../../../configs/index';
import mockedResume from '../../../../mock/resume.json';
import { MOCKED_RESUME } from '../../../../mock/resume.mock';

type ResumeEditorProps = {
    initialResumeData: ResumeDataType;
};

const ResumeEditor = (props: ResumeEditorProps) => {
    const { initialResumeData } = props;
    console.log('pre-rendering data', initialResumeData);
    const [isEditing, setIsEditing] = useState(true);

    const changeLayoutHandler = () => {
        setIsEditing(!isEditing);
    };
    return (
        <>
            {isEditing ? (
                <div className='flex-row'>
                    <ResumeImport
                        className='w-50 p-48'
                        initialResume={initialResumeData}
                    />
                    <ResumeExport
                        className='w-50'
                        onChangeLayout={changeLayoutHandler}
                    />
                </div>
            ) : (
                <Button type='primary' onClick={changeLayoutHandler}>
                    Back to Editor
                </Button>
            )}
        </>
    );
};

export default ResumeEditor;

export async function getServerSideProps() {
    return { props: { initialResumeData: MOCKED_RESUME } };
}
