import React from 'react';
import { EditableTitle } from '../../../../custom';
import classNames from 'classnames';
import styles from './styles.module.scss';

type SectionImportTitleProps = {
    className?: string;
    children: React.ReactNode;
};

function SectionImportTitle({ className, children }: SectionImportTitleProps) {
    return (
        <EditableTitle
            className={classNames(
                { className },
                styles['section-import-title']
            )}>
            {children}
        </EditableTitle>
    );
}

export default SectionImportTitle;
