<script context="module">
    /** @type {import('./[slug]').Load} */
    export async function load({ fetch, }) {
        const url = `/api/newestArticles`;
        const response = await fetch(url);
        const responseJson = await response.json()


        return {
            status: response.status,
            props: {
                articles: responseJson.item
            }
        };
    }
</script>

<script lang="ts">
    import { DateTime } from "luxon";
    import { goto } from "$app/navigation";
    
    import ArticleOptions from "$lib/articleOptions.svelte";

    export let articles;

    let createNew = false;

    function openArticleCreator(){
        createNew = true
    }

    async function createArticle({ detail }){
        
        let body = JSON.stringify(detail)

        await fetch(`/api/createArticle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });

        goto(`news/${detail.address}`)

        createNew = true
    }

    function closeArticleCreator(){
        createNew = false
    }
</script>

<div class="toolbar">
    <button class="button" on:click={openArticleCreator}>
        <img alt="Edit Button" src="/images/create_symbol.svg">
    </button>
</div>

{#if createNew}
    <div class="overlay">
        <ArticleOptions on:close="{closeArticleCreator}" on:createArticle="{createArticle}" />
    </div>
{/if}
<div class="container">
{#each articles as article}
    <div class="card" on:click={() => goto(`/news/${article.address}`)}>
        {#if !article.public}
             <span class="draftText">DRAFT</span> <br>
        {/if}
        <span>{DateTime.fromISO(article.createdAt).setLocale('fi').toLocaleString(DateTime.DATETIME_FULL)}</span>
        <h2 class="title">{article.title}</h2>
        <p class="description">{article.description}</p>
        <footer class="author">Author: {article.author}</footer>
    </div>
{/each}
</div>

<svelte:head>
    <title>NiceMC - News</title>
</svelte:head>

<style lang="scss">
    *{
        box-sizing: border-box;
    }

    h2{
        font-size: 30px;
    }

    .draftText{
        color: red;
    }

    .button{
        @include button;
        height: 48px;
    }

    .container{
        display: grid;
        grid-template-columns: repeat(2, 35%);
        gap: 20px;
    }

    .overlay{
        @include overlay;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0px;
        left: 0px;
    }

    .toolbar{
        display: flex;
        justify-content: right;
    }

    .card{
        background-color: rgb(240, 240, 240);
        cursor: pointer;

        padding: 5px;
        transition: 100ms;

        &:hover{
            box-shadow: black 2px 2px 3px 0px ;
        }

        *:hover{
            color: rgb(223, 110, 110);
        }
    }

    @media screen and (max-width: 900px){
        .container{
            display: flex;
            flex-direction: column;
        }

        .card{
            max-width: 100%;
            width: 100%;
            margin: 10px 0px;
        }
    }
</style>