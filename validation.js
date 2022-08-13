import { body } from "express-validator"

export const loginValidator = [
    body('email', 'неверный формат почты').isEmail(),
    body('password','минимум 5 символов').isLength({min:5}),
];

export const registerValidator = [
    body('email', 'неверный формат почты').isEmail(),
    body('password','минимум 5 символов').isLength({min:5}),
    body('fullName','минимум 3 символа').isLength({min:3}),
    body('avatarUrl','Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidator = [
    body('title', 'Введите заголовок статьи').isLength({min:3}).isString(),
    body('text','Введите текст статьи').isLength({min:3}).isString(),
    body('tags','неверный формат тегов').optional().isString(),
    body('imageUrl','Неверная сылка на изображение').optional().isString(),
];