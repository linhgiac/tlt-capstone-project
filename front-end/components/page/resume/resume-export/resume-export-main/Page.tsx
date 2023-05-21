import classNames from 'classnames';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeInfoState } from '../../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import Template01 from '../../../../../template/template-01';
import TemplateMap from '../../../../../template/templateMap';
import styles from './pages.module.scss';

type Props = {
    className?: string;
    scale?: number;
};

const Page = (props: Props) => {
    const { className, scale = 1 } = props;
    const resumeInfo = useRecoilValue(resumeInfoState);

    return (
        // <div id={'pdf'}>
        <div >
            <TemplateMap
                id={resumeInfo.template}
                scale={scale}
            />
            {/* </div> */}
        </div>
        // </div>
    );
};

export default Page;
