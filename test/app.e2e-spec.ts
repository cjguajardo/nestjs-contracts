import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/main';

describe( 'AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach( async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule( {
      imports: [AppModule],
    } ).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  } );

  it( '/ (GET)', () => {
    return request( app.getHttpServer() )
      .get( '/' )
      .expect( 404 )
  } );

  it( '/contractList (GET) empty params', () => {
    return request( app.getHttpServer() )
      .get( '/contractList' )
      .expect( 400 )
      .expect( res => {
        expect( res.body.message ).toBe( 'accountNumber is required' );
      } )
  } )

  it( '/contractList (GET) with accountNumber', () => {
    return request( app.getHttpServer() )
      .get( '/contractList?accountNumber=00-0233-443' )
      .expect( 200 )
      .expect( res => {
        expect( res.body ).toBeInstanceOf( Array );
        expect( res.body.length ).toBe( 1 );
      } )
  } )

  it( '/contractList (GET) with accountNumber and data range', () => {
    return request( app.getHttpServer() )
      .get( '/contractList?accountNumber=00-0547-443&startDate=2024-08-01&endDate=2024-08-07' )
      .expect( 200 )
      .expect( res => {
        expect( res.body ).toBeInstanceOf( Array );
        expect( res.body.length ).toBe( 1 );
      } )
  } )

  it( '/contract (POST) create contract', () => {
    return request( app.getHttpServer() )
      .post( '/contract' )
      .send( {
        clientName: 'John Doe',
        email: '',
        initialDate: '2024-08-01',
        accountNumber: '00-0547-443',
        amount: 1000,
        currency: 'USD'
      } )
      .expect( res => {
        expect( res.body.statusCode ).toBe( 400 );
        expect( res.body.message ).toBeInstanceOf( Array );
      } )
  } )
} );
