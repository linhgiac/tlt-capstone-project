import classNames from 'classnames';
import { template } from 'lodash';
import React from 'react';
import FooterTemplateList from '../footer-template-list';
import LayoutEditor from '../layout-editor';
import { useTranslation } from 'next-i18next';
import styles from '../styles.module.scss';

type Props = {
    className?: string;
    templates: any;
};

const SelectTemplateFooter = (props: Props) => {
    const { className, templates } = props;
    const { t } = useTranslation(); 
    return (
        <div
            className={classNames(className, styles['select-template-footer'])}>
            <div className={styles['select-template-footer__content']}>
                <div className={styles['select-template-footer__title']}>
                    {t('edit-template', {ns: 'edit'})}
                </div>
                <FooterTemplateList templates={templates} />
            </div>
            <div className={styles['select-template-footer__content']}>
                <div className={styles['select-template-footer__title']}>
                    {t('edit-layout', {ns: 'edit'})}
                </div>
                <LayoutEditor />
            </div>
        </div>
    );
};

export default SelectTemplateFooter;
