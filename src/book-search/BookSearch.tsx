import React, { MouseEvent, useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";
import { AvailableBooks, BooksItem, VolumeInfo } from './interfaces';
import Book from '../Book';
import ReadingListItem from '../ReadingListItem';

const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState<AvailableBooks>();
    const [selectedBooks, setSelectedBooks] = useState<VolumeInfo[]>([]);

    async function requestBooks() {
        if (bookTypeToSearch) {
            const allBooks = await getBooksByType(bookTypeToSearch);
            setAllAvailableBooks(allBooks);
        }
    }

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        getAllBooks();
    }, [bookTypeToSearch]);

    const handleBookClick = (vol: VolumeInfo) => {
        if (!selectedBooks.some(book => book.title === vol.title)) {
            setSelectedBooks([...selectedBooks, vol]);
        }
    }

    const handleRemoveClick = (vol: VolumeInfo): void => {
        const newSelectedBoooks = selectedBooks.filter(book => book.title !== vol.title);

        setSelectedBooks(newSelectedBoooks);
    }
    return (
            <>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={(e) => {
                                    debugger;
                                    e.preventDefault();
                                   updateBookTypeToSearch(bookType)
                                }}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={e => updateBookType(e.target.value)}
                                />
                            </form>
                            {!bookType && (
                                <div className="empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <a onClick={() => {
                                                updateBookType("Javascript");
                                            }}
                                        >
                                            {" "}
                                            "Javascript"
                                        </a>
                                    </p>
                                </div>
                            )}
                             {allAvailableBooks && (
                                <div className="results--container">
                                    {
                                        allAvailableBooks.items.map((book: BooksItem): JSX.Element => {
                                            const vol = book.volumeInfo;
                                            const bId = book.id;
                                            return (
                                                <Book key={bId} authors={vol.authors} description={vol.description} handleBookClick={() => handleBookClick(vol)} image={vol.imageLinks.thumbnail} publisher={vol.publisher} publishedDate={vol.publishedDate} title={vol.title}/>
                                            );
                                        })
                                    }
                                </div>
                            )}
                            <div className="sidebar">
                                <div className="reading-list-container">
                                    <div className="reading-list-counter">
                                        My Reading List {selectedBooks.length}
                                    </div>

                                    <div className="reading-list-content">
                                        {selectedBooks.map(book => (<ReadingListItem key={book.industryIdentifiers[0].identifier} title={book.title} handleRemoveClick={() => handleRemoveClick(book)}/>))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {                <pre>{JSON.stringify(allAvailableBooks, null, 4)}</pre>
                } */}
            </>
    );
};

export default BookSearch;
