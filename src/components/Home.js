import React, {Component} from 'react'

class Home extends Component {
    render(){
        return(
            <div className="home-div">
                <h1 className="home-heading">
                    Welcome to the Home Page
                </h1>
                <p className="home-paragraph">
                    Go to the Search tab to enter in a Github username
                </p>
            </div>
        )
    }
}

export default Home