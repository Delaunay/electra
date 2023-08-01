
import { useState, useEffect } from 'react'

function objmap(obj, callback) {
    // Iterate over an object an create an array
    if (obj === null) {
        return [];
    }
    let results = []
    for (let [key, value] of Object.entries(obj)) {
        results.push(callback(key, value))
    }
    return results
}

const TableHeader = ({ rows }) => {
    if (rows.length === 0) {
        return
    }
    return (objmap(rows[0], (k, v) => <th key={counter()}>{k}</th>))
}


const TableRow = ({ row }) => {
    return (
        <tr>
            {objmap(row, (k, v) => <td key={counter()}>{v}</td>)}
        </tr>
    )
}


function Counter() {
    let x = 0
    return function () {
        return x++;
    }
}
let counter = Counter()


const Table = ({rows}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <TableHeader rows={rows}></TableHeader>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => <TableRow key={counter()} row={row}></TableRow>)}
            </tbody>
        </table>
    )
}


const SQLTable = () => {
    const [rows, setRows] = useState([])
    const name = 'branch'// useParams().table

    const table_to_method = {
        "branch": window.SQLite3.get_branch,
        "department_program": window.SQLite3.get_department_program,
        "research_centre": window.SQLite3.get_research_centre,
        "building": window.SQLite3.get_buildings,
        "communication_method": window.SQLite3.get_communication_method,
        "category": window.SQLite3.get_category,
        "responsible": window.SQLite3.get_responsible,
        "status": window.SQLite3.get_status,
    }

    useEffect(() => {
        const method = table_to_method[name]
        method().then((result) => {
            setRows(result)
        })
    }, [])

    return (
        <table className="table">
            <thead>
                <tr>
                    <TableHeader rows={rows}></TableHeader>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => <TableRow key={counter()} row={row}></TableRow>)}
            </tbody>
        </table>
    )
}


export {Table};
