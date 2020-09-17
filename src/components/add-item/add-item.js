import React from 'react'
import './add-item.css'
import AddItemForm from '../add-item-form/add-item-form'

const AddItem = ({ onItemClick, onToogle, open }) => {

    let classNames = 'fa'
    
    if (open) {
        classNames += ' fa-times-circle'
    } else {
        classNames += ' fa-plus-circle'
    }

    return (
        <div>
            <AddItemForm onItemClick={onItemClick} open={open}/>
            <div className=" btn-overlay container">
                <div className='container'>
                <button className="btn" onClick={onToogle}><i className={classNames}></i></button>
                </div>
        </div>
        </div>
        
)
}

export default AddItem