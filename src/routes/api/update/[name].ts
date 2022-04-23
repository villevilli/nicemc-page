import { Article } from "$lib/database";

/*
    address: String,
    title: String,
    author: String,
    article: String,
    description: String,
    public: { type: Boolean, default: false},
    publishDate: Date,
*/

/** @type {import('./[id]').RequestHandler} */
export async function post({ params, request }) {


    const body = await request.json()

    const item = await Article.findOneAndUpdate({ address: params.name }, body).exec();
    
    if (item) {
        return { body: { item } };
    }
    
    return {
        status: 404
    };
}