import React from 'react';
import { Layout } from 'antd';

type Props = {
    children: React.ReactNode;
};

const EditorLayout = (props: Props) => {
    const { children } = props;
    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default EditorLayout;
