import { Link } from 'gatsby';
import React from 'react';

import SEO from '../seo';
import styles from './style';

export default function Layout({ children }) {
  return (
    <div {...styles.container}>
      <SEO />
      <header {...styles.headerContainer}>
        <nav>
          <Link to={'/'} {...styles.title} activeClassName={styles.activeNavLink}>
            ƶli
          </Link>
          <Link to={'/about'} {...styles.navLink} activeClassName={styles.activeNavLink}>
            about
          </Link>
          <Link to={'/contact'} {...styles.navLink} activeClassName={styles.activeNavLink}>
            contact
          </Link>
          <Link to={'/tags'} {...styles.navLink} activeClassName={styles.activeNavLink}>
            tags
          </Link>
        </nav>
      </header>
      <main {...styles.mainContainer}>{children}</main>
      <footer {...styles.footerContainer}>&copy; 2021.</footer>
    </div>
  );
}
