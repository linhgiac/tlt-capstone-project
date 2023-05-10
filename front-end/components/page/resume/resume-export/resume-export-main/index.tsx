import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Page from './Page';

type ResumeExportMainProps = {
    className?: string;
};

const ResumeExportMain = (props: ResumeExportMainProps) => {
    const { className } = props;
    const [resumeExportContainerSize, setResumeExportContainerSize] = useState({
        width: 436,
        height: 617,
    });
    const [scale, setScale] = useState(0.55);

    useEffect(() => {
        function handleResumeExportContainerResize() {
            const resumeExportContainer =
                document.getElementById('resume-export-main');
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
