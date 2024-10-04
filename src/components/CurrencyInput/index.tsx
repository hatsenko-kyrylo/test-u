import React from 'react';
import Select, { SingleValue } from 'react-select';
import { IOptionType } from '@/types/exchange';
import { customStyles } from '@/styles/selects';

import './currencyInput.css';

interface ICurrencyInputParams {
    id: string;
    value: number | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options: IOptionType[];
    selectedCurrency: IOptionType | null;
    onCurrencySelect: (e: SingleValue<IOptionType>) => void;
}

const CurrencyInput = ({
    id,
    value,
    onChange,
    options,
    selectedCurrency,
    onCurrencySelect,
}: ICurrencyInputParams) => {
    const getInputValue = (value: number | null | undefined): string => {
        return value !== null && value !== undefined ? value.toString() : '';
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };
    return (
        <div className='currency-input'>
            <input
                type='number'
                id={id}
                value={getInputValue(value)}
                onChange={onChange}
                step='any'
                min='0'
                onKeyDown={handleKeyDown}
                inputMode='numeric'
            />
            <Select
                options={options}
                styles={customStyles}
                value={selectedCurrency}
                onChange={onCurrencySelect}
            />
        </div>
    );
};

export default CurrencyInput;
