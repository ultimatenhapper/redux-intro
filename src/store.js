import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
};
const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        loanPurpose: "",
        balance: state.balance - state.loan,
        loan: 0,
      };
    default:
      return state;
  }
};

function customerReducer(state=initialStateCustomer, action) {
  switch(action.type) {
    case 'customer/createCustomer':
      return {...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt}
    case 'customer/updateName':
      return {...state, fullName: action.payload}
    default: 
      return state;
  }
}

const rootReducer = combineReducers({ account: accountReducer, customer: customerReducer})
const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });

// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(requestLoan(500, "Bet on basketball"));
console.log(store.getState());

store.dispatch(payLoan());

console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {type: "customer/updateName", payload: fullName}
}

store.dispatch(createCustomer('Javi', '232552223'))
store.dispatch(updateName('Javier'))
console.log(store.getState())