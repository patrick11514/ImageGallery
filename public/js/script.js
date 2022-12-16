"use strict";
let loginForm = document.querySelector('form#login');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = document.querySelector('form#login input#username');
    let password = document.querySelector('form#login input#password');
    let userError = document.querySelector('form#login label#userError');
    let passError = document.querySelector('form#login label#passError');
    let errors = document.querySelector('form#login h2#error');
    let button = document.querySelector('button#login');
    let error = false;
    if (!username.value || username.value == '') {
        userError.textContent = 'Uživatelské jméno je povinné';
        error = true;
    }
    else {
        userError.textContent = '';
    }
    if (!password.value || password.value == '') {
        passError.textContent = 'Heslo je povinné';
        error = true;
    }
    else {
        passError.textContent = '';
    }
    if (error) {
        return;
    }
    errors.textContent = '';
    button.disabled = true;
    let response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });
    let json = await response.json();
    if (json.status) {
        window.location.href = '/admin';
    }
    else {
        errors.textContent = json.message;
        button.disabled = false;
    }
});
