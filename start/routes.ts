/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'
const AuthController = () => import('#controllers/auth_controller')
const BooksController = () => import('#controllers/books_controller')
const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router
  .group(() => {
    router
      .group(() => {
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
      })
      .prefix('auth')

    router
      .resource('books', BooksController)
      .use(
        ['store', 'update', 'destroy'],
        middleware.auth()
      )

    router.get('/uploads/*', ({ request, response }) => {
      const filePath = request.param('*').join(sep)
      const normalizedPath = normalize(filePath)

      if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
        return response.badRequest('Malformed path')
      }

      const absolutePath = app.makePath('uploads', normalizedPath)
      return response.download(absolutePath)
    })
  })
  .prefix('api')
