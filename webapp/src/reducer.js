import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { addressReducer as address } from 'modules/address/reducer'
import { districtsReducer as districts } from 'modules/districts/reducer'
import { parcelsReducer as parcels } from 'modules/parcels/reducer'
import { publicationReducer as publication } from 'modules/publication/reducer'
import { transactionReducer as transaction } from 'modules/transaction/reducer'
import { transferReducer as transfer } from 'modules/transfer/reducer'
import { uiReducer as ui } from 'modules/ui/reducer'
import { walletReducer as wallet } from 'modules/wallet/reducer'
import { analyticsReduceer as analytics } from 'modules/analytics/reducer'
import { storageReducer } from 'modules/storage/reducer'

export const rootReducer = storageReducer(
  combineReducers({
    address,
    districts,
    parcels,
    publication,
    transaction,
    transfer,
    ui,
    wallet,
    router,
    analytics
  })
)
