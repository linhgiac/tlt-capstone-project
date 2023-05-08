import React from 'react';
import { Layout } from 'antd';
import EditorHeader from './header';

type Props = {
    children: React.ReactNode;
};

const EditorLayout = (props: Props) => {
    const { children } = props;
    return (
        <>
            <EditorHeader />
            <div style={{ paddingTop: '70px' }}>{children}</div>
        </>
    );
};

export default EditorLayout;
