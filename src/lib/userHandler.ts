import bcrypt from "bcrypt";
import { User, Token } from "$lib/database";
import { randomBytes } from "crypto";

interface userObject{
    publicName:string,
    username:string,
    password:string,
    email?:string,
    permissions?: {
        administrator?:boolean,
        publishArticles?:boolean,
        createArticles?:boolean,
        publishAllArticles?:boolean,
        modifyAllArticles?:boolean,
    }
};

const saltRounds = 12

export async function addUser(user:userObject){
    user.password = await bcrypt.hash(user.password, saltRounds)

    const newUser = new User(user).save()

    return newUser;
}

export async function login(username, password){
    let user = await User.findOne({username: username})

    let correctPwd = await bcrypt.compare(password, user.password)

    if (correctPwd) {
        let token = await randomBytes(64).toString("base64")

        const newToken = new Token({
            token: token,
            user: user._id
        }).save();

        return token;
    }
}

export function checkLogin(token, user){
    
}

export function logout(){

}

