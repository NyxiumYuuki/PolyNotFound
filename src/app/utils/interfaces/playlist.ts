export interface PlaylistDB
{
    _id: string,
    userId: string,
    name: string,
    videoIds: string[],
    isActive: boolean
    createdAt: Date,
    updatedAt: Date
}
