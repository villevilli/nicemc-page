import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const dbUrl = import.meta.env.VITE_MONGO_URL

mongoose.connect(dbUrl, {
    family: 4,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

const articleSchema = new mongoose.Schema({
    address: { type: String, unique: true },
    title: { type: String, index: true },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    article: String,
    description: String,
    public: { type: Boolean, default: false},
    publishDate: Date,
}, {
    timestamps: true
})

const userSchema = new mongoose.Schema({
    publicName: String,
    username: { type: String, unique:true},
    password: String,
    email: String,
    permissions: {
        administrator: { type:Boolean, default:false},
        publishArticles: { type:Boolean, default:false},
        createArticles: { type:Boolean, default:false},
        publishAllArticles: { type:Boolean, default:false},
        modifyAllArticles: { type:Boolean, default:false},
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
})

const tokenSchema = new mongoose.Schema({
    token: String,
    expiry: {type: Date, default: DateTime.now().plus({ days: 7 })},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

export const Article = mongoose.model('Article', articleSchema)
export const User = mongoose.model('User', userSchema)
export const Token = mongoose.model('Token', tokenSchema)

const testToken = new Token({
    Token: "hello"
}).save()