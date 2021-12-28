import React, { FC } from 'react';
import styles from '../styles/Home.module.css';

export const Layout = (props: any) => (<div className={styles.container}>{props?.children}</div>);