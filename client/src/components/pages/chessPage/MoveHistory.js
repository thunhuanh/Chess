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
           data:[
            {
              name: 'tien',
              age: '12'
             },
           ]
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