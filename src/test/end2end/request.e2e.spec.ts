import { HttpStatus } from '@nestjs/common';
import { Server } from 'http';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { AuthService } from '@absolute/auth/services/auth.service';
import { Requests } from '@absolute/models/request.entity';
import { RequestDto } from '@absolute/requests/dtos/request.dto';
import { RequestService } from '@absolute/requests/request.service';
import { AppInstanceFactory } from '@absolute/test/instances/appInstance.factory';
import { AuthInstanceFactory } from '../instances/authInstance.factory';
import { RequestInstanceFactory } from '../instances/requestInstance.factory';

describe('Module Module End-2-End', () => {
  let app: AppInstanceFactory;
  let server: Server;
  let dataSource: DataSource;
  let authService: AuthService;
  let requestService: RequestService;

  beforeAll(async () => {
    app = await AppInstanceFactory.new();
    server = app.instance.getHttpServer();
    dataSource = app.dbSource;
    authService = app.instance.get(AuthService);
    requestService = app.instance.get(RequestService);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await app.cleanupDB();
  });

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

  describe('POST /requests/request-ride', () => {
    let rideRequestData: RequestDto;
    let token;
    beforeEach(async () => {
      rideRequestData = {
        pickUpLocation: 'Nansana Ku Mastore',
        destinationLocation: 'Kampala Min Price',
        customer: user,
        status: 'pending',
      };

      const { accessToken } = await authService.generateAccessToken(user);
      token = accessToken;
    });

    it('It should return 200 if customer requests for a ride', async () => {
      return await request(server)
        .post('/requests/request-ride')
        .set('Authorization', `Bearer ${token}`)
        .send(rideRequestData)
        .expect(HttpStatus.CREATED);
    });
    it('should return 400 for invalid sign up fields', async () => {
      rideRequestData.destinationLocation = null;

      return await request(server)
        .post('/requests/request-ride')
        .set('Authorization', `Bearer ${token}`)
        .send(rideRequestData)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should deny access if user requesting a ride is not a customer', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      const driver = await AuthInstanceFactory.new(dataSource).create({
        email: 'user1@gmail.com',
        password: 'Rashid123',
        name: 'Muhamad Rashid',
        phoneNumber: '0705939222',
        isDriverAvailable: false,
        userType: 'Driver',
      });

      const { accessToken } = await authService.generateAccessToken(driver);

      return await request(server)
        .post('/requests/request-ride')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(rideRequestData)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return 401 id user is not logged in', async () => {
      return await request(server)
        .post('/requests/request-ride')
        .send(rideRequestData)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('Get /requests/customer-requests', () => {
    let rideRequestData: RequestDto;
    let token;
    beforeEach(async () => {
      rideRequestData = {
        pickUpLocation: 'Nansana Ku Mastore',
        destinationLocation: 'Kampala Min Price',
        customer: user,
        status: 'pending',
      };

      const user1 = await AuthInstanceFactory.new(dataSource).create({
        email: 'user1@gmail.com',
        password: 'Rashid123',
        name: 'Muhamad Rashid',
        phoneNumber: '0705939222',
        isDriverAvailable: false,
        userType: 'Driver',
      });

      const { accessToken } = await authService.generateAccessToken(user1);
      token = accessToken;
    });

    it('Should return ok for all active request', async () => {
      return request(server)
        .get('/requests/customer-requests')
        .set('Authorization', `Bearer ${token}`)
        .send(rideRequestData)
        .expect(HttpStatus.OK);
    });

    it('Should not allow access for customer users', async () => {
      const { accessToken } = await authService.generateAccessToken(user);
      return request(server)
        .get('/requests/customer-requests')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(rideRequestData)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('POST /requests/take-request/:requestId/', () => {
    let rideRequestData: RequestDto;
    let token;
    beforeEach(async () => {
      rideRequestData = {
        pickUpLocation: 'Nansana Ku Mastore',
        destinationLocation: 'Kampala Min Price',
        customer: user,
        status: 'pending',
      };

      const user1 = await AuthInstanceFactory.new(dataSource).create({
        email: 'user1@gmail.com',
        password: 'Rashid123',
        name: 'Muhamad Rashid',
        phoneNumber: '0705939222',
        isDriverAvailable: false,
        userType: 'Driver',
      });

      await RequestInstanceFactory.new(dataSource).create(rideRequestData);

      const { accessToken } = await authService.generateAccessToken(user1);
      token = accessToken;
    });

    it("Should take a request if it's still available", async () => {
      const rideRequest: Requests = await RequestInstanceFactory.new(
        dataSource,
      ).create(rideRequestData);

      return request(server)
        .post(`/requests/take-request/${rideRequest.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.CREATED);
    });

    it('should return 40o driver already has a ride on going', async () => {
      const rideRequest: Requests = await RequestInstanceFactory.new(
        dataSource,
      ).create(rideRequestData);

      await request(server)
        .post(`/requests/take-request/${rideRequest.id}`)
        .set('Authorization', `Bearer ${token}`);

      return request(server)
        .post(`/requests/take-request/${rideRequest.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PUT /requests/update-request/:requestId/:status', () => {
    let user1;
    let rideRequestData: RequestDto;
    let token;
    let res;

    beforeEach(async () => {
      user1 = await AuthInstanceFactory.new(dataSource).create({
        email: 'user1@gmail.com',
        password: 'Rashid123',
        name: 'Muhamad Rashid',
        phoneNumber: '0705939222',
        isDriverAvailable: false,
        userType: 'Driver',
      });

      rideRequestData = {
        pickUpLocation: 'Nansana Ku Mastore',
        destinationLocation: 'Kampala Min Price',
        customer: user,
        status: 'pending',
      };

      const { accessToken } = await authService.generateAccessToken(user);
      token = accessToken;
    });

    it('Customer or Admin should not access setting availability status', async () => {
      let res1 = await request(server)
        .post('/requests/request-ride')
        .set('Authorization', `Bearer ${token}`)
        .send(rideRequestData);
      console.log(res1.body.id);

      const { accessToken } = await authService.generateAccessToken(user1);

      await request(server)
        .post(`/requests/take-request/${res1.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`);

      const res = await request(server)
        .put(`/requests/update-request/${res1.body.id}/accepted`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
    });
  });
});
