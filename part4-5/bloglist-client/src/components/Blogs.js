import Togglable from './Togglable'

const Blogs = ({ blog, handleDelete, handleLikeChange }) => {
    const blogStyle = {
        paddingBlock: 20,
        paddingInline: 8,
        border: 'solid',
        borderWidth: 1,
        borderRadius: '.5rem',
        marginBottom: 5,
        maxWidth: '330px',
    }

    return (
        <main className="py-2">
            <div style={blogStyle} className="blogWrapper">
                <Togglable
                    buttonShow="view"
                    buttonHide="hide"
                    toggleTitle={blog.title + ' by ' + blog.author}
                    blogId={blog.id}
                >
                    <div className="blogList">
                        <br />
                        <div className="py-2 text-xl break-all">
                            <a href={blog.url}>{blog.url}</a>
                        </div>
                        <br />
                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-xl grid items-center justify-start">
                                Likes: {blog.likes}
                            </span>
                            <div className=" grid items-center justify-start">
                                <button
                                    onClick={handleLikeChange}
                                    className="likeButton border-2 border-blue-950 text-blue-700 text-lg px-8 hover:bg-blue-700 hover:text-white hover:font-bold py-2 rounded-lg"
                                    id="like"
                                >
                                    Like
                                </button>
                            </div>
                        </div>

                        <br />
                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-xl grid items-center justify-start">
                                {blog.author}
                            </span>
                            <div className="grid items-center justify-start">
                                <button
                                    onClick={() =>
                                        handleDelete(blog.id, blog.title)
                                    }
                                    className="border-2 border-blue-950 text-blue-700 text-lg px-8 hover:bg-blue-700 hover:text-white hover:font-bold py-2 rounded-lg"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </Togglable>
            </div>
        </main>
    )
}

export default Blogs
