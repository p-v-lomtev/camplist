import React, { Component } from 'react'
import './list.css'
import Listitem from '../list-item/';

export default class List extends Component {

    render() {
        const { names, onDelete, onApproved } = this.props;

        return (
            <ul className="list">
                {names.map(({ id, label, status, ...Itemprops}, index) => <Listitem key={id} {...Itemprops} onApproved={onApproved} label={label} id={id} idx={index+1} status={status} onDelete={onDelete}/>)}
            </ul>
        ) 
    }
}