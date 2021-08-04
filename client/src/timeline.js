
checkLogin();

const path = 'http://127.0.0.1:5000';

const AddpostDOM = document.getElementById('add-post-container');
const cancelDOM = document.getElementById('cancel');
const logoutDOM = document.getElementById('logout');
const postTweetDoM = document.getElementById('post-tweet'); 

const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
}

logoutDOM.addEventListener('click', () =>
{
    logout();
})

AddpostDOM.addEventListener('click', () =>
{
    const form = document.getElementById('post-tweet-form');
    form.style.display = 'block';
})

cancelDOM.addEventListener('click', () =>
{
    const form = document.getElementById('post-tweet-form');
    form.style.display = 'none';
})


postTweetDoM.addEventListener('click', async() =>
{
    const tweetContent = document.getElementById('tweet-area');
    const tweetErrorDOM = document.getElementById('tweet_error');

    if(tweetContent.value !='')
    {
        const tweet = await axios.post(`${path}/tweet`, {tweet:tweetContent.value}, config);
        tweetContent.innerText = '';
        tweetErrorDOM.innerHTML  = '';
        alert('Tweet successfully posted!');
    }
    else
    {
         tweetErrorDOM.innerHTML = 'You cant post an empty';
    }
})