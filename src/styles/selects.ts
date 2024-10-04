import { StylesConfig } from 'react-select';
import { IOptionType } from '@/types/exchange';

export const customStyles: StylesConfig<IOptionType, false> = {
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
