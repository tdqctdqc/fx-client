
const baseEndpoint = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/";


export async function getExchangeRate(baseCurr, compCurr, date) {
    if(!date) date = 'latest';
    const endpoint = baseEndpoint + `/${date}/currencies/${baseCurr}.json`;
    const exchange = await fetch(endpoint)
    .then(response => response.json())
    .then(result => result[baseCurr][compCurr]);
    console.log(exchange);
    return exchange;
}

export async function getExchangeRatesBackFromDate(baseCurr, compCurrs, dates) {
    const rates = compCurrs.map(compCurr => []);
    for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
        const date = dates[dateIndex];
        const endpoint = baseEndpoint + `/${date}/currencies/${baseCurr}.json`;
        const dateExchangeRates = await fetch(endpoint)
            .then(response => response.json())
            .then(json => json[baseCurr]);

        
        for (let compCurrIndex = 0; compCurrIndex < compCurrs.length; compCurrIndex++) {
            const compCurr = compCurrs[compCurrIndex];
            const compCurrRate = dateExchangeRates[compCurr];
            rates[compCurrIndex].push(compCurrRate);
        }
    }
    return rates;
}

export async function getExchangeRatesForDate(baseCurr, compCurrs, date) {
    if(!date) date = 'latest';
    
    const endpoint = baseEndpoint + `/${date}/currencies/${baseCurr}.json`;
    const exchangeRateList = await fetch(endpoint)
    .then(response => response.json())
    .then(json => json[baseCurr]);
    
    const rates = compCurrs.map(compCurr => exchangeRateList[compCurr]);
    console.log(rates);
    return rates;
}
