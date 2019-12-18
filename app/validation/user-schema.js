const userSchema = {
    'required': ['login', 'password', 'age'],
    'properties': {
        'login': { 'type': 'string', 'minLength': 3 },
        'password': { 'type': 'string', 'pattern': '(?=.*[0-9])' },
        'age': { 'type': 'number', 'maximum': 130, 'minimum': 4 }
    }
};

module.exports = userSchema;
