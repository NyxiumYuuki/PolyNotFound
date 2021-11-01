export interface Advert
{
    _id: string,
    title: string,
    advertiser: string,
    images: {
        url: string,
        description: string,
    }[],
    tags: string[],
    comment: string,
    views: number,
    createdAt: Date,
    lastUpdate: Date,
    isVisible: boolean,
}
