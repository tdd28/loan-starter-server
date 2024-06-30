import { Token } from './auth.entity';

describe('Token', () => {
  it('should be defined', () => {
    expect(new Token()).toBeDefined();
  });
});
