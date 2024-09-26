import { useState, useEffect } from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';
import { handleCurrencyChange, handleCurrencySelect, convertCurrency } from '@/utils/currencyFuncs';
import { IExchangeObject, IOptionType } from '@/types/exchange';

import iconSwap from '@/assets/icon-swap.svg';
import './exchange.scss';

interface IExchangeProps {
    rates: IExchangeObject[];
}

const customStyles: StylesConfig<IOptionType, false> = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#242424',
        };
    },
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#fff',
        borderRadius: '0',
        boxShadow: 'none',
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
        borderColor: state.isFocused ? '#4EFFB3' : 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#4EFFB3' : 'none',
        },
        // borderColor: 'transparent',
        // '&:hover': {
        //     borderColor: 'transparent',
        // },
        // color: "chroma.contrast(color, 'white')",
        fontWeight: '500',
        fontSize: '1rem',
        height: '40px',
        width: '60px',
        cursor: 'pointer',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#4EFFB3' : '#fff',
        color: state.isFocused ? '#000' : '#242424',
        fontWeight: '500',
        fontSize: '1rem',
        cursor: 'pointer',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        display: 'none',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
    }),
    menuList: (provided) => ({
        ...provided,
        scrollBehavior: 'smooth',
        maxHeight: '200px',
    }),
};

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    const handleFirstCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? null : parseFloat(e.target.value);
        handleCurrencyChange(
            value,
            selectedFirstCurrency?.value || '',
            selectedSecondCurrency?.value || '',
            setFirstCurrencyValue,
            setSecondCurrencyValue,
            rates
        );
    };
    const handleSecondCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? null : parseFloat(e.target.value);
        handleCurrencyChange(
            value,
            selectedSecondCurrency?.value || '',
            selectedFirstCurrency?.value || '',
            setSecondCurrencyValue,
            setFirstCurrencyValue,
            rates
        );
    };
    const handleFirstCurrencySelect = (newValue: SingleValue<IOptionType>) => {
        handleCurrencySelect(
            newValue,
            setSelectedFirstCurrency,
            newValue?.value || '',
            selectedSecondCurrency?.value || '',
            firstCurrencyValue,
            setSecondCurrencyValue,
            rates
        );
    };
    const handleSecondCurrencySelect = (newValue: SingleValue<IOptionType>) => {
        handleCurrencySelect(
            newValue,
            setSelectedSecondCurrency,
            selectedFirstCurrency?.value || '',
            newValue?.value || '',
            firstCurrencyValue,
            setSecondCurrencyValue,
            rates
        );
    };

    const handleSwap = () => {
        const newFirstCurrency = selectedSecondCurrency;
        const newSecondCurrency = selectedFirstCurrency;

        setSelectedFirstCurrency(newFirstCurrency);
        setSelectedSecondCurrency(newSecondCurrency);

        const convertedValue = convertCurrency(
            newFirstCurrency?.value || '',
            newSecondCurrency?.value || '',
            firstCurrencyValue,
            rates
        );
        setSecondCurrencyValue(
            convertedValue !== null ? parseFloat(convertedValue.toFixed(2)) : null
        );
    };

    const getInputValue = (value: number | null | undefined): string => {
        return value !== null && value !== undefined ? value.toString() : '';
    };

    return (
        <div className='exchange'>
            <div className='exchange__wrap'>
                <div className='exchange__wrap-item'>
                    <input
                        type='number'
                        id='firstCurrency'
                        value={getInputValue(firstCurrencyValue)}
                        onChange={handleFirstCurrencyChange}
                        step='any'
                        min='0'
                        onKeyDown={handleKeyDown}
                        inputMode='numeric'
                    />
                    <Select
                        options={options}
                        styles={customStyles}
                        value={selectedFirstCurrency}
                        onChange={handleFirstCurrencySelect}
                    />
                </div>
                <img
                    className='exchange__wrap-swap'
                    src={iconSwap}
                    alt='Swap currency'
                    onClick={handleSwap}
                />
                <div className='exchange__wrap-item'>
                    <input
                        type='number'
                        id='secondCurrency'
                        value={getInputValue(secondCurrencyValue)}
                        onChange={handleSecondCurrencyChange}
                        step='any'
                        min='0'
                        onKeyDown={handleKeyDown}
                        inputMode='numeric'
                    />
                    <Select
                        options={options}
                        styles={customStyles}
                        value={selectedSecondCurrency}
                        onChange={handleSecondCurrencySelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default Exchange;
