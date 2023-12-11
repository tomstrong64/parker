import GoogleButton from 'react-google-button';

export function Login() {
    return (
        <div>
            <GoogleButton
                onClick={() => {
                    if (process.env.NODE_ENV === 'development')
                        return (window.location.href =
                            'http://localhost:3001/auth/google');
                    return (window.location.href = '/auth/google');
                }}
            />
        </div>
    );
}
