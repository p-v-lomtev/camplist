import React, { Component } from 'react'
import './search.css'

export default class Search extends Component {
    state = {
        search: '',
        placeholder: ' Вы можете найти что угодно ...'
    }

    onFiltered = (e) => {
        const { onFilter } = this.props
        this.setState({
            search: e.target.value
        })
        
        onFilter(e.target.value);
    }
    
    placeholderSet = (placeholder) => {
            this.setState({
                placeholder: placeholder
            })
    }
                
    render() {

        const { placeholder } = this.state
        const placeholderArr = [{ id: 1, value: ' Найти среди участников ...' }, { id: 2, value: ' Найдите по имени человека ...' }]
        
        setTimeout(() => {
            for (let id = 0; id < placeholderArr.length; id++) {
                let placeholder = placeholderArr[id].value
                this.placeholderSet(placeholder)
            }      
        }, 30000)        
        

        return (
            <input className="float-right search" placeholder={placeholder} type="search" onChange={this.onFiltered}/>
        )
    }
}