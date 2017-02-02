const { InputField, TodoHeader, TodoList } = window.App;

const _deleteTodo = (todos, id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if(index !== -1) todos.splice(index, 1);
    return todos;
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    id: 0,
                    title: '今天要倒垃圾',
                    completed: false
                },
                {
                    id: 1,
                    title: '嵌入式系統專題實作',
                    completed: false
                },
                {
                    id: 2,
                    title: '電腦攻防的作業',
                    completed: false
                },
                {
                    id: 3,
                    title: '虛擬實境VR的Review',
                    completed: true
                },
                {
                    id: 4,
                    title: '明天要洗衣服',
                    completed: false
                },
            ]
        };
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
                <InputField placeholder="新增待辦" />
                <TodoList 
                    todos={todos} 
                    onDeleteTodo={
                        (id) => this.setState({
                            todos: _deleteTodo(todos, id)
                        })
                    }
                />
            </div>
        );
    }
}

window.App.TodoApp = TodoApp;
