import { BookPreview } from "../cmp/BookPreview.jsx"
import { LongTxt } from "../cmp/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setBook(null)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    const getLabel = (date) => {
        const published = new Date(date);
        const now = new Date();
        const diffInYears = (now - published) / (1000 * 60 * 60 * 24 * 365); // Convert ms to years
    
        if (diffInYears > 10) return "More than 10 years ago – Vintage";
        if (diffInYears < 1) return "Less than a year ago – New";
        return null;
    };

    
    // Determine price color class
    const getPriceClass = (amount) => {
        if (amount > 150) return "red"; 
        if (amount < 20) return "green";
        return "";
    };
    
    // Determine reading category
    const getReadingCategory = (pageCount) => {
        if (pageCount > 500) return "Serious Reading";
        if (pageCount > 200) return "Decent Reading";
        if (pageCount < 100) return "Light Reading";
        return null;
    };

    if (!book) return <div className="loader">Loading...</div>
    console.log('book:', book)
    return (
        <section className="book-details">
            <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <h4>Subtitle: {book.subtitle}</h4>
            <h4>Authors: {book.authors.join(", ")}</h4>
            <h4>Published Date: {book.publishedDate}</h4>
            <h4>Description: </h4><LongTxt txt={book.description}/>
            <h4>Page Count: {book.pageCount}</h4>
            <h4>Categories: {book.categories.join(", ")}</h4>
            <h4>Thumbnail: {book.thumbnail}</h4>
            <h4>Language: {book.language}</h4>
            <h4 className={`font-bold ${getPriceClass(book.listPrice.amount)}`}>List Price: {book.listPrice.amount}</h4>
            <h4>{getReadingCategory(book.pageCount)}</h4>
            <h4>{getLabel(book.publishedDate)}</h4>
        </article>
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}