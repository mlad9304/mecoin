import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';

// action types
const CHANGE_INPUT = 'form/CHANGE_INPUT';
const SET_INPUT_ERROR = 'form/SET_INPUT_ERROR';
const FORM_RESET = 'form/FORM_RESET';
const FORM_ERROR_RESET = 'form/FORM_ERROR_RESET';
const SET_PROFILE_FORM = 'form/SET_PROFILE_FORM';
const SET_EMAIL_FORM = 'form/SET_EMAIL_FORM';

// action creator
/*
    payload: {
        form,
        name,
        value
    }
*/
export const changeInput = createAction(CHANGE_INPUT);
export const setInputError = createAction(SET_INPUT_ERROR);
/* empty payload */
export const formReset = createAction(FORM_RESET);
export const resetError = createAction(FORM_ERROR_RESET);

export const setProfileForm = createAction(SET_PROFILE_FORM);
export const setEmailForm = createAction(SET_EMAIL_FORM);

// initial state
const initialState = Map({
    register: Map({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    }),
    additional: Map({
        firstName: '',
        lastName: '',
        email: '',
        gender: ''
    }),
    additional_o: Map({
        username: ''
    }),
    login: Map({
        username: '',
        password: ''
    }),
    chat: Map({
        message: ''
    }),
    error: Map({
        register: Map({
            firstname: false,
            lastname: false,
            username: false,
            email: false,
            password: false,
        }),
        additional: Map({
            firstName: false,
            lastName: false,
            email: false,
            gender: false
        }),
        additional_o: Map({
            username: false
        }),
        accountSetting: Map({
            currentPassword: false,
            password: false,
            confirmPassword: false,
            email: false,
            givenName: false,
            familyName: false
        }),
        channelSetting: Map({
            statusMessage: false
        })
    }),
    search: Map({
        keyword: ''
    }),

    accountSetting: {
        currentPassword: '',
        password: '',
        confirmPassword: '',
        email: '',
        givenName: '',
        familyName: ''
    },

    channelSetting: {
        statusMessage: ''
    },
    deposit: Map({
        balance: '500',
        amount: null
    }),
    walletDeposit: Map({
        gemamount: null
    }),
    withdraw: Map({
        amount: null
    }),
    profile: Map({
        firstname: '',
        lastname: '', 
        address1: '',
        address2: '',
        zipcode: '',
        city: ''
    }),
    passwordSetting: Map({
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
    }),
    emailSetting: Map({
        email: '',
        newemail: ''
    })
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, name], value);
    },
    [SET_INPUT_ERROR]: (state, action) => {
        const { form, name, error } = action.payload;
        return state.setIn(['error', form, name], error);
    },
    [FORM_ERROR_RESET]: (state, action) => {
        return state.set('error', initialState.error);
    },
    [FORM_RESET]: (state, action) => {
        return initialState;
    },

    [SET_PROFILE_FORM]: (state, action) => {

        let cur_profile = state.get('profile').toJS();
        let new_profile = action.payload;
        for(let prop in cur_profile) {
            if(new_profile[prop])
                cur_profile[prop] = new_profile[prop];
        }

        return state.set('profile', fromJS(cur_profile));
    },

    [SET_EMAIL_FORM]: (state, action) => {

        const email = action.payload;

        return state.setIn(['emailSetting', 'email'], email);
    }
       
  }, initialState); 