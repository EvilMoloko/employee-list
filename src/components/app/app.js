import { Component } from 'react';

import  './app.css';
import '../app-info/app-info';
import '../search-panel/search-panel'
import '../app-filter/app-filter'
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeeList from '../employee-list/employee-list';
import EmployeeAddForm from '../employee-add-form/employee-add-form';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John Smith', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Adam Thick', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Elon Wood', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'allEmp'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addNewItem = (name, salary) => {

        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }

        if (newItem.name.length < 2 || newItem.salary == false) {
            alert('Заполните поля о сотруднике');
        } else {
            this.setState(({data}) => { 
                return {
                    data: [...data, newItem]
                }
            });
        }

    }

    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);
        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        //     return {
        //         data: newArr
        //     }
        // });
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    // onToggleRise = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term});
    }

    filterPost = (items, filter) => {
        if (filter === 'allEmp') {
            return items
        }    
        if (filter === 'riseEmp') {
            return items.filter(item => item.rise)
        }    
        if (filter === 'salaryMore1000Emp') {
            return items.filter(item => item.salary > 1000)
        }
    }

    onFilterClick = (filter, e) => {
        this.setState({filter});

        document.querySelectorAll('.search-panel .btn-group button').forEach(item => {
            item.classList.remove("btn-light");
            item.classList.add("btn-outline-light");
        })
        e.currentTarget.classList.add("btn-light");
        e.currentTarget.classList.remove("btn-outline-light");
    }

   render() {
    const {data, term, filter} = this.state;
    const allCount = this.state.data.length;
    const increaseCount = this.state.data.filter(item => item.increase === true).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
        <div className="app">
            <AppInfo
            allCount={allCount}
            increaseCount={increaseCount}/>

            <div className="search-panel">
                <SearchPanel
                onUpdateSearch={this.onUpdateSearch}/>
                <AppFilter
                filter={filter}
                onFilterClick={this.onFilterClick}/>
            </div>

            <EmployeeList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
            
            <EmployeeAddForm
            onAdd={this.addNewItem}/>
        </div>
    )
   }
}

export default App;