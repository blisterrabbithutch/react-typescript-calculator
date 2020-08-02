import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography, InputNumber, Radio } from "antd";
import "antd/dist/antd.css";
import './App.css';
import { setFirstInputValueAction, setSecondInputValueAction, setSelectedCalculationModeAction, setCalculatedResultAction } from './store';

// implement a small application on typescript which allows us to see the result 
// of calculation on two numbers. App should have two input fields and a set of buttons, 
// once two fields are filled and one button is pressed we should see the result. Each button is responsible for 
// one operation - "/", "*", "-", "+", "^" (division, multiplication, subtraction, sum, exponentiation). 
// Input numbers are integers from 0 to 1000.

const App = () => {
  const dispatch = useDispatch();
  const { Text } = Typography;

  const [firstInputValue, setFirstInputValue] = useState<number | undefined>(undefined);
  const [secondInputValue, setSecondInputValue] = useState<number | undefined>(undefined);
  const [selectedCalculationMode, setSelectedCalculationMode] = useState<keyof CalculationActionsType | undefined>(); 
  const [calculatedResult, setCalculatedResult] = useState<number | null>(null);
  const handleFirstInputValue = (value: number) => {
    setFirstInputValue(value);
    dispatch(setFirstInputValueAction(value));
  };
  const handleSecondInputValue = (value: number) => {
    setSecondInputValue(value);
    dispatch(setSecondInputValueAction(value));
  };

  const clearCalculationMode = () => {
    setSelectedCalculationMode(undefined);
    setCalculatedResult(null);
    dispatch(setSelectedCalculationModeAction(""));
    setSecondInputValue(undefined);
    setFirstInputValue(undefined);
  }

  const handleRadioSelect = (result: keyof CalculationActionsType) => {
    setSelectedCalculationMode(result);
    dispatch(setSelectedCalculationModeAction(result));
  }


  interface CalculationActionsType {
    Division: (firstValue: number, secondValue: number) => number,
    Multiplication: (firstValue: number, secondValue: number) => number,
    Subtraction: (firstValue: number, secondValue: number) => number,
    Sum: (firstValue: number, secondValue: number) => number,
    Exponentiation: (firstValue: number, secondValue: number) => number,
  }
  

  const calculationActions: CalculationActionsType = {
    Division: (firstValue: number, secondValue: number) => { 
      return firstValue / secondValue
    },
    Multiplication: (firstValue: number, secondValue: number) => { 
      return firstValue * secondValue
    },
    Subtraction: (firstValue: number, secondValue: number) => { 
      return firstValue - secondValue
    },
    Sum: (firstValue: number, secondValue: number) => { 
      return firstValue + secondValue
    },
    Exponentiation: (firstValue: number, secondValue: number) => { 
      return firstValue ** secondValue
    },
  }

  const handleResultValue = useCallback(() => {
    if (!firstInputValue || !secondInputValue || selectedCalculationMode === undefined) return;
    const calculatedValue: number = calculationActions[selectedCalculationMode](firstInputValue, secondInputValue);
    setCalculatedResult(calculatedValue);
    dispatch(setCalculatedResultAction(calculatedValue));
  }, [dispatch, firstInputValue, secondInputValue, selectedCalculationMode, calculationActions]);

  useEffect(() => {
    handleResultValue();
  }, [selectedCalculationMode, firstInputValue, secondInputValue, handleResultValue]);

  const updateOnEnter = (e: any) => {
    e.blur();
  };

  return (
    <div className="App">
        <div className="App__mobile-warning">
          <Text>No mobile version</Text>
        </div>
        <div className="App__content">
          <div className="App__inputs-section">
            <InputNumber 
            min={0}
            max={1000}
            placeholder="Type a first number from 0 to 1000" 
            onPressEnter={(e: any) => updateOnEnter(e.target)}
            onBlur={(e: any) => handleFirstInputValue(Number(e.target.value))}  
            value={firstInputValue}
            />
            <br/>
            <br />
            <InputNumber 
            min={0}
            max={1000}
            placeholder="Type a second number from 0 to 1000" 
            onPressEnter={(e: any) => updateOnEnter(e.target)}
            onBlur={(e: any) => handleSecondInputValue(Number(e.target.value))}  
            value={secondInputValue}
            />
            <br />
            <br />
          </div>
          <div className="App__buttons-section">
          <Radio.Group value={selectedCalculationMode} onChange={(evt) => handleRadioSelect(evt.target.value)}>
            {
              Object.keys(calculationActions).map((key: string, index: number) => {
                return <Radio.Button key={index} value={key}>{key}</Radio.Button>
              })
            }
          </Radio.Group>
          <Button onClick={() => clearCalculationMode()} type="text">Clear</Button>
          </div>
          <div className="App__result-section">
            { calculatedResult !== null
              ? <div className="App__result-content">
                  <Text className="App__result-title">Result is:&nbsp;</Text>
                  <Text strong className="App__result-value">{calculatedResult}</Text>
                </div>
              : ""}
          </div>
        </div>
    </div>
  );
}

export default App;
