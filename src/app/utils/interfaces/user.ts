export interface User
{
    _id: string,
    login: string,
    hashPass: string,
    mail: string,
    role: {
        name: string,
        permission: number,
    },
    profilePictureUrl: string,
    dateOfBirth: Date,
    gender: string,
    interests: string[],
    isActive: boolean,
    isAccepted: boolean,
    createdAt: Date,
    updatedAt: Date,
    lastConnexion: Date,
}
