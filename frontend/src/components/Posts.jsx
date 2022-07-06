import React from "react";
import classes from "./Posts.module.css";
const Posts = ({ title, content, onClick }) => {
  return (
    <div className={classes.note} onClick={onClick}>
      <div className={classes.header}>
        <div>
          <p className={classes.title}>{title}</p>
        </div>
        <div>
          <a className={classes.close} href="#">
            X
          </a>
        </div>
      </div>
      <div className={classes.content}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Posts;
