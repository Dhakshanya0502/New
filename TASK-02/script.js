
document.addEventListener('DOMContentLoaded', function() {
    const contactFormValidated = document.getElementById('contactFormValidated');
    const nameInputValidated = document.getElementById('name-validated');
    const emailInputValidated = document.getElementById('email-validated');
    const messageInputValidated = document.getElementById('message-validated');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    function showError(element, message, inputElement) {
        element.textContent = message;
        element.style.display = 'block';
        inputElement.classList.add('invalid');
    }

    function hideError(element, inputElement) {
        element.textContent = '';
        element.style.display = 'none';
        inputElement.classList.remove('invalid');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (contactFormValidated) { 
        contactFormValidated.addEventListener('submit', function(event) {
            let isValid = true;

          
            if (nameInputValidated.value.trim() === '') {
                showError(nameError, 'Name is required.', nameInputValidated);
                isValid = false;
            } else {
                hideError(nameError, nameInputValidated);
            }

           
            if (emailInputValidated.value.trim() === '') {
                showError(emailError, 'Email is required.', emailInputValidated);
                isValid = false;
            } else if (!emailRegex.test(emailInputValidated.value.trim())) {
                showError(emailError, 'Please enter a valid email address.', emailInputValidated);
                isValid = false;
            } else {
                hideError(emailError, emailInputValidated);
            }

         
            if (messageInputValidated.value.trim() === '') {
                showError(messageError, 'Message is required.', messageInputValidated);
                isValid = false;
            } else {
                hideError(messageError, messageInputValidated);
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                alert('Validated Form submitted successfully! (This is a demo, data is not sent)');
                event.preventDefault();
                contactFormValidated.reset();
            }
        });

       
        nameInputValidated.addEventListener('input', function() {
            if (nameInputValidated.value.trim() !== '') {
                hideError(nameError, nameInputValidated);
            }
        });

        emailInputValidated.addEventListener('input', function() {
            if (emailInputValidated.value.trim() !== '' && emailRegex.test(emailInputValidated.value.trim())) {
                hideError(emailError, emailInputValidated);
            }
        });

        messageInputValidated.addEventListener('input', function() {
            if (messageInputValidated.value.trim() !== '') {
                hideError(messageError, messageInputValidated);
            }
        });
    }


    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    if (taskInput && addTaskBtn && taskList) {
        function addTask() {
            const taskText = taskInput.value.trim();

            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            const listItem = document.createElement('li');
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('actions');

            const completeBtn = document.createElement('button');
            completeBtn.textContent = '✓';
            completeBtn.classList.add('complete-btn');
            completeBtn.title = 'Mark as Complete';

            completeBtn.addEventListener('click', function() {
                listItem.classList.toggle('completed');
                if (listItem.classList.contains('completed')) {
                    completeBtn.textContent = '✗';
                    completeBtn.title = 'Mark as Incomplete';
                    completeBtn.style.color = '#ffc107';
                } else {
                    completeBtn.textContent = '✓';
                    completeBtn.title = 'Mark as Complete';
                    completeBtn.style.color = '#28a745';
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '✕';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.title = 'Delete Task';

            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(listItem);
            });

            actionsDiv.appendChild(completeBtn);
            actionsDiv.appendChild(deleteBtn);
            listItem.appendChild(taskSpan);
            listItem.appendChild(actionsDiv);
            taskList.appendChild(listItem);

            taskInput.value = '';
            taskInput.focus();
        }

        addTaskBtn.addEventListener('click', addTask);

        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    }
});