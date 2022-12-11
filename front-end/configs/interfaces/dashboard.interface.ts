export type DashboardItemType = {
    id: number,
    title: string,
    lastUpdated: string,
    previewImg: string,
}

export type DashboardDataType = {
    data: DashboardItemType[]
}