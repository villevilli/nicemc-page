import mongoose from 'mongoose';

const dbUrl = import.meta.env.VITE_MONGO_URL

mongoose.connect(dbUrl, {
    family: 4,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

const articleSchema = new mongoose.Schema({
    address: { type: String, unique: true },
    title: String,
    author: String,
    article: String,
    description: String,
    public: { type: Boolean, default: false},
    publishDate: Date,
}, {
    timestamps: true
})

export const Article = mongoose.model('Article', articleSchema)