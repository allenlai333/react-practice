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
    if (index === -1) return todos;

    const newTodos = [...todos];
    newTodos.splice(idx, 1);
    return newTodos;
}

const _toggleTodo = (todos, id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return todos;

    const newTodos = [...todos];
    newTodos[index] = {
        ...todos[index],
        completed: !todos[index].completed
    }
    return newTodos;
}

const _createTodo = (todos, title) => {
    return [
        ...todos,
        {
            id: todos[todos.length - 1].id,
            title,
            completed: false
        }
    ];
}

const _updateTodo = (todos, id, title) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return todos;
    // 修改就回傳新陣列
    const newTodos = [...todos];
    newTodos[index] = {
        ...todos[index],
        title
    };
    return newTodos;
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