const IMAGES = {
  iceCream: {
    id: 'iceCream',
    poster: 'Dani',
    pod:0,
    link: require('./assets/images/ice_cream.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: [{text: "text",
    username: "username",
    likes: 0,
    reported: false,
    post_id: "post_id",
    comment_date: new Date()}, {text: "text2",
    username: "username2",
    likes: 0,
    reported: false,
    post_id: "post_id",
    comment_date: new Date()},],
    datePosted: new Date()
  },

  cake: {
    id: 'cake',
    poster: 'Gianna',
    pod: 0,
    link: require('./assets/images/cake.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: ["love this!", "so cute", "cool stuff"],
    datePosted: new Date()
  },

  sydney: {
    id: 'sydney',
    poster: 'Sydney',
    pod: 0,
    link: require('./assets/images/sydney.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: ["love this!", "so cute", "cool stuff"],
    datePosted: new Date()
  },
  iceCream2: {
    id: 'iceCream2',
    poster: 'Dani',
    pod: 0,
    link: require('./assets/images/ice_cream.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: ["love this!", "so cute", "cool stuff"],
    datePosted: new Date()
  },

  cake2: {
    id: 'cake2',
    poster: 'Gianna',
    pod: 0,
    link: require('./assets/images/cake.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: ["love this!", "so cute", "cool stuff"],
    datePosted: new Date()
  },

  sydney2: {
    id: 'sydney2',
    poster: 'Sydney',
    pod: 0,
    link: require('./assets/images/sydney.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: ["love this!", "so cute", "cool stuff"],
    datePosted: new Date()
  },
  iceCream3: {
    id: 'iceCream3',
    poster: 'Dani',
    pod:0,
    link: require('./assets/images/ice_cream.jpg'),
    likes: Math.floor(Math.random() * Math.floor(300)),
    comments: ["love this!", "so cute", "cool stuff"],
    datePosted: new Date()
  },
}


export {IMAGES}
