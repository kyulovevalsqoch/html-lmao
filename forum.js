// Fungsi untuk forum
function setupCommentForms() {
    document.addEventListener('submit', function(e) {
        if (e.target && e.target.classList.contains('comment-form')) {
            e.preventDefault();
            
            if (!isLoggedIn) {
                alert('Anda harus login untuk menambahkan komentar.');
                return;
            }
            
            const commentInput = e.target.querySelector('input');
            const commentText = commentInput.value.trim();
            
            if (commentText) {
                const commentSection = e.target.closest('.comment-section');
                const commentCountElement = commentSection.querySelector('h6');
                const currentCount = parseInt(commentCountElement.textContent.match(/\d+/)[0]) || 0;
                
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <div class="comment-header">
                        <div class="user-avatar">
                            <img src="${currentUser.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.username) + '&background=8B7355&color=fff&size=32'}" 
                                 alt="${currentUser.username}" class="avatar-img">
                        </div>
                        <div class="comment-user-info">
                            <p class="comment-username">${currentUser.username}</p>
                            <p class="comment-time">Baru saja</p>
                        </div>
                    </div>
                    <p class="comment-text">${commentText}</p>
                `;
                
                commentSection.insertBefore(newComment, e.target);
                
                commentCountElement.textContent = `Komentar (${currentCount + 1})`;
                
                commentInput.value = '';
                
                alert('Komentar berhasil ditambahkan!');
            }
        }
    });
}

function updateForumUI() {
    const postFormContainer = document.getElementById('postFormContainer');
    const commentForms = document.querySelectorAll('.comment-form-container');
    
    if (!postFormContainer) {
        console.error('postFormContainer tidak ditemukan');
        return;
    }
    
    if (isLoggedIn && currentUser) {
        postFormContainer.innerHTML = `
            <div class="post-form">
                <h2 class="h5 mb-3">Tulis sesuatu di sini</h2>
                <form id="newPostForm">
                    <div class="mb-3">
                        <label for="postContent" class="form-label">Postingan Anda</label>
                        <textarea class="form-control" id="postContent" rows="4" required placeholder="Apa yang ingin Anda bagikan?"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="postImage" class="form-label">Upload Gambar (Opsional)</label>
                        <input type="file" class="form-control" id="postImage" accept="image/*">
                        <div class="mt-2">
                            <img id="imagePreview" class="image-preview" src="#" alt="Preview Gambar">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-mobile">
                        <i class="fas fa-paper-plane me-1"></i> Post
                    </button>
                </form>
            </div>
        `;
        
        const postImageInput = document.getElementById('postImage');
        const imagePreview = document.getElementById('imagePreview');
        
        if (postImageInput) {
            postImageInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        imagePreview.src = e.target.result;
                        imagePreview.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                } else {
                    imagePreview.style.display = 'none';
                }
            });
        }
        
        const newPostForm = document.getElementById('newPostForm');
        if (newPostForm) {
            newPostForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const postContent = document.getElementById('postContent').value;
                const postImageInput = document.getElementById('postImage');
                
                if (postContent) {
                    const postsContainer = document.getElementById('postsContainer');
                    const newPost = document.createElement('div');
                    newPost.className = 'forum-post';
                    newPost.setAttribute('data-post-id', Date.now());
                    
                    let imageHTML = '';
                    if (postImageInput.files.length > 0) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            imageHTML = `<img src="${e.target.result}" class="post-image" alt="Gambar postingan">`;
                            newPost.innerHTML = `
                                <div class="post-header">
                                    <div class="user-avatar">
                                        <img src="${currentUser.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.username) + '&background=8B7355&color=fff&size=40'}" 
                                             alt="${currentUser.username}" class="avatar-img">
                                    </div>
                                    <div class="post-user-info">
                                        <p class="forum-username">${currentUser.username}</p>
                                        <p class="post-time">Baru saja</p>
                                    </div>
                                </div>
                                <p class="post-content">${postContent}</p>
                                ${imageHTML}
                                <div class="comment-section">
                                    <h6 class="mb-3">Komentar (0)</h6>
                                    <div class="comment-form-container">
                                        <form class="comment-form">
                                            <div class="user-avatar">
                                                <img src="${currentUser.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.username) + '&background=8B7355&color=fff&size=32'}" 
                                                     alt="${currentUser.username}" class="avatar-img">
                                            </div>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Tulis komentar..." required>
                                                <button class="btn btn-outline-primary btn-mobile" type="submit">
                                                    <i class="fas fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            `;
                            
                            postsContainer.prepend(newPost);
                            
                            newPostForm.reset();
                            imagePreview.style.display = 'none';
                            
                            currentUser.postCount = (currentUser.postCount || 0) + 1;
                            document.getElementById('postCount').textContent = currentUser.postCount;
                            
                            alert('Postingan berhasil ditambahkan!');
                        };
                        reader.readAsDataURL(postImageInput.files[0]);
                    } else {
                        newPost.innerHTML = `
                            <div class="post-header">
                                <div class="user-avatar">
                                    <img src="${currentUser.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.username) + '&background=8B7355&color=fff&size=40'}" 
                                         alt="${currentUser.username}" class="avatar-img">
                                </div>
                                <div class="post-user-info">
                                    <p class="forum-username">${currentUser.username}</p>
                                    <p class="post-time">Baru saja</p>
                                </div>
                            </div>
                            <p class="post-content">${postContent}</p>
                            <div class="comment-section">
                                <h6 class="mb-3">Komentar (0)</h6>
                                <div class="comment-form-container">
                                    <form class="comment-form">
                                        <div class="user-avatar">
                                            <img src="${currentUser.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.username) + '&background=8B7355&color=fff&size=32'}" 
                                                 alt="${currentUser.username}" class="avatar-img">
                                        </div>
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Tulis komentar..." required>
                                            <button class="btn btn-outline-primary btn-mobile" type="submit">
                                                <i class="fas fa-paper-plane"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        `;
                        
                        postsContainer.prepend(newPost);
                        
                        newPostForm.reset();
                        imagePreview.style.display = 'none';
                        
                        currentUser.postCount = (currentUser.postCount || 0) + 1;
                        document.getElementById('postCount').textContent = currentUser.postCount;
                        
                        alert('Postingan berhasil ditambahkan!');
                    }
                }
            });
        }
        
        updateCommentForms();
    } else {
        postFormContainer.innerHTML = `
            <div class="login-required">
                <p><i class="fas fa-exclamation-circle me-2"></i> Anda harus <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">login</a> untuk membuat postingan.</p>
            </div>
        `;
        
        commentForms.forEach(container => {
            container.innerHTML = `
                <div class="login-required small">
                    <p><i class="fas fa-exclamation-circle me-1"></i> <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a> untuk menambahkan komentar.</p>
                </div>
            `;
        });
    }
}

function updateCommentForms() {
    const commentForms = document.querySelectorAll('.comment-form-container');
    
    commentForms.forEach(container => {
        if (!container.querySelector('form') || container.querySelector('.login-required')) {
            if (isLoggedIn) {
                container.innerHTML = `
                    <form class="comment-form">
                        <div class="user-avatar">
                            <img src="${currentUser.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.username) + '&background=8B7355&color=fff&size=32'}" 
                                 alt="${currentUser.username}" class="avatar-img">
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Tulis komentar..." required>
                            <button class="btn btn-outline-primary btn-mobile" type="submit">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                `;
            } else {
                container.innerHTML = `
                    <div class="login-required small">
                        <p><i class="fas fa-exclamation-circle me-1"></i> <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a> untuk menambahkan komentar.</p>
                    </div>
                `;
            }
        }
    });
}