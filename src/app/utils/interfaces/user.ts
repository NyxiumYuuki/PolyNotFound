export interface User
{
    _id: string,
    email: string,
    hashPass: string,
    login: string,
    role: {
        name: string,
        permission: number,
        isAccepted: boolean,
    },
    profileImageUrl: string,
    dateOfBirth: Date,
    gender: string,
    interests: any[],
    company: string,
    isActive: boolean,
    lastConnexion: Date,
    createdAt: Date,
    updatedAt: Date
}


interface VideoCategorie
{
    id: number
    interest: string
    categories: {
        id: string
        name: string
        source: string
    }
}
