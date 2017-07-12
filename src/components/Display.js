import React, { Component } from 'react'
// import {Link} from 'react-router-dom'

class Display extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            errMessage: null,
            errRepo: null,
            repoData: []
        }
    }

    componentDidMount() {
        if (this.props.location.state)
            var userApi=
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
                    });
            var repoApi=
                fetch(`https://api.github.com/users/${this.props.location.state.username}/repos`)
                    .then(function(res){
                        if(res.ok){
                            return res.json()
                        }
                        throw new Error('Network response not ok')
                    })
                    .then(res => {
                        this.setState({
                            repoData: res
                        })
                    }).catch((err) => {                   
                        this.setState({ errRepo: 'No repos' })
                    });
            var allApi = {"userApi":{}, "repoApi":{}};
            Promise.all([userApi, repoApi]).then(function(values){
                allApi["userApi"] = values[0];
                allApi["repoApi"] = values[1];
                return allApi;
            });
    }

    handleRepoClick = (e) =>{
        const location = {
            pathname: "/repos",
            state: {
                owner: this.props.location.state.username
            }
        }
        this.props.history.push(location)
    }

    render() {
        if (this.state.errMessage && this.state.repoData.length > 0) {
            return (
                <div>
                    <h3 className="user-not-found">
                        {this.state.errMessage}
                    </h3>
                </div>
            )
        }
        else if(this.state.errRepo){
            return(
                <h3>
                    {this.state.errRepo}
                </h3>
            )
        }
        else if (!this.state.data) {
            return (
                <p>Loading...</p>
            )
        }
        else  
        return (
            <div>
                <h2 className="user-info">{this.state.data.name}</h2>
                <hr/>
                <div className="side-bar">
                    <img src={this.state.data.avatar_url} className="avatar-img" alt="Avatar"/>
                    <h6>Created at: <time>{this.state.data.created_at}</time></h6>
                    <h6>Last Updated: <time>{this.state.data.updated_at}</time></h6>
                </div>
                <div className="display-body">
                    <table className="user-info-table">
                        <tbody>
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
                        </tbody>
                    </table>
                    <div>
                        <h3 className="user-bio">Bio</h3>
                        <p className="user-bio-api">
                            {this.state.data.bio}
                        </p>
                    </div>
                </div>
                <div>
                    <a onClick={this.handleRepoClick}>Hi</a>
                </div>
                {console.log(this.state.data)}
                {console.log(this.state.repoData)}
            </div>
        )
    }
}

export default Display