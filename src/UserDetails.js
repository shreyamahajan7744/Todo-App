import React, { Component } from 'react';

export default class UserDetails extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Hello {this.props.name} {' '} {this.props.surname}</h1>
            </React.Fragment>
        )
    }

}