import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Book.createMany([
      {
        title: "To Kill a Mockingbird",
        cover: "link_to_cover_image_1.png",
        author: "Harper Lee",
        resume: "A novel about the serious issues of rape and racial inequality, narrated by young Scout Finch.",
        userId: 1
      },
      {
        title: "1984",
        cover: "link_to_cover_image_2.png",
        author: "George Orwell",
        resume: "A dystopian novel set in a totalitarian society ruled by Big Brother.",
        userId: 2
      },
      {
        title: "Pride and Prejudice",
        cover: "link_to_cover_image_3.png",
        author: "Jane Austen",
        resume: "A classic novel of manners that explores the issues of marriage, money, and love.",
        userId: 3
      },
      {
        title: "The Great Gatsby",
        cover: "link_to_cover_image_4.png",
        author: "F. Scott Fitzgerald",
        resume: "A story of the young and mysterious millionaire Jay Gatsby and his passion for the beautiful Daisy Buchanan.",
        userId: 4
      },
      {
        title: "Moby-Dick",
        cover: "link_to_cover_image_5.png",
        author: "Herman Melville",
        resume: "The narrative of Captain Ahab's obsessive quest to kill the giant white whale, Moby Dick.",
        userId: 1
      },
      {
        title: "War and Peace",
        cover: "link_to_cover_image_6.png",
        author: "Leo Tolstoy",
        resume: "A historical novel that chronicles the French invasion of Russia and the impact of the Napoleonic era.",
        userId: 2
      },
      {
        title: "The Catcher in the Rye",
        cover: "link_to_cover_image_7.png",
        author: "J.D. Salinger",
        resume: "The story of teenager Holden Caulfield's disillusionment with the adult world.",
        userId: 3
      },
      {
        title: "The Hobbit",
        cover: "link_to_cover_image_8.png",
        author: "J.R.R. Tolkien",
        resume: "The adventure of Bilbo Baggins, who sets off on a quest to win a share of the treasure guarded by Smaug the dragon.",
        userId: 4
      },
      {
        title: "Crime and Punishment",
        cover: "link_to_cover_image_9.png",
        author: "Fyodor Dostoevsky",
        resume: "A psychological drama exploring the moral dilemmas faced by the impoverished ex-student Raskolnikov.",
        userId: 1
      },
      {
        title: "The Brothers Karamazov",
        cover: "link_to_cover_image_10.png",
        author: "Fyodor Dostoevsky",
        resume: "A spiritual drama of moral struggles concerning faith, doubt, and reason, set in 19th-century Russia.",
        userId: 2
      }
    ])
  }
}