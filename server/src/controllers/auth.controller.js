export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        return res.redirect('http://localhost:3000/');
    });
};

export const googleCallback = async (req, res) => {
    return res.redirect('http://localhost:3000/');
};
