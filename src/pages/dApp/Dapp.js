import React from 'react';
import Header from '../../components/header/Header';
import Swap from '../../components/home/Swap';

const Dapp = () => {
    return (
        <>
            <Header />
            <div className='dApp-wrapper'>
                <Swap />
            </div>
        </>
    )
}

export default Dapp
