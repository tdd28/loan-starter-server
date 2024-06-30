import { SignUpDto } from './auth.dto';

describe('SignUpDto', () => {
  it('should be defined', () => {
    expect(new SignUpDto()).toBeDefined();
  });
});
