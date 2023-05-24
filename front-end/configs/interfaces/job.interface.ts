export type JobQueryType = {
    job_title: string,
    location: string,
    keywords?: string[],
    jobPortal?: string,
    lastUpdated?: number
}