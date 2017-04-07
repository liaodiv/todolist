/**
 * Created by 27353 on 2017/4/5.
 */
import React from 'react';
import ReactDOM from 'react-dom';


class TodoItem extends React.Component{   ///todo一行内容
    constructor(props){
        super(props);

    }
    toggleComplete() {              ///已完成按钮
        let complete;
         if(this.props.data.complete=="true")
             complete = "false"
          else
              complete = "true";

        console.log(complete)

        this.props.edit(this.props.index,'complete',complete);
    }
    handlerMouseOver(){

    }
    Itdelete(){   ///删除使节点不可见，再删除数据
       this.props.edit(this.props.index,'delete');
    }
    render(){
        let task=this.props.data.task;
        if(this.props.data.complete == "true"){
            task=<s>{task}</s>;
        }
        return(
            <li className="list-group-item list-group-item-success">
                <input value="1" className="pull-left " type="checkbox" checked={this.props.data.complete == "true"} onChange={this.toggleComplete.bind(this)} />
                <span>{task}</span>
                <button className="pull-right" onClick={this.Itdelete.bind(this)}>delete</button>
            </li>
        )
    }

}

class TodoFoot extends React.Component{
    addItem(){
        let task = ReactDOM.findDOMNode(this.refs.task).value.trim();
        console.log(task.length)
        if(task.length >=2) {
            this.props.edit(0, 'add', task)
        }else {
            alert("输入信息过短");
        }

    }
    render(){
        return(
        <div className="form-group form-horizontal">
        <input type="text" ref="task" className="form-control" placeholder="你想做点什么"/>
            <input className="center-block" type="button" value="提交" onClick={this.addItem.bind(this)}/>
        </div>
        )
    }
}


class TodoMain extends React.Component{

    render(){
        return(
            <ul className="list-group">
                {this.props.data.map((todo, index) => {
                    return <TodoItem key={todo.id} index={index} data={todo} edit={this.props.edit.bind(this)}/>
                })}
                <hr/>
                <p>已完成{this.props.cout.todoCompleteCount}/总数{this.props.cout.todoCout}</p>
                <TodoFoot  edit={this.props.edit.bind(this)} />
            </ul>


        )
    }
}

class TodoBox extends React.Component {   ///todo根目录
    constructor(){
        super();
        this.state = {data:[

        ]};
        this.getdata(this.state);


    }
    getdata(state) {
        fetch('/getdata', {
            method: 'GET'
        }).then((rep) => {

            rep.json().then((data) => {    ///解析返回的数据
                console.log(data)
                this.setState({
                    data: data
                })
            })
        })
    }
    addItem(Item){
        console.log("addsuccess");
        fetch('/getdata', {
            method: 'POST',
            mode:'cors',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(Item)
        }).then((rep) => {

            rep.json().then((data) => {    ///解析返回的数据
                console.log(data)
            })
        }).catch(function (err) {
            console.log(err)
        })

    }
    delete(id){
        fetch('/delete/'+id, {
            method: 'DELETE'
        }).then((rep) => {

            rep.json().then((data) => {    ///解析返回的数据
                console.log(data)
               /* this.setState({
                    data: data
                })*/
            })
        })

    }
    put(index,query){
        fetch('/put/'+index+'?'+query, {
            method: 'PUT'
        }).then((rep) => {

            rep.json().then((data) => {    ///解析返回的数据
                console.log(data)
                /* this.setState({
                 data: data
                 })*/
            })
        })
    }


    edit(index,edit){
        let data=this.state.data;
        switch (edit)
        {
            case 'delete':
                data.splice(index,1);
                this.delete(index)
                break;
            case 'complete':
                data[index].complete = arguments[2];
                this.put(index,'complete='+arguments[2])
                break;
            case 'add': {
                let id = Math.floor(Math.random() * 9000) + 1000;
                data = data.concat([{"id": id, "task": arguments[2], "complete": "false"}])
                this.addItem({"id": id, "task": arguments[2], "complete": "false"})
                break;
            }


        }
        this.setState({data});


    }
    submit(task){

}

    render(){
        var statistics= {
            todoCout:this.state.data.length||0,
            todoCompleteCount: this.state.data.filter(function(item) {
                return item.complete =="true"; }).length
        }
        return(
            <TodoMain data={this.state.data} edit={this.edit.bind(this)} cout={statistics} />
        )
    }
}





ReactDOM.render(
    <TodoBox/>,
    document.getElementById('root')
);

