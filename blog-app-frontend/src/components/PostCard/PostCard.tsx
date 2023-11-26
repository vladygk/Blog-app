import React from "react";
import styles from "./PostCard.module.scss";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaAngleRight,FaPlusSquare } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const PostCard: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Lorem ipsum dolor sit amet</div>
      <div className={styles.detailsWrapper}>
        <div className={styles.author}>Ahmed Ahmed</div>
        <div className={styles.date}>26.11.2023</div>
      </div>
      <p className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sint,
        vitae debitis rem accusamus fugit aut mollitia fuga cum tempore culpa
        voluptate, voluptatibus corrupti ut incidunt! Laboriosam, a in. Minus?
        Natus iusto quaerat consequuntur earum dicta laboriosam cumque et eos
        rem accusamus accusantium perferendis expedita omnis, laborum labore?
        Sint voluptas odit nisi voluptates rerum corrupti sed totam nihil
        doloribus deserunt. Beatae ratione iste, asperiores minus obcaecati eos
        labore iusto tempora quasi, repudiandae sed repellat esse! Fuga, maxime
        dignissimos quidem corporis laboriosam eum optio. Eveniet tenetur ipsa
        maiores quos fugit sapiente?
      </p>
      <div className={styles.controlsWrapper}>
        <div className={styles.commentControls}>
          <FaAngleRight className="iconButton" size={40}/>
          <FaPlusSquare className="iconButton" size={40}/>
        </div>
        <div className={styles.postControls}>
          <FaEdit className="iconButton" size={40}/>
          <MdDelete className="iconButton" size={40}/>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
