import { useEffect } from "react";

function CurrencyDropdown( { dropdownName, currencyNames, 
    currencyAbbreviations, select} ) {
    const defaultBase = 'usd';
    useEffect(() => {
        clickedCurrency(defaultBase);
    }, [])
    function clickedCurrency(val) {
        if(val === undefined) return;
        console.log('clicked ' + val);
        select(val);
    }
    return (
        <select name={dropdownName} id="base-currency-dropdown" onChange={e => clickedCurrency(e.target.value)} value={defaultBase}>
        {
            currencyAbbreviations.map((currAbbr, index) => {
            return <option key={currAbbr} value={currAbbr}>
                {`${currencyNames[currAbbr]} (${currAbbr.toUpperCase()})`}
                </option>;
            })
        }
        </select>
    );
}

export default CurrencyDropdown;