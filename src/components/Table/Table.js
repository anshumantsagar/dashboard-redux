import React, { Component } from 'react';
import ListContext from '../../context/listContext';

//css
import classes from './Table.module.css';

class Table extends Component {
    static contextType = ListContext
    state = {
        list: this.context.list
    }
    render () {
        let newList = this.state.list.map((person, index) => {
            return (
                <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.designation}</td>
                    <td><input className={classes.Input} type="checkbox" checked={person.avilable} onChange={() => this.context.changeAvailable(index)}/></td>
                    <td>
                        <button className={classes.GreenButton} onClick={() => this.context.edit(index)}>Edit</button>
                        <button className={classes.RedButton} onClick={() => this.context.delete(index)}>Delete</button>
                    </td>
                </tr>
            );
        });
        let table = <div style={{color:'red'}}>There are no employees to display</div>
        if(this.state.list.length > 0) {
            table = <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Avilability</th>
                                <th>View Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newList}
                        </tbody>
                    </table>
        }
        return (
            <div className={classes.Container}>
                {table}
            </div>
        );
    }
    
}

export default Table;       