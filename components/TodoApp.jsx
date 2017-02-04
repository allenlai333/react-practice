const { InputField, TodoHeader, TodoList } = window.App;

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

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        fetch('./todos.json')
            .then((response) => response.json())
            .then((todos) => this.setState({ todos: todos }));
    }

    render() {
        const { todos } = this.state;

        const todoHeaderProps = {
            headerTitle: '我的紀錄本',
            username: 'Allen',
        };

        return (
            <div>
                <TodoHeader
                    {...todoHeaderProps}
                    todoCount={todos.filter((todo) => !todo.completed).length}
                />
                <InputField placeholder="新增待辦"
                    onSubmitTodo={(title) =>
                        this.setState({
                            todos: _createTodo(todos, title)
                        })
                    }
                />
                <TodoList
                    todos={todos}
                    onDeleteTodo={
                        (id) => this.setState({
                            todos: _deleteTodo(todos, id)
                        })
                    }
                    onToggleTodo={
                        (id) => this.setState({
                            todos: _toggleTodo(todos, id)
                        })
                    }
                    onUpdateTodo={
                        (id, title) => this.setState({
                            todos: _updateTodo(todos, id, title)
                        })
                    }
                />
            </div>
        );
    }
}

window.App.TodoApp = TodoApp;
