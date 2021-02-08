import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfiend: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    onSearchCHange = (event) => {
        this.setState({ searchfiend: event.target.value })
    }

    render() {
        const { robots, searchfiend } = this.state;
        const filterRobotos = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfiend.toLowerCase());
        })

        return !robots.length ?
        <h1 className='tc'>Loading...</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchCHange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterRobotos} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default App;