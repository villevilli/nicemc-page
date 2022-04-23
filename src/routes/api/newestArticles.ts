import { Article } from "$lib/database";
import mongoose from "mongoose";
 
/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
    // Todo complete database

    const item = await Article.find({},'title address author description createdAt public').sort({createdAt: 'descending'}).exec();
    
    if (item) {
        return { body: { item } };
    }
    
    return {
        status: 404
    };
}