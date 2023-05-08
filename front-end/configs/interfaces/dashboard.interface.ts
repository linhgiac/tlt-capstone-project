export type DashboardItemType = {
    id: number,
    title: string,
    thumbnail: string,
    createdAt: string,
    updatedAt: string,
}

export type DashboardDataType = {
    data: DashboardItemType[]
}