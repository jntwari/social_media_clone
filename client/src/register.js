const path = 'http://127.0.0.1:5000';



const createUser = async() =>
{
    const fullnames = document.getElementById('full_name').value;
    const email = document.getElementById('user_name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password');
    const passwordMatch = document.getElementById('password-match');
    console.log("clicked");
   
    if( email && fullnames && password)
    {
        console.log("clicked");
        try
        {
            const newUser = await axios.post(`${path}/register`, {full_names : fullnames, user_name:email, password:password});
             
            localStorage.setItem('userId', 1);
            localStorage.setItem('fullNames', fullnames);
            localStorage.setItem('userName', email);

            window.location.href = 'home.html'; 
        }
        catch(error)
        {
            console.log(error)
        }
        
    }
    else
    {
        console.log('not enough details')
    } 
} 


