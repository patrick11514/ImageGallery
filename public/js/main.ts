fetch('/api/logged').then((request) => {
    if (request.status == 200) {
        request.json().then(() => {
            window.location.href = '/admin'
        })
    }
})
