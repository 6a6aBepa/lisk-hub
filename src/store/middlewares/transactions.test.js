import { expect } from 'chai';
import { spy, stub, mock } from 'sinon';
import * as accountApi from '../../utils/api/account';
import { transactionsFailed, transactionLoaded } from '../../actions/transactions';
import middleware from './transactions';
import actionTypes from '../../constants/actions';

describe('transaction middleware', () => {
  let store;
  let next;
  let state;
  let accountApiMock;
  const mockTransaction = {
    username: 'test',
    amount: 1e8,
    recipientId: '16313739661670634666L',
  };

  beforeEach(() => {
    store = stub();
    state = {
      peers: {
        data: {},
      },
      account: {
        address: '8096217735672704724L',
      },
      transactions: {
        pending: [],
      },
    };
    store.getState = () => (state);
    store.dispatch = spy();
    next = spy();
    accountApiMock = mock(accountApi);
  });

  afterEach(() => {
    accountApiMock.restore();
  });

  it('should passes the action to next middleware', () => {
    const givenAction = {
      type: 'TEST_ACTION',
    };

    middleware(store)(next)(givenAction);
    expect(next).to.have.been.calledWith(givenAction);
  });

  it('should do nothing if state.transactions.pending.length === 0 and action.type is transactionsUpdated', () => {
    const givenAction = {
      type: actionTypes.transactionsUpdated,
      data: [mockTransaction],
    };

    middleware(store)(next)(givenAction);
    expect(store.dispatch).to.not.have.been.calledWith();
  });

  it('should load one transaction action.type is transactionLoadRequested', () => {
    accountApiMock.expects('transaction').returnsPromise().resolves(mockTransaction);

    const givenAction = {
      type: actionTypes.transactionLoadRequested,
      data: { id: '1345' },
    };

    middleware(store)(next)(givenAction);
    expect(store.dispatch).to.have.been.calledWith(transactionLoaded({ ...mockTransaction }));
  });

  it('should call unconfirmedTransactions and then dispatch transactionsFailed if state.transactions.pending.length > 0 and action.type is transactionsUpdated', () => {
    const transactions = [
      mockTransaction,
    ];
    accountApiMock.expects('unconfirmedTransactions')
      .withExactArgs(state.peers.data, state.account.address)
      .returnsPromise().resolves({ transactions });
    store.getState = () => ({
      ...state,
      transactions: {
        pending: transactions,
      },
    });
    const givenAction = {
      type: actionTypes.transactionsUpdated,
      data: [],
    };

    middleware(store)(next)(givenAction);
    const expectedAction = transactionsFailed({ failed: [] });
    expect(store.dispatch).to.have.been.calledWith(expectedAction);
  });
});

