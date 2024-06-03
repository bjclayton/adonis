import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: "John Doe",
        email: "john.doe@example.com",
        password: "password123"
      },
      {
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        password: "mysecurepassword"
      },
      {
        fullName: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "alicepassword"
      },
      {
        fullName: "Bob Brown",
        email: "bob.brown@example.com",
        password: "bobbrownpass"
      }
    ])
  }
}