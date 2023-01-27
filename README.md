# Nicemc blog thingy
just a project for a couple friend

### https://nicemc.fi

## Developing

### Dependancies

First install all dependancies by running `npm install` (or `pnpm install` or `yarn`)

### Database

next you need a mongodb database you can either
1. Use the atlas free tier from [Mongodb](https://www.mongodb.com/)
2. Host one on your own computer. [Mongodb server installation](https://www.mongodb.com/docs/manual/installation/)

after this create a .env.development.local file to the root of the project with the content:

`VITE_MONGO_URL="Mongodb database url"`

For a local server without authentication it should look something like this:

`VITE_MONGO_URL=mongodb://localhost:27017/NiceNewsNetwork`

### Developemnt Server

After all of this is done you can run the development server with 

```bash
npm run dev
```
