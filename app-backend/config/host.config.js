module.exports = {
  youtube: {
    name: "Youtube",
    shortname: "yt",
    baseAPIUrl: 'https://youtube.googleapis.com/youtube/v3',
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
  },
  dailymotion: {
    name: "Dailymotion",
    shortname: "dm",
    baseAPIUrl: 'https://api.dailymotion.com/',
    DAILYMOTION_API_KEY: process.env.DAILYMOTION_API_KEY
  }
};
