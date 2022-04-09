




let loginStat = false

if (localStorage.getItem("loginstatus")) {
    loginStat = localStorage.getItem("loginstatus");
}



var initialState = {
    username: 'defaultuser',
    password: '123456',
    accountAvatar: 'avatar1',
    loginStatus: loginStat,
    accountRole: 'writer',
};

export default function reducer1(state = initialState, action) {
    switch (action.type) {
        case 'UpdateUser':
            return Object.assign({}, state, { username: action.payload.username });
        case 'UpdatePassword':
            return Object.assign({}, state, { password: action.payload.password });
        case 'UpdateAvatar':
            return Object.assign({}, state, { accountAvatar: action.payload.accountAvatar });
        case 'LoginStatus':
            return Object.assign({}, state, { loginStatus: action.payload.loginStatus });
        case 'AccountRole':
            return Object.assign({}, state, { accountRole: action.payload.accountRole });
        case 'UpdateUserAndPassword':
            return Object.assign({}, state, {
                username: action.payload.username,
                password: action.payload.password
            });
        case 'ClearLoginInfo':
            return Object.assign({}, state, {
                username: '',
                password: '',
                accountAvatar: '',
            });
        default:
            return state;
    }
}