export const fetchData = async () => {
    try {
        const response = await fetch(
            'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'
        );
        const result = await response.json();
        const cutedResult = result.slice(0, -4);
        return cutedResult;
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
    }
};
