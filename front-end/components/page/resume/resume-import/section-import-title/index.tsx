import React from 'react';
import { EditableTitle } from '../../../../custom';
import classNames from 'classnames';
import styles from './styles.module.scss';

type SectionImportTitleProps = {
    className?: string;
    children: string;
    onChangeTitle: (title: string) => void;
    defaultTitle?: string;
};

function SectionImportTitle({
    className,
    children,
    onChangeTitle,
    defaultTitle,
}: SectionImportTitleProps) {
    return (
        <EditableTitle
            className={classNames(
                { className },
                styles['section-import-title']
            )}
            onChangeTitle={onChangeTitle}
            defaultTitle={defaultTitle}>
            {children}
        </EditableTitle>
    );
}

export default SectionImportTitle;
