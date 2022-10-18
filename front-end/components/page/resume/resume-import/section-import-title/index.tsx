import React from 'react';
import { EditableTitle } from '../../../../custom';
import classNames from 'classnames';
import styles from './styles.module.scss';

type SectionImportTitleProps = {
    className?: string;
    children: string;
    onChangeTitle: (title: string) => void;
};

function SectionImportTitle({
    className,
    children,
    onChangeTitle,
}: SectionImportTitleProps) {
    return (
        <EditableTitle
            className={classNames(
                { className },
                styles['section-import-title']
            )}
            onChangeTitle={onChangeTitle}>
            {children}
        </EditableTitle>
    );
}

export default SectionImportTitle;
