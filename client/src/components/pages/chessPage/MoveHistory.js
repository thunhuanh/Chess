import React from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import './styles/MoveHistory.css'

const columns = [{
  Header: 'Turn',
  accessor: 'turn'
}, {
  Header: 'Move',
  accessor: 'move',
}
]

class MoveHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
           data:[]
        }
        this.element = null;
    }


    renderHistory = (moveHistory) => {
        
        // moveHistory.map((obj, idx) => {
        //     let tempObj = {
        //         turn: idx + 1,
        //         move: obj
        //     }
        //     data.push(tempObj)
        // })

        // this.setState({
        //     data: data
        // })
    }

    componentWillReceiveProps(newProps) {
        let {data} = this.state;
        newProps.moveHistory.map((obj, idx) => {
            let tempObj = {
                turn: idx + 1,
                move: obj
            }
            console.log(tempObj)
            data.push(tempObj)
        })

        this.setState({
            data: data
        })
    }

    componentDidUpdate(){
        if (this.element !== null) {   
            this.element.scrollIntoView({behavior: 'smooth' });
        }
    }
    
    render() {
        const {data} = this.state
        return(
            <div className='moveHistory'>
                <p id='mhTitle'>Move history</p>
                <div className='moveList'>
                <ReactTable
                  data={data}
                  columns={columns}
                  showPagination={false}
                />
                </div>
            </div>
        );
    }
}
export default MoveHistory;