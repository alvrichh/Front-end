"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";


function main() {
    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = handleSubmitRegister;
}

function handleSubmitRegister(event) {
    event.preventDefault();
    
    let form = event.target;
    let formData = new FormData(form);
    let errors = userValidator.validateRegister(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors) {
            messageRenderer.showErrorAsAlert(error);
        }

    } else {
        sendRegister(formData);
    }
}

async function sendRegister(formData) {
    try {
        let loginData = await authAPI.register(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;
        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "Index.html";

    } catch (err) {
        messageRenderer.showErrorAsAlert("Error registering a new user", err);
    }
}



document.addEventListener("DOMContentLoaded", main);