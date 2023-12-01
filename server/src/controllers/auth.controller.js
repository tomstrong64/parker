import jwt from 'jsonwebtoken';

export const googleCallback = async (req, res) => {
    const token = jwt.sign(
        {
            // week expiration
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            user: req.user,
        },
        process.env.JWT_SECRET
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    return res.redirect('/');
};
