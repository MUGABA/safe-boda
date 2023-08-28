import { HttpStatus } from '@nestjs/common';
import { Server } from 'http';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { SignInDto } from '@absolute/auth/dtos/sign-in.dto';
import { SignUpDto } from '@absolute/auth/dtos/sign-up.dto';
import { AuthService } from '@absolute/auth/services/auth.service';
import { AppInstanceFactory } from '@absolute/test/instances/appInstance.factory';
import { AuthInstanceFactory } from '../instances/authInstance.factory';

describe('Auth Module End-2-End', () => {
  let app: AppInstanceFactory;
  let server: Server;
  let dataSource: DataSource;
  let authService: AuthService;

  beforeAll(async () => {
    app = await AppInstanceFactory.new();
    server = app.instance.getHttpServer();
    dataSource = app.dbSource;
    authService = app.instance.get(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await app.cleanupDB();
  });

  describe('AppModule', () => {
    describe('GET /', () => {
      it("should return 'Hello World'", () => {
        return request(app.instance.getHttpServer())
          .get('/')
          .expect(HttpStatus.OK)
          .expect('Hello World!');
      });
    });
  });

  describe('AuthModule', () => {
    describe('POST /auth/sign-up', () => {
      it('should create a new user', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        const signUpDto: SignUpDto = {
          email: 'rashid@safeboda.com',
          password: 'Rashid123',
          name: 'Muhamad Rashid',
          phoneNumber: '0705939222',
          isDriverAvailable: false,
          userType: 'Driver',
        };
        return request(server)
          .post('/auth/sign-up')
          .send(signUpDto)
          .expect(HttpStatus.CREATED);
      });
      it('should return 400 for invalid sign up fields', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        const signUpDto: SignUpDto = {
          email: 'invalid-email',
          password: 'Rashid123',
          name: 'Muhamad Rashid',
          phoneNumber: '0705939222',
          isDriverAvailable: false,
          userType: 'Driver',
        };
        return request(server)
          .post('/auth/sign-up')
          .send(signUpDto)
          .expect(HttpStatus.BAD_REQUEST);
      });
      it('should return 409 if user already exists', async () => {
        await AuthInstanceFactory.new(dataSource).create({
          email: 'user@gmail.com',
          password: 'Rashid123',
          name: 'Muhamad Rashid',
          phoneNumber: '0705939222',
          isDriverAvailable: false,
          userType: 'Driver',
        });
        const signUpDto: SignUpDto = {
          email: 'user@gmail.com',
          password: 'Rashid123',
          name: 'Muhamad Rashid',
          phoneNumber: '0705939222',
          isDriverAvailable: false,
          userType: 'Driver',
        };
        return request(server)
          .post('/auth/sign-up')
          .send(signUpDto)
          .expect(HttpStatus.BAD_REQUEST);
      });

      it('should return 400 if user type is not Admin, Driver or Customer', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1));
        const signUpDto: SignUpDto = {
          email: 'user@gmail.com',
          password: 'Rashid123',
          name: 'Muhamad Rashid',
          phoneNumber: '0705939222',
          isDriverAvailable: false,
          userType: 'Client',
        };
        return request(server)
          .post('/auth/sign-up')
          .send(signUpDto)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });

    describe('POST /auth/login', () => {
      it('should sign in the user and return access token', async () => {
        const email = 'user@gmail.com';
        const password = 'Rashid123';
        await AuthInstanceFactory.new(dataSource).create({
          email: 'user@gmail.com',
          password: 'Rashid123',
          name: 'Muhamad Rashid',
          phoneNumber: '0705939222',
          isDriverAvailable: false,
          userType: 'Driver',
        });

        const signInDto: SignInDto = {
          email,
          password,
        };

        return request(server)
          .post('/auth/login')
          .send(signInDto)
          .expect(HttpStatus.OK)
          .expect((res) => {
            expect(res.body.user).not.toHaveProperty('password');
          });
      });

      it('should return 400 for invalid sign in fields', async () => {
        const signInDto: SignInDto = {
          email: 'atest@email.com',
          password: '',
        };

        return request(server)
          .post('/auth/login')
          .send(signInDto)
          .expect(HttpStatus.BAD_REQUEST);
      });
    });
  });

  describe('PATCH /toggle-available', () => {
    let user;

    beforeEach(async () => {
      user = await AuthInstanceFactory.new(dataSource).create({
        email: 'user@gmail.com',
        password: 'Rashid123',
        name: 'Muhamad Rashid',
        phoneNumber: '0705939222',
        isDriverAvailable: false,
        userType: 'Customer',
      });
    });

    it('Customer or Admin should not access setting availability status', async () => {
      const user1 = await AuthInstanceFactory.new(dataSource).create({
        email: 'user1@gmail.com',
        password: 'Rashid123',
        name: 'Muhamad Rashid',
        phoneNumber: '0705939222',
        isDriverAvailable: false,
        userType: 'Customer',
      });

      const { accessToken } = await authService.generateAccessToken(user);

      return request(server)
        .patch('/auth/toggle-available')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return 401 if not authorized', async () => {
      return request(server)
        .patch('/auth/toggle-available')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return 200 if the user is a driver', async () => {
      const user1 = await AuthInstanceFactory.new(dataSource).create({
        email: 'user1@gmail.com',
        password: 'Rashid123',
        name: 'Muhamad Rashid',
        phoneNumber: '0705939222',
        isDriverAvailable: false,
        userType: 'Driver',
      });

      const { accessToken } = await authService.generateAccessToken(user1);
      return request(server)
        .patch('/auth/toggle-available')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.OK);
    });
  });

  // describe('UsersModule', () => {
  //   describe('GET /users/me', () => {
  //     it('should return 401 unauthorized when no access token provided', () => {
  //       return request(server).get('/users/me').expect(HttpStatus.UNAUTHORIZED);
  //     });

  //     it('should return user details when access token provided', async () => {
  //       const user = await AuthInstanceFactory.new(dataSource).create({
  //         email: 'atest@email.com',
  //         password: 'Pass#123',
  //       });

  //       const { accessToken } = await authService.generateAccessToken(user);

  //       return request(server)
  //         .get('/users/me')
  //         .set('Authorization', `Bearer ${accessToken}`)
  //         .expect(HttpStatus.OK)
  //         .expect((res) => {
  //           expect(res.body).toEqual(
  //             expect.objectContaining({
  //               id: user.id,
  //               email: user.email,
  //             }),
  //           );
  //         });
  //     });
  //   });
  // });
});
