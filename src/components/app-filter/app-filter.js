import { Component } from 'react';

import './app-filter.css'

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const {onFilterClick} = this.props;
        return (
            <div className="btn-group">
                <button 
                    className="btn btn-light"
                    type="button"
                    data-filter="allEmp"
                    onClick={(e) => {onFilterClick(e.currentTarget.getAttribute("data-filter"), e)}}>
                        Все сотрудники
                    </button>
                <button 
                    className="btn btn-outline-light"
                    type="button"
                    data-filter="riseEmp"
                    onClick={(e) => {onFilterClick(e.currentTarget.getAttribute("data-filter"), e)}}>
                        На повышение
                    </button>
                <button  
                    className="btn btn-outline-light"
                    type="button"
                    data-filter="salaryMore1000Emp"
                    onClick={(e) => {onFilterClick(e.currentTarget.getAttribute("data-filter"), e)}}>
                        З/п больше 1000$
                    </button>
            </div>
        )
    }
}

export default AppFilter;