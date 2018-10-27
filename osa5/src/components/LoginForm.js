import React from 'react'
import loginService from '../services/login'

class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loginHandle: this.props.loginHandle,
            error: ''
        }
    }


    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    login = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            });


            this.setState({ username: '', password: ''});
            this.state.loginHandle(user);
        } catch(exception) {
            /*this.setState({
                error: 'käyttäjätunnus tai salasana virheellinen',
            });*/
            this.props.setErrorHandle('login error', true);
            /*setTimeout(() => {
                this.setState({ error: null });
                this.props.setErrorHandle(null);
            }, 5000)*/
        }
    };

    render() {
        return <div>
            <h2>Login</h2>

            <form onSubmit={this.login}>
                <div>
                    username:
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleLoginFieldChange}
                    />
                </div>
                <div>
                    password:
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleLoginFieldChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
            <p>{this.state.error}</p>
        </div>
    }

}

export default LoginForm;