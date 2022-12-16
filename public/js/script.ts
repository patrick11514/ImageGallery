//login
let loginForm = document.querySelector('form#login') as Element

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    let username = document.querySelector('form#login input#username') as HTMLInputElement
    let password = document.querySelector('form#login input#password') as HTMLInputElement

    let userError = document.querySelector('form#login label#userError') as HTMLLabelElement
    let passError = document.querySelector('form#login label#passError') as HTMLLabelElement
    let errors = document.querySelector('form#login h2#error') as HTMLHeadingElement

    let button = document.querySelector('button#login') as HTMLButtonElement

    let error = false

    if (!username.value || username.value == '') {
        userError.textContent = 'Uživatelské jméno je povinné'
        error = true
    } else {
        userError.textContent = ''
    }

    if (!password.value || password.value == '') {
        passError.textContent = 'Heslo je povinné'
        error = true
    } else {
        passError.textContent = ''
    }

    if (error) {
        return
    }

    errors.textContent = ''

    button.disabled = true

    let response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    })

    let json: {
        status: boolean
        message: string
    } = await response.json()

    if (json.status) {
        window.location.href = '/admin'
    } else {
        errors.textContent = json.message
        button.disabled = false
    }
})
