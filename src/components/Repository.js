import React, {Component} from 'react'

class Repository extends Component{
    constructor(props){
        super(props)
        this.state = {
            repoData: "",
            error: null
        }
    }

    componentDidMount(){
        fetch(`https://api.github.com/repos/vsaroay/pokemon_table`)
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
                    this.setState({ error: 'No repos' })
                })
    }

    render(){
        return(
            <div>
                <h1>Hello</h1>
                {console.log(this.state.repoData)}
            </div>
        )
    }
}

export default Repository