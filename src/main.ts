import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const config = new DocumentBuilder()
    .setTitle('Chat Socket')
    .setDescription('Chat Socker Rest API')
    .setVersion('1.0')
    .addSecurity('JWT', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
