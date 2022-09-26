user = (req, res) => {

    res.end('user controllers')
};
user1 = (req, res) => {

    res.end('user1 controllers')
};
user2 = (req, res) => {

    res.end('user2 controllers')
};

module.exports = {user,user1, user2}
