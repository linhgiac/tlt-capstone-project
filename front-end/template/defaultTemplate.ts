import { RESUME_SIZE } from './../configs/constants/resume.constants';
import { ResumeDataType } from './../configs/interfaces/resume.interface';
export const defaultTemplateGenerator = (ctx: CanvasRenderingContext2D, value: ResumeDataType) => {
    const {personalDetails, professionalSummary} = value;
    const PADDING = 70;
    const FONT = {
        family: 'Times New Roman',
        size: 14
    }
    
    //personal details
    ctx.moveTo(RESUME_SIZE.width/2, PADDING)
    ctx.font = `${FONT.size*2}px ${FONT.family}`
    ctx.font='bold'
    ctx.textAlign='center'
    ctx.fillText(`${personalDetails?.firstName} ${personalDetails?.lastName} ${personalDetails?.jobTitle}`, RESUME_SIZE.width/2, PADDING)
}