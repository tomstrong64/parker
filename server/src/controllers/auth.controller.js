export const logout = (req, res) => {
    req.logout();
    return res.redirect('http://localhost:3000/');
};

export const googleCallback = async (req, res) => {
    return res.redirect('http://localhost:3000/');
};
