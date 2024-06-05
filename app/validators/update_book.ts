import vine from '@vinejs/vine'

export const updateBookValidator = vine.compile(
    vine.object({
        title: vine
            .string()
            .trim(),
        cover: vine
            .file({
                size: '10mb',
                extnames: ['jpg', 'png', 'jpeg']
            })
            .nullable(),
        categories: vine.array(vine.number()),
        author: vine
            .string()
            .trim(),
        resume: vine
            .string()
            .trim(),
    })
)