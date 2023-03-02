let globalData: {
    username: string
    email: string
    avatar: string
}

let currentPage: string

fetch('/api/logged').then((request) => {
    if (request.status == 200) {
        request.json().then((json) => {
            globalData = json
            loadUI()
        })
    } else {
        window.location.href = '/'
    }
})

function loadUI() {
    let profile = document.querySelector('#profile img') as HTMLImageElement
    let username = document.querySelector('#profile p') as HTMLParagraphElement

    profile.src = `//www.gravatar.com/avatar/${globalData.avatar}`
    username.innerHTML = globalData.username

    //logout
    let logout = document.querySelector('#logout') as HTMLButtonElement
    logout.addEventListener('click', () => {
        fetch('/api/logout').then((request) => {
            if (request.status == 200) {
                window.location.href = '/'
            }
        })
    })

    //navigation
    let nav = document.querySelector('#nav') as HTMLDivElement
    let navItems = nav.querySelectorAll('div') as NodeListOf<HTMLDivElement>

    //get current page
    let hash = window.location.hash.substring(1)

    if (!hash) {
        hash = 'home'
    }

    navItems.forEach((item) => {
        console.log(hash)
        console.log(item.getAttribute('data-load'))
        if (item.getAttribute('data-load') == hash) {
            item.classList.remove('bg-black')
            item.classList.add('bg-gray-600')

            currentPage = hash

            updateContent(hash)
        }

        item.addEventListener('click', () => {
            let page = item.getAttribute('data-load') as string
            if (page != currentPage) {
                item.classList.remove('bg-black')
                item.classList.add('bg-gray-600')

                let oldItem = nav.querySelector(`div[data-load="${currentPage}"]`) as HTMLDivElement
                oldItem.classList.remove('bg-gray-600')
                oldItem.classList.add('bg-black')

                let oldPage = currentPage
                currentPage = page

                updateContent(page, oldPage)
            }
        })
    })
}

function updateContent(page: string, oldPage: string | null = null) {
    if (oldPage) {
        let oldContent = document.querySelector('#content #' + oldPage) as HTMLDivElement
        oldContent.classList.add('hidden')
        oldContent.classList.remove('flex')
    }

    let content = document.querySelector('#content #' + page) as HTMLDivElement
    content.classList.remove('hidden')
    content.classList.add('flex')

    window.location.href = '#' + page
}
