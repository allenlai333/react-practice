const { InputField } = window.App;


class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: false
        };

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
    }

    toggleEditMode() {
        this.setState({ editable: !this.state.editable });
    }

    renderViewMode() {
        const { onDelete, onToggle } = this.props;

        return (
            <div>
                <input type="checkbox"
                    checked={this.props.completed}
                    onChange={() => onToggle && onToggle(this.props.id)}
                />
                <span onDoubleClick={this.toggleEditMode}>{this.props.title}</span>
                <input type="button" value="X" onClick={() => onDelete && onDelete(this.props.id)} />
            </div>
        );
    }

    renderEditMode() {
        return (
            <InputField
                autoFocus
                placeholder="編輯待辦事項"
                defaultValue={this.props.title}
                onBlur={this.toggleEditMode}
                onKeyDown={this.keyDown}
                onSubmitTodo={this.submitEdit}
            />
        );
    }

    keyDown(e) {
        if (e.keyCode === 27) { //esc
            e.preventDefault();
            this.toggleEditMode();
        }
    }

    submitEdit(content){
        const { onUpdate } = this.props;
        onUpdate && onUpdate(content);
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
