// const { response } = require("express");

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#un-create').value.trim();
    const email = document.querySelector('#email-create').value.trim();
    const password = document.querySelector('#pw-create').value.trim();

    if(username && email && password) {
        const response = await fetch(`/api/users`, {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        if(response.ok) {
            alert("You're signed up!");
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup').addEventListener('submit',signupFormHandler);

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-signin').value.trim();
    const password = document.querySelector('#pw-signin').value.trim();

    if(email && password) {
        const response = await fetch(`/api/users/login`, {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        if(response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signin').addEventListener('submit', loginFormHandler);