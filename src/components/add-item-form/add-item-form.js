import React, { Component } from 'react'
import './add-item-form.css'

export default class AddItemForm extends Component {
    
    state = {
        label: '',
        status: 'Участник'
    }


    setLabel = (e) => {
        
            this.setState({
                label: e.target.value.trim()
            })
    }

    setStatus = (e) => {
            this.setState({
                status: e.target.value.trim()
            })
    }
    
    setItem = (e) => {
        const { label, status } = this.state
        const { onItemClick } = this.props
        
        e.preventDefault()
        if (label.trim() && status.trim()) {
            onItemClick(label, status)
        }
        document.forms["addItem"].reset()
        this.setState({
            label: '',
            status: 'Участник'
        })
    }
    
    render() {
        const { open } = this.props
        let classNames = 'addItemForm'
        if (open) {
            classNames += ' addItemFormOn'
        }
        
        return (
            <div className='addItemForm-overlay container'>
                <div className='container'>
                <form className={classNames} name="addItem" onSubmit={this.setItem}>
                    <input type='text' placeholder="Имя участника"  onChange={this.setLabel} />
                    <input type='text' placeholder="Статус" onChange={this.setStatus} />
                    <button>Добавить</button>
                </form>
                </div>
            </div>
        )
    }
}
