/**
 * Lookup exchange rate from Treasure.gov
 *
 * @param {string} country     Country name (e.g. Japan)
 * @param {string} currency    Currency name (e.g. YEN)
 * @param {number} year        Exchange rate for the end of the year (e.g. 2021)
 * @return rate                Exchange rate of the currency in the specified year
 * @customfunction
 */
function EXCHANGERATE(country,currency,year) {

  let baseUrl  = 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service';
  let endpoint = '/v1/accounting/od/rates_of_exchange';
  let fields   = 'fields=country_currency_desc,exchange_rate,record_date';
  let filter   = 'filter=country_currency_desc:in:(' + country + '-' + currency + '),record_date:eq:' + year + '-12-31';
  let url      = baseUrl + endpoint + '?' + fields + '&' + filter;

  let jsonString = getJsonString_(url);
  let jsonObject = JSON.parse(jsonString);
  let count = jsonObject["meta"]["count"];

  if (count > 0) {
    let rate = jsonObject["data"][0]["exchange_rate"].toString();
    return rate;
  } else {
    return count;
  }
}

function getJsonString_(url) {
  let jsonData = UrlFetchApp.fetch(url);
  let jsonString = jsonData.getContentText();
  return jsonString;
}
