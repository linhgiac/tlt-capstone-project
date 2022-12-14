export type TemplateCategoryType = 'all' | 'creative' | 'simple' | 'professional' | 'modern'
export type TemplateDataType = {
    id: number,
    title: string,
    description: string
    category: TemplateCategoryType,
    get_thumbnail: string,
}
export type TemplatesDataType = {
    data: TemplateDataType[]
}