type QueryType = 'num_days_above_100' | 'num_days_above_90' | 'tempmax' | 'tempmin' | 'precip' | 'dew';

async function callClimateDataService(latlong : Array<number>, query_type : QueryType) {
    var start_date = `2024-01-02`;
    var end_date = `2080-12-31`;
    var url_dictionary = {
        'num_days_above_100': `?query=annually(exceed(maxtmp,365,37),mean)&from_date=${start_date}T00%3A00%3A00.000Z&to_date=${end_date}T00%3A00%3A00.000Z&latitude=${latlong[0]}&longitude=${latlong[1]}&apikey=${process.env.CLIMATE_API_KEY}`,
        'num_days_above_90': `?query=annually(exceed(maxtmp,365,32.2),mean)&from_date=${start_date}T00%3A00%3A00.000Z&to_date=${end_date}T00%3A00%3A00.000Z&latitude=${latlong[0]}&longitude=${latlong[1]}&apikey=${process.env.CLIMATE_API_KEY}`,
        'tempmax': `?query=monthly(maxtmp,max)&from_date=${start_date}T00%3A00%3A00.000Z&to_date=${end_date}T00%3A00%3A00.000Z&latitude=${latlong[0]}&longitude=${latlong[1]}&apikey=${process.env.CLIMATE_API_KEY}`,
        'tempmin': `?query=annually(mintmp,min)&from_date=${start_date}T00%3A00%3A00.000Z&to_date=${end_date}T00%3A00%3A00.000Z&latitude=${latlong[0]}&longitude=${latlong[1]}&apikey=${process.env.CLIMATE_API_KEY}`,
        'precip': `?query=annually(pr,sum)&from_date=${start_date}T00%3A00%3A00.000Z&to_date=${end_date}T00%3A00%3A00.000Z&latitude=${latlong[0]}&longitude=${latlong[1]}&apikey=${process.env.CLIMATE_API_KEY}`,
        'dew':`?query=annually(dew,mean)&from_date=${start_date}T00%3A00%3A00.000Z&to_date=${end_date}T00%3A00%3A00.000Z&latitude=${latlong[0]}&longitude=${latlong[1]}&apikey=${process.env.CLIMATE_API_KEY}`
        }
    var url = `https://beta.climatedataservice.com/v6/series/csv${url_dictionary[query_type]}`
    try {
        fetch(url).then((res) =>
            res.json(),
        )
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error(`Error calling climate data service:`, error);
    }

    return 
}