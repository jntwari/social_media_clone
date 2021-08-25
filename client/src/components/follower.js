const FollowerDOM = (follower) =>
{
    return `
        <div class="tweet-title">
            <div class="poster-image"><img src="../img/IMG_20190531_114129041~2.jpg" alt=""></div>
            <div class="tweet-author"> 
                <div><span style="font-weight: bold;"> ${follower.name} </span> <span> @${follower.username}</span> </div>
                <div class="posted-time" style="margin-top: 2px;">500 followers</div>
            </div>
             
        </div>   
                                               
    `
}