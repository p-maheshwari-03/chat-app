import React, { FC } from 'react';
import styles from '../styles/Home.module.css';

const Layout: FC<any> = (props: any) => (<div className={styles.container}>{props?.children}</div>);

export default Layout;