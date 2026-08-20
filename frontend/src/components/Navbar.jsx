import React from 'react';
import { Link } from 'react-router-dom';
import Globe from '../../src/images/globe.png';
export default function Navbar(){
    return(
        <>
        <header>
        <nav>
            <Link to ="/">
            <img className='logo' src={Globe} alt="Globe" />
            </Link>
            <span>my travel journal.</span>
        </nav>
        </header>
        </>
    )
};