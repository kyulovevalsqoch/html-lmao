// Fungsi untuk donasi
document.addEventListener('DOMContentLoaded', function() {
    let selectedAmount = 0;
    const donationOptions = document.querySelectorAll('.donation-option');
    const customAmountInput = document.getElementById('customAmount');
    const donateButton = document.getElementById('donateButton');
    const donationAmountText = document.getElementById('donationAmountText');
    const confirmDonationButton = document.getElementById('confirmDonation');
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'));
    
    if (donationOptions.length > 0) {
        donationOptions.forEach(option => {
            option.addEventListener('click', function() {
                donationOptions.forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-secondary');
                });
                
                this.classList.remove('btn-outline-secondary');
                this.classList.add('btn-primary');
                
                selectedAmount = parseInt(this.getAttribute('data-amount'));
                if (customAmountInput) customAmountInput.value = '';
            });
        });
    }
    
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            donationOptions.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-secondary');
            });
            
            selectedAmount = this.value ? parseInt(this.value.replace(/\D/g, '')) : 0;
        });
    }
    
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            if (selectedAmount > 0) {
                const formattedAmount = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                }).format(selectedAmount);
                
                donationAmountText.textContent = formattedAmount;
                
                donationModal.show();
            } else {
                alert('Silakan pilih atau masukkan jumlah donasi terlebih dahulu.');
            }
        });
    }
    
    if (confirmDonationButton) {
        confirmDonationButton.addEventListener('click', function() {
            donationModal.hide();
            
            alert('Terima kasih! Donasi Anda telah berhasil.');
            
            donationOptions.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-secondary');
            });
            if (customAmountInput) customAmountInput.value = '';
            selectedAmount = 0;
        });
    }
});