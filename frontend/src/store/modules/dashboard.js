import { createAction, handleActions } from 'redux-actions';

import { fromJS, Map } from 'immutable';
import * as DashboardApi from 'api/dashboard';
import { pender } from 'redux-pender';

// action types
const DASHBOARD_MENU_SELECTED = 'dashboard/DASHBOARD_MENU_SELECTED';
const GET_BALANCE = 'dashboard/GET_BALANCE';
const DEPOSIT = 'dashboard/DEPOSIT';
const GET_DEPOSIT_HISTORY = 'dashboard/GET_DEPOSIT_HISTORY';
const WITHDRAW = 'dashboard/WITHDRAW';
const GET_WITHDRAW_HISTORY = 'dashboard/GET_WITHDRAW_HISTORY';
const GET_TRANSACTION_HISTORY = 'dashboard/GET_TRANSACTION_HISTORY';
const GET_STATISTICS_INFO = 'dashboard/GET_STATISTICS_INFO';

// action creator
export const selectMenu = createAction(DASHBOARD_MENU_SELECTED);
export const getBalance = createAction(GET_BALANCE, DashboardApi.getBalance);
export const deposit = createAction(DEPOSIT, DashboardApi.deposit);
export const getDepositHistory = createAction(GET_DEPOSIT_HISTORY, DashboardApi.getDepositHistory);
export const withdraw = createAction(WITHDRAW, DashboardApi.withdraw);
export const getWithdrawHistory = createAction(GET_WITHDRAW_HISTORY, DashboardApi.getWithdrawHistory);
export const getTransactionHistory = createAction(GET_TRANSACTION_HISTORY, DashboardApi.getTransactionHistory);
export const getStatisticsInfo = createAction(GET_STATISTICS_INFO, DashboardApi.getStatisticsInfo)

// initial state
const initialState = fromJS({
    dashboardLeftBar: {
        dashboard_menu_items: [
            {
                id: '1',
                image: 'my_profile.png',
                image_active: 'my_profile_active.png',
                url: '/dashboard/profile',
                title: 'My Profile'
            },
            {
                id: '2',
                image: 'my_wallet.png',
                image_active: 'my_wallet_active.png',
                url: '/dashboard/wallet',
                title: 'My Wallet'
            },
            {
                id: '3',
                image: 'deposit_fund.png',
                image_active: 'deposit_fund_active.png',
                url: '/dashboard/deposit',
                title: 'Deposit Fund'
            },
            {
                id: '4',
                image: 'withdraw_fund.png',
                image_active: 'withdraw_fund_active.png',
                url: '/dashboard/withdraw',
                title: 'Withdraw Fund'
            },
            {
                id: '5',
                image: 'transaction_report.png',
                image_active: 'transaction_report_active.png',
                url: '/dashboard/report',
                title: 'Transaction Report'
            },
            {
                id: '6',
                image: 'support_ticket.png',
                image_active: 'support_ticket_active.png',
                url: '/dashboard/ticket',
                title: 'Support Ticket'
                },
            {
                id: '7',
                image: 'affiliates.png',
                image_active: 'affiliates_active.png',
                url: '/dashboard/affiliate',
                title: 'Affiliates'
            },
            {
                id: '8',
                image: 'settings.png',
                image_active: 'settings_active.png',
                url: '/dashboard/settings',
                title: 'Settings'
            }
        ],
        active_menu_id: 1
    },

    transaction: Map({
        balance: {
            balanceGem: 0,
            balanceEth: 0
        },
        depositHistory: [],
        withdrawHistory: [],
        transactionHistory: [],
    }),

    statisticsInfo: {
      totalSpent: 0,
      gameWon: 0,
      totalEarned: 0,
    }
    
});

// reducer
export default handleActions({
  [DASHBOARD_MENU_SELECTED]: (state, action) => {
    return state.setIn(['dashboardLeftBar', 'active_menu_id'], action.payload);
  },
  ...pender({
    type: GET_BALANCE,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { balance } = result;
      if( balance ){
        return state.setIn(['transaction', 'balance'], balance);
      }
    },
    onFailure: (state, action) => {
      
    }
  }),
  ...pender({
    type: DEPOSIT,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { balance } = result;
      if( balance ){
        return state.setIn(['transaction', 'balance'], balance);
      }
    },
    onFailure: (state, action) => {
      
    }
  }),
  ...pender({
    type: GET_DEPOSIT_HISTORY,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { depositHistory } = result;
      if( depositHistory ){
        return state.setIn(['transaction', 'depositHistory'], depositHistory);
      }
    },
    onFailure: (state, action) => {
      
    }
  }),

  ...pender({
    type: WITHDRAW,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { balance } = result;
      if( balance ){
        return state.setIn(['transaction', 'balance'], balance);
      }
    },
    onFailure: (state, action) => {
      
    }
  }),
  ...pender({
    type: GET_WITHDRAW_HISTORY,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { withdrawHistory } = result;
      if( withdrawHistory ){
        return state.setIn(['transaction', 'withdrawHistory'], withdrawHistory);
      }
    },
    onFailure: (state, action) => {
      
    }
  }),

  ...pender({
    type: GET_TRANSACTION_HISTORY,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { transactionHistory } = result;
      if( transactionHistory ){
        return state.setIn(['transaction', 'transactionHistory'], transactionHistory);
      }
    },
    onFailure: (state, action) => {
      
    }
  }),

  ...pender({
    type: GET_STATISTICS_INFO,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { statisticsInfo } = result;
      if( statisticsInfo ){
        return state.set('statisticsInfo', statisticsInfo);
      }
    },
    onFailure: (state, action) => {
      
    }
  }),

}, initialState);