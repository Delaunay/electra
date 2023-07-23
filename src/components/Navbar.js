import {Link} from 'react-router-dom'

const NavDropdown = ({name, path, items}) => {
    return (
    <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to={path} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {name}
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {items.map(item => {
                <Link key={item.name} className="dropdown-item" to={item.path}>{item.name}</Link>
            })}
        </div>
    </li>
    )
}

const NavItem = ({name, path}) => {
    // <span className="sr-only">(current)</span>
    return (
        <li className="nav-item active"><Link className="nav-link" to={path}>{name}</Link></li>
    )
}

const NavSearch = () => {
    return (
    <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    )
}

const NavigationBar = ({items}) => {
    return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <Link className="navbar-brand" to="/">Navbar</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                {items.map(item => {
                    if (item.hasOwnProperty('items')) {
                        return <NavDropdown key={item.name} name={item.name} path={item.path} items={item.items}></NavDropdown>
                    }
                    return <NavItem key={item.name} name={item.name} path={item.path}></NavItem>
                })}
            </ul>

            <NavSearch></NavSearch>
        </div>
        </nav>
    </div> 
    )
}

export default NavigationBar;