import classNames from 'classnames';
import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { RESUME_SIZE } from '../../../../../configs/constants/resume.constants';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import Canvas from '../../../../custom/canvas';
import Template from '../../../../template';
import Page from './Page';
import styles from './styles.module.scss';

type ResumeExportMainProps = {
    className?: string;
};

const ResumeExportMain = (props: ResumeExportMainProps) => {
    const { className} = props;
    return (
        <div className={classNames(styles.center, '.cv-format')}>
            <TransformWrapper
                centerOnInit
                minScale={0.25}
                initialScale={0.6}
                limitToBounds={false}
                centerZoomedOut={false}
                // pinch={{ step: 1 }}
                // wheel={{ step: 0.1 }}
            >
                {controllerProps => (
                    <>
                        <TransformComponent wrapperClass={styles.wrapper}>
                            <div>
                                <Page />
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};

export default ResumeExportMain;
