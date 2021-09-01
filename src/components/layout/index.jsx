import { Link } from 'gatsby';
import React from 'react';
import FadeIn from 'react-fade-in';

import styles from './style';

class Layout extends React.Component {
  render() {
    return (
      <div {...styles.container}>
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
        <main {...styles.mainContainer}>
          <FadeIn>{this.props.children}</FadeIn>
        </main>
        <footer {...styles.footerContainer}>&copy; 2021.</footer>
      </div>
    );
  }
}

export default Layout;
