import React, { FC } from "react";
import { LayoutType } from "../models/layout";
import styles from '../styles/Home.module.css';


export const Layout:FC <LayoutType> = (props) => {
    return <div className={styles.container}>{props.children}</div>
}