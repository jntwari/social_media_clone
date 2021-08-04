const path = 'http://127.0.0.1:5000';



const userLogin = async() =>
{
    const email = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login_error');

    if( email && password)
    {
        try
        {
            const newUser = await axios.post(`${path}/login`, {user_name:email, password:password});
            localStorage.setItem('userId', newUser.data.id);
            localStorage.setItem('fullNames', newUser.data.full_names);
            localStorage.setItem('userName', newUser.data.username);
            localStorage.setItem('token', newUser.data.token);

            window.location.href = 'home.html';           
        }
        catch(error)
        {
            loginError.innerHTML = ''
            loginError.insertAdjacentText('afterbegin', error.response.data.message)
        }
        
    }
}