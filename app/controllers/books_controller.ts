import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const books = await Book
        .query()
        .preload('categories')
        .preload('user', (user) => user.select('fullName'));
      return response
        .status(200)
        .json({ data: books })
    } catch (error) {
      return response
        .status(500)
        .json({
          message: "Something went wrong.",
          error: error
        });
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const id = params.id;
      const book = await Book.find(id);
      return response
        .status(200)
        .json({ data: book })
    } catch (error) {
      return response
        .status(500)
        .json({
          message: "Something went wrong.",
          error: error
        });
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const id = params.id;
      const book = await Book.findOrFail(id);
      await book.delete();

      return response
        .status(200)
        .json({ message: "Book successfully deleted" })
    } catch (error) {
      return response
        .status(500)
        .json({
          message: "Something went wrong.",
          error: error
        });
    }
  }
}