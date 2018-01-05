import i18next from 'i18next';
import { getAccount, extractAddress, extractPublicKey } from '../../utils/api/account';
import { getDelegate } from '../../utils/api/delegate';
import { accountLoggedIn } from '../../actions/account';
import actionTypes from '../../constants/actions';
import accountConfig from '../../constants/account';
import { errorToastDisplayed } from '../../actions/toaster';

const { lockDuration } = accountConfig;
const loginMiddleware = store => next => (action) => {
  if (action.type !== actionTypes.activePeerSet) {
    return next(action);
  }

  next(Object.assign({}, action, { data: action.data.activePeer }));

  const { passphrase } = action.data;
  const publicKey = passphrase ? extractPublicKey(passphrase) : action.data.publicKey;
  const address = extractAddress(passphrase);
  const accountBasics = {
    passphrase,
    publicKey,
    address,
  };
  const { activePeer } = action.data;

  // redirect to main/transactions
  return getAccount(activePeer, address).then((accountData) => {
    const duration = passphrase ? Date.now() + lockDuration : 0;
    return getDelegate(activePeer, { publicKey })
      .then((delegateData) => {
        store.dispatch(accountLoggedIn({
          ...accountData,
          ...accountBasics,
          ...{ delegate: delegateData.delegate, isDelegate: true, expireTime: duration },
        }));
      }).catch(() => {
        store.dispatch(accountLoggedIn({
          ...accountData,
          ...accountBasics,
          ...{ delegate: {}, isDelegate: false, expireTime: duration },
        }));
      });
  }).catch(() => store.dispatch(errorToastDisplayed({ label: i18next.t('Unable to connect to the node') })));
};

export default loginMiddleware;
