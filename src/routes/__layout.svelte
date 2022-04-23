<script lang="ts">
    import { page } from '$app/stores';

    let menuitems = [
        {href: '/', title: 'Home'},
        {href: '/news', title: 'News'},
        {href: '/about', title: 'About Us'},
    ]
</script>

<div class="navbar">
    {#each menuitems as {href, title}}
    {#if href == $page.url.pathname}
        <a class="menuItem chosen" href={href}>{title}</a>
    {:else}
        <a class="menuItem" href={href}>{title}</a>
    {/if}
    
    {/each}
</div>

<slot />

<style lang="scss">
    :root{
        font-family: Arial, Helvetica, sans-serif;
    }
    .navbar{
        position: sticky;
        top: 10px;
        display: flex;
        background-color: rgb(230, 230, 230);
        padding: 10px;

        margin-bottom: 10px;
        .menuItem{
            margin: 2px 10px;

            &:hover{
                color: palevioletred;
            }
        }
    }
    .chosen{
        color: palevioletred;
    }
</style>

