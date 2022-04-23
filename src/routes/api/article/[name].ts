import { Article } from "$lib/database";

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
    // Todo complete database

    const item = await Article.findOne({ address: params.name }).exec();
    
    if (item) {
        return { body: { item } };
    }
    
    return {
        status: 404
    };
}