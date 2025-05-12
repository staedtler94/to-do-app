import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/app';

describe('Integration Tests for App', () => {
    it('should return 200 for the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.status).to.equal(200);
    });

    it('should return a list of items', async () => {
        const response = await request(app).get('/items');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    // Add more integration tests as needed
});