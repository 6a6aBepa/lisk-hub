const actionTypes = {
  storeCreated: 'STORE_CREATED',
  newBlockCreated: 'NEW_BLOCK_CREATED',
  accountUpdated: 'ACCOUNT_UPDATED',
  accountLoggedOut: 'ACCOUNT_LOGGED_OUT',
  accountLoggedIn: 'ACCOUNT_LOGGED_IN',
  accountLoading: 'ACCOUNT_LOADING',
  accountAddVotes: 'ACCOUNT_ADD_VOTES',
  accountAddVoters: 'ACCOUNT_ADD_VOTERS',
  activePeerSet: 'ACTIVE_PEER_SET',
  activePeerUpdate: 'ACTIVE_PEER_UPDATE',
  activePeerReset: 'ACTIVE_PEER_RESET',
  dialogDisplayed: 'DIALOG_DISPLAYED',
  dialogHidden: 'DIALOG_HIDDEN',
  VotePlaced: 'VOTE_PLACED',
  voteToggled: 'VOTE_TOGGLED',
  votesAdded: 'VOTES_ADDED',
  votesCleared: 'VOTES_CLEARED',
  votesUpdated: 'VOTES_UPDATED',
  voteLookupStatusCleared: 'VOTE_LOOKUP_STATUS_CLEARED',
  voteLookupStatusUpdated: 'VOTE_LOOKUP_STATUS_UPDATED',
  delegatesAdded: 'DELEGATES_ADDED',
  delegatesRetrieved: 'DELEGATES_RETRIEVED',
  delegatesRetrieving: 'DELEGATES_RETRIEVING',
  delegateRegisteredSuccess: 'DELEGATE_REGISTERED_SUCCESS',
  delegateRegisteredFailure: 'DELEGATE_REGISTERED_FAILURE',
  updateDelegate: 'UPDATE_DELEGATE',
  pendingVotesAdded: 'PENDING_VOTES_ADDED',
  toastDisplayed: 'TOAST_DISPLAYED',
  toastHidden: 'TOAST_HIDDEN',
  addDataToCurrencyGraph: 'ADD_DATA_TO_CURRENCY_GRAPH',
  addErrorToCurrencyGraph: 'ADD_ERROR_TO_CURRENCY_GRAPH',
  clearDataOfCurrencyGraph: 'CLEAR_DATA_OF_CURRENCY_GRAPH',
  loadingStarted: 'LOADING_STARTED',
  loadingFinished: 'LOADING_FINISHED',
  searchSuggestions: 'SEARCH_SUGGESTIONS',
  searchClearSuggestions: 'SEARCH_CLEAR_SUGGESTIONS',
  searchTransactions: 'SEARCH_TRANSACTIONS',
  searchMoreTransactions: 'SEARCH_MORE_TRANSACTIONS',
  searchAccount: 'SEARCH_ACCOUNT',
  searchDelegate: 'SEARCH_DELEGATE',
  searchVotes: 'SEARCH_VOTES',
  searchVoters: 'SEARCH_VOTERS',
  searchUpdateLast: 'SEARCH_UPDATE_LAST',
  sendFeedback: 'SEND_FEEDBACK',
  transactionsFailed: 'TRANSACTIONS_FAILED',
  transactionsUpdated: 'TRANSACTIONS_UPDATED',
  transactionsLoad: 'TRANSACTIONS_LOAD',
  transactionsLoadFinish: 'TRANSACTIONS_LOAD_FINISH',
  transactionsLoaded: 'TRANSACTIONS_LOADED',
  transactionsFilterSet: 'TRANSACTIONS_FILTER_SET',
  transactionsFiltered: 'TRANSACTIONS_FILTERED',
  transactionAdded: 'TRANSACTION_ADDED',
  transactionFailed: 'TRANSACTION_FAILED',
  transactionAddDelegateName: 'TRANSACTION_ADD_DELEGATE_NAME',
  transactionCleared: 'TRANSACTION_CLEARED',
  transactionLoadRequested: 'TRANSACTION_LOAD_REQUESTED',
  transactionLoaded: 'TRANSACTION_LOADED',
  transactionLoadFailed: 'TRANSACTION_LOAD_FAILED',
  passphraseUsed: 'PASSPHRASE_USED',
  followedAccountsRetrieved: 'FOLLOWED_ACCOUNTS_RETRIEVED',
  followedAccountAdded: 'FOLLOWED_ACCOUNT_ADDED',
  followedAccountUpdated: 'FOLLOWED_ACCOUNT_UPDATED',
  followedAccountRemoved: 'FOLLOWED_ACCOUNTS_REMOVED',
  accountsRetrieved: 'ACCOUNTS_RETRIEVED',
  accountSaved: 'ACCOUNT_SAVED',
  activeAccountSaved: 'ACTIVE_ACCOUNT_SAVED',
  accountRemoved: 'ACCOUNT_REMOVED',
  accountSwitched: 'ACCOUNT_SWITCHED',
  removePassphrase: 'REMOVE_PASSPHRASE',
  settingsUpdated: 'SETTINGS_UPDATED',
  settingsReset: 'SETTINGS_RESET',
  removeSavedAccountPassphrase: 'REMOVE_SAVED_ACCOUNT_PASSPHRASE',
  switchChannel: 'SWITCH_CHANNEL',
  addFilter: 'ADD_FILTER',
};

export default actionTypes;
