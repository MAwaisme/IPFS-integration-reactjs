import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Link
                        className="App-link"
                        // href="https://reactjs.org"
                        to="/upload"
                        // target="_blank"
                        rel="noopener noreferrer"
                    >
                        Upload
                    </Link>
                </header>
            </div>
        </div>
    )
}

export default Home
