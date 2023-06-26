import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [disabled,setDisabled]=useState(false)
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  if(displayValue.length===20){
    setDisabled(!disabled)
    setDisplayValue("Limit Reached")
  }

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setDisabled(!disabled)
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="calculator">
      <div className="display" style={{height:'23px'}}>
        <p className="upper" style={{fontSize:'15px',color:'yellow'}}>{displayValue}</p>
        <p className="main">{displayValue}</p>
      </div>
      <div className="keypad">
        <div>
      <button className='key' onClick={clearDisplay} style={{width: '140px',background: 'rgb(172, 57, 57)'}}>AC</button>
      <div>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(7)}>7</button>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(8)}>8</button>
      </div>
      <div>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(4)}>4</button>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(5)}>5</button>
      </div>
      <div>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(1)}>1</button>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(2)}>2</button>
      </div>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(3)} style={{width: '140px'}}>0</button>
      </div>
        <div>
      <button disabled={disabled} className='key' onClick={()=>performOperation('/')} style={{background:'rgb(102, 102, 102)'}}>/</button>
      <button disabled={disabled} className='key' onClick={()=>performOperation('*')} style={{background:'rgb(102, 102, 102)'}}>X</button>
      <div>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(9)}>9</button>
      <button disabled={disabled} className='key' onClick={()=>performOperation('-')} style={{background:'rgb(102, 102, 102)'}}>-</button>
      </div>
      <div>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(6)}>6</button>
      <button disabled={disabled} className='key' onClick={()=>performOperation('+')} style={{background:'rgb(102, 102, 102)'}}>+</button>
      </div>
      <div style={{display:'flex'}}>
      <div style={{display:'flex',flexDirection:'column'}}>
      <button disabled={disabled} className='key' onClick={()=>!disabled&&inputDigit(3)}>3</button>
      <button disabled={disabled} className='key'onClick={inputDecimal} >.</button>
      </div>
      <button disabled={disabled} className='key' onClick={()=>performOperation('=')} style={{height: '114px',background:'rgb(0, 68, 102)'}}>=</button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Calculator;
