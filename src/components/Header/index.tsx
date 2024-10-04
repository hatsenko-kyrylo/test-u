import './header.css';

interface IHeaderProps {
    usdRate: number | null;
    eurRate: number | null;
}

const Header = ({ usdRate, eurRate }: IHeaderProps) => {
    return (
        <header className='header'>
            <div className='header__wrap'>
                <span className='header__wrap-item'>{`${usdRate ? usdRate.toFixed(2) : '--:--'} $`}</span>
                <span className='header__wrap-item'>{`${eurRate ? eurRate.toFixed(2) : '--:--'} €`}</span>
            </div>
        </header>
    );
};

export default Header;
