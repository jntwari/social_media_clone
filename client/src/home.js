checkLogin();

const nameDOM = document.getElementById('account-name');
const usernameDOM =  document.getElementById('account-username');
const logoutDOM = document.getElementById('logout');
const middleDOM = document.getElementById('middle-content')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let username = urlParams.get('username');

let handle;
let tweets = [];
let fullNames;

if(!username)
{
    username = localStorage.getItem('userName');
}


const getProfile = async() =>
{
    try
    {
        const profileInfo = await axios.post(`${path}/profile`, {username:username})
        fullNames = profileInfo.data.fullNames;
        tweets = profileInfo.data.tweets;
        nameDOM.innerText = fullNames;

        tweets.forEach(tweet  =>
        {
            middleDOM.insertAdjacentHTML('beforeend', tweetDOM(fullNames, username, 'today', tweet.content))
        });

    }
    catch(e)
    {
        console.log('user does not exist');
        console.log(username)
    }
}

getProfile();





logoutDOM.addEventListener('click', () =>
{
    logout();
})

nameDOM.innerText = localStorage.getItem('fullNames');
usernameDOM.innerText = `@${username}`;








