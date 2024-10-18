// Validar contraseña segura
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (password.length < minLength) {
        return `La contraseña debe tener al menos ${minLength} caracteres.`;
    }
    if (!hasUpperCase) {
        return "La contraseña debe tener al menos una letra mayúscula.";
    }
    if (!hasLowerCase) {
        return "La contraseña debe tener al menos una letra minúscula.";
    }
    if (!hasNumbers) {
        return "La contraseña debe tener al menos un número.";
    }
    if (!hasSpecialChars) {
        return "La contraseña debe tener al menos un carácter especial.";
    }
    return null;
}

// Validar el nombre de usuario
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const minLength = 4;
    if (username.length < minLength) {
        return `El nombre de usuario debe tener al menos ${minLength} caracteres.`;
    }
    if (!usernameRegex.test(username)) {
        return "El nombre de usuario solo puede contener letras y números.";
    }
    return null;
}

// Validar correo electrónico
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "El correo electrónico no es válido.";
    }
    return null;
}

// Validar número de teléfono de RD
function validatePhone(phone) {
    const phoneRegex = /^(809|829|849)\d{7}$/;
    if (!phoneRegex.test(phone)) {
        return "El número de teléfono debe empezar con 809, 829 o 849 y tener 10 dígitos.";
    }
    return null;
}

// Validar fecha de nacimiento (mayor de 18 años)
function validateDOB(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18) {
        return "Este usuario no puede ser registrado por ser menor de edad.";
    }
    return null;
}

function register() {
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const email = document.getElementById('email').value.trim();
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value.trim();

    // Validar todos los campos
    const usernameError = validateUsername(newUsername);
    const passwordError = validatePassword(newPassword);
    const emailError = validateEmail(email);
    const dobError = validateDOB(dob);
    const phoneError = validatePhone(phone);

    if (usernameError) {
        alert(usernameError);
        return;
    }
    if (passwordError) {
        alert(passwordError);
        return;
    }
    if (emailError) {
        alert(emailError);
        return;
    }
    if (dobError) {
        alert(dobError);
        return;
    }
    if (phoneError) {
        alert(phoneError);
        return;
    }

    // Comprobar si el usuario o el correo ya existen en localStorage
    if (localStorage.getItem(newUsername)) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }
    if (localStorage.getItem(email)) {
        alert('El correo electrónico ya está en uso.');
        return;
    }

    // Registrar el nuevo usuario
    localStorage.setItem(newUsername, JSON.stringify({ password: newPassword, email: email, dob: dob, phone: phone }));
    alert('Usuario registrado exitosamente');

    // Limpiar campos
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('phone').value = '';
}

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Obtener datos del usuario
    const userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        alert('Inicio de sesión exitoso');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('password-generator').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
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
