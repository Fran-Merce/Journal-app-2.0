import 'whatwg-fetch'; //
import 'setimmediate';

require('dotenv').config({
  path: '.env.test',
});

jest.mock('./src/helpers/getEnviroments', () => ({
  getEnvironments: () => ({ ...process.env }),
}));
