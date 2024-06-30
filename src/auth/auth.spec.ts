import { Token } from './auth';

describe('Token', () => {
  it('should be defined', () => {
    expect(new Token()).toBeDefined();
  });
});
