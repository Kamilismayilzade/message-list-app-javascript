window.addEventListener('load', function() {

    const form = document.querySelector('.form');
    const allMessages = document.querySelector('#messages');
    const messageInput = document.querySelector('.message-input');

    const addMessageBtn = document.querySelector('.message-submit');
    const toastContainer = document.getElementById("toast-container");

    let messages = [];
    
    form.addEventListener('submit', function(e) {

        e.preventDefault();

        if (messageInput.value === '') return;

        messages.push(messageInput.value);

        const message = messages[messages.length - 1];
        messageInput.value = '';

        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `
          <div class="content">
            <input type="text" class="text" value="${message}" readonly > 
          </div>
          <div class="action">
            <button class="delete"> <i class="fa-solid fa-xmark"></i> </button>
          </div>
        `;

        allMessages.appendChild(newMessage);
        showToast(message);

        const deleteBtn = newMessage.querySelector('.delete');
        deleteBtn.addEventListener('click', function() {
          newMessage.remove();
        });
    })

    function showToast(message) {
        // remove existing toast element
        toastContainer.innerHTML = '';
      
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = message;
        toastContainer.style.display = 'block';
        toastContainer.appendChild(toast);
      
        setTimeout(() => {
          toastContainer.style.display = 'none';
        }, 5000);
      }

});
