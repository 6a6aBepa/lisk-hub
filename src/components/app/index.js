import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoutes from '../privateRoute';
import Dashboard from '../dashboard';
import Sidechains from '../sidechains';
import Header from '../header';
import Login from '../login';
import Register from '../register';
import Search from '../search';
import SearchResult from '../search/searchResult';
import TransactionDashboard from '../transactionDashboard';
import AccountTransactions from '../accountTransactions';
import Voting from '../voting';
import Forging from '../forging';
import SingleTransaction from './../singleTransaction';
import styles from './app.css';
import Dialog from '../dialog';
import Toaster from '../toaster';
import MainMenu from '../mainMenu';
import LoadingBar from '../loadingBar';
import NotFound from '../notFound';
import OfflineWrapper from '../offlineWrapper';
import offlineStyle from '../offlineWrapper/offlineWrapper.css';
import AccountVisualDemo from '../accountVisual/demo';
import routes from '../../constants/routes';

class App extends React.Component {
  markAsLoaded() {
    this.main.classList.add(styles.loaded, 'appLoaded');
  }

  render() {
    return (
      <OfflineWrapper>
        <main className={`${styles.bodyWrapper}`} ref={(el) => { this.main = el; }}>
          <MainMenu />
          <section>
            <div className={styles.mainBox}>
              <Header />
              <Switch>
                <PrivateRoutes path='/main' render={ ({ match }) => (
                  <main className={offlineStyle.disableWhenOffline}>
                    <Switch>
                      <Route path={`${match.url}/account-visual-demo/:dialog?`} component={AccountVisualDemo} />
                      <Route path={`${match.url}/dashboard/:dialog?`} component={Dashboard} />
                      <Route path={`${match.url}${routes.wallet.short}/:dialog?`} component={TransactionDashboard} />
                      <Route path={`${match.url}/voting/:dialog?`} component={Voting} />
                      <Route path={`${match.url}/sidechains/:dialog?`} component={Sidechains} />
                      <Route path={`${match.url}/forging/:dialog?`} component={Forging} />
                      <Route path='*' component={NotFound} />
                    </Switch>
                  </main>
                )} />
                <Route path='/explorer' render={ ({ match }) => (
                  <main>
                    <Route path={`${match.url}${routes.search.short}/:dialog?`} component={Search} />
                    <Route path={`${match.url}${routes.searchResult.short}/:query?`} component={SearchResult} />
                    <Route path={`${match.url}${routes.account.short}/:address?`} component={AccountTransactions} />
                    <Route path={`${match.url}${routes.transaction.short}/:id`} component={SingleTransaction} />
                  </main>
                )} />
                <Route path={`${routes.register.url}:dialog?`} component={Register} />
                <Route path={`${routes.addAccount.url}:dialog?`} component={Login} />
                <Route exact path={routes.login.url} component={Login} />
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
            <Dialog />
            <Toaster />
            <LoadingBar markAsLoaded={this.markAsLoaded.bind(this)} />
          </section>
        </main>
      </OfflineWrapper>
    );
  }
}

export default App;
