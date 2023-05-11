import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import styles from '../styles.module.scss';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { resumeInfoState } from '../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';

type Props = {
    className?: string;
    value?: any;
    thumbnail?: boolean;
};

const TemplateItem = (props: Props) => {
    const { className, value, thumbnail = false } = props;
    const setResumeInfo = useSetRecoilState(resumeInfoState);
    const clickHandler = () => {
        setResumeInfo((prev: any) => {
            return { ...prev, template: value.id };
        });
    };
    return (
        <div
            className={styles['item']}
            onClick={clickHandler}>
            <div className={styles.name}>{value.title}</div>
            {thumbnail && (
                <div className={styles['thumbnail']}>
                    <Image
                        src={value.thumbnail}
                        width={225}
                        height={321}
                        alt={value.name}
                    />
                </div>
            )}
        </div>
    );
};

export default TemplateItem;
