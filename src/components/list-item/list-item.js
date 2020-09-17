import React from 'react'
import './list-item.css'
    
    const ListItem = ({ id, idx, label, status, onDelete, onApproved, approved }) => {
        
        let clNames = ''
        if(approved) {
            clNames += ' back-green'
        } else {
            clNames += ' back-red'
        }

        return (
            <li className={clNames}>
                <span>{idx}. {label} - {status}</span>
                <button className='float-right' onClick={() => onDelete(id)}><i className="fa fa-trash"></i></button>
                <button className='float-right' onClick={() => onApproved(id)}><i className="fa fa-check-circle"></i></button>
            </li>
        )
    }
export default ListItem