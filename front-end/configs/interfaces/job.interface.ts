export type JobQueryType = {
    jobTitle: string,
    location: string,
    keywords?: string[],
    jobPortal?: string,
    lastUpdated?: number
}