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


    renderHistory = () => {
        const {moveHistory} = this.props;
        const {data} = this.state;
        moveHistory.map((data, idx) => {
            let tempObj = {
                turn: idx + 1,
                move: data
            }
            data.push(tempObj)
        })

        this.setState({
            data: data
        })
    }

    componentWillReceiveProps() {
        this.renderHistory()
    }

    componentDidUpdate(){
        if (this.element !== null) {   
            this.element.scrollIntoView({behavior: 'smooth' });
        }
    }
    
    render() {
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