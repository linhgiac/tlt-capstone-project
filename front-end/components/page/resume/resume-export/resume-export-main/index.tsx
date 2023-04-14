import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Page from './Page';

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
        setScale(resumeExportContainerSize.height / 1122);
        console.log('resumeexport', resumeExportContainerSize);
    }, [resumeExportContainerSize]);
    return (
        <div
            className={classNames(className)}
            id="resume-export-main">
            <Page scale={scale} />
        </div>
    );
};

export default ResumeExportMain;
