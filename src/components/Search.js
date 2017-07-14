import React, {Component} from 'react'

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            name: "",
            isValidUserMsg: "",
            emptyUserMsg: null,
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
            <div className="container">
                <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
                    <h6 className="col-sm-2 col-form-label">Search for User</h6>
                    <div className="col-sm-10">
                        <input className="form-control" classID="inputUser"
                            placeholder="Search"
                            type="text"
                            onChange={(e) => this.setState({name:e.target.value, isEmpty: false})}
                        />
                    </div>
                    <button className="btn btn-outline-primary my-2 my-sm-0">Submit</button>
                </form>
                <span>
                    <strong>{this.state.emptyUserMsg}</strong>
                </span>
            </div>
        )
    }
}

export default Search