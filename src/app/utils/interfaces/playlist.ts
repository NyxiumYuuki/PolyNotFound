import {Video} from "./video";

export interface Playlist
{
    _id: string,
    user: any,
    name: string,
    videos: Video[]
}
