import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then(() => {
                // blog post has been created, navigate the user to index
                // navigate by calling this.context.router.push
                // with new path
                this.context.router.push('/');
            });
    }

    render() {
        const { post } = this.props;

        if (!post || post.id != this.props.params.id){
            return (
                <div>Loading...</div>
            );
        }

        console.log(post);
        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button
                    className="btn btn-danger float-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);