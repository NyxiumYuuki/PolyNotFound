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
    interests: string[],
    comment: string,
    views: number,
    isVisible: boolean,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
}
