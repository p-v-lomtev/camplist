import React from 'react'
import './header.css'
import Search from './search/'

const Header = ({onFilter}) => {
    return (
        <div className="header">
            <div className='logo'>
                <h1>Калязин 2021</h1>
            </div>
            <div className="container d-flex">
            <Search onFilter={onFilter}/>
            </div>
         
    </div>
)
}

export default Header