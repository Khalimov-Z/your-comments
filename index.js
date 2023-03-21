const form = document.querySelector('#comment-form');
const nameInput = document.querySelector('#name-input');
const commentInput = document.querySelector('#comment-input');
const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const commentsList = document.querySelector('#comments-list');

// add comment function
function addComment(event) {
  event.preventDefault();

  // get form data
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();
  const date = dateInput.value ? new Date(dateInput.value + 'T' + timeInput.value + ':00') : new Date();

  // validate form data
  let valid = true;
  if (name === '') {
    document.querySelector('#name-error').style.display = 'block';
    valid = false;
  } else {
    document.querySelector('#name-error').style.display = 'none';
  }
  if (comment === '') {
    document.querySelector('#comment-error').style.display = 'block';
    valid = false;
  } else {
    document.querySelector('#comment-error').style.display = 'none';
  }
  if (!valid) {
    return;
  }

  // create comment element
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const dateSpan = document.createElement('span');
  const deleteButton = document.createElement('button');
  const likeButton = document.createElement('button');

  h3.textContent = name;
  p.textContent = comment;

  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    dateSpan.textContent = 'today, ' + formatTime(date);
  } else {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      dateSpan.textContent = 'yesterday, ' + formatTime(date);
    } else {
      dateSpan.textContent = formatDate(date) + ', ' + formatTime(date);
    }
  }

  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  deleteButton.addEventListener('click', () => {
    li.remove();
  });

  let likes = 0;
  let liked = false;

  likeButton.innerHTML = `<div><i class="fa fa-heart"></i> ${likes}</div>`

  likeButton.addEventListener('click', () => {
    if(!liked){
      likes++;
      likeButton.innerHTML = `
    <div> 
        <i class="fa fa-heart ${liked===false ? 'liked-btn': ''}"></i> 
        ${likes}
    </div>
    `;

      liked = true
    } else {
      likes--
      likeButton.innerHTML = `<div> <i class="fa fa-heart"></i> ${likes}</div>`
      liked = false;
    }

  });

  li.appendChild(h3);
  li.appendChild(p);
  li.appendChild(dateSpan);
  li.appendChild(deleteButton);
  li.appendChild(likeButton);

  commentsList.appendChild(li);

  // reset form
  form.reset();
}

// format date function
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + '-' + padZero(month) + '-' + padZero(day);
}

// format time function
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return padZero(hours) + ':' + padZero(minutes);
}

// pad zero function
function padZero(number) {
  return number < 10 ? '0' + number : number;
}

// add event listeners
form.addEventListener('submit', addComment);
nameInput.addEventListener('input', () => {
  document.querySelector('#name-error').style.display = 'none';
});
commentInput.addEventListener('input', () => {
  document.querySelector('#comment-error').style.display = 'none';
});