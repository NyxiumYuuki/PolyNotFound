import { Injectable } from '@angular/core';
import {User} from "../../../interfaces/user";
import {FictitiousUtilsService} from "../fictitiousUtils/fictitious-utils.service";



const USER: User = {
    _id: "ririId",
    login: "Riri",
    hashPass: "agourgroou",
    email: "riri@gmail.com",
    role: {
        name: "user",
        permission: 0,
    },
    profileImageUrl: "https://www.figurines-goodies.com/1185-thickbox_default/huey-duck-tales-disney-funko-pop.jpg",
    dateOfBirth: new Date(),
    gender: "man",
    interests: ["foot", "jeux-vidéo"],
    isActive: true,
    isAccepted: true,
    lastConnexion: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
};

const ADVERTISER: User = {
    _id: "fifiId",
    login: "Fifi",
    hashPass: "agourgroou",
    email: "fifi@gmail.com",
    role: {
        name: "advertiser",
        permission: 5,
    },
    profileImageUrl: "https://www.figurines-goodies.com/1188-large_default/dewey-duck-tales-disney-funko-pop.jpg",
    dateOfBirth: null,
    gender: "",
    interests: [],
    isActive: true,
    isAccepted: true,
    lastConnexion: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};

const ADMIN: User = {
    _id: "loulouId",
    login: "Loulou",
    hashPass: "agourgroou",
    email: "loulou@gmail.com",
    role: {
        name: "admin",
        permission: 5,
    },
    profileImageUrl: "https://www.reference-gaming.com/assets/media/product/41195/figurine-pop-duck-tales-n-309-loulou.jpg?format=product-cover-large&k=1519639530",
    dateOfBirth: null,
    gender: "",
    interests: [],
    isActive: true,
    isAccepted: true,
    lastConnexion: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};



@Injectable({
    providedIn: 'root'
})
export class FictitiousUsersService
{

    constructor(private fictitiousUtilsService: FictitiousUtilsService) { }

    private getUserOrAdvertiserOrAdmin(modele: User): User
    {
        const res = Object.assign({}, modele);
        res._id += this.fictitiousUtilsService.makeid(5);
        res.login += (Math.floor(Math.random() * 1000)).toString();
        res.email = res.login + "@gmail.com" ;
        res.isAccepted = (Math.random() < 0.5);
        res.isActive = (Math.random() < 0.5);
        res.dateOfBirth = this.fictitiousUtilsService.randomDate(new Date(1900, 0, 1), new Date());
        res.lastConnexion = this.fictitiousUtilsService.randomDate(new Date(2000, 0, 1), new Date());
        return res;
    }

    getUser(): User {
        return this.getUserOrAdvertiserOrAdmin(USER);
    }

    getAdvertiser(): User {
        return this.getUserOrAdvertiserOrAdmin(ADVERTISER);
    }

    getAdmin(): User {
        return this.getUserOrAdvertiserOrAdmin(ADMIN);
    }

    getTabUser(n: number): User[]
    {
        const res: User[] = [];
        for(let i=0 ; i<n ; i++) res.push(this.getUser());
        return res;
    }

    getTabAdvertiser(n: number): User[]
    {
        const res: User[] = [];
        for(let i=0 ; i<n ; i++) res.push(this.getAdvertiser());
        return res;
    }

    getTabAdmin(n: number): User[]
    {
        const res: User[] = [];
        for(let i=0 ; i<n ; i++) res.push(this.getAdmin());
        return res;
    }
}
