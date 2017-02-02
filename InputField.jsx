
class InputField extends React.Component {
    render() {
        return (
            <div>
                <input type="text" {...this.props}/>
            </div>
        );
    }
}

window.App.InputField = InputField;