import { createAction, handleActions } from 'redux-actions';

import { fromJS, Map } from 'immutable';
import * as DashboardApi from 'api/dashboard';
import { pender } from 'redux-pender';

// action types
const DASHBOARD_MENU_SELECTED = 'dashboard/DASHBOARD_MENU_SELECTED';
const GET_BALANCE = 'dashboard/GET_BALANCE';
const DEPOSIT = 'dashboard/DEPOSIT';

// action creator
export const selectMenu = createAction(DASHBOARD_MENU_SELECTED);
export const getBalance = createAction(GET_BALANCE, DashboardApi.getBalance);
export const deposit = createAction(DEPOSIT, DashboardApi.deposit);

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
        balance: 0
    })
    
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

}, initialState);