checkLogin();

const nameDOM = document.getElementById('account-name');
const usernameDOM =  document.getElementById('account-username');
const logoutDOM = document.getElementById('logout');
const middleDOM = document.getElementById('middle-content');
const followersDOM = document.getElementById('total_followers');
const tweetsnReplyDOM = document.getElementById('middle-title');
const followersTitleDOM = document.getElementById('followers-title');
const followLinkDOM = document.getElementById('follow-link');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let username = urlParams.get('username');

let handle;
let tweets = [];
let fullNames;
let followers = [];


const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
}

if(!username)
{
    username = localStorage.getItem('userName');
}


const getProfile = async() =>
{
    try
    {
        const profileInfo = await axios.post(`${path}/profile`, {username:username});

        fullNames = profileInfo.data.fullNames;
        tweets = profileInfo.data.tweets;
        followers = profileInfo.data.followers;
        console.log(followers);
        nameDOM.innerText = fullNames;

        if(username == localStorage.getItem('userName'))
        {
            followLinkDOM.style.display = 'None';
        }

            
        displayTweets(tweets, middleDOM);
  

        nameDOM.innerText = fullNames;
        usernameDOM.innerText = `@${username}`;
        followersDOM.innerText = followers.length;

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
});



function displayFollowers(followers, DOM)
{
    DOM.innerHTML = '';
    followers.forEach(follower => DOM.insertAdjacentHTML('beforeend', FollowerDOM(follower)));
}


function displayTweets(tweets, DOM)
{
    DOM.innerHTML = '';
    tweets.forEach(tweet =>
        {
            DOM.insertAdjacentHTML('beforeend', tweetDOM(fullNames, username, 'today', tweet.content))
        })
}

tweetsnReplyDOM.addEventListener('click', () =>
{
    tweetsnReplyDOM.classList.toggle('middle-header');
    followersTitleDOM.classList.toggle('middle-header');
    displayTweets(tweets, middleDOM);
})


followersTitleDOM.addEventListener('click', () =>
{
    tweetsnReplyDOM.classList.toggle('middle-header');
    followersTitleDOM.classList.toggle('middle-header');

    displayFollowers(followers, middleDOM);

});


followLinkDOM.addEventListener('click', async() =>
{
    const follow = axios.post(`${path}/follow`, {username:username}, config);
    alert(`You are now following ${username}`);
})












