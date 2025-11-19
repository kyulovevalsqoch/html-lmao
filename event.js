// Fungsi untuk event
function updateEventUI() {
    const createEventContainer = document.getElementById('createEventContainer');
    const eventsContainer = document.getElementById('eventsContainer');
    
    if (isLoggedIn && currentUser) {
        createEventContainer.innerHTML = `
            <div class="create-event-form">
                <h2 class="h5 mb-3">Buat Event Baru</h2>
                <form id="newEventForm">
                    <div class="mb-3">
                        <label for="eventName" class="form-label">Nama Event</label>
                        <input type="text" class="form-control" id="eventName" required>
                    </div>
                    <div class="mb-3">
                        <label for="eventDescription" class="form-label">Deskripsi Event (Opsional)</label>
                        <textarea class="form-control" id="eventDescription" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="eventLocation" class="form-label">Lokasi</label>
                        <input type="text" class="form-control" id="eventLocation" required>
                    </div>
                    <div class="mb-3">
                        <label for="eventDate" class="form-label">Tanggal</label>
                        <input type="date" class="form-control" id="eventDate" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-mobile">
                        <i class="fas fa-calendar-plus me-1"></i> Buat Event
                    </button>
                </form>
            </div>
        `;
        
        const newEventForm = document.getElementById('newEventForm');
        if (newEventForm) {
            newEventForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const eventName = document.getElementById('eventName').value;
                const eventDescription = document.getElementById('eventDescription').value;
                const eventLocation = document.getElementById('eventLocation').value;
                const eventDate = document.getElementById('eventDate').value;
                
                if (eventName && eventLocation && eventDate) {
                    const dateObj = new Date(eventDate);
                    const formattedDate = dateObj.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                    
                    const newEvent = {
                        id: events.length + 1,
                        name: eventName,
                        description: eventDescription,
                        location: eventLocation,
                        date: formattedDate,
                        interestedCount: 0
                    };
                    
                    events.unshift(newEvent);
                    
                    renderEvents();
                    
                    newEventForm.reset();
                    
                    currentUser.eventCount = (currentUser.eventCount || 0) + 1;
                    document.getElementById('eventCount').textContent = currentUser.eventCount;
                    
                    alert('Event berhasil dibuat!');
                }
            });
        }
    } else {
        createEventContainer.innerHTML = `
            <div class="login-required">
                <p><i class="fas fa-exclamation-circle me-2"></i> Anda harus <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">login</a> untuk membuat event.</p>
            </div>
        `;
    }
    
    renderEvents();
}

function renderEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'card event-card mb-3';
        eventCard.setAttribute('data-event-id', event.id);
        eventCard.innerHTML = `
            <div class="card-body">
                <p class="event-date">${event.date}</p>
                <h2 class="h4 mb-3">${event.name}</h2>
                <p>${event.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-4 flex-column flex-md-row">
                    <div class="mb-3 mb-md-0">
                        <p class="mb-0"><i class="fas fa-map-marker-alt me-2"></i>${event.location}</p>
                    </div>
                    <button class="btn btn-interest btn-mobile interest-btn">
                        <i class="fas fa-heart me-2"></i>Tertarik
                    </button>
                </div>
                <div class="mt-3">
                    <p><strong>${event.interestedCount} orang</strong> tertarik dengan event ini</p>
                </div>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
    
    document.querySelectorAll('.interest-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!isLoggedIn) {
                const loginRequiredModal = new bootstrap.Modal(document.getElementById('loginRequiredModal'));
                loginRequiredModal.show();
            } else {
                const eventCard = this.closest('.event-card');
                const eventId = parseInt(eventCard.getAttribute('data-event-id'));
                const event = events.find(e => e.id === eventId);
                
                if (event) {
                    event.interestedCount++;
                    this.closest('.event-card').querySelector('.mt-3 p strong').textContent = `${event.interestedCount} orang`;
                    
                    currentUser.eventCount = (currentUser.eventCount || 0) + 1;
                    document.getElementById('eventCount').textContent = currentUser.eventCount;
                    
                    alert('Anda tertarik dengan event ini!');
                }
            }
        });
    });
}