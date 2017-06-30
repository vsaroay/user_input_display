import React, { Component } from 'react'

class Display extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            errMessage: null
        }
    }

    componentDidMount() {
        if (this.props.location.state)
            fetch(`https://api.github.com/users/${this.props.location.state.username}`)
                .then(function(res){
                    if(res.ok){
                        return res.json()
                    }
                    throw new Error('Network response not ok')
                })
                .then(res => {
                    this.setState({
                        data: res
                    })
                }).catch((err) => {
                    this.setState({ errMessage: 'This username has not been created yet :( Please check back later' })
                })
    }

    render() {
        if (this.state.errMessage) {
            return (
                <div>
                    <h3 className="user-not-found">
                        {this.state.errMessage}
                    </h3>
                </div>
            )
        }
        else if (!this.state.data) {
            return (
                <p>Loading...</p>
            )
        }
        else return (
            <div>
                <h2 className="user-info">{this.state.data.name}</h2>
                <hr/>
                <div className="side-bar">
                    <img src={this.state.data.avatar_url} className="avatar-img" alt="Avatar"/>
                    <h4>Last Updated: <time>{this.state.data.updated_at}</time></h4>
                </div>
                <div className="display-body">
                    <table className="user-info-table">
                        <tr>
                            <th>Followers</th>
                            <th>Following</th>
                            <th>Public Repos</th>
                            <th>Public Gists</th>
                        </tr>
                        <tr>
                            <td>{this.state.data.followers}</td>
                            <td>{this.state.data.following}</td>
                            <td>{this.state.data.public_repos}</td>
                            <td>{this.state.data.public_gists}</td>
                        </tr>
                    </table>
                </div>
                {console.log(this.state.data)}
            </div>
        )
    }
}

export default Display