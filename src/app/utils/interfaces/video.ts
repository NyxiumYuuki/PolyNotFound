export interface VideoDB
{
    _id: string,
    userId: string,
    videoId: string,
    source: string,
    tags: string[],
    interest: string,
    watchedDates: Date[],
    createdAt: Date,
    updatedAt: Date
}


export interface VideoAll
{
    _id: string,
    userId: string,
    videoId: string,
    source: string,
    tags: String[],
    interest: string,
    watchedDates: Date[],
    createdAt: Date,
    updatedAt: Date

    title: string,
    views: number,
    publishedAt: Date,
    description: string,
    imageUrl: string
}
