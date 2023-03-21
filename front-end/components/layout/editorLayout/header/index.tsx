import { Button } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import ATSRecommendations from './ats-recommendations';
import styles from './styles.module.scss';

type Props = {};

const EditorHeader = (props: Props) => {
    const router = useRouter();
    return (
        <div className={styles.header}>
            {' '}
            <Button
                className={classNames(
                    'm-l-8',
                    'h-40px',
                    styles['text-button'],
                    styles['button']
                )}
                size="large"
                type="text"
                onClick={() => {
                    {
                        router.push('/dashboard');
                        // router.reload();
                    }
                }}>
                My resume
            </Button>
            <ATSRecommendations></ATSRecommendations>
        </div>
    );
};

export default EditorHeader;
