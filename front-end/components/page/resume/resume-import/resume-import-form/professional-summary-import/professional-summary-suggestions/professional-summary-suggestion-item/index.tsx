import React from "react";
import { ProfessionalSummarySuggestionMode } from "../../../../../../../../configs/interfaces/resume.interface";
import styles from '../../../professional-summary-import/styles.module.scss';

type ProfessionalSummarySuggestionItemProps = {
    suggestion: string;
    suggestionMode: ProfessionalSummarySuggestionMode;
    onClick: (suggestionMode: ProfessionalSummarySuggestionMode, suggestion: string) => void;
};

const ProfessionalSummarySuggestionItem = (props: ProfessionalSummarySuggestionItemProps) => {
    const { suggestion, suggestionMode, onClick } = props;
    return (
        <div onClick={() => onClick(suggestionMode, suggestion)}
            className={styles['professional-summary-suggestion-item']}>
            {suggestion}
        </div>
    )
};

export default ProfessionalSummarySuggestionItem;