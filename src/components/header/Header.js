import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useBalance } from 'wagmi';

const Header = () => {
    const { address } = useAccount();
    const result = useBalance({
        address: "0x6F3fDdF3B497caB73C10A314f63a72d8D9F89C1a",
    });
    console.log(result, "dsdfdsafds");
    let data = 10;
    // You can store the balance in state if necessary
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (data) {
            setBalance(data.formatted); // Store the formatted balance
        }
    }, [data]);

    return (
        <div className="header-wrapper">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/staking">Staking</Link>
                </li>
                <li>
                    <Link to="/swap">Swap</Link>
                </li>
            </ul>
            <div className="connect-wallet-btn">
                <ConnectButton />
            </div>
        </div>
    );
};

export default Header;
