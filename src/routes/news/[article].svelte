<script context="module">
    /** @type {import('./[slug]').Load} */
    export async function load({ params, fetch }) {
        const url = `/api/article/${params.article}`;
        const response = await fetch(url);
        const responseJson = await response.json();

        return {
            status: response.status,
            props: {
                article: responseJson.item,
            },
        };
    }
</script>

<script lang="ts">
    export let article: any;

    import { onMount } from "svelte";
    import { Remarkable } from "remarkable";
    import hljs from "highlight.js";

    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import ArticleOptions from "$lib/articleOptions.svelte";

    let editmode = false;
    let md = new Remarkable('full',{
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (err) {}
            }

            try {
                return hljs.highlightAuto(str).value;
            } catch (err) {}

            return ""; // use external default escaping
        },
        typographer: true,
        html: true
    });
    let news = article.article;

    let optionsOpen = false;

    onMount(async () => {});

    //Go to news edit mode and set edit mode on
    function edit() {
        $page.url.searchParams.set("edit", "true");
        editmode = true;
        //const easyMDE = new EasyMde({element: mdeEditor});
    }

    function del() {
        if (window.confirm("Are you sure you want to delete this article?")) {
            fetch(`/api/delete/${article.address}`, {
                method: "DELETE",
            });
            goto("/news");
        }
    }

    function openOptions() {
        optionsOpen = true;
    }

    function handleOptionsSave({ detail }) {
        let body = JSON.stringify(detail);

        console.log(body);
        console.log(detail);

        fetch(`/api/update/${detail.address}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });

        optionsOpen = false;
    }

    //save edited markdown to the database and return to non edit mode
    function save() {
        $page.url.searchParams.set("edit", "false");
        editmode = false;

        let body = JSON.stringify({ article: news });

        console.log(body);

        fetch(`/api/update/${article.address}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: body,
        });
    }
</script>

<svelte:head>
    <meta property="og:title" content={article.title} />
    <meta property="og:description" content={article.description} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={$page.url.toString()} />
    <meta property="og:locale" content="fi_FI" />
</svelte:head>

<main class="center">
    {#if optionsOpen}
        <div class="overlay">
            <ArticleOptions
                {article}
                submitText="Update!"
                on:close={() => (optionsOpen = false)}
                on:createArticle={handleOptionsSave}
                >Edit options</ArticleOptions
            >
        </div>
    {/if}

    <div class="toolbar">
        <button on:click={() => goto("/news")} class="button">
            <img alt="Back Button" src="/images/back_symbol.svg" />
        </button>

        <p>Author: {article.author}</p>

        {#if editmode}
            <span class="optionButtons">
                <button on:click={del} class="button deleteButton">
                    <img alt="Delete Button" src="/images/delete_symbol.svg" />
                </button>
                <button on:click={openOptions} class="button">
                    <img
                        alt="Options Button"
                        src="/images/settings_symbol.svg"
                    />
                </button>
                <button on:click={save} class="button optionButton">
                    <img alt="Save Button" src="/images/save_symbol.svg" />
                </button>
            </span>
        {:else}
            <button on:click={edit} class="button">
                <img alt="Edit Button" src="/images/edit_symbol.svg" />
            </button>
        {/if}
    </div>

    <div class="container">
        <article>
            {@html md.render(news)}
        </article>
        {#if editmode}
            <textarea class="editable" bind:value={news} />
        {/if}
    </div>
</main>

<style lang="scss">
    article{
        :global(h1) {
        font-size: 2.5rem;
        text-align: center;
        }
        :global(h2) {
            font-size: 2rem;
        }
        :global(h3) {
            font-size: 1.5rem;
        }

        :global(p) {
            font-size: 18px;
        }
        :global(img) {
            width: 100%;
        }
        :global(blockquote){
            border-left: solid 4px rgb(158, 158, 255);
            padding: 8px 4px 8px 8px;
            margin: 8px 0px 8px 10px;

            background-color: rgba($color: #8b8b8b, $alpha: 0.1);

            :global(p){
                margin: 0px
            }
        }
    }


    .toolbar {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }

    .overlay {
        @include overlay;
        @include center;
    }

    .optionButtons {
        height: 57px;
    }

    .button {
        @include button;
    }

    .editable {
        white-space: pre-wrap;
        width: 60%;
        margin-left: 5%;
        resize: none;
        font-size: 16px;
        font-family: inherit;
    }

    .container {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        padding: 0px 10%;
        box-sizing: border-box;
    }

    article {
        text-align: justify;
        width: 60%;
        max-width: 900px;
    }

    @media screen and (max-width: 900px) {
        article {
            width: 90%;
            padding: 0px;
        }
        .center {
            align-items: center;
            padding: 0px;
        }
        .container {
            justify-content: center;
            padding: 0px;
        }
    }
</style>
