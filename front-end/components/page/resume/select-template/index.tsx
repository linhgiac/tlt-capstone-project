import { Button } from 'antd';
import React from 'react';
import DownloadButton from '../../../custom/downnload-button';
import ResumeExportMain from '../resume-export/resume-export-main';
import styles from './styles.module.scss';
import TemplateItem from './template-list';
import TemplateList from './template-list';

type Props = {
    className?: string;
    onChangeLayout?: () => void;
    templates?: any;
};

const SelectTemplate = (props: Props) => {
    const { onChangeLayout, templates } = props;

    return (
        <div>
            <div className={styles.header}>
                <div>
                    <Button
                        className={styles.button}
                        type="default"
                        onClick={onChangeLayout}>
                        Back to Editor
                    </Button>
                    <DownloadButton />
                </div>
            </div>
            <div className={styles['container']}>
                <div className={styles['template']}>
                    {templates.map((template: any) => {
                        return (
                            <TemplateItem
                                key={template.id}
                                value={template}
                            />
                        );
                    })}
                </div>

                <div className={styles['resume']}>
                    <ResumeExportMain scale={0.9} />
                </div>
            </div>
        </div>
    );
};

export default SelectTemplate;
