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