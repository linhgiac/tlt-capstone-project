export type TemplateCategoryType = 'all' | 'creative' | 'simple' | 'professional' | 'modern'
export type TemplateDataType = {
    id: number,
    type: TemplateCategoryType,
    thumnail: string,
    name: string,
    title: string,
    description: string
}
export type TemplatesDataType = {
    data: TemplateDataType[]
}