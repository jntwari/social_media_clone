const tweetDOM = (name, handle, date, content) =>
{
    return `
    <div class="tweet">
        <div class="tweet-title">
            <div class="poster-image"><img src="../img/IMG_20190531_114129041~2.jpg" alt=""></div>
            <div class="tweet-author"> <span style="font-weight: bold;"> ${name} </span> <span> @${handle}</span> </div>
            <div class="posted-time">${date}</div>
        </div>                                 
        <div class="tweet-content">${content} </div>
    </div>
    `
}