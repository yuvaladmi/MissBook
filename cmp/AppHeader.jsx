const {  NavLink } = ReactRouterDOM


export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>React Book App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about"  >About</NavLink>
                    <NavLink to="/book" >Books</NavLink>
                </nav>
            </section>
        </header>
    )
}