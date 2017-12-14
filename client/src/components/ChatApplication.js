import React, { Component } from 'react';
import io from 'socket.io-client';
import { TopBar } from './TopBar';
import { LoginPanel } from './LoginPanel';
import { Conversation } from './Conversation';
import { PostCreationForm } from './PostCreationForm';

class ChatApplication extends Component {
    constructor (props) {
        super(props);
        this.state = {
            socket: null,
            user: null,
            posts: [],
            userConnected: false
        };
    }

    componentDidMount () {
        // grab all the existing posts
        fetch('/api/posts')
            .then(res => res.json())
            .then(({ posts }) => this.setState({ posts }));
        // init the socket connection
        const socket = io();
        socket.on('post.receive', post => {
            // check if post update is made by this user
            if (!this.hasPost(post)) {
                this.setState({ posts: [...this.state.posts, post] });
            }
        });
        this.setState({ socket });
    }

    componentWillUnmount () {
        // close socket connection
        const { socket } = this.state;
        socket.disconnect();
    }

    shouldComponentUpdate (props, state) {
        // prevent render for socket update
        return this.state.socket === state.socket;
    }

    onPostSubmit (content) {
        // notify new post creation
        const { socket, user } = this.state;
        const post = { content, user, timestamp: Date.now() };
        socket.emit('post.publish', post);
        this.setState({ posts: [...this.state.posts, post] });
    }

    onUserConnected (user) {
        const userConnected = true;
        const { socket } = this.state;
        socket.emit('user.connection', user);
        this.setState({ user, userConnected });
    }

    hasPost (post) {
        const index = this.state.posts.findIndex(({ user, content, timestamp }) => {
            return post.content === content && user === post.user && post.timestamp === timestamp;
        });
        return index > -1;
    }

    render () {
        return (
            <div>
                <TopBar />
                {
                    !this.state.userConnected &&
                    <LoginPanel onUserCreated={ this.onUserConnected } />
                }
                <Conversation posts={ this.state.posts } user={ this.state.user } />
                <PostCreationForm onPostSubmit={ this.onPostSubmit } />
            </div>
        );
    }
}

export { ChatApplication };
