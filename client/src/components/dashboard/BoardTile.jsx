import React from "react";
import { Link } from "react-router-dom";
// import data from '../../data/BoardData';

const BoardTile = props => (
  <li className="board-tile">
    <Link to={`/boards/${props.id}` }>
      <span className="board-title">{props.title}</span>
    </Link>
  </li>
);

export default BoardTile;
