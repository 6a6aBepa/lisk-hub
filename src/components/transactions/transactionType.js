import React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './transactions.css';
import routes from './../../constants/routes';

const TransactionType = (props) => {
  const t = props.t;
  let type;
  switch (props.type) {
    case 1:
      type = t('Second Signature Creation');
      break;
    case 2:
      type = t('Delegate Registration');
      break;
    case 3:
      type = t('Vote', { context: 'noun' });
      break;
    case 4:
      type = t('Multisignature Creation');
      break;
    case 5:
      type = t('Blockchain Application Registration');
      break;
    case 6:
      type = t('Send Lisk to Blockchain Application');
      break;
    case 7:
      type = t('Send Lisk from Blockchain Application');
      break;
    default:
      type = false;
      break;
  }
  const address = props.address !== props.senderId ? props.senderId : props.recipientId;
  const template = type ?
    <span className={styles.smallButton}>{type}</span> :
    <Link className={`${styles.clickable} ${styles.ordinaryText}`} to={`${routes.account.long}/${address}`}>
      {address}
    </Link>;
  return template;
};

export default translate()(TransactionType);
