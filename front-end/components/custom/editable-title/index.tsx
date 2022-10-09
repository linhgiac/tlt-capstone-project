import React from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

type EditableTitleProps = {
    className?: string;
    children?: React.ReactNode;
};

export const EditableTitle = (props: EditableTitleProps) => {
    const { className, children } = props;
    return <div className={classNames(className)}>{children}</div>;
};
