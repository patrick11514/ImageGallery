<script lang="ts">
    import { currentPage } from './data.svelte'
    import Fa from 'svelte-fa'
    import { faCog, faHome, faUser } from '@fortawesome/free-solid-svg-icons'

    export const navigation = [
        {
            name: 'Hlavní Stránka',
            icon: faHome,
            link: '/admin/home'
        },
        {
            name: 'Nastavení',
            icon: faCog,
            link: '/admin/settings'
        },
        {
            name: 'Správa uživatelů',
            icon: faUser,
            link: '/admin/users'
        }
    ]
</script>

<div class="w-full">
    {#each navigation as item}
        {#if item.link.replace('/admin/', '') == $currentPage.id}
            <div
                class="w-11/12 my-2 p-4 mx-auto bg-neutral-800 duration-300 rounded-2xl border-2 border-black flex flex-row items-center"
            >
                <Fa icon={item.icon} scale="1.5" />
                <span class="ml-2 font-bold text-xl">{item.name}</span>
            </div>
        {:else}
            <a
                href={item.link}
                class="w-11/12 my-2 p-4 mx-auto bg-neutral-900 hover:bg-neutral-800 duration-300 rounded-2xl border-2 border-black flex flex-row items-center"
            >
                <Fa icon={item.icon} scale="1.5" />
                <span class="ml-2 font-bold text-xl">{item.name}</span>
            </a>
        {/if}
    {/each}
</div>
