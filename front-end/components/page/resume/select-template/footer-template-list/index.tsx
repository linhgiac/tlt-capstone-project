import React from 'react';
import TemplateItem from '../template-list';
import styles from '../styles.module.scss';

type Props = {
    className?: string;
    templates: any;
};

const FooterTemplateList = (props: Props) => {
    const { className, templates } = props;
    return (
        <div
            // style={{ display: 'flex', flexDirection: 'row' }}
            className={styles['footer-template-list']}>
            {templates.map((template: any, i: number) => {
                return (
                    <TemplateItem
                        key={i}
                        value={template}
                        thumbnail={true}
                    />
                );
            })}
        </div>
    );
};

export default FooterTemplateList;
