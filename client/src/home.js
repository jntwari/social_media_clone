checkLogin();

const nameDOM = document.getElementById('account-name');
const usernameDOM =  document.getElementById('account-username');
const logoutDOM = document.getElementById('logout');


logoutDOM.addEventListener('click', () =>
{
    logout();
})

nameDOM.innerText = localStorage.getItem('fullNames');
usernameDOM.innerText = `@${localStorage.getItem('userName')}`;





