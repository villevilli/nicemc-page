<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    interface Article{
        address: String,
        title: String,
        author: String,
        description: String,
    };
    
    export let submitText = "Create!"

    export let article:Article = {
        address: "",
        title: "",
        author: "",
        description: "",
    };

    const dispatch = createEventDispatcher();

    function submitHandler(event){
        const formData:any = new FormData(event.target)

        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        console.log(data)

        dispatch('createArticle', data)
    }
</script>

<div class="container">
    <div class="toolbar">

            <h3 class="title"><slot>Create New Article:</slot></h3>
        <button class="button" on:click={() => dispatch('close')}>
            <img alt="Close Button" src="/images/close_symbol.svg">
        </button>
    </div>
    <form on:submit|preventDefault={submitHandler}>
        <label>Title:
            <input
                class="textInput"
                id="title"
                name="title"
                type="text"
                value={article.title}
                required
            />
        </label>
    
        <label>Author:
            <input
                class="textInput"
                id="author"
                name="author"
                type="text"
                value={article.author}
                required
            />
        </label>
    
        <label>Address:
            <input
                class="textInput"
                id="address"
                name="address"
                type="text"
                value={article.address}
                required
            />
        </label>
        
        <label>Description:
            <textarea
                class="textInput description"
                id="description"
                name="description"
                value={article.description}
                required
            />
        </label>
        <input type="submit" class="createButton" value={submitText}>
    </form>
</div>

<style lang="scss">
    *{
        box-sizing: border-box;
    }

    .createButton{
        cursor: pointer;
        background-color: greenyellow;
        border: none;
        font-size: 1rem;
        padding: 5px;
        width: 100%;

        margin-top: 10px;

        &:hover{
            background-color: darken(greenyellow, 20);
        }
        &:active{
            box-shadow: black inset 2px 2px 4px;
        }
    }

    .toolbar{
       display: flex;
       justify-content: space-between; 
    }

    .title{
        margin: 5px;
    }

    .button{
        @include button;
    }

    .container{
        background-color: white;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 4px;

        max-width: 420px;

        label{
            margin: 5px
        }
    }

    .textInput{
        width: 100%;
    }

    .description{
        resize: vertical;
    }
</style>