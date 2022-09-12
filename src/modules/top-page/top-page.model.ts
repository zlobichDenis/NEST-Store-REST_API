export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class TopPageModel {
	_id: string;
	fistCategory: TopLevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	advantages: {
		title: string;
		description: string;
	}[];
	seoText: string;
	tags: string[];
	tagsTitle: string;
	hh?: {
		count: number;
		juniorSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
}
