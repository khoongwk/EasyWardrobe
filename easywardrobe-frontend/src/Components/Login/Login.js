import React from 'react';
import { Grid, withStyles, Box, Card, CardContent, Typography, CardActions } from '@material-ui/core';
import tachyons from 'tachyons';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: '',
            loginPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({ loginEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ loginPassword: event.target.value });
    }

    onSubmitLogin = () => {
        // fetch('http://localhost:5200/login', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         username: this.state.loginEmail,
        //         password: this.state.loginPassword
        //     })
        // }).then(response => {
        //     response.json()
        // })
        // .then(data => {
        //     if (data === 'Error - Username not found') {
        //         alert("Error - Username not found");
        //     } else if (data === 'Error - Invalid Password') {
        //         alert('Error - Invalid Password');
        //     } else {
        //         console.log("Successful login")
                this.props.onAuthenticateHandler()
    //         }
    //     })
    //     .catch((err) => console.log(err))
     }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
              </fieldset>
              <div className="">
                <input onClick={this.onSubmitLogin}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
              </div>
            </div>
          </main>
          </article>
          );
    }
}
export default Login;

