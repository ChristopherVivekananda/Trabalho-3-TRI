document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const senha = document.getElementById("password").value;
            
            if (email === "teste@gmail.com" && senha === "123456") {
                localStorage.setItem("email", email);
                Swal.fire({
                    icon: 'success',
                    title: 'Login realizado!',
                    text: 'Bem-vindo ao Echo Chamber Co.',
                    confirmButtonColor: '#00a8ff'
                }).then(() => {
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no login',
                    text: 'Email ou senha incorretos!',
                    confirmButtonColor: '#00a8ff'
                });
            }
        });

        document.getElementById("forgotPassword").addEventListener("click", function(e) {
            e.preventDefault();
            Swal.fire({
                icon: 'info',
                title: 'Recuperar senha',
                text: 'Funcionalidade em desenvolvimento',
                confirmButtonColor: '#00a8ff'
            });
        });

        document.getElementById("createAccount").addEventListener("click", function(e) {
            e.preventDefault();
            Swal.fire({
                icon: 'info',
                title: 'Cadastro',
                text: 'Funcionalidade em desenvolvimento',
                confirmButtonColor: '#00a8ff'
            });
        });