import { ResumeDataType } from './../interfaces/resume.interface';
import camelCase from 'camelcase'


export const convertCamelToSnake = (obj: any, newObj = {}) => {
    for (let key in obj) {
        let value = null
        if(typeof obj[key] === 'object' && typeof obj[key] !== null){
            value = convertCamelToSnake(obj[key], {})
        }
        else
        {
            value = obj[key]
        }
        key = key.split(/\.?(?=[A-Z])/).join('_').toLowerCase()
        const convert = {[key]: value}
        newObj = {...newObj, ...convert}
    }
    return newObj
}

export const convertSnakeToCamel = (obj: any, newObj = {}) => {
    for (let key in obj) {
        let value = null
        if(typeof obj[key] === 'object' && typeof obj[key] !== null){
            value = convertSnakeToCamel(obj[key], {})
        }
        else
        {
            value = obj[key]
        }
        key = camelCase(key)
        const convert = {[key]: value}
        newObj = {...newObj, ...convert}
    }
    return newObj
}

export const convertPayloadData = async (resumeData: ResumeDataType) => {
    const {title, personalDetails, professionalSummary, complexSections} = resumeData
    const sectionType = complexSections?.sectionType
    const sectionDetails = complexSections?.sectionDetails
    const newComplexSections = complexSections?.sectionType.map((type) => {
        if(sectionDetails){
            const details = {...sectionDetails[type]}
            // const items = details.items 
            // delete details.items
            return {...details, [type]: details.items}
        }
    })
    let result = {}
    if(title){
        result = Object.assign(result, {title})
    }
    if(personalDetails) {
        result = Object.assign(result, {personalDetails})
    }
    if(professionalSummary){
        result = Object.assign(result, {professionalSummary})
    }
    if(newComplexSections){
        result = Object.assign(result, {complexSections: newComplexSections})
    }
    const convertedResult = convertCamelToSnake(result)
    return convertedResult
    // console.log('result', result)
    // return result
}