
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert(generatePosts());
    });
};

function generatePosts(){
  return [
    {
      title: "Stone Henge",
      location: "England",
      description: "This is sooooo cool!! And TAll!!!",
      date: "April 4th, 2000",
      image: "https://unsplash.com/photos/-ZLDp62DrLo",
      user_id: 1,
    },
    {
      title: "Lincoln Monument",
      location: "Washington D. C.",
      description: "THis is an amazing piece of history!!!!",
      date: "Feb. 28th, 2007",
      image: "https://unsplash.com/photos/28nk2O5RjMo",
      user_id: 1,
    },
    {
      title: "Egyptian Pyramids",
      location: "Egypt",
      description: "It's soooo HOTTTT!!!!!",
      date: "January 14th, 2006",
      image: "https://unsplash.com/photos/v1YecuaDXS4",
      user_id: 1,
    },
    {
      title: "Great Wall of China",
      location: "China",
      description: "It is SOOOOOOOOOO FREAKIN LONGGGGG!!!!!",
      date: "March 3rd, 2003",
      image: "https://unsplash.com/photos/siy5LCp84AY",
      user_id: 2,
    },
    {
      title: "Skydiving!",
      location: "In the Air",
      description: "I am soooooo scared!!! I can do this!",
      date: "May 19th, 2019",
      image: "https://unsplash.com/photos/G0FsO2Ca8nQ",
      user_id: 2,
    },
    {
      title: "Cars",
      location: "Home",
      description: "I love CARRRRSSSSSS!!!!!",
      date: "June 26th, 2009",
      image: "https://unsplash.com/photos/A53o1drQS2k",
      user_id: 2,
    },
    {
      title: "Disney World!",
      location: "Orlando",
      description: "I love MICKEY MOUSE!!!!!",
      date: "July 18th, 2004",
      image: "https://unsplash.com/photos/7VHsb9sGBKs",
      user_id: 3,
    },
    {
      title: "Cliff",
      location: "Ireland",
      description: "It's cold!",
      date: "August 25th, 2010",
      image: "https://unsplash.com/photos/NPxkSK-makg",
      user_id: 3,
    },
    {
      title: "Awesome Palace",
      location: "Russia",
      description: "Very Colorful...",
      date: "Sept. 25th, 2011",
      image: "https://unsplash.com/photos/jaH3QF46gAY",
      user_id: 3,
    },
    {
      title: "The Beach",
      location: "Brazil",
      description: "I LOVVVVEEEE WATTEERRRRR!!!!!",
      date: "October 25th, 2012",
      image: "https://unsplash.com/photos/7F65HDP0-E0",
      user_id: 3,
    },
    {
      title: "Looks like Greece",
      location: "Portugal",
      description: "It's on the other side of the world!",
      date: "November 25th, 2013",
      image: "https://unsplash.com/photos/Prb-sjOUBFs",
      user_id: 4,
    },
    {
      title: "Love the Blues",
      location: "Greece",
      description: "I love this island!",
      date: "December 25th, 2014",
      image: "https://unsplash.com/photos/WJDR8_QxVR8",
      user_id: 4,
    },
    {
      title: "Roman Empire",
      location: "Italy",
      description: "IT is HUGE!!!!!!",
      date: "January 25th, 2015",
      image: "https://unsplash.com/photos/S0hS0HfH_B8",
      user_id: 5,
    },
    {
      title: "The Shire?",
      location: "Denmark",
      description: "I think I found the shire!!!!",
      date: "Febuary 25th, 2016",
      image: "https://unsplash.com/photos/nMfmwgyZn3I",
      user_id: 5,
    },
    {
      title: "I am a Dog",
      location: "Everywhere!!!",
      description: "I'm soooo cute...Everyone LOVES me!!!!",
      date: "December 20th, 2008",
      image: "https://unsplash.com/photos/68k0-ln4Xg8",
      user_id: 6,
    },
  ]
}

