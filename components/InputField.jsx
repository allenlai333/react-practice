
class InputField extends React.Component {
    //當元件產生時，只會執行一次，之後有觸發this.setState()此constructor也不會再執行
    constructor(props){
        super(props);
        // this.state = {
        //     value: this.props.value || ''
        // };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleKeyDown(event){
        const { onSubmitTodo, onKeyDown } = this.props;
        const { value } = event.target;
        switch(event.keyCode){
            case 13:
                if(value.trim()){
                    onSubmitTodo && onSubmitTodo(value);
                }
                event.target.value = '';
                break;
        }

        onKeyDown && onKeyDown(event);
    }

    render() {
        return (
            <div>
                <input type="text" {...this.props}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    onSubmitTodo: React.PropTypes.func
};

window.App.InputField = InputField;