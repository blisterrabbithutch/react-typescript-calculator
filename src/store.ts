import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Инициализация Store
type InitialStateType = {
    firstInputValue: number | null,
    secondInputValue: number | null,
    selectedCalculationMode: "string" | null,
    calculatedResult: number | null,
  }

const initialState: InitialStateType = {
  firstInputValue: null,
  secondInputValue: null,
  selectedCalculationMode: null,
  calculatedResult: null,
};

export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk));
};

// Инициализация хранилища
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'setFirstInputValueAction' : {
        return {
          ...state,
          firstInputValue: action.payload.firstInputValue,
        }
      }

      case 'setSecondInputValueAction' : {
        return {
          ...state,
          secondInputValue: action.payload.secondInputValue,
        }
      }

      case 'setSelectedCalculationModeAction' : {
        return {
          ...state,
          selectedCalculationMode: action.payload.selectedCalculationMode,
        }
      }

      case 'setCalculatedResultAction' : {
        return {
          ...state,
          calculatedResult: action.payload.calculatedResult,
        }
      }


      default : {
        return state;
      }
    }
};


// ACTIONS
export const setFirstInputValueAction = (value: number) => ({
  type: 'setFirstInputValueAction',
  payload: {
    firstInputValue: value,
  }
});

export const setSecondInputValueAction = (value: number) => ({
    type: 'setSecondInputValueAction',
    payload: {
      secondInputValue: value,
    }
});

export const setSelectedCalculationModeAction = (value: string) => ({
    type: 'setSelectedCalculationModeAction',
    payload: {
        selectedCalculationMode: value,
    }
});

export const setCalculatedResultAction = (value: number | null) => ({
    type: 'setCalculatedResultAction',
    payload: {
        calculatedResult: value,
    }
});