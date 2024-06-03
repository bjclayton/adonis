import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      { name: "Fiction" },
      { name: "Non-Fiction" },
      { name: "Science Fiction" },
      { name: "Fantasy" },
      { name: "Mystery" },
      { name: "Biography" },
      { name: "History" },
      { name: "Romance" },
      { name: "Thriller" },
      { name: "Self-Help" },
      { name: "Health" },
      { name: "Travel" },
      { name: "Children's" },
      { name: "Young Adult" },
      { name: "Poetry" },
      { name: "Cookbooks" },
      { name: "Graphic Novels" },
      { name: "Business" },
      { name: "Religion" },
      { name: "Science" }
    ])
  }
}