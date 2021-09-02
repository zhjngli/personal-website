import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import FadeIn from 'react-fade-in';
import { Helmet } from 'react-helmet';

import styles from './style';

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <div className={styles.container}>
      <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={`${data.site.siteMetadata.title}`}>
        <html lang="en" />
        <meta name="description" content={`${data.site.siteMetadata.description}`} />
      </Helmet>
      <header className={styles.headerContainer}>
        <nav>
          <Link to={'/'} className={styles.title} activeClassName={styles.activeNavLink}>
            ƶli
          </Link>
          <Link to={'/about'} className={styles.navLink} activeClassName={styles.activeNavLink}>
            about
          </Link>
          <Link to={'/contact'} className={styles.navLink} activeClassName={styles.activeNavLink}>
            contact
          </Link>
          <Link to={'/tags'} className={styles.navLink} activeClassName={styles.activeNavLink}>
            tags
          </Link>
        </nav>
      </header>
      <main className={styles.mainContainer}>
        <FadeIn>{children}</FadeIn>
      </main>
      <footer className={styles.footerContainer}>&copy; 2021.</footer>
    </div>
  );
}
