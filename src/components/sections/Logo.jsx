import React from 'react';
import logoIcon from "../../assets/logo.svg";
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        // <div className="flex flex-row items-center">
            <Link to="/" className='w-fit'>
                <img
                    src={logoIcon}
                    alt="Logo"
                    className="h-12 md:w-auto md:h-14 lg:h-20 xl:h-20 mt-1.5 md:mt-0"
                />
                {/* <h6 className="font-bold md:text-5xl/10 lg:text-4xl xl:text-7xl logo-Font ">SHOPER</h6> */}
            </Link>
        // </div>
    );
};

export default Logo;