import { useState, useEffect, useContext } from "react";
import './BaseCurrencySelector.css';
import { CurrContext } from "../App";


function BaseCurrencySelector( {select, baseCurrency} ) {
    const currs = useContext(CurrContext);
    const currencyNames = currs.currNames;
    const currencyAbbreviations = currs.currAbbreviations;
    const [searchTerm, setSearchTerm] = useState('');
    function getValidCurrAbbrs()
    {
        return currencyAbbreviations.filter((abbr) => {
            return abbr.includes(searchTerm.toLowerCase()) 
            || currencyNames[abbr]
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
    }
    function clickedSearchResult(val) {
        const currAbbr = val.target.value;
        if(baseCurrency !== currAbbr){
            select(currAbbr);
        }
    }
    
    return (
    <div className='base-selector card'>
        <div className="base-currency-display">
            Base Currency: {`${currencyNames[baseCurrency]} (${baseCurrency.toUpperCase()})`}
        </div>
            <div>
                Search for Base Currency: <input type="text" onChange={e => setSearchTerm(e.target.value)}/>
            </div>
            <div className="search-result-container">
               {getValidCurrAbbrs()
                .map(currAbbr => {
                    return <option className={baseCurrency === currAbbr ? 'base-option' : ''}
                        key={currAbbr}
                        value={currAbbr}
                        onClick={clickedSearchResult}
                        >
                        {`${currencyNames[currAbbr]} (${currAbbr.toUpperCase()})`}
                    </option>;
                }) }
            </div>
    </div>
    );
}

export default BaseCurrencySelector;