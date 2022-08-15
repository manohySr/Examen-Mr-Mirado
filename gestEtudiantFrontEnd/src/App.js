import React, { useState } from 'react';
import Sidebar from './page/Sidebar';
import Main from './page/Main';
import './style/style.css';

const App = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
    return (
        <div className='container'>
            <Sidebar selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}/>
            <Main selectedIndex={selectedIndex}/>
        </div>
    );
}

export default App;
