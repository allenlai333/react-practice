const { InputField, TodoActions } = window.App;

class CreateTodoFieldContainer extends React.Component{

    render(){
        return (
            <InputField 
                placeholder="新增待辦事項"
                onSubmitTodo={ TodoActions.createTodo }
            />
        );
    }
}

window.App.CreateTodoFieldContainer = CreateTodoFieldContainer;