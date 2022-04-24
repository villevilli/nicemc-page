import { Token } from "$lib/database";
import { addUser, login } from "$lib/userHandler";

 /** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
    let token = Token.findOne({token: "NoTv7PlVbs51MygAZbWZazL6nDAqnrg1m56RIrVQG6kUSiQTqLshq9RGvYlv8ecX0IM+XqaNSVTT+no9kHEbUA=="})

    let result = await token.populate("user").exec()

    console.log(result)

    return({
        body: ""
    })
}