const { ActionTypes, AppDispatcher } = window.App;

//Action Creator
window.App.TodoActions = {
    createTodo(title){
        AppDispatcher.dispatch({
            type: ActionTypes.CREATE_TODO,
            title
        });
    },

    loadTodos(){
        setTimeout(() => {
            fetch('../todos.json')
                .then((response) => response.json())
                .then((todos) => AppDispatcher.dispatch({
                    type:ActionTypes.LOAD_TODOS_SUCCESS,
                    todos
                }))}
        , 2000);
    },

    updateTodo(id, title){
        AppDispatcher.dispatch({
            type: ActionTypes.UPDATE_TODO,
            id,
            title
        });
    },

    toggleTodo(id){
        AppDispatcher.dispatch({
            type: ActionTypes.TOGGLE_TODO,
            id
        });
    },

    deleteTodo(id){
        AppDispatcher.dispatch({
            type: ActionTypes.DELETE_TODO,
            id
        });
    },
    
}

/*  登入驗證
const loginActionCreator = (username, password) => {
    let loginAction = {
        type: ActionTypes.LOGIN,
        username,
        password
    }

    AppDispatcher.dispatch(loginAction);
}*/