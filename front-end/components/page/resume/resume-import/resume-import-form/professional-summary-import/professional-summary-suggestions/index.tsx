import { FormInstance } from "antd";
import React from "react";
import { ProfessionalSummarySuggestionMode } from "../../../../../../../configs/interfaces/resume.interface";
import ProfessionalSummarySuggestionItem from "./professional-summary-suggestion-item";

type ProfessionalSummarySuggestionsProps = {
    suggestions: string[];
    suggestionMode: ProfessionalSummarySuggestionMode;
    onSelectSuggestion: (suggestionMode: ProfessionalSummarySuggestionMode, suggestion: string) => void;
}

const ProfessionalSummarySuggestions = (props: ProfessionalSummarySuggestionsProps) => {
    const { suggestions, suggestionMode, onSelectSuggestion } = props;

    return (
        <div>
            {suggestions.map((suggestion, i) =>
                <ProfessionalSummarySuggestionItem
                    key={i}
                    suggestion={suggestion}
                    suggestionMode={suggestionMode}
                    onClick={onSelectSuggestion}
                ></ProfessionalSummarySuggestionItem>)}
        </div>
    )
}

export default ProfessionalSummarySuggestions;