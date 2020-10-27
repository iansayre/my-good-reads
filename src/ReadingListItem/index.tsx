import React from 'react';

interface Props {
  title: string,
  handleRemoveClick: () => void
}


const ReadingListItem = (props: Props) => {
  const { title, handleRemoveClick } = props;

  return (<>
    {title}
    <button onClick={handleRemoveClick}>x</button>
  </>)
}

export default ReadingListItem;