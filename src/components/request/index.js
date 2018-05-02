import React from 'react';
import { translate } from 'react-i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import CopyToClipboard from '../copyToClipboard/index';
import { FontIcon } from '../fontIcon';
import styles from './request.css';

class Request extends React.Component {
  render() {
    return (
      <div className={`${styles.wrapper}`}>
        <div>
          <header>
            <h2>{this.props.t('Transfer')}</h2>
            <span className={`${styles.subTitle} ${styles.transfer}`}>{this.props.t('Quickly send and request LSK token')}</span>
          </header>
          <div className={`${grid.row} ${styles.tab} `}>
            <div className={`${grid['col-xs-6']} ${styles.tabInactive}`} onClick={() => { this.props.setActiveTab('send'); }}>
              Send
            </div>
            <div className={`${grid['col-xs-6']} ${styles.tabActive}`} onClick={() => { this.props.setActiveTab('receive'); }}>
              Request
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <img className={styles.qrCode} src={`https://chart.googleapis.com/chart?cht=qr&chl=${this.props.account.address}&chs=260x260&choe=UTF-8&chld=L|2`} alt='qr code'/>
          <CopyToClipboard
            value={this.props.account.address}
            className={styles.copy}/>
          <a className={styles.emailLink}
            href={`mailto:?subject=My Lisk ID&body=Hey there, this is my Lisk ID: ${this.props.account.address}`}>
            Send request via E-mail <FontIcon value='arrow-right'/>
          </a>
        </div>
        <footer>
        </footer>
      </div>
    );
  }
}

export default translate()(Request);

