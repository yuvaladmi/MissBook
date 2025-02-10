
export function BookPreview({ book }) {
    if (!book) return <div className="loader">Loading...</div>

    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <h4>Subtitle: {book.subtitle}</h4>
            <h4>Authors: {book.authors.join(", ")}</h4>
            <h4>Language: {book.language}</h4>
            <h4>List Price: {book.listPrice.amount}</h4>
        </article>
    )
}