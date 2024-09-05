const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API для аренды транспорта, запчастей и блога',
      version: process.env.VERSION,
      description: 'Тестовое задание (CRUD операции) node js mysql \ntg: https://t.me/happyskelet',
    },
    servers: [
      {
        url: process.env.URL,
      },
    ],
    // Описание моделек request/response
    components: {
        schemas: {
          Transport: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'ID транспорта',
              },
              name: {
                type: 'string',
                description: 'Название транспорта',
              },
              description: {
                type: 'string',
                description: 'Описание транспорта',
              },
              price: {
                type: 'number',
                description: 'Цена транспорта',
              },
              image: {
                type: 'string',
                description: 'URL изображения',
              },
              active: {
                type: 'boolean',
                description: 'Активен ли транспорт',
              },
            },
          },
          Part: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'ID запчасти',
              },
              name: {
                type: 'string',
                description: 'Название запчасти',
              },
              description: {
                type: 'string',
                description: 'Описание запчасти',
              },
              price: {
                type: 'number',
                description: 'Цена запчасти',
              },
              image: {
                type: 'string',
                description: 'URL изображения',
              },
            },
          },
          Category: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'ID категории',
              },
              name: {
                type: 'string',
                description: 'Название категории',
              },
              description: {
                type: 'string',
                description: 'Описание категории',
              },
            },
          },
          Article: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'ID статьи',
              },
              title: {
                type: 'string',
                description: 'Заголовок статьи',
              },
              description: {
                type: 'string',
                description: 'Контент статьи',
              },
              category_id: {
                type: 'int',
                description: 'Категория статьи',
              },
              category_name: {
                type: 'string',
                description: 'Категория',
              },
              image: {
                type: 'string',
                description: 'Картинка статьи',
              },
              date: {
                type: 'string',
                description: 'Дата публикации статьи',
              },
            },
          },
        },
      },
      
  },
  apis: ['./routes/*.js'], // Пути к файлам с комментариями для Swagger
  
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
