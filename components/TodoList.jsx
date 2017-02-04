const { TodoItem } = window.App;

class TodoList extends React.Component {
    render() {
        const { todos, onDeleteTodo, onToggleTodo, onUpdateTodo } = this.props;

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
                                        onToggle={onToggleTodo} 
                                        onUpdate={(content) => onUpdateTodo && onUpdateTodo(todo.id, content)}
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