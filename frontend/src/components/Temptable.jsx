
import React, { Component } from 'react';

export const Table = (props) => {
    console.log(props)
    return (
        <div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>time</th>
                    <th>temp</th>
                </tr>
                {props.events.map((event) => (<tr>
                    <td>{event.id}</td>
                    <td>{event.temperature}</td>
                    <td>{event.humidity}</td>
                    </tr>))}
            </table>
        </div>
    )
}