import Book from '#models/book'
import BookPolicy from '#policies/book_policy';
import { createBookValidator } from '#validators/create_book';
import { updateBookValidator } from '#validators/update_book';
import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app';

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
  async store({ auth, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createBookValidator)
      await payload.cover.move(app.makePath('uploads'), {
        name: `${cuid()}.${payload.cover.extname}`
      })

      const book = await Book.create({
        title: payload.title,
        cover: payload.cover.fileName,
        author: payload.author,
        resume: payload.resume,
        userId: auth.user!.id
      })

      await book.related('categories').attach(payload.categories)

      return response
        .status(201)
        .json({ message: "Book successfully created" })
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
  async update({ bouncer, auth, params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateBookValidator)
      const book = await Book.findOrFail(params.id)

      if (await bouncer.with(BookPolicy).denies('edit', book)) {
        return response.forbidden('Cannot edit the book')
      }

      if (payload.cover) {
        await payload.cover?.move(app.makePath('uploads'), {
          name: book.cover,
          overwrite: true
        })
      }

      const updatedBook = await book.merge({
        title: payload.title,
        cover: payload.cover?.fileName,
        author: payload.author,
        resume: payload.resume,
        userId: auth.user!.id
      }).save()

      await updatedBook.related('categories').sync(payload.categories)

      return response
        .status(204)
        .json({ message: "Book successfully updated" })
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
   * Delete record
   */
  async destroy({ bouncer, params, response }: HttpContext) {
    try {
      const book = await Book.findOrFail(params.id);

      if (await bouncer.with(BookPolicy).denies('delete', book)) {
        return response.forbidden('Cannot delete the book')
      }

      await book.related('categories').detach()
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