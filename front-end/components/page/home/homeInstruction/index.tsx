import { Button } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import HomeCard from '../homeCard';
import HomeInstructionStep from './homeInstructionStep';
import styles from './styles.module.scss';

type Props = {};

const HomeInstruction = (props: Props) => {
    const router = useRouter();
    const TITLE = 'Create perfect resumes for the modern job market';
    const DESCRIPTION =
        'Creating a resume or cover letter has never been this easy! In three simple steps, create the perfect document to impress hiring managers and employers. Minimum time, maximum professional quality.';
    return (
        <HomeCard
            title={TITLE}
            description={DESCRIPTION}>
            <Button
                type="primary"
                className={styles['button']}
                onClick={() => {
                    router.push('/templates');
                }}>
                Create My Button
            </Button>
            <HomeInstructionStep
                className={classNames(
                    'center',
                    styles['home-instruction__step']
                )}
            />
        </HomeCard>
    );
};

export default HomeInstruction;
