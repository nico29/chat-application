import React, { Component } from 'react';
import io from 'socket.io-client';
import { TopBar } from './TopBar';
import { Conversation } from './Conversation';
import { PostCreationForm } from './PostCreationForm';

class ChatApplication extends Component {
    constructor (props) {
        super(props);
        this.state = {
            socket: null,
            user: null,
            posts: []
        };
    }

    componentDidMount () {
        // grab all the existing posts
        fetch('/api/posts')
            .then(res => res.json())
            .then(posts => this.setState({ posts }));
        // init the socket connection
        const socket = io();
        this.setState({ socket });
    }

    componentWillUnmount () {
        // close socket connection
    }

    shouldComponentUpdate (props, state) {
        // prevent render for socket update
    }

    onPostSubmit () {
        // notify new post creation
    }

    render () {
        return (
            <div>
                <TopBar />
                <Conversation posts={ this.state.posts } user={ this.state.user } />
                <PostCreationForm onPostSubmit={ this.onPostSubmit } />
            </div>
        );
    }
}

export { ChatApplication };
