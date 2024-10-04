import { useState, useEffect } from 'react';
import { handleCurrencyChange, handleCurrencySelect, convertCurrency } from '@/utils/currencyFuncs';
import { IExchangeObject, IOptionType } from '@/types/exchange';
import { SingleValue } from 'react-select';

import iconSwap from '@/assets/icon-swap.svg';
import './exchange.css';
import CurrencyInput from '../CurrencyInput';

interface IExchangeProps {
    rates: IExchangeObject[];
}

const Exchange = ({ rates }: IExchangeProps) => {
    const [firstCurrencyValue, setFirstCurrencyValue] = useState<number | null>(null);
    const [secondCurrencyValue, setSecondCurrencyValue] = useState<number | null>(null);
    const [options, setOptions] = useState<IOptionType[]>([]);
    const [selectedFirstCurrency, setSelectedFirstCurrency] = useState<IOptionType | null>(null);
    const [selectedSecondCurrency, setSelectedSecondCurrency] = useState<IOptionType | null>(null);

    useEffect(() => {
        const getCurrencyNames = (array: IExchangeObject[]) => {
            const currenciesList = array.map((item) => ({
                value: item.cc,
                label: item.cc,
            }));
            currenciesList.push({
                value: 'UAH',
                label: 'UAH',
            });
            setOptions(currenciesList);

            const defaultFirstCurrency = currenciesList.find((option) => option.value === 'USD');
            const defaultSecondCurrency = currenciesList.find((option) => option.value === 'UAH');
            setSelectedFirstCurrency(defaultFirstCurrency || currenciesList[57]);
            setSelectedSecondCurrency(defaultSecondCurrency || currenciesList[0]);
        };

        if (rates.length) {
            getCurrencyNames(rates);
        }
    }, [rates]);

    const handleFirstCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? null : parseFloat(e.target.value);
        handleCurrencyChange({
            value,
            fromCurrency: selectedFirstCurrency?.value || '',
            toCurrency: selectedSecondCurrency?.value || '',
            setValue: setFirstCurrencyValue,
            setConvertedValue: setSecondCurrencyValue,
            rates,
        });
    };
    const handleSecondCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? null : parseFloat(e.target.value);
        handleCurrencyChange({
            value,
            fromCurrency: selectedSecondCurrency?.value || '',
            toCurrency: selectedFirstCurrency?.value || '',
            setValue: setSecondCurrencyValue,
            setConvertedValue: setFirstCurrencyValue,
            rates,
        });
    };
    const handleFirstCurrencySelect = (newValue: SingleValue<IOptionType>) => {
        handleCurrencySelect({
            newValue,
            setSelectedCurrency: setSelectedFirstCurrency,
            fromCurrency: newValue?.value || '',
            toCurrency: selectedSecondCurrency?.value || '',
            value: firstCurrencyValue,
            setConvertedValue: setSecondCurrencyValue,
            rates,
        });
    };
    const handleSecondCurrencySelect = (newValue: SingleValue<IOptionType>) => {
        handleCurrencySelect({
            newValue,
            setSelectedCurrency: setSelectedSecondCurrency,
            fromCurrency: selectedFirstCurrency?.value || '',
            toCurrency: newValue?.value || '',
            value: firstCurrencyValue,
            setConvertedValue: setSecondCurrencyValue,
            rates,
        });
    };

    const handleSwap = () => {
        const newFirstCurrency = selectedSecondCurrency;
        const newSecondCurrency = selectedFirstCurrency;

        setSelectedFirstCurrency(newFirstCurrency);
        setSelectedSecondCurrency(newSecondCurrency);

        const convertedValue = convertCurrency({
            fromCurrency: newFirstCurrency?.value || '',
            toCurrency: newSecondCurrency?.value || '',
            amount: firstCurrencyValue,
            rates,
        });
        setSecondCurrencyValue(
            convertedValue !== null ? parseFloat(convertedValue.toFixed(2)) : null
        );
    };

    return (
        <div className='exchange'>
            <div className='exchange__wrap'>
                <CurrencyInput
                    id='firstCurrency'
                    value={firstCurrencyValue}
                    onChange={handleFirstCurrencyChange}
                    options={options}
                    selectedCurrency={selectedFirstCurrency}
                    onCurrencySelect={handleFirstCurrencySelect}
                />
                <img
                    className='exchange__wrap-swap'
                    src={iconSwap}
                    alt='Swap currency'
                    onClick={handleSwap}
                />
                <CurrencyInput
                    id='secondCurrency'
                    value={secondCurrencyValue}
                    onChange={handleSecondCurrencyChange}
                    options={options}
                    selectedCurrency={selectedSecondCurrency}
                    onCurrencySelect={handleSecondCurrencySelect}
                />
            </div>
        </div>
    );
};

export default Exchange;
