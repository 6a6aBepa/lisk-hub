import React, { Fragment } from 'react';

import { FontIcon as MaterialIcon } from 'react-toolbox/lib/font_icon';
import { FontIcon } from '../fontIcon';
import styles from './menuBar.css';

const MenuBar = (props) => {
  const { t, menuStatus, settingStatus, menuToggle, settingToggle } = props;
  const menuClass = menuStatus ? styles.openMenu : '';
  return (
    <section className={`${styles.menuBar} ${menuClass}`}>
      {!menuStatus ?
        <span className={styles.menuButton}
          onClick={() => menuToggle()}>
          {t('Menu')}<MaterialIcon className={styles.icon} value='menu' />
        </span>
        : <span className={styles.menuButton}
          onClick={() => menuToggle()}>
          {t('Close')} <FontIcon className={styles.icon} value='close' />
        </span>
      }
      {menuStatus ?
        <Fragment>
          {!settingStatus ?
            <span className={`${styles.menuButton} ${styles.setting}`}
              onClick={() => settingToggle()}>
              {t('Settings')}
            </span> :
            <span className={`${styles.menuButton} ${styles.setting}`}
              onClick={() => settingToggle()}>
              <FontIcon className={`${styles.icon} ${styles.goBack}`} value='arrow-left' /> {t('Main menu')}
            </span>
          }
        </Fragment>
        : ''
      }
    </section>
  );
};

export default MenuBar;

