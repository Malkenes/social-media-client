import { login } from './login.js';
import { apiPath } from '../constants.js';
import { headers } from '../headers.js';
import { save } from '../../storage/index.js';

global.fetch = jest.fn();

jest.mock('../headers.js', () => ({
  headers: jest.fn(),
}));

jest.mock('../../storage/index.js', () => ({
  save: jest.fn(),
}));

describe('login function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should store a token when provided with valid credentials', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        name: 'my_username',
        email: 'first.last@stud.noroff.no',
        avatar: 'https://img.service.com/avatar.jpg',
        accessToken: 'mockAccessToken',
      }),
    };
    global.fetch.mockResolvedValue(mockResponse);
    await login('first.last@stud.noroff.no', 'password');

    expect(fetch).toHaveBeenCalledWith(
      `${apiPath}/social/auth/login`,
      expect.objectContaining({
        method: 'post',
        body: JSON.stringify({
          email: 'first.last@stud.noroff.no',
          password: 'password',
        }),
        headers: headers(),
      }),
    );

    expect(save).toHaveBeenCalledWith('token', 'mockAccessToken');
  });
  it('should throw an error if login fails', async () => {
    const mockResponse = {
      ok: false,
      statusText: 'Unauthorized',
    };
    global.fetch.mockResolvedValue(mockResponse);
    await expect(
      login('first.last@stud.noroff.no', 'password'),
    ).rejects.toThrow('Unauthorized');

    expect(save).not.toHaveBeenCalled();
  });
});
