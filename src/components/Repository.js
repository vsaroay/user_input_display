import React, {Component} from 'react'

class Repository extends Component{
    constructor(props){
        super(props)
        this.state = {
            repoInfo: null,
            error: null
        }
    }

    componentDidMount(){
        fetch(`https://api.github.com/repos/${this.props.location.state.username}/${this.props.location.state.singleRepo}`)
        .then(function(res){
                    if(res.ok){
                        return res.json()
                    }
                    throw new Error('Network response not ok')
                })
                .then(res => {
                    this.setState({
                        repoInfo: res
                    })
                }).catch((err) => {
                    this.setState({ error: 'No repos' })
                })
    }

    render(){
        if (!this.state.repoInfo)
            return(
                <div className="container">
                    <p>Loading...</p>
                </div>
            )
        else
        return(
            <div className="container">
                <h1>{this.state.repoInfo.name}</h1>
                <p>Created At: {this.state.repoInfo.created_at}</p>
                <p>Updated At: {this.state.repoInfo.updated_at}</p>
                <p>Subscribers: {this.state.repoInfo.subscribers_count}</p>
                <p>Default Branch: {this.state.repoInfo.default_branch}</p>
                {console.log(this.state.repoInfo)}
            </div>
        )
    }
}

export default Repository