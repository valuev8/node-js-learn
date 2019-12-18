const getAutoSuggestUsers = (users = [], loginSubstring = '', limit) => {
    return users.filter((user) => user.login
        .toLowerCase()
        .includes(loginSubstring.toLowerCase()))
        .slice(0, limit);
};


module.exports = getAutoSuggestUsers;
