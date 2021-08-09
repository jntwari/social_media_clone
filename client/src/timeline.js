
checkLogin();

const path = 'http://127.0.0.1:5000';
let tweets = [];
let totalTweets;

const AddpostDOM = document.getElementById('add-post-container');
const cancelDOM = document.getElementById('cancel');
const logoutDOM = document.getElementById('logout');
const postTweetDoM = document.getElementById('post-tweet'); 
const middleDOM = document.getElementById('middle');


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
       
        //tweetErrorDOM.innerHTML  = '';
        alert('Tweet successfully posted!');
        middleDOM.insertAdjacentHTML('afterbegin', tweetDOM(localStorage.getItem('fullNames'), localStorage.getItem('userName'), "today", tweetContent.value));
        tweetContent.value = '';
        totalTweets = totalTweets + 1;
        totalTweetsDOM.innerHTML = totalTweets;

    }
    else
    {
         tweetErrorDOM.innerHTML = 'You cant post an empty';
    }
})


// To do on this page
 const getMyTweets =  async() =>
 {
    let myTweets = [];
    const totalTweetsDOM = document.getElementById('total_tweets');
    try 
    {
       const myTweetsData = await axios.get(`${path}/tweet`, config);
       myTweets = myTweetsData.data.tweets;
       totalTweets = myTweetsData.data.totalTweets;

       totalTweetsDOM.innerHTML = totalTweets;


    } 
    catch (error) 
    {
        myTweets = [];
        console.log('here')
    }

    return myTweets
 }

 const loadPage = async () =>
 {
    tweets = await getMyTweets();
    if(tweets.length > 0)
    {
        tweets.forEach(tweet =>
            {
                middleDOM.insertAdjacentHTML('beforeend', tweetDOM(localStorage.getItem('fullNames'), localStorage.getItem('userName'), "today", tweet.content));
            })
    }
    else
    {
        middleDOM.innerHTML = `<h1> You have no tweets yet </h1>`
    }
 }

 loadPage();
 

 