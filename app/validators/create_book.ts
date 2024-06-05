import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
    vine.object({
        title: vine
            .string()
            .trim(),
        cover: vine
            .file({
                size: '10mb',
                extnames: ['jpg', 'png', 'jpeg']
            }),
        categories: vine.array(vine.number()),
        author: vine
            .string()
            .trim(),
        resume: vine
            .string()
            .trim(),
    })
)