import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

// import { useState } from 'react'


// import ManageDatabase from './components/Database/ManageDatabase'
// import NewSC from './components/NewSC'
// import Reports from './components/Reports'

import NavigationBar from './components/Navbar'
import Home from './components/Home'
import { SQLTable } from './components/Table'
import Vega from './components/Vega'
import VegaLite from './components/VegaLite'


const App = () => {
  const padding = {
    padding: 10
  }

  const tables = [
    { name: "branch", id: 1 },
    { name: "department_program", id: 2 },
    { name: "research_centre", id: 3 },
    { name: "building", id: 4 },
    { name: "communication_method", id: 5 },
    { name: "category", id: 6 },
    { name: "responsible", id: 7 },
    { name: "status", id: 8 }
  ]

  const navbar = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Table",
      path: "/database/tables/branch"
    },
    {
      name: "VegaLite",
      path: "/VegaLite"
    },
    {
      name: "Dropdown",
      path: "/",
      items: [
        {
          name: "Home",
          path: "/"
        },
        {
          name: "Link",
          path: "/"
        }, 
      ]
    },
  ]


  return (
    <Router>
      <NavigationBar items={navbar}></NavigationBar>
      <div className="mt-5"></div>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/vega' element={<Vega />}></Route>
          <Route path='/VegaLite' element={<VegaLite />}></Route>
          <Route path='/database/tables/:table' element={<SQLTable />}></Route>
        </Routes>
      </div>
    </Router>
  )
}
// <Route path='/str/:table' element={<Table tables={tables} />} />
export default App;