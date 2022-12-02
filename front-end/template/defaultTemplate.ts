import { RESUME_SIZE } from './../configs/constants/resume.constants';
import { ResumeDataType } from './../configs/interfaces/resume.interface';
export const defaultTemplateGenerator = (ctx: CanvasRenderingContext2D, value: ResumeDataType) => {
    const {personalDetails, professionalSummary} = value;
    const PADDING = 40;
    
    //personal details
    ctx.moveTo(RESUME_SIZE.width/2, PADDING)
    ctx.font = '14px Times New Roman'
    ctx.font='bold'
    ctx.textAlign='center'
    ctx.fillText(`${personalDetails?.firstName} ${personalDetails?.lastName} ${personalDetails?.jobTitle}`, RESUME_SIZE.width/2, PADDING)
}