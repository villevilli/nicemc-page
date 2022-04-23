/*
    address: String,
    title: String,
    author: String,
    article: String,
    description: String,
    public: { type: Boolean, default: false},
    publishDate: Date,
*/

import { Article } from "$lib/database";

/** @type {import('./items').RequestHandler} */
export async function post({ request }) {
    
    let body = await request.json()
    const newArticle = await new Article(body).save()

    if (newArticle) {
        return {
            status: 201,
            headers: {
                location: `/news/${body.address}`
            }
        };
    }

    // redirect to the newly created item
    return {
        status: 400,

    };
}