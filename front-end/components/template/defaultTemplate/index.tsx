import classNames from 'classnames';
import React, { useCallback } from 'react';
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
    // const generateResumeHandler = useCallback(
    //     (ctx: CanvasRenderingContext2D) => {
    //         return defaultTemplateGenerator(ctx, resumeData);
    //     },
    //     [resumeData]
    // );
    const generateResumeHandler = (ctx: CanvasRenderingContext2D) => {
        const { personalDetails, professionalSummary } = resumeData;
        const PADDING = 100;
        const FONT = {
            family: 'Times New Roman',
            size: 14,
        };

        //personal details
        ctx.moveTo(RESUME_SIZE.width / 2, PADDING);
        ctx.font = `${FONT.size * 2}px ${FONT.family}`;
        ctx.font = 'bold';
        ctx.textAlign = 'center';
        ctx.fillText(
            `${personalDetails?.firstName} ${personalDetails?.lastName}, ${personalDetails?.jobTitle}`,
            RESUME_SIZE.width / 2,
            PADDING
        );
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
