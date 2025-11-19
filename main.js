// Variabel global
let isLoggedIn = false;
let currentUser = null;
let events = [
    {
        id: 1,
        name: "Seminar bagaimana anda bisa mengenal kucing anda lebih dekat lagi oleh dokter budiman",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        location: "JL.manusia no 87",
        date: "30 Februari 2097",
        interestedCount: 120
    }
];

// Fungsi untuk menampilkan section tertentu
function showSection(sectionId) {
    console.log('Menampilkan section:', sectionId);
    
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Nonaktifkan semua nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Tampilkan section yang dipilih
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Perbarui UI khusus section jika diperlukan
        if (sectionId === 'forum') {
            updateForumUI();
        } else if (sectionId === 'event') {
            updateEventUI();
        } else if (sectionId === 'profile') {
            updateProfileForm();
        }
    } else {
        console.error('Section tidak ditemukan:', sectionId);
    }
    
    // Aktifkan nav link yang sesuai
    const activeLink = document.querySelector(`[data-target="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Tutup navbar collapse di mobile
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    }
    
    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Fungsi untuk inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplikasi dimuat');
    
    setupCommentForms();
    setupNavigation();
    setupBackToTop();
    updateLoginUI();
    
    // Tampilkan section home secara default
    showSection('home');
});

// Fungsi untuk setup navigasi
function setupNavigation() {
    console.log('Setup navigasi');
    
    // Event listener untuk nav links
    document.addEventListener('click', function(e) {
        // Navigation links
        if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
            e.preventDefault();
            const targetLink = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
            const targetSection = targetLink.getAttribute('data-target');
            
            console.log('Navigasi ke:', targetSection);
            
            if (targetSection) {
                showSection(targetSection);
            }
        }
        
        // Profile icon click
        if (e.target.matches('.profile-icon') || e.target.closest('.profile-icon')) {
            e.preventDefault();
            console.log('Klik profil icon');
            updateProfileForm();
            showSection('profile');
        }
        
        // Footer links
        if (e.target.matches('footer a[data-target]') || e.target.closest('footer a[data-target]')) {
            e.preventDefault();
            const targetLink = e.target.matches('a') ? e.target : e.target.closest('a');
            const targetSection = targetLink.getAttribute('data-target');
            
            if (targetSection) {
                showSection(targetSection);
            }
        }
    });
    
    // Logout button (ditangani di event listener terpisah)
    document.addEventListener('click', function(e) {
        if (e.target.id === 'logoutButton' || e.target.closest('#logoutButton')) {
            e.preventDefault();
            console.log('Logout');
            isLoggedIn = false;
            currentUser = null;
            updateLoginUI();
            showSection('home');
            alert('Anda telah logout.');
        }
    });
}

// Fungsi untuk setup back to top button
function setupBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
            
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.pageYOffset > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Fungsi untuk update UI berdasarkan status login
function updateLoginUI() {
    console.log('Update UI login, status:', isLoggedIn);
    
    const userSection = document.getElementById('userSection');
    const navMenu = document.querySelector('.navbar-nav');
    
    if (!userSection) {
        console.error('userSection tidak ditemukan');
        return;
    }
    
    if (isLoggedIn && currentUser) {
        // User sudah login
        userSection.innerHTML = `
            <div class="user-info">
                <span class="user-name d-none d-md-inline">Halo, ${currentUser.name}</span>
                <img src="${currentUser.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.name) + '&background=8B7355&color=fff&size=40'}" 
                     alt="Profile" class="profile-icon" data-target="profile">
            </div>
        `;
        
        // Tambahkan menu Profil dan Pengaturan jika belum ada
        let existingProfileItem = document.querySelector('a[data-target="profile"]');
        if (!existingProfileItem) {
            const profileNavItem = document.createElement('li');
            profileNavItem.className = 'nav-item';
            profileNavItem.innerHTML = `
                <a class="nav-link" href="#" data-target="profile">
                    <i class="fas fa-user me-1"></i> <span>Profil</span>
                </a>
            `;
            if (navMenu) {
                navMenu.appendChild(profileNavItem);
            }
        }
        
        let existingSettingsItem = document.querySelector('a[data-target="settings"]');
        if (!existingSettingsItem) {
            const settingsNavItem = document.createElement('li');
            settingsNavItem.className = 'nav-item';
            settingsNavItem.innerHTML = `
                <a class="nav-link" href="#" data-target="settings">
                    <i class="fas fa-cog me-1"></i> <span>Pengaturan</span>
                </a>
            `;
            if (navMenu) {
                navMenu.appendChild(settingsNavItem);
            }
        }
        
        updateProfileForm();
        updateForumUI();
        updateEventUI();
        setupProfileImageUpload();
    } else {
        // User belum login
        userSection.innerHTML = `
            <button class="btn btn-outline-primary btn-mobile" data-bs-toggle="modal" data-bs-target="#loginModal">
                <i class="fas fa-sign-in-alt me-1"></i> <span>Login</span>
            </button>
        `;
        
        // Hapus menu Profil dan Pengaturan jika ada
        const profileNavItem = document.querySelector('a[data-target="profile"]');
        if (profileNavItem && profileNavItem.closest('li')) {
            profileNavItem.closest('li').remove();
        }
        
        const settingsNavItem = document.querySelector('a[data-target="settings"]');
        if (settingsNavItem && settingsNavItem.closest('li')) {
            settingsNavItem.closest('li').remove();
        }
        
        updateForumUI();
        updateEventUI();
    }
}

// Fungsi untuk setup profile image upload
function setupProfileImageUpload() {
    const profileImageInput = document.getElementById('profileImageInput');
    const profilePicture = document.getElementById('profilePicture');
    const profileImageAlert = document.getElementById('profileImageAlert');
    const profileImageUpload = document.querySelector('.profile-image-upload');
    
    if (!profileImageUpload) {
        console.log('Profile image upload tidak ditemukan');
        return;
    }
    
    profileImageUpload.addEventListener('click', function() {
        profileImageInput.click();
    });
    
    profileImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            const maxSize = 2 * 1024 * 1024; // 2MB
            
            if (file.size > maxSize) {
                profileImageAlert.textContent = 'Ukuran file terlalu besar. Maksimal 2 MB.';
                profileImageAlert.classList.remove('d-none');
                return;
            }
            
            if (!file.type.match('image.*')) {
                profileImageAlert.textContent = 'File harus berupa gambar.';
                profileImageAlert.classList.remove('d-none');
                return;
            }
            
            profileImageAlert.classList.add('d-none');
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                currentUser.profilePicture = e.target.result;
                
                if (profilePicture) {
                    profilePicture.src = e.target.result;
                }
                
                updateProfileImageInNavbar();
                
                alert('Foto profil berhasil diubah!');
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// Fungsi untuk update profile image di navbar
function updateProfileImageInNavbar() {
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon && currentUser && currentUser.profilePicture) {
        profileIcon.src = currentUser.profilePicture;
    }
}

// Fungsi placeholder untuk fungsi yang akan diimplementasi di file lain
function setupCommentForms() {
    console.log('Setup comment forms');
    // Diimplementasi di forum.js
}

function updateForumUI() {
    console.log('Update forum UI');
    // Diimplementasi di forum.js
}

function updateEventUI() {
    console.log('Update event UI');
    // Diimplementasi di event.js
}

function updateProfileForm() {
    console.log('Update profile form');
    // Diimplementasi di profile.js
}

// Debug: Cek apakah semua section ada
document.addEventListener('DOMContentLoaded', function() {
    const sections = ['home', 'forum', 'event', 'donation', 'profile', 'settings'];
    sections.forEach(section => {
        if (!document.getElementById(section)) {
            console.error('Section tidak ditemukan:', section);
        } else {
            console.log('Section ditemukan:', section);
        }
    });
});