import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Blog({
    blogPosts,
    signedInUser,
    handleLogout,
    handleLikeChange,
    handleAddComment,
    handleTextAreaChange,
    comment,
    setComment,
}) {
    const { blogId } = useParams()
    const [blog, setBlog] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const getSingleBlog = async () => {
            try {
                const singleBlog = await blogPosts.find(
                    (blog) => blog.id === blogId
                )
                setBlog(singleBlog)
            } catch (err) {
                console.error('Error: ', err)
            }
        }

        getSingleBlog()
    }, [blogPosts, blogId])

    if (!blog) {
        return null
    }

    return (
        <main className="min-h-screen grid items-center justify-center">
            <div className="max-w-[400px] mt-20 grid gap-4 border-2 border-black px-8 pt-4 pb-6 shadow-2xl rounded-lg">
                <h2 className="text-4xl font-extrabold">Blog app</h2>
                <div className="w-full grid grid-cols-3">
                    <p className="col-span-2 grid items-center justify-start text-xl text-blue-700 font-bold">
                        {signedInUser.username} logged in
                    </p>
                    <div>
                        <button
                            onClick={() => {
                                navigate('/')
                                handleLogout()
                            }}
                            className="border-2 border-blue-950 text-lg px-8 hover:bg-white hover:text-blue-700 bg-blue-700 text-white font-bold py-2 rounded-lg"
                        >
                            logout
                        </button>
                    </div>
                </div>

                <div className="border-2 border-black shadow-2xl rounded-lg py-4">
                    <div className="px-4">
                        <h2 className="text-2xl font-semibold">
                            {blog.title} by {blog.author}
                        </h2>
                    </div>
                    <div className="py-4 px-4">
                        <a href={blog.url} className="text-base text-blue-700">
                            {blog.url}
                        </a>
                    </div>
                    <div className="pb-2 px-4 grid grid-cols-2 text-lg font-bold">
                        <h4 className="col-span-1 grid items-center">
                            {blog.likes} Likes
                        </h4>
                        <button
                            onClick={() => handleLikeChange(blog.id, blog)}
                            className="col-span-1 border-2 border-blue-950 text-lg px-8 hover:bg-white hover:text-blue-700 bg-blue-700 text-white py-2 rounded-lg"
                        >
                            Like
                        </button>
                    </div>
                    <div className="py-4 px-4 text-lg font-semibold">
                        {blog.user === undefined ? null : (
                            <h3>Added by {blog.user.name}</h3>
                        )}
                    </div>

                    <div className="py-4 px-4">
                        <h1 className="text-2xl font-extrabold">Comments</h1>
                        <div className="pt-4 grid grid-cols-5 gap-2">
                            <textarea
                                name="comment"
                                id="comment"
                                className="col-span-3 border-2 border-black resize-none px-4 py-2 rounded-lg text-lg max-h-12"
                                onChange={handleTextAreaChange}
                            ></textarea>
                            <button
                                onClick={() =>
                                    handleAddComment(
                                        blogId,
                                        comment,
                                        setComment
                                    )
                                }
                                className="col-span-2 border-2 border-blue-950 bg-blue-700 text-white hover:bg-white hover:text-blue-700 px-1 whitespace-nowrap py-2 rounded-lg"
                            >
                                Add comment
                            </button>
                        </div>
                        <ul className="pt-4 grid gap-3 text-lg font-semibold">
                            {blog.comments === undefined
                                ? null
                                : blog.comments.map((blogComment, index) => (
                                      <div
                                          className="grid grid-cols-10"
                                          key={blogComment._id}
                                      >
                                          <li className="col-span-1">
                                              {index + 1}.
                                          </li>
                                          <li className="col-span-9">
                                              {blogComment.comment}
                                          </li>
                                      </div>
                                  ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Blog
