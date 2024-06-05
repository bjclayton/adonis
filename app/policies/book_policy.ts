import User from '#models/user'
import Book from '#models/book'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class BookPolicy extends BasePolicy {
    create(): AuthorizerResponse {
        return true
    }

    edit(user: User, book: Book): AuthorizerResponse {
        return user.id === book.userId
    }

    delete(user: User, book: Book): AuthorizerResponse {
        return user.id === book.userId
    }
}