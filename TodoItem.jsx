const { InputField } = window.App;


class TodoItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            editable: false
        };

        this.toggleEditMode= this.toggleEditMode.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    toggleEditMode() {
        this.setState({ editable: !this.state.editable });
    }

    renderViewMode() {
        const { onDelete } = this.props;

        return (
            <div>
                <input type="checkbox" checked={this.props.completed}/>
                <span onDoubleClick={this.toggleEditMode}>{this.props.title}</span>
                <input type="button" value="X" onClick={ ()=> onDelete && onDelete(this.props.id) }/>
            </div>
        );
    }

    renderEditMode(){
        return (
            <InputField 
                autoFocus
                placeholder="編輯待辦事項"
                value={this.props.title}
                onBlur={this.toggleEditMode}
                onKeyDown={this.keyDown}
            />
        );
    }

    keyDown(e){
        e.preventDefault();
        this.toggleEditMode();
    }


    render() {
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
}

TodoItem.propTypes = {
    id: React.PropTypes.number,
    title: React.PropTypes.string,
    completed: React.PropTypes.bool,
    onDelete: React.PropTypes.func
};

window.App.TodoItem = TodoItem;