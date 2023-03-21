import { useCallback, useEffect } from "react"

const ValidTitles = ["Personal Details", "Professional Summary"]


type ATSTitleSuggestionItemProps = {
    title: string
    suggestion: string
}

const ATSTitleSuggestionItem = (props: ATSTitleSuggestionItemProps) => {
    const {title, suggestion} = props
    return (
        <div>
            <div>{title} is not valid</div>
            <div>Suggestion: {suggestion}</div>
        </div>)
}

export default ATSTitleSuggestionItem
