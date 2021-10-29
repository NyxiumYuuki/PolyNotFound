export interface Advert
{
    _id: string,
    advertiser: string,
    images: {
        url: string,
        description: string,
    }[]
    text: string,
    subjectTarget: any[]
    seen: number,
    date: Date,
}
