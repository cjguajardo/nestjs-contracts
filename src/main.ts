import { NestFactory } from '@nestjs/core';
import { ContractModule } from '@Contract/contract.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

export const AppModule = ContractModule;

async function bootstrap() {
  const app = await NestFactory.create( ContractModule );

  const config = new DocumentBuilder()
    .setTitle( 'Challenge' )
    .setDescription( 'The Challenge API description' )
    .setVersion( '1.0' )
    .addTag( 'challenge' )
    .build();

  const doc = SwaggerModule.createDocument(
    app, config
  )

  SwaggerModule.setup( 'api', app, doc );

  app.useGlobalPipes( new ValidationPipe() );

  await app.listen( 3000 );
  console.log( `Application is running on: ${await app.getUrl()}` );
}
bootstrap();
