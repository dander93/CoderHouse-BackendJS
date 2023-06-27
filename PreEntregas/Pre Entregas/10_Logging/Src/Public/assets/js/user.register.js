window.addEventListener('load', (event) => {

    showAgeSection();
    showMailSection();
    showPasswordSection();
    showSecondaryPasswordSection();
    enableSubmitbutton();

    const formRegister = document.getElementById('form-register');
    formRegister.addEventListener('submit', async (event) => {
        try {

            event.preventDefault();

            const formData = new FormData(formRegister);
            const request = {};
            formData.forEach((value, key) => request[key] = value);

            const httpResult =
                await fetch('/register', {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });

            const result = await httpResult.json();


            const buildToast = (status, message) => {
                const toastElem = document.getElementById('toast');
                const toast = new bootstrap.Toast(toastElem, {
                    animation: true,
                    autohide: false,
                    delay: 5000
                });

                const toastBody = document.getElementById('toast-body');
                const toastTitle = document.getElementById('toast-title');

                if (status === 'failure') {
                    toastElem.classList.add('bg-danger', 'bg-opacity-75');
                    toastElem.classList.remove('bg-success');

                    toastTitle.innerText = "Error";
                    toastBody.innerText = message;
                }

                if (status === 'success') {
                    toastElem.classList.remove('bg-danger');
                    toastElem.classList.add('bg-success', 'bg-opacity-75');

                    toastTitle.innerText = "Éxito";
                    toastBody.innerText = `${message}. Redirigiendo a productos en 5 segundos.`;

                    setTimeout(() => {
                        window.location.href = "/products"
                    }, 5000);
                }

                toast.show();
            };

            buildToast(result.status, result.message);
        } catch (error) {
            console.error(error);
        }
    });
});

function showAgeSection() {

    const nameInput = document.getElementById('name-input');
    const surnameInput = document.getElementById('lastName-input');
    const ageSection = document.getElementById('age-section');

    const showSection = () => {
        if (nameInput.value && surnameInput.value) {
            ageSection.classList.remove('d-none');
        }
        else {
            ageSection.classList.add('d-none');
        }
    };

    nameInput.addEventListener('input', showAgeSection);
    surnameInput.addEventListener('input', showSection);
}

function showMailSection() {
    const birthInput = document.getElementById('birth-input');
    const mailSection = document.getElementById('mail-section');

    const showSection = () => {
        if (birthInput.value && birthInput.checkVisibility()) {
            mailSection.classList.remove('d-none');
        }
        else {
            mailSection.classList.add('d-none');
        }
    };

    birthInput.addEventListener('input', showSection);
}

function showPasswordSection() {
    const mailInput = document.getElementById('mail-input');
    const passwordPrimarySection = document.getElementById('password-primary-section');

    const showSection = () => {
        if (mailInput.value && isValidMailFormat(mailInput.value)) {
            passwordPrimarySection.classList.remove('d-none');
        }
        else {
            passwordPrimarySection.classList.add('d-none');
        }
    };

    mailInput.addEventListener('input', showSection);
}

function showSecondaryPasswordSection() {
    const primaryPasswordInput = document.getElementById('password-primary-input');
    const secondaryPasswordSection = document.getElementById('password-secondary-section');

    const showSection = () => {
        if (primaryPasswordInput.value && validatePassword()) {
            secondaryPasswordSection.classList.remove('d-none');
        }
        else {
            secondaryPasswordSection.classList.add('d-none');
        }
    };

    const validatePassword = () => {
        //FIXME: Arreglar la validacion del password.
        return true;
    };

    primaryPasswordInput.addEventListener('input', showSection);
}

function enableSubmitbutton() {
    const primaryPasswordInput = document.getElementById('password-primary-input');
    const secondaryPasswordInput = document.getElementById('password-secondary-input');
    const submitButton = document.getElementById('register-user-btn');

    const enableButton = () => {
        if (secondaryPasswordInput.value && primaryPasswordInput.value && validatePasswords()) {
            submitButton.disabled = false;
            submitButton.classList.add('shadow');
        }
        else {
            submitButton.disabled = true;
            submitButton.classList.remove('shadow');
        }
    };

    const validatePasswords = () => {
        return secondaryPasswordInput.value === primaryPasswordInput.value;
    };

    secondaryPasswordInput.addEventListener('input', enableButton);
}

//TODO: funcion para mostrar password en texto