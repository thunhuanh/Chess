import React from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import './styles/MoveHistory.css'
import update from 'react-addons-update'



class MoveHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 1,
            data: []
        }
        this.element = null;
    }

    notContainedIn = (arr) => {
        return function arrNotContains(element) {
            return arr.indexOf(element) === -1;
        };
    }

    symmDiff = (a, b) => {
        return a.filter(this.notContainedIn(b)).concat(b.filter(this.notContainedIn(a)));
    }

    componentWillReceiveProps(newProps) {
        let counter = this.state.counter;
        let data = this.state.data;
        let oldMoveHistory = this.props.moveHistory;
        let move = this.symmDiff(newProps.moveHistory, oldMoveHistory);

        if (move[0] !== undefined){
            const newData = update(data, {$push: [{turn: counter, move: move[0]}]})

            console.log(newData)
            this.setState({
                data: newData, 
                counter: counter + 1
            })
        }
    }

    componentDidUpdate(){
        if (this.element !== null) {   
            this.element.scrollIntoView({behavior: 'smooth' });
        }
    }
    
    render() {
         
        const columns = [
            {
                Header: 'Turn',
                accessor: 'turn'
            },{
                Header: 'Move',
                accessor: 'move',
            }
        ]

        return(
            <div className='moveHistory'>
                <p id='mhTitle'>Move history</p>
                <div className='moveList'>
                <ReactTable
                  data={this.state.data}
                  columns={columns}
                  showPagination={false}
                />
                </div>
            </div>
        );
    }
}
export default MoveHistory;