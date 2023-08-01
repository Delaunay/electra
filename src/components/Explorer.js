import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'

import NavigationBar from './Navbar'
import { Table } from './Table'


class RemoteDatabase {
    constructor(payload) {
    }
    get_building (event, payload)  {
        return window.SQLite3.get_building()
    }
    get_department_program (event, payload)  {
        return window.SQLite3.get_department_program()
    }
    get_research_centre (event, payload) {
        return window.SQLite3.get_research_centre()
    }
    get_communication_method (event, payload) {
        return window.SQLite3.get_communication_method()
    }
    get_category (event, payload)  {
        return window.SQLite3.get_category()
    }
    get_responsible (event, payload) {
        return window.SQLite3.get_responsible()
    }
    get_status (event, payload)  {
        return window.SQLite3.get_status()
    }
    get_branch (event, payload)  {
        return window.SQLite3.get_branch()
    }
    get_tables(event, payload) {
        return window.SQLite3.get_tables()
    }
};


let mapping = {
    "Building": "building",
    "CommunicationMethod": "communication_method",
    "DepartmentProgram": "department_program",
    "ResearchCentre": "research_centre",
    "IssueCategory": "category",
    "ResponsiblePerson": "responsible",
    "ProgressStatus": "status",
    "FollowUp": "status"
}

const TableSelector = ({tables}) => {
    return (
            <ul>
                {tables.map(item => {
                    return <li><Link to={"/database/tables/" + item.name}>{item.name}</Link></li>
                })}
            </ul>
    )
}


const DatabaseExplorerWithParam = () => {
    let db = new RemoteDatabase()
    let name = useParams().table

    const [tables, setTables] = useState([])
    const [rows, setRows] = useState([])

    useEffect(() => { 
        db.get_tables().then((result) => {
            console.log(result)
            setTables(result)
        })
    }, []);

    useEffect((args) => { 
        console.log(args)
        let method = 'get_' + name
        try {
            console.log(name, name)
            db[method]().then(result => {
                console.log(result)
                setRows(result)
            })
        } catch(err) {
            console.log(method)
            console.log(err)
            setRows([])
        }
    }, [name])

    return (
        <div className="row">
            <div className="col-2">
                <h3>Tables</h3>
                <TableSelector tables={tables}></TableSelector>
            </div>
            <div className="col-10">
                <h3>Table: {name}</h3>
                <Table rows={rows}></Table>
            </div>
        </div>
    )
}

const DatabaseExplorerSelectTable = () => {
    let db = new RemoteDatabase();
    let rows = [];

    const [tables, setTables] = useState([])
    
    useEffect(() => { 
        db.get_tables().then((result) => {
            console.log(result)
            setTables(result)
        })
    }, []);

    return (
        <div className="row">
             <div className="col-2">
                 <h3>Tables</h3>
                <TableSelector tables={tables}></TableSelector>
            </div>
            <div className="col-10">
                <h3>Data</h3>
                <Table rows={rows}></Table>
            </div>
        </div>
    )
}

export { DatabaseExplorerSelectTable, DatabaseExplorerWithParam };
