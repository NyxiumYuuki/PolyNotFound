export interface Advert
{
    _id: string,
    userId: string,
    title: string,
    advertiser: string,
    images: {
        url: string,
        description: string,
    }[],
    tags: string[],
    comment: string,
    views: number,
    isVisible: boolean,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
}
