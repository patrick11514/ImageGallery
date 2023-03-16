<script lang="ts">
    import Administration from '../../../components/administration.svelte'
    import { page } from '$app/stores'
    import { currentPage, data } from '../../../components/data.svelte'
    import { translate } from '$lib/translate'
    import { afterNavigate, goto } from '$app/navigation'
    import type { LoginResponse } from '../../../types/response'

    const check = async () => {
        let request = await fetch('/api/check', {
            method: 'GET'
        })

        let json = (await request.json()) as LoginResponse
        if (!json.status) {
            data.set({
                logged: false,
                role: {
                    name: '',
                    color: ''
                }
            })
            goto('/')
        } else {
            data.set({
                logged: true,
                ...json.data
            })
        }
    }

    afterNavigate(async () => {
        await check()
        currentPage.set({
            name: translate($page.params.page),
            id: $page.params.page
        })
    })
</script>

<Administration />
