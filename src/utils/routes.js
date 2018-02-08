import routes from './../constants/routes';

export default [
  {
    regex: /\/main\/account-visual-demo(?:\/[^/]*)?$/,
    path: '/main/account-visual-demo/',
    params: 'dialog',
    name: 'account-visual-demo',
  }, {
    regex: /\/main\/dashboard(?:\/[^/]*)?$/,
    path: '/main/dashboard/',
    params: 'dialog',
    name: 'dashboard',
  }, {
    regex: /\/main\/transactions(?:\/[^/]*)?$/,
    path: `${routes.wallet.long}/`,
    params: 'dialog',
    name: 'transactions',
  }, {
    regex: /\/main\/voting(?:\/[^/]*)?$/,
    path: '/main/voting/',
    params: 'dialog',
    name: 'voting',
  }, {
    regex: /\/main\/sidechains(?:\/[^/]*)?$/,
    path: '/main/sidechains/',
    params: 'dialog',
    name: 'sidechains',
  }, {
    regex: /\/main\/forging(?:\/[^/]*)?$/,
    path: '/main/forging/',
    params: 'dialog',
    name: 'forging',
  }, {
    regex: /\/add-account(?:\/[^/]*)?$/,
    path: '/add-account/',
    params: 'dialog',
    name: 'add-account',
  }, {
    regex: /\/explorer\/accounts\/\d{1,21}[L|l](?:\/[^/]*)?$/,
    path: new RegExp(`${routes.account.long}/\\d{1,21}[L|l]/`),
    params: 'address',
    name: 'accounts',
  }, {
    regex: /\/explorer\/search(?:\/[^/]*)?$/,
    path: `${routes.search.long}/`,
    name: 'explorer',
  }, {
    regex: /\/explorer\/transactions\/\d+(?:\/[^/]*)?$/,
    path: new RegExp(`${routes.transaction.long}/\\d+/`),
    params: 'id',
    name: 'explorer-transaction',
  }, {
    regex: /register(\/)?$/,
    path: '/',
    params: 'dialog',
    name: 'login',
  }, {
    regex: /^\/$/,
    path: '/',
    params: 'dialog',
    name: 'login',
  }, {
    regex: /./,
    path: '/',
    params: 'notFound',
    name: 'not-found',
  },
];
