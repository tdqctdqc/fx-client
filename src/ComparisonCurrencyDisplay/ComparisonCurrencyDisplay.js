import { useContext } from "react";
import { CurrContext } from "../App";
import './ComparisonCurrencyDisplay.css';

function ComparisonCurrencyDisplay( {compCurrencies, remove} ) {
    const currContext = useContext(CurrContext);
    const currencyNames = currContext.currNames;

    return (
        <div className="comp-display">
        {
            compCurrencies.map(comp => {
                return <div key={comp} className='comp-display-card'>
                    <button onClick={() => remove(comp)}>X</button>
                    { `${currencyNames[comp]}  (${comp.toUpperCase()})`  }
                </div>
            })
        }
        </div>
    );
}

export default ComparisonCurrencyDisplay;