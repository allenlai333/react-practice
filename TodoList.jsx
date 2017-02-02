const { TodoItem } = window.App;

class TodoList extends React.Component {
    render() {
        const { todos, onDeleteTodo } = this.props;

        return (
            <div>
                <ul>
                    {
                        todos.map((todo) => {
                            return (
                                <li key={todo.id}>
                                    <TodoItem 
                                        id={todo.id}
                                        title = {todo.title}
                                        completed = {todo.completed}
                                        onDelete={onDeleteTodo} 
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

window.App.TodoList = TodoList;