"use strict";

const userValidator = {
    validateRegister: function (formData) {
        let errors = [];
        let nombre = formData.get("firstName");
        let apellidos = formData.get("lastName");
        let password = formData.get("password");
        let password2 = formData.get("password2");
        if (nombre.length < 3 || apellidos.length < 3) {
            errors.push("El nombre y los apellidos son demasiado cortos");
        }
        if (password !== password2) {
            errors.push("Las contraseñas no coinciden");
        }
        return errors;
    }
};

export { userValidator };