const ValidTitles = ["Personal Details", "Professional Summary"]

export const verifyTitle = (title: string):boolean => {
    for(var index in ValidTitles) {
        if(ValidTitles[index] == title) {
            return true
        }
    }
    return false
}

export const getTitleSuggestion = (title: string):string => {
    return title
}