import './App.css';
import CurrencyChart from './CurrencyChart/CurrencyChart';
// import ChartTest from './ChartTest/ChartTest';
import ComparisonCurrencySelector from './ComparisonCurrencySelector/ComparisonCurrencySelector';
import ComparisonCurrencyDisplay from './ComparisonCurrencyDisplay/ComparisonCurrencyDisplay';
import DateSelector from './DateSelector/DateSelector';
import { useEffect, useState, createContext } from 'react';
import { getExchangeRatesBackFromDate } from './fetcher.js';
import BaseCurrencySelector from './BaseCurrencySelector/BaseCurrencySelector';
const currencies = require('./currencies.json');
const currNames = currencies.currencyNames;
const currAbbreviations = currencies.currencyAbbreviations
  .filter(abbr => currNames[abbr] !== undefined);
const currContextData = {
  currNames: currencies.currencyNames,
  currAbbreviations: currAbbreviations
};

export const CurrContext = createContext();
const minDate = '2021-01-01';


function App() {
  const [baseCurr, setBaseCurr] = useState('usd');
  const [compCurrs, setCompCurrs] = useState(['cad']);
  const [compCurrRates, setCompCurrRates] = useState([]);
  const [dates, setDates] = useState([]);


  useEffect(()=> {

  }, [])


  useEffect(() => {
    const get = async () => {
      const fetchedCurr = baseCurr;
      const rates = await getExchangeRatesBackFromDate(baseCurr, compCurrs, dates);
      setCompCurrRates(rates);
      console.log('fetched for ' + fetchedCurr);
    };
    get();
  }, [compCurrs, dates, baseCurr]);
  
  function addCompCurr(compCurr) {
    if(compCurrs.includes(compCurr)) return;
    const newCompCurrs = [...compCurrs, compCurr];
    setCompCurrs(newCompCurrs);
  }
  function removeCompCurr(compCurrToRemove) {
    if(compCurrs.includes(compCurrToRemove) === false) return;
    const newCompCurrs = compCurrs.filter(compCurr => compCurr !== compCurrToRemove);
    setCompCurrs(newCompCurrs);
  }


  return (
    <CurrContext.Provider value={currContextData}>
      <div className="App">
        <div className='chart-card'>
          <CurrencyChart baseCurrency={baseCurr}
            dates={dates} 
            comparisonCurrencies={compCurrs}
            arrRates={compCurrRates}/>
          <DateSelector minDate={minDate}
            setDates={setDates}/>
        </div>
        <div className="input card">
          
          <BaseCurrencySelector 
            select={setBaseCurr}
            baseCurrency={baseCurr}/>
          <div className='comp-currency card'>
            <ComparisonCurrencySelector 
              compCurrencies={compCurrs}
              select={addCompCurr}
              deselect={removeCompCurr}
            />
            <ComparisonCurrencyDisplay 
              compCurrencies={compCurrs}
              remove={removeCompCurr}
            />
          </div>
        </div>
      </div>
    </CurrContext.Provider>
  );
}

export default App;
