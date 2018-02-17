import React from 'react';


function ListItem(props) {

  var arr = props.repos;
  console.log(arr);
  const listItems = arr.map((repo, index) =>
    <li key={index}>{repo.username} <a href={repo.url}>{repo.reponame}</a>... forks = {repo.forks},</li> 
  );

  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
};

export default ListItem;


// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     <ListItem key={number.toString()}
//               value={number} />

//   );
//   return (
//     <ul>
//       {listItems}
//     </ul>
//   );
// }