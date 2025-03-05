'use strict';

const { Op } = require('sequelize');
const { Movie } = require('../models')

const movies = [
  {
    title: "Adventure Time",
    description: "A 12-year-old boy and his best friend, wise 28-year-old dog with magical powers, go on a series of surreal adventures with each other.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/at.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/at2.mp4"
  },
  {
    title: "Thor: Ragnarok",
    description: "Thor is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/av.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/av.mp4"
  },
  {
    title: "Black Mirror",
    description: "After failing to impress the judges on a singing competition show, a woman must either perform degrading acts or return to a slave-like existence.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/bm.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/bm.mp4"
  },
  {
    title: "Eight Mile",
    description: "A young rapper, struggling with every aspect of his life, wants to make it big but his friends and foes make this odyssey of rap harder than it may seem.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/em.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/em.mp4"
  },
  {
    title: "Friends",
    description: "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/friends.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/friends.mp4"
  },
  {
    title: "Grey\'s Anatomy",
    description: "A drama centered on the personal and professional lives of five surgical interns and their supervisors.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/ga.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/ga.mp4"
  },
  {
    title: "How the Grinch Stole Christmas",
    description: "On the outskirts of Whoville, there lives a green, revenge-seeking Grinch who plans on ruining the Christmas holiday for all of the citizens of the town.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/grinch.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/grinch.mp4"
  },
  {
    title: "The Haunting of Hill House",
    description: "Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/hh.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/hh.mp4"
  },
  {
    title: "How I Met Your Mother",
    description: "A father recounts to his children, through a series of flashbacks, the journey he and his four best friends took leading up to him meeting their mother.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/himym.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/himym.mp4"
  },
  {
    title: "I Love You, Man",
    description: "Friendless Peter Klaven goes on a series of man-dates to find a Best Man for his wedding. But, when his insta-bond with his new B.F.F. puts a strain on his relationship with his fiancée, can the trio learn to live happily ever after?",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/ilym.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/ilym.mp4"
  },
  {
    title: "Nacho Libre",
    description: "Berated all his life by those around him, a monk follows his dream and dons a mask to moonlight as a Luchador (Mexican wrestler).",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/nacho.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/nacho.mp4"
  },
  {
    title: "The Office",
    description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/office.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/office.mp4"
  },
  {
    title: "The Comeback",
    description: "Once powerhouses in showbiz, this elderly couple wants to get back in the game.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/old.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/commercial.mp4"
  },
  {
    title: "Shrek",
    description: "After his swamp is filled with magical creatures, Shrek agrees to rescue Princess Fiona for a villainous lord in order to get his land back.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/shrek.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/shrek.mp4"
  },
  {
    title: "Scary Movie",
    description: "A year after disposing of the body of a man they accidentally killed, a group of dumb teenagers are stalked by a bumbling serial killer.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/sm.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/sm.mp4"
  },
  {
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying forces in order to get him back.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/st.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/vids/ss.mp4"
  },
  {
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.",
    thumbnail: "https://s3-us-west-1.amazonaws.com/chillflix-prod/tn/got.png",
    video: "https://s3-us-west-1.amazonaws.com/chillflix-prod/got.mp4"
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    // return queryInterface.bulkInsert('Movies', [{}], {});
    try {
      await Movie.bulkCreate(movies, { validate: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Movies', { [Op.or]: movies })
  }
};
