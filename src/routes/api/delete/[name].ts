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
export async function del({ params, }) {
    const item = await Article.findOneAndDelete({ address: params.name }).exec();
    
    if(item){
        return {
            status: 204
        };
    }
    return{
        status: 404
    };

}