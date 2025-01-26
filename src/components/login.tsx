export default function Login() {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold">Login with Google</h1>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Sign in with Google
            </button>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Guest
            </button>
        </div>
    );
}