const { TodoAction, TodoStore, TodoHeader } = window.App;

class TodoHeaderContainer extends React.Component{
    constructor(){
        super();

        this.state = {
            todos: TodoStore.getAll()
        };
    }

    componentDidMount(){
        this._removeChangeListener = TodoStore.addChangeListener(
            () => this.setState({ todos: TodoStore.getAll() })
        );
    }

    componentWillUnmount() {
        this._removeChangeListener();
    }

    render(){

        return (
            <TodoHeader 
                headerTitle="我的紀錄本"
                username="Allen"
                todoCount={this.state.todos.filter((todo) => !todo.completed).length}
            />
        );
    }

}

window.App.TodoHeaderContainer = TodoHeaderContainer;