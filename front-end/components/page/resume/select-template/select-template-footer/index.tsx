import classNames from 'classnames';
import { template } from 'lodash';
import React from 'react';
import FooterTemplateList from '../footer-template-list';
import LayoutEditor from '../layout-editor';

import styles from '../styles.module.scss';

type Props = {
    className?: string;
    templates: any;
};

const SelectTemplateFooter = (props: Props) => {
    const { className, templates } = props;
    return (
        <div
            className={classNames(className, styles['select-template-footer'])}>
            <div className={styles['select-template-footer__content']}>
                <div className={styles['select-template-footer__title']}>
                    Template
                </div>
                <FooterTemplateList templates={templates} />
            </div>
            <div className={styles['select-template-footer__content']}>
                <div className={styles['select-template-footer__title']}>
                    Layout
                </div>
                <LayoutEditor />
            </div>
        </div>
    );
};

export default SelectTemplateFooter;
