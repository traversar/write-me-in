'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      r({userId: 1, genreId: 1, title: 'GOT: Alt Ending', synopsis: `We do it together," Daenerys urged. "We break the wheel together."

      Jon had come to speak with her, to hear Daenerys defend her actions with her own words, but all she did was spout Targeryen madness. Conquer the entire world, a never-ending war, and herself above all others as the ultimate judge of right and wrong, willing to murder thousands.

      He remembered the words of the man who would always be his father. The most honorable man he'd ever known. "The man who passes the sen [...]`, rating: 28, read: false, confirmedPostLength: 17}),
      r({userId: 1, genreId: 5, title: 'A Tale of Some Cities', synopsis: `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: 46, read: false, confirmedPostLength: 9}),
      r({userId: 4, genreId: 7, title: 'Bobenstein', synopsis:  `I am by birth a Genevese, and my family is one of the most distinguished of that republic. My ancestors had been for many years counsellors and syndics, and my father had filled several public situations with honour and reputation. He was respected by all who knew him for his integrity and indefatigable attention to public business. He passed his younger days perpetually occupied by the affairs of his country; a variety of circumstances had prevented his marrying early, nor was it until the decline of life that he became a husband and the father of a family. `, rating: 72, read: false, confirmedPostLength: 19}),
      r({userId: 2, genreId: 3, title: 'Plant People', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: -15, read: false, confirmedPostLength: 6}),
      r({userId: 6, genreId: 2, title: 'Alien Musk', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: 26, read: false, confirmedPostLength: 5}),
      r({userId: 5, genreId: 6, title: 'Once and Unremembered', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: 10, read: false, confirmedPostLength: 5}),
      r({userId: 2, genreId: 4, title: 'Redemption and Other Chores', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: -5, read: false, confirmedPostLength: 5}),
      r({userId: 4, genreId: 2, title: 'Fatal', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: 120, read: false, confirmedPostLength: 5}),
      r({userId: 3, genreId: 5, title: 'Yeah-no-Yes!', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: 59, read: false, confirmedPostLength: 5}),
      r({userId: 3, genreId: 7, title: 'Silent Room, Thunderous Night', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: 5, read: false, confirmedPostLength: 5}),
      r({userId: 2, genreId: 7, title: 'The Lodger', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: -12, read: false, confirmedPostLength: 5}),
      r({userId: 5, genreId: 4, title: 'Ceremony Attendance', synopsis:  `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way— in short, the period was so far like the present period, that some of its no [...]`, rating: 62, read: false, confirmedPostLength: 5}),
      r({userId: 1, genreId: 5, title: 'The Wall', synopsis: `We went into the back, around the gate, where the door was always opened, and people like ourselves tended to aggregate. As we cleared the ancient stone wall I looked at the place where, as a seven year-old, trying to balance along the edge, I fell from my lofty notions and came to understand pain and defeat on the rocky mound below. [...]`, rating: 12, read: true, confirmedPostLength: 1})
    ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Stories', null, {});
  }
};
