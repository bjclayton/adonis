import BookCategory from '#models/book_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    BookCategory.createMany([
      { bookId: 1, categoryId: 1 },
      { bookId: 2, categoryId: 2 },
      { bookId: 3, categoryId: 3 },
      { bookId: 4, categoryId: 4 },
      { bookId: 1, categoryId: 5 },
      { bookId: 2, categoryId: 6 },
      { bookId: 3, categoryId: 7 },
      { bookId: 4, categoryId: 8 },
      { bookId: 1, categoryId: 9 },
      { bookId: 2, categoryId: 10 }
    ])
  }
}