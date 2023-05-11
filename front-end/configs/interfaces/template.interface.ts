export type TemplateCategoryType = 'all' | 'creative' | 'simple' | 'professional' | 'modern'
export type TemplateDataType = {
    id: number,
    title: string,
    description: string
    category: TemplateCategoryType,
    thumbnail: string,
}
export type TemplatesDataType = {
    data: TemplateDataType[]
}