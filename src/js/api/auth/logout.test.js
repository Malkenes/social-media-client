import { logout } from './logout.js';
import { remove } from '../../storage/index.js';

jest.mock('../../storage/index.js', () => ({
  remove: jest.fn(),
}));

describe('logout function', () => {
  it('should clear the token from browser storage', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
  });
});
