const checkLogin = () =>
{
    const userId = localStorage.getItem('userId');
    if(!userId)
    {
        window.location.href = 'login.html';
    }
    else
    {
        const nameDOM = document.getElementById('account-name');
        const usernameDOM =  document.getElementById('account-username');
    }
}

const logout = () =>
{
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('fullNames');
    localStorage.removeItem('token')

    window.location.href = 'login.html';
}