function LoginForm({
    username,
    password,
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
}) {
    return (
        <main className="row-span-4 grid items-center justify-center">
            <div className="h-fit w-fit px-8 py-16 border-2 shadow-lg grid gap-4 rounded-lg">
                <h2 className="text-3xl text-center font-extrabold">
                    Log in to application
                </h2>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid grid-cols-3 gap-4 px-3 py-4">
                        <label className="grid place-items-center text-xl font-bold">
                            username
                        </label>
                        <input
                            autoComplete="off"
                            type="text"
                            value={username}
                            name="Username"
                            onChange={handleUsernameChange}
                            className="col-span-2 my-1 p-3 border-2 border-black rounded-md"
                            id="usernameField"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4 px-3 py-4">
                        <label className="grid place-items-center text-xl font-bold">
                            password
                        </label>
                        <input
                            autoComplete="off"
                            type="password"
                            value={password}
                            name="Password"
                            onChange={handlePasswordChange}
                            className="col-span-2 my-1 p-3 border-2 border-black rounded-md"
                            id="passwordField"
                        />
                    </div>
                    <div className="pt-4 grid items-center justify-center">
                        <button
                            type="submit"
                            className="border-2 border-black hover:bg-white hover:text-blue-700 text-lg px-8 bg-blue-700 text-white font-bold py-2 rounded-lg"
                        >
                            login
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default LoginForm
