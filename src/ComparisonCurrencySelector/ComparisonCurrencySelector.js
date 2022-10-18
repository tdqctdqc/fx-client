import { useState, useEffect, useContext } from "react";
import { CurrContext } from "../App";
import './ComparisonCurrencySelector.css';

function ComparisonCurrencySelector( {select, deselect, compCurrencies} ) {
    const currContext = useContext(CurrContext);
    const currencyNames = currContext.currNames;
    const currencyAbbreviations = currContext.currAbbreviations;
    const [searchTerm, setSearchTerm] = useState('');
    function getValidCurrAbbrs()
    {
        return currencyAbbreviations.filter((abbr, index) => {
            return abbr.includes(searchTerm) || currencyNames[abbr].includes(searchTerm);
        })
    }
    function clickedSearchResult(val) {
        const currAbbr = val.target.value;
        if(compCurrencies.includes(currAbbr)){
            deselect(currAbbr);
        } else {
            select(currAbbr);
        }
    }
    
    return (
    <div className="comp-currency-selector">
        Search for Comparison Currency: <input type="text" onChange={e => setSearchTerm(e.target.value)}/>
        {
            <div className="search-result-container">
                {
                    getValidCurrAbbrs()
                    .map(currAbbr => {
                        return <option className={compCurrencies.includes(currAbbr) ? 'comp' : ''}
                            key={currAbbr}
                            value={currAbbr}
                            onClick={clickedSearchResult}
                            >
                                {`${currencyNames[currAbbr]} (${currAbbr.toUpperCase()})`}
                            </option>;
                    }) 
                }
            </div>
        }
    </div>
    );
}

export default ComparisonCurrencySelector;