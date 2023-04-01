import classNames from 'classnames';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeInfoState } from '../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import Template01 from '../../../../../template/template-01';
import TemplateMap from '../../../../../template/templateMap';
import styles from './pages.module.scss';

type Props = {};

const Page = (props: Props) => {
    const resumeInfo = useRecoilValue(resumeInfoState);

    return (
        // <div style={{transform: 'scale(0.5)'}}>
            <div
            id={'pdf'}
            className={styles.container}>
            {/* <div
                id={'inner-pdf'}
                style={{ lineHeight: '1.4' }}
                className={classNames('cv-format')}> */}
                <TemplateMap id={resumeInfo.template}/>
            {/* </div> */}
        </div>
        // </div>
        
    );
};

export default Page;
