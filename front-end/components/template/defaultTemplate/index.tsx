import classNames from 'classnames';
import React from 'react';
import { RESUME_SIZE } from '../../../configs/constants/resume.constants';
import { ResumeDataType } from '../../../configs/interfaces/resume.interface';
import { defaultTemplateGenerator } from '../../../template/defaultTemplate';
import Canvas from '../../custom/canvas';

type DefaultTemplateProps = {
    className?: string;
    resumeData: ResumeDataType;
};

const DefaultTemplate = (props: DefaultTemplateProps) => {
    const { className, resumeData } = props;

    const displayBackgroundHandler = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, RESUME_SIZE.width, RESUME_SIZE.height);
    };
    const generateResumeHandler = (ctx: CanvasRenderingContext2D) => {
        return defaultTemplateGenerator(ctx, resumeData);
    };
    return (
        <div className={classNames(className)}>
            <Canvas
                className={classNames('resume-background')}
                width={RESUME_SIZE.width}
                height={RESUME_SIZE.height}
                onGenerateCanvas={displayBackgroundHandler}
            />
            <Canvas
                className={classNames('resume-content')}
                width={RESUME_SIZE.width}
                height={RESUME_SIZE.height}
                onGenerateCanvas={generateResumeHandler}
            />
        </div>
    );
};

export default DefaultTemplate;
