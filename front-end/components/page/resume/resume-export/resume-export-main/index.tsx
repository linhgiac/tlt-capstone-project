import classNames from 'classnames';
import React from 'react';
import { RESUME_SIZE } from '../../../../../configs/constants/resume.constants';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import Canvas from '../../../../custom/canvas';
import Page from './Page';
import styles from './styles.module.scss';

type ResumeExportMainProps = {
    className?: string;
    scale?: any;
};

const ResumeExportMain = (props: ResumeExportMainProps) => {
    const { className, scale = 0.5 } = props;
    return (
        <div
            className={classNames(className)}
            style={{ transform: `scale(${scale})` }}>
            {/* <TransformWrapper
                centerOnInit
                minScale={0.25}
                initialScale={scale}
                limitToBounds={true}
                centerZoomedOut={false}
                // pinch={{ step: 1 }}
                wheel={{ touchPadDisabled: true }}>
                {controllerProps => (
                    <>
                        <TransformComponent wrapperClass={styles.wrapper}>
                            <div> */}
            <Page />
            {/* </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper> */}
        </div>
    );
};

export default ResumeExportMain;
