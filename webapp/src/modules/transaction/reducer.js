import { txUtils } from 'decentraland-eth'
import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
  CLEAR_TRANSACTION_REQUEST
} from './actions'
import { loadingReducer } from 'modules/loading/reducer'
import { getTransactionFromAction, getTransactionHistoryFrom } from './utils'

const { TRANSACTION_STATUS } = txUtils

const INITIAL_STATE = {
  data: [],
  loading: [],
  error: null
}

export function transactionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRANSACTION_REQUEST: {
      const actionRef = action.action
      const transaction = getTransactionFromAction(actionRef)
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: [
          ...state.data,
          {
            ...transaction,
            timestamp: Date.now(),
            from: action.address,
            actionType: actionRef.type,
            status: TRANSACTION_STATUS.pending
          }
        ]
      }
    }
    case FETCH_TRANSACTION_SUCCESS: {
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: state.data.map(
          transaction =>
            action.transaction.hash === transaction.hash
              ? {
                  ...transaction,
                  ...action.transaction,
                  status: TRANSACTION_STATUS.confirmed
                }
              : transaction
        )
      }
    }
    case FETCH_TRANSACTION_FAILURE: {
      return {
        loading: loadingReducer(state.loading, action),
        error: action.error,
        data: state.data.map(
          transaction =>
            action.transaction.hash === transaction.hash
              ? {
                  ...transaction,
                  ...action.transaction,
                  status: TRANSACTION_STATUS.failed,
                  error: action.error
                }
              : transaction
        )
      }
    }
    case CLEAR_TRANSACTION_REQUEST: {
      const txToDelete = new Set(
        getTransactionHistoryFrom(state.data, action.address).map(tx => tx.hash)
      )
      return {
        ...state,
        data: state.data.filter(
          transaction => !txToDelete.has(transaction.hash)
        )
      }
    }
    default:
      return state
  }
}
