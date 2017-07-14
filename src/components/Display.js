import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Display extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            errMessage: null,
            errRepo: null,
            repoData: null,
            singleRepo: null
        }
    }

    // componentDidMount(){
    //     if(this.props.location.state)
    //         var userApi = new Promise((resolve, reject) => {
    //             fetch(`https://api.github.com/users/${this.props.location.state.username}`)
    //                 .then(function(res){
    //                     if (res.ok)
    //                         resolve("Success!")
    //                         return res.json()
    //                 }).then(res => {
    //                     this.setState({
    //                         data: res
    //                     })
    //                 }).catch((err) => {
    //                     this.setState({ errMessage: 'No User' })
    //                 })
    //         })

    //         var repoApi = new Promise((resolve, reject) => {
    //             fetch(`https:api.github.com/users/${this.props.location.state.username}/repos`)
    //                 .then(function(res){
    //                     if(res.ok)
    //                         resolve(res.json)
    //                         // return res.json
    //                 }).then(res => {
    //                     this.setState({
    //                         repoData: res
    //                     })
    //                 }).catch((err) => {
    //                     this.setState({ errRepo: 'No Repo' })
    //                 })
    //         })

    //         Promise.all([userApi, repoApi])
    //             .then(function(results){
    //                 console.log(results)
    //             }).catch(function(err){
    //                 console.log(err)
    //             })
    // }

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
                });
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
                    this.setState({ errRepo: 'Repo Error' })
                });
    }

    // handleRepoClick = (e) =>{
    //     const location = {
    //         state: {
    //             repoName: this.state.repoData
    //         }
    //     }
    //     this.props.history.push(location)
    // }

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
        else if(this.state.errRepo){
            return(
                <h3>
                    {console.log(this.state.repoData)}
                    {this.state.errRepo}
                </h3>
            )
        }
        else if (!this.state.data || !this.state.repoData) {
            return (
                <div className="container">
                    <p>Loading...</p>
                </div>
            )
        }
        else
        return (
            <div className="container">
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
                    <ul>
                        {this.state.repoData.map(function(repo, i){
                            return <li key={i}><Link to={{
                                pathname: '/repos',
                                state: {
                                    singleRepo: repo.name,
                                    username: repo.owner.login
                                }
                            }}>
                                {repo.name}
                            </Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Display