import { TestingModule, Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { ReviewService } from './review.service';
import { Review } from "./schemas/review.schema";

describe('ReviewService', () => {
    let service: ReviewService;

    const reviewRepositoryFactory = () => {
        return {
            find: jest.fn(),
        };
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewService,
                {
                    provide: getModelToken(Review.name),
                    useFactory: reviewRepositoryFactory,
                },
            ],
        }).compile()

        service = module.get<ReviewService>(ReviewService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

});