// Fungsi untuk profil
function updateProfileForm() {
    if (!currentUser) return;
    
    const fullNameInput = document.getElementById('fullName');
    const profileUsernameInput = document.getElementById('profileUsername');
    const profileEmailInput = document.getElementById('profileEmail');
    const profilePhoneInput = document.getElementById('profilePhone');
    const profileBioInput = document.getElementById('profileBio');
    const joinDateInput = document.getElementById('joinDate');
    const profilePicture = document.getElementById('profilePicture');
    
    if (fullNameInput) fullNameInput.value = currentUser.name || '';
    if (profileUsernameInput) profileUsernameInput.value = currentUser.username || '';
    if (profileEmailInput) profileEmailInput.value = currentUser.email || '';
    if (profilePhoneInput) profilePhoneInput.value = currentUser.phone || '';
    if (profileBioInput) profileBioInput.value = currentUser.bio || '';
    if (joinDateInput) joinDateInput.value = currentUser.joinDate || '';
    
    if (profilePicture) {
        if (currentUser.profilePicture) {
            profilePicture.src = currentUser.profilePicture;
        } else {
            profilePicture.src = "https://via.placeholder.com/150";
        }
    }
    
    const postCountElement = document.getElementById('postCount');
    const eventCountElement = document.getElementById('eventCount');
    const catCountElement = document.getElementById('catCount');
    
    if (postCountElement) postCountElement.textContent = currentUser.postCount || 0;
    if (eventCountElement) eventCountElement.textContent = currentUser.eventCount || 0;
    if (catCountElement) catCountElement.textContent = currentUser.catCount || 0;
}

document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!currentUser) return;
            
            currentUser.name = document.getElementById('fullName').value;
            currentUser.email = document.getElementById('profileEmail').value;
            currentUser.phone = document.getElementById('profilePhone').value;
            currentUser.bio = document.getElementById('profileBio').value;
            
            updateLoginUI();
            
            alert('Profil berhasil diperbarui!');
        });
    }
    
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const resetPasswordModal = new bootstrap.Modal(document.getElementById('resetPasswordModal'));
    
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            
            if (newPassword !== confirmNewPassword) {
                alert('Password baru dan konfirmasi password tidak cocok.');
                return;
            }
            
            resetPasswordModal.hide();
            resetPasswordForm.reset();
            
            alert('Password berhasil direset!');
        });
    }
    
    const changeEmailForm = document.getElementById('changeEmailForm');
    const changeEmailModal = new bootstrap.Modal(document.getElementById('changeEmailModal'));
    
    if (changeEmailForm) {
        changeEmailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newEmail = document.getElementById('newEmail').value;
            const confirmPassword = document.getElementById('confirmPasswordEmail').value;
            
            currentUser.email = newEmail;
            updateProfileForm();
            changeEmailModal.hide();
            changeEmailForm.reset();
            
            alert('Email berhasil diubah!');
        });
    }
});