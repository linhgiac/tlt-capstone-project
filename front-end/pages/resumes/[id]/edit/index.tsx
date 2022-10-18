import { Button } from 'antd';
import React, { useState } from 'react';
import ResumeExport from '../../../../components/page/resume/resume-export';
import ResumeImport from '../../../../components/page/resume/resume-import';

type ResumeEditorProps = {};

const ResumeEditor = (props: ResumeEditorProps) => {
    const [isEditing, setIsEditing] = useState(true);

    const changeLayoutHandler = () => {
        new Promise(() => {});
        setIsEditing(!isEditing);
    };
    return (
        <>
            {isEditing ? (
                <div className='flex-row'>
                    <ResumeImport className='w-50 p-48' />
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
