window.addEventListener('load', function() {

    const form = document.querySelector('.form');
    const allMessages = document.querySelector('#messages');
    const messageInput = document.querySelector('.message-input');

    const addMessageBtn = document.querySelector('.message-submit');
    const toastContainer = document.getElementById("toast-container");

    // Get messages from local storage or set an empty array
    // let messages = localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [];

    let messages = [];

    const storedMessages = localStorage.getItem("messages");

    if (storedMessages) {
        try {
            messages = JSON.parse(storedMessages);
        } catch (e) {
            console.error(e);
        }
    }


    
    form.addEventListener('submit', function(e) {

        e.preventDefault();

        if (messageInput.value === '') return;

        messages.push(messageInput.value);
        messageInput.value = '';

        localStorage.setItem("messages", JSON.stringify(messages));

        const message = messages[messages.length - 1];

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
            removeToast();

        });
    })

    function showToast(message) {

        // remove existing toast element
        toastContainer.innerHTML = '';
      
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.innerHTML = `<span><i class="fa-sharp fa-solid fa-circle-info"></i></span> ${message}`;
        toastContainer.style.display = 'block';
        toastContainer.appendChild(toast);
      
        setTimeout(() => {
            removeToast();
        }, 5000);

    }

    function removeToast() {

        toastContainer.style.display = 'none';
        toastContainer.innerHTML = '';
        
    }
});
