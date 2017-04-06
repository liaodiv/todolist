/**
 * Created by 27353 on 2017/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';


class TodoItem extends React.Component{   ///todo一行内容
    constructor(props){
        super(props);
        this.state = {data:this.props.data};
    }
    toggleComplete() {              ///已完成按钮
    this.props.toggleComplete(this.props.taskId);
    }
    handlerMouseOver(){

    }
    Itdelete(){   ///删除使节点不可见，再删除数据
        console.log(this.props);
       this.props.delete(this.props.index);
    }
    render(){
        console.log(this.props);
        return(
            <li className="list-group-item list-group-item-success">
                <input className="pull-left " type="checkbox" checked={this.state.data.complete}/>
                <span><s>{this.state.data.task}</s></span>
                <button className="pull-right" onClick={this.Itdelete.bind(this)}>delete</button>
            </li>
        )
    }

}


class TodoMain extends React.Component{
  /*  constructor(props) {
        super(props);

        this.List = props.data.map(function (listItem,index) {
            return (
                <TodoItem data={listItem} index={index} delete={this.props.delete.bind(this)} />
            )
        },this);
    }
    func () {

    }*/
    render(){
        console.log(this.props);
        return(
            <ul className="list-group">
                {this.props.data.map((todo, index) => {
                    return <TodoItem index={index} data={todo} delete={this.props.delete.bind(this)}/>
                })}
            </ul>
        )
    }
}

class TodoBox extends React.Component {   ///todo根目录
    constructor(){
        super();
        this.state = {data:[
            {"id": "0001", "task":"吃饭", "complete": "false"},
            {"id": "0002", "task":"睡觉", "complete": "false"},
            {"id": "0003", "task":"打豆豆", "complete": "true"},
        ]};

    }
    deleteItem(index){
        let data=this.state.data;
        data.splice(index,1);
        this.setState({data:data});

    }
    submit(task){

}

    render(){
        return(
            <TodoMain data={this.state.data} delete={this.deleteItem.bind(this)}/>
        )
    }
}





ReactDOM.render(
    <TodoBox/>,
    document.getElementById('root')
);

