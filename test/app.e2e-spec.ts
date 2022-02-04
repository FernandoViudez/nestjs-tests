import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getMaxListeners } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/user (POST)', () => {
    it('should create a user', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          email: 'test@gmail.com',
          password: '12345',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toStrictEqual({
            email: 'test@gmail.com',
            password: expect.any(String),
          });
        });
    });
  });
});
