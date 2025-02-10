
const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { BookFilter } from "../cmp/BookFilter.jsx"
import { BookList } from "../cmp/BookList.jsx"
import { bookService } from "../services/book.service.js"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
        console.log('Load Books');
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Cannot get books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Cannot remove book:', err)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>
    console.log(books);
    return (
        <section className="book-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/book/edit">Add Book</Link>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}