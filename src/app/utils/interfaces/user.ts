export interface User
{
    _id: string,
    email: string,
    hashPass: string,
    login: string,
    role: {
        name: string,
        permission: number,
    },
    profileImageUrl: string,
    dateOfBirth: Date,
    gender: string,
    interests: string[],
    isActive: boolean,
    isAccepted: boolean,
    lastConnexion: Date,
    createdAt: Date,
    updatedAt: Date
}
