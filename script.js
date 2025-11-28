function salvarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
}

function verificarUsuario(email, senha) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(user => user.email === email && user.senha === senha);
}

function atualizarUsuario(email, novosDados) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioIndex = usuarios.findIndex(user => user.email === email);
    
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...novosDados };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuarioLogado && usuarioLogado.email === email) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[usuarioIndex]));
        }
        return true;
    }
    return false;
}

function deletarUsuario(email) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(user => user.email !== email);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.removeItem('usuarioLogado');
}

function getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuarioLogado'));
}

if (window.location.pathname.includes('register.html') || window.location.pathname.includes('index.html')) {
    document.getElementById('cadastroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.find(user => user.email === email)) {
            alert('Este email já está cadastrado!');
            return;
        }

        const usuario = { username: username, email: email, senha: senha };
        salvarUsuario(usuario);
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'principal.html';
    });
}

if (window.location.pathname.includes('login.html')) {
    document.getElementById('cadastroForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const usuario = verificarUsuario(email, senha);
        
        if (usuario) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            alert('Login realizado com sucesso!');
            window.location.href = 'principal.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
}

if (window.location.pathname.includes('perfil.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = getUsuarioLogado();
        
        if (usuarioLogado) {
            const profileNameElement = document.querySelector('.profile-name');
            const profileEmailElement = document.querySelector('.profile-email');
            
            profileNameElement.textContent = usuarioLogado.username;
            profileEmailElement.textContent = usuarioLogado.email;

            profileNameElement.addEventListener('click', function() {
                this.contentEditable = true;
                this.focus();
                this.style.border = '2px solid #007bff';
                this.style.padding = '5px';
                this.style.borderRadius = '4px';
                this.style.backgroundColor = '#f8f9fa';
            });

            profileNameElement.addEventListener('blur', function() {
                const novoNome = this.textContent;
                if (novoNome.trim() === '') {
                    alert('O nome não pode estar vazio!');
                    this.textContent = usuarioLogado.username;
                } else {
                    if (atualizarUsuario(usuarioLogado.email, { username: novoNome })) {
                        alert('Nome atualizado com sucesso!');
                    }
                }
                this.contentEditable = false;
                this.style.border = 'none';
                this.style.padding = '0';
                this.style.backgroundColor = 'transparent';
            });

            profileNameElement.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    this.blur();
                    e.preventDefault();
                }
            });

        } else {
            alert('Usuário não logado!');
            window.location.href = 'login.html';
        }

        document.getElementById('deleteAccountBtn').addEventListener('click', function() {
            if (confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.')) {
                deletarUsuario(usuarioLogado.email);
                alert('Conta deletada com sucesso!');
                window.location.href = 'login.html';
            }
        });
    });
}

if (window.location.pathname.includes('principal.html') || 
    window.location.pathname.includes('perfil.html') || 
    window.location.pathname.includes('publi.html')) {
    
    document.addEventListener('DOMContentLoaded', function() {
        const usuarioLogado = getUsuarioLogado();
        if (!usuarioLogado) {
            alert('Por favor, faça login primeiro!');
            window.location.href = 'login.html';
        }
    });
}