import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { RESUME_SIZE } from '../../../../../configs/constants/resume.constants';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import Canvas from '../../../../custom/canvas';
import Page from './Page';
import styles from './styles.module.scss';

type ResumeExportMainProps = {
    className?: string;
};

const ResumeExportMain = (props: ResumeExportMainProps) => {
    const { className } = props;
    const [resumeExportContainerSize, setResumeExportContainerSize] = useState({
        width: 0,
        height: 0,
    });
    const [scale, setScale] = useState(0.55);

    useEffect(() => {
        function handleResumeExportContainerResize() {
            const resumeExportContainer =
                document.getElementById('resume-export-main');
            console.log('resumeexport-container', resumeExportContainer);
            if (resumeExportContainer) {
                setResumeExportContainerSize({
                    width: resumeExportContainer.offsetWidth,
                    height: resumeExportContainer.offsetHeight,
                });
            }
        }

        window.addEventListener('resize', handleResumeExportContainerResize);

        return () => {
            window.removeEventListener(
                'resize',
                handleResumeExportContainerResize
            );
        };
    }, []);

    useEffect(() => {
        // const flag = (resumeExportContainerSize.height * 16) / 9;
        // if (resumeExportContainerSize.height > 486) {
        //     setScale(0.45);
        // } else if (resumeExportContainerSize.width < flag) {
        //     setScale(resumeExportContainerSize.width / 1920);
        // } else setScale(resumeExportContainerSize.height / 1080);
        console.log('resumeexport', resumeExportContainerSize);
    }, [resumeExportContainerSize]);

    // console.log('width', resumeExportContainerSize.width);
    // console.log('height', resumeExportContainerSize.height);
    return (
        <div className={classNames(className)}>
            <Page scale={scale} />;
        </div>
    );
};

export default ResumeExportMain;
