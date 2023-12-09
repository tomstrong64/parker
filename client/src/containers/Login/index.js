import GoogleButton from 'react-google-button';

export function Login() {
    return (
        <div>
            <GoogleButton
                onClick={() => {
                    if (process.env.NODE_ENV === 'development')
                        window.location.href =
                            'http://localhost:3001/auth/google';
                    window.location.href = '/auth/google';
                }}
            />
        </div>
    );
}
