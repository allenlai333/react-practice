const actionTypes = window.App.ActionTypes;
const appDispatcher = window.App.AppDispatcher;

const CHANGE_EVENT = 'CHANGE';

const _emitter = new EventEmitter();

// 管理資料及資料的業務邏輯
//----------------------------------------------------------------
let _todos = [
    {
        id: 9,
        title: '明天跟朋友吃飯',
        completed: false
    }
];

const _deleteTodo = (todos, id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) todos.splice(index, 1);
    return todos;
}

const _toggleTodo = (todos, id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].completed = !todos[index].completed;
    return todos;
}

const _createTodo = (todos, title) => {
    todos.push({
        id: todos[todos.length - 1].id + 1,
        title,
        completed: false
    });
    return todos;
}

const _updateTodo = (todos, id, title) => {
    const target = todos.find((todo) => todo.id === id);
    if (target) target.title = title;
    return todos;
};
//--------------------------------------------------------------------

window.App.TodoStore = {
    // getter API
    getAll() {
        return _todos;
    },

    //提供 View 註冊改變事件的 API，並回傳註銷函數
    addChangeListener(callback) {
        _emitter.on(CHANGE_EVENT, callback);
        return () => _emitter.removeListener(CHANGE_EVENT, callback);
    },

    dispatchToken: appDispatcher.register((action) => {
        switch (action.type) {
            case actionTypes.LOAD_TODOS_SUCCESS:
                _todos = action.todos;
                _emitter.emit(CHANGE_EVENT);
                break;
            case actionTypes.CREATE_TODO:
                _todos = _createTodo(_todos, action.title);
                _emitter.emit(CHANGE_EVENT);
                break;
            case actionTypes.UPDATE_TODO:
                _todos = _updateTodo(_todos, action.id, action.title);
                _emitter.emit(CHANGE_EVENT);
                break;
            case actionTypes.TOGGLE_TODO:
                _todos = _toggleTodo(_todos, action.id);
                _emitter.emit(CHANGE_EVENT);
                break;
            case actionTypes.DELETE_TODO:
                _todos = _deleteTodo(_todos, action.id);
                _emitter.emit(CHANGE_EVENT);
                break;
        }

    })
};