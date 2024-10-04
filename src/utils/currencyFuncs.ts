import { SingleValue } from 'react-select';
import { IExchangeObject, IOptionType } from '@/types/exchange';

interface IConvertCurrancyParams {
    fromCurrency: string;
    toCurrency: string;
    amount: number | null;
    rates: IExchangeObject[];
}
export interface IHandleCurrencyChangeParams {
    value: number | null;
    fromCurrency: string;
    toCurrency: string;
    setValue: React.Dispatch<React.SetStateAction<number | null>>;
    setConvertedValue: React.Dispatch<React.SetStateAction<number | null>>;
    rates: IExchangeObject[];
}
export interface IHandleCurrencySelectParams {
    newValue: SingleValue<IOptionType>;
    setSelectedCurrency: React.Dispatch<React.SetStateAction<IOptionType | null>>;
    fromCurrency: string;
    toCurrency: string;
    value: number | null;
    setConvertedValue: React.Dispatch<React.SetStateAction<number | null>>;
    rates: IExchangeObject[];
}

export const convertCurrency = ({
    fromCurrency,
    toCurrency,
    amount,
    rates,
}: IConvertCurrancyParams) => {
    if (amount === null) return null;

    const fromRate =
        fromCurrency === 'UAH' ? 1 : rates.find((rate) => rate.cc === fromCurrency)?.rate || 1;
    const toRate =
        toCurrency === 'UAH' ? 1 : rates.find((rate) => rate.cc === toCurrency)?.rate || 1;

    if (fromCurrency === toCurrency) {
        return amount;
    }

    const convertedAmount = amount * (fromRate / toRate);
    return convertedAmount;
};
export const handleCurrencyChange = ({
    value,
    fromCurrency,
    toCurrency,
    setValue,
    setConvertedValue,
    rates,
}: IHandleCurrencyChangeParams) => {
    setValue(value);

    const convertedValue = convertCurrency({ fromCurrency, toCurrency, amount: value, rates });
    setConvertedValue(convertedValue !== null ? parseFloat(convertedValue.toFixed(2)) : null);
};
export const handleCurrencySelect = ({
    newValue,
    setSelectedCurrency,
    fromCurrency,
    toCurrency,
    value,
    setConvertedValue,
    rates,
}: IHandleCurrencySelectParams) => {
    const selectedOption = newValue as IOptionType | null;
    setSelectedCurrency(selectedOption);

    if (selectedOption) {
        const convertedValue = convertCurrency({ fromCurrency, toCurrency, amount: value, rates });
        setConvertedValue(convertedValue !== null ? parseFloat(convertedValue.toFixed(2)) : null);
    }
};
