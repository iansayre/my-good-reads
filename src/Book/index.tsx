import React from 'react';

interface Props {
  authors: string[],
  description: string,
  image: string,
  publisher: string,
  publishedDate: string,
  title: string,
}

const Book = (props: Props) => {
  const {authors, description, image, publisher, publishedDate, title} = props;

  return (
    <div className="book">
      <img className="img-thumb" src={image} />
      <div className="title">{title}</div>
      <div className="author">
        {authors.map(author => <span>{author}</span>)}
      </div>
      <div className="publish--container">
       {publisher && <span className="publisher">{publisher}</span>}
        <span className="date">{publishedDate}</span>
      </div>
      <p className="desc">{description}</p>
    </div>
  );
};

export { Book };