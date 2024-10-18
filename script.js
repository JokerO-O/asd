function register() {
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const newEmail = document.getElementById('new-email').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validar que los campos no estén vacíos
    if (!newUsername || !newPassword || !newEmail || !dob || !phone) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Validar que la fecha de nacimiento sea mayor de 18 años
    if (!isValidAge(dob)) {
        alert('Debes tener al menos 18 años para registrarte.');
        return;
    }

    // Validar la contraseña segura
    if (!isValidPassword(newPassword)) {
        alert('La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un símbolo especial.');
        return;
    }

    // Validar el formato del correo electrónico
    if (!isValidEmail(newEmail)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    // Validar el número de teléfono (RD)
    if (!isValidPhone(phone)) {
        alert('El número de teléfono debe comenzar con 829, 849 o 809 y tener 7 dígitos adicionales.');
        return;
    }

    // Comprobar si el usuario o correo ya existen en localStorage
    if (localStorage.getItem(newUsername) || isEmailInUse(newEmail)) {
        alert('El nombre de usuario o correo electrónico ya está en uso.');
        return;
    }

    // Registrar el nuevo usuario en localStorage
    const userData = { password: newPassword, email: newEmail, dob: dob, phone: phone };
    localStorage.setItem(newUsername, JSON.stringify(userData));
    alert('Usuario registrado exitosamente');

    // Limpiar campos después del registro
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('new-email').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('phone').value = '';
}

function login() {
    const loginEmail = document.getElementById('login-email').value.trim();
    const loginPassword = document.getElementById('login-password').value.trim();

    // Validar que los campos no estén vacíos
    if (!loginEmail || !loginPassword) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Comprobar si el correo y contraseña coinciden con los datos almacenados
    let userFound = false;
    for (let i = 0; i < localStorage.length; i++) {
        const username = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(username));
        if (userData.email === loginEmail && userData.password === loginPassword) {
            alert('Inicio de sesión exitoso');
            userFound = true;
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('password-generator').style.display = 'block';
            break;
        }
    }

    if (!userFound) {
        alert('Correo o contraseña incorrectos');
    }
}

function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('generated-password').textContent = `Contraseña generada: ${password}`;
}

function isValidAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
    }

    return age >= 18;
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^(829|849|809)[0-9]{7}$/;
    return phoneRegex.test(phone);
}

function isEmailInUse(email) {
    for (let i = 0; i < localStorage.length; i++) {
        const username = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(username));
        if (userData.email === email) {
            return true;
        }
    }
    return false;
}
