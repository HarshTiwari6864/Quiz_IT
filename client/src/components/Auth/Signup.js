import React from 'react';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    render() {
        return (
            <div className="sign-in-wrapper">
                <div className="form">
                    <div className="input-wrapper">
                        
                        <input className="input" type="text" placeholder="Email Address" value={this.state.email} onChange={ e => this.setState({ email: e.target.value }) } />
                    </div>
                    <div className="input-wrapper">
                     
                      <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    </div>

                    <div className="input-wrapper">
                        
                        <input className="input" type="text" placeholder="ONE TIME First Name" value={this.state.firstName} onChange={ e => this.setState({ firstName: e.target.value }) } />
                    </div>
                    <div className="input-wrapper">
                      
                      <input className="input" type="text" placeholder="ONE TIME Last Name" value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                    </div>
            
                    <div className="btn" onClick={() => this.props.signUp({...this.state})}>Sign Up</div> 
                </div> 
            </div>
        )
    }
}