import { personalDetailFieldsState, professionalSummaryFieldState } from './../../recoil-state/resume-state/index';
import { useSetRecoilState } from 'recoil';

export const useResetAllResumeChangeFields = async () => {
    const resetPersonalDetailsChangeFields = useSetRecoilState(personalDetailFieldsState)
    const resetProfessionalSummaryChangeFields = useSetRecoilState(professionalSummaryFieldState)
    
    resetPersonalDetailsChangeFields([])
    resetProfessionalSummaryChangeFields([])
}
