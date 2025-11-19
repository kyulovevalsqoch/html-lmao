// Di bagian login form
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        if (username && password) {
            isLoggedIn = true;
            currentUser = {
                name: username,
                username: username,
                email: `${username}@example.com`,
                phone: '',
                bio: '',
                joinDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                postCount: 0,
                eventCount: 0,
                catCount: 1,
                profilePicture: null // Akan diisi jika user upload foto
            };
            
            updateLoginUI();
            
            if (loginModal) {
                loginModal.hide();
            }
            
            loginForm.reset();
            
            alert(`Login berhasil! Selamat datang, ${username}.`);
        } else {
            alert('Silakan isi username dan password.');
        }
    });
}

// Di bagian register form
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const bio = document.getElementById('registerBio').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok.');
            return;
        }
        
        isLoggedIn = true;
        currentUser = {
            name: name,
            username: username,
            email: email,
            phone: phone,
            bio: bio,
            joinDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            postCount: 0,
            eventCount: 0,
            catCount: 1,
            profilePicture: null // Akan diisi jika user upload foto
        };
        
        updateLoginUI();
        updateProfileForm();
        
        if (registerModal) {
            registerModal.hide();
        }
        
        registerForm.reset();
        
        alert(`Pendaftaran berhasil! Selamat datang, ${name}.`);
    });
}