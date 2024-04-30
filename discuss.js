// Отримання параметрів URL
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const time = urlParams.get('time');
const content = urlParams.get('content');

// Встановлення значень елементам сторінки
document.getElementById('topic-discuss').textContent = title;
document.getElementById('time-discuss').textContent = time;
document.getElementById('content-discussion').textContent = content;


document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо елементи форми та додаткові дані
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment');
    const commentsSection = document.querySelector('.mt-5');
  
    // Перевіряємо, чи є вже збережені коментарі у localStorage
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
  
    // Відображаємо всі збережені коментарі при завантаженні сторінки
    comments.forEach(commentData => {
      const commentWrapper = createCommentElement(commentData);
      commentsSection.appendChild(commentWrapper);
    });
  
    // Обробник події натискання кнопки "Додати коментар"
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Зупинити дійсність форми
  
      // Отримуємо введений коментар
      const commentText = commentInput.value;
  
      // Отримуємо ім'я поточного користувача
      const currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
      const username = currentAccount ? currentAccount.name : 'Anonymous';
  
      // Створюємо об'єкт для нового коментаря
      const newComment = {
        username: username,
        text: commentText,
        timestamp: new Date().toLocaleString()
      };
  
      // Додаємо новий коментар до масиву коментарів
      comments.push(newComment);
  
      // Зберігаємо оновлений масив коментарів у localStorage
      localStorage.setItem('comments', JSON.stringify(comments));
  
      // Створюємо HTML елемент для нового коментаря та додаємо його до сторінки
      const commentWrapper = createCommentElement(newComment);
      commentsSection.appendChild(commentWrapper);
  
      // Очищаємо поле вводу після додавання коментаря
      commentInput.value = '';
    });
  
    // Функція для створення HTML елементу для коментаря
    function createCommentElement(commentData) {
      const commentWrapper = document.createElement('div');
      commentWrapper.classList.add('media', 'mt-3');
  
      const avatarImage = document.createElement('img');
      avatarImage.src = 'https://i.pinimg.com/564x/2a/ff/b4/2affb4335ff7c8da21f76f9a179a135a.jpg';
      avatarImage.width = 64;
      avatarImage.height = 64;
      avatarImage.classList.add('mr-3');
      avatarImage.alt = 'Аватар';
  
      const commentBody = document.createElement('div');
      commentBody.classList.add('media-body');
  
      const usernameHeader = document.createElement('h5');
      usernameHeader.classList.add('mt-0');
      usernameHeader.textContent = commentData.username;
  
      const commentContent = document.createElement('div');
      commentContent.textContent = commentData.text;
  
      const replyLink = document.createElement('a');
      replyLink.classList.add('text-muted');
      replyLink.href = '#';
      replyLink.textContent = '  Відповісти';
  
      //const commentTimestamp = document.createElement('small');
     // commentTimestamp.classList.add('text-muted');
      //commentTimestamp.textContent = commentData.timestamp;
  
      commentBody.appendChild(usernameHeader);
      commentBody.appendChild(commentContent);
      commentContent.appendChild(replyLink);
     // commentBody.appendChild(commentTimestamp);
  
      commentWrapper.appendChild(avatarImage);
      commentWrapper.appendChild(commentBody);
  
      return commentWrapper;
    }
  });
  
  
  