import React, {Component} from 'react'

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            name: "",
            isValidUserMsg: "",
            emptyUserMsg: "",
            isEmpty: true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.isEmpty){
            this.setState({emptyUserMsg: "Please enter a username"})
        } else{
            const location={
                pathname: '/display',
                state: {username: this.state.name}
            }
            this.props.history.push(location)
        }
    }

    render(){
        return(
            <div className="search-div">
                <h2 className="search-header">Search for User</h2>
                <form onSubmit={this.handleSubmit}>
                    <input className="search-input"
                        placeholder="Search"
                        type="text"
                        onChange={(e) => this.setState({name:e.target.value, isEmpty: false})}
                    />
                    <p className="error-message">
                        {this.state.emptyUserMsg}
                    </p>
                    <button className="search-button">Submit</button>
                </form>
            </div>
        )
    }
}

export default Search