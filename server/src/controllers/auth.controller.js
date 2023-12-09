export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        if (process.env.NODE_ENV === 'development')
            return res.redirect('http://localhost:3000/');
        return res.redirect('/');
    });
};

export const googleCallback = async (req, res) => {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development')
        return res.redirect('http://localhost:3000/');
    return res.redirect('/');
};
