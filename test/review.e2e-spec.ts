import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types, disconnect } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/modules/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'title',
    description: 'desctiption',
    rating: 5,
    productId,
};

describe('app', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    it('/review/create (POST)', () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201)
            .then(({ body }: request.Response) => {
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('/review/byProduct/:productId (GET)', () => {
        return request(app.getHttpServer())
            .get('/review/byProduct/' + productId)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1);
            });
    });

    it('/review/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200);
    });

    afterAll(() => {
        disconnect();
    });
});