if(process.env.YOUTUBE_API_KEY === undefined ||
  process.env.YOUTUBE_API_KEY === '' ||
  process.env.DAILYMOTION_API_KEY === undefined ||
  process.env.DAILYMOTION_API_KEY === ''){
  console.log('Error Env YOUTUBE_API_KEY & DAILYMOTION_API_KEY Variables');
  process.exit();
}

console.log('Env variables YOUTUBE_API_KEY & DAILYMOTION_API_KEY received');

module.exports = {
  youtube: {
    name: "Youtube",
    shortname: "yt",
    baseAPIUrl: 'https://youtube.googleapis.com/youtube/v3',
    baseChannelUrl: 'https://www.youtube.com/channel/',
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
  },
  dailymotion: {
    name: "Dailymotion",
    shortname: "dm",
    baseAPIUrl: 'https://api.dailymotion.com',
    baseChannelUrl: 'https://www.dailymotion.com/',
    DAILYMOTION_API_KEY: process.env.DAILYMOTION_API_KEY
  }
};
