
class TodoHeader extends React.Component{
    render(){
        const { headerTitle, username, todoCount } = this.props;

        return (
            <div>
                <h1>{headerTitle}</h1>
                <h2>Hi,{username},未完成的待辦事項有{todoCount}項</h2>
            </div>
        );
    }
}

TodoHeader.propTypes = {
  headerTitle: React.PropTypes.string,
  username: React.PropTypes.string,
  todoCount: React.PropTypes.number
};

TodoHeader.defaultProps = {
  headerTitle: '我的待辦清單',
  username: '訪客',
  todoCount: 0
};

window.App.TodoHeader = TodoHeader;
