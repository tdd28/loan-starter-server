import { HttpException } from './common';

describe('HttpException', () => {
  it('should be defined', () => {
    expect(new HttpException()).toBeDefined();
  });
});
