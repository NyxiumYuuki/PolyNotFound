const {youtube, dailymotion} = require('../../config/host.config');
module.exports = [
  {
    id: 0,
    interest: "Actualités",
    categories: [
      {id: "news", name: "News", source: dailymotion.name},
      {id: "25", name: "News & Politics", source: youtube.name},
    ]
  },
  {
    id: 1,
    interest: "Animaux",
    categories: [
      {id: "animals", name: "animaux", source: dailymotion.name},
      {id: "15", name: "Pets & Animals", source: youtube.name},
    ]
  },
  {
    id: 2,
    interest: "Arts",
    categories: [
      {id: "creation", name: "Art", source: dailymotion.name},
      {id: "", name: "", source: youtube.name},
    ]
  },
  {
    id: 3,
    interest: "Autos",
    categories: [
      {id: "auto", name: "Auto-Moto", source: dailymotion.name},
      {id: "2", name: "Autos & Vehicles", source: youtube.name},
    ]
  },
  {
    id: 4,
    interest: "Divertissements",
    categories: [
      {id: "tv", name: "TV", source: dailymotion.name},
      {id: "fun", name: "Humour & Divertissement", source: dailymotion.name},
      {id: "webcam", name: "Webcam", source: dailymotion.name},
      {id: "23", name: "Comedy", source: youtube.name},
      {id: "24", name: "Entertainment", source: youtube.name},
      {id: "43", name: "Shows", source: youtube.name}
    ]
  },
  {
    id: 5,
    interest: "Éducation",
    categories: [
      {id: "school", name: "Éducation", source: dailymotion.name},
      {id: "27", name: "Education", source: youtube.name}
    ]
  },
  {
    id: 6,
    interest: "Événements",
    categories: [
      {id: "", name: "", source: dailymotion.name},
      {id: "19", name: "Travel & Events", source: youtube.name},
    ]
  },
  {
    id: 7,
    interest: "Films",
    categories: [
      {id: "shortfilms", name: "Cinéma", source: dailymotion.name},
      {id: "1", name: "Film & Animation", source: youtube.name},
      {id: "18", name: "Short Movies", source: youtube.name},
      {id: "30", name: "Movies", source: youtube.name},
      {id: "31", name: "Anime/Animation", source: youtube.name},
      {id: "32", name: "Action/Adventure", source: youtube.name},
      {id: "33", name: "Comedy", source: youtube.name},
      {id: "35", name: "Documentary", source: youtube.name},
      {id: "36", name: "Drama", source: youtube.name},
      {id: "39", name: "Horror", source: youtube.name},
      {id: "40", name: "Sci-Fi/Fantasy", source: youtube.name},
      {id: "41", name: "Thriller", source: youtube.name},
      {id: "42", name: "Shorts", source: youtube.name},
      {id: "44", name: "Trailers", source: youtube.name}
    ]
  },
  {
    id: 8,
    interest: "Jeux vidéo",
    categories: [
      {id: "videogames", name: "Jeux vidéo", source: dailymotion.name},
      {id: "20", name: "Gaming", source: youtube.name},
    ]
  },
  {
    id: 9,
    interest: "Kids",
    categories: [
      {id: "kids", name: "Kids", source: dailymotion.name},
      {id: "", name: "", source: youtube.name},
    ]
  },
  {
    id: 10,
    interest: "Modes de vie",
    categories: [
      {id: "lifestyle", name: "Lifestyle & Tutoriels", source: dailymotion.name},
      {id: "26", name: "Howto & Style", source: youtube.name},
    ]
  },
  {
    id: 11,
    interest: "Musiques",
    categories: [
      {id: "music", name: "Musique", source: dailymotion.name},
      {id: "10", name: "Music", source: youtube.name},
    ]
  },
  {
    id: 12,
    interest: "People",
    categories: [
      {id: "people", name: "Amis & Famille", source: dailymotion.name},
      {id: "21", name: "Videoblogging", source: youtube.name},
      {id: "22", name: "People & Blogs", source: youtube.name},
      {id: "37", name: "Family", source: youtube.name},
    ]
  },
  {
    id: 13,
    interest: "Science et Technologie",
    categories: [
      {id: "tech", name: "Tech", source: dailymotion.name},
      {id: "28", name: "Science & Technology", source: youtube.name},
    ]
  },
  {
    id: 14,
    interest: "Sports",
    categories: [
      {id: "sport", name: "Sport", source: dailymotion.name},
      {id: "17", name: "Sports", source: youtube.name},
    ]
  },
  {
    id: 15,
    interest: "Voyages",
    categories: [
      {id: "travel", name: "Voyages", source: dailymotion.name},
      {id: "38", name: "Foreign", source: youtube.name},
    ]
  },
  {
    id: 16,
    interest: "Autres",
    categories: [
      {id: "29", name: "Nonprofits & Activism", source: youtube.name},
      {id: "33", name: "Classics", source: youtube.name}
    ]
  }
];
