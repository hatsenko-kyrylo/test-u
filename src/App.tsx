import { useEffect, useState } from 'react';
import { fetchData } from '@/utils/fetchApi';
import { IExchangeObject } from '@/types/exchange';
import Header from './components/Header';
import Exchange from './components/Exchange';

function App() {
    const [rates, setRates] = useState<IExchangeObject[]>([]);
    const [usdRate, setUsdRate] = useState<number | null>(null);
    const [eurRate, setEurRate] = useState<number | null>(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            const data = await fetchData();
            setRates(data);

            const usd = data.find((item: IExchangeObject) => item.cc === 'USD');
            const eur = data.find((item: IExchangeObject) => item.cc === 'EUR');

            setUsdRate(usd.rate);
            setEurRate(eur.rate);
        };

        fetchExchangeRates();
    }, []);

    return (
        <>
            <Header usdRate={usdRate} eurRate={eurRate} />
            <Exchange rates={rates} />
        </>
    );
}

export default App;
