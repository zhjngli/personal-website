import React from 'react';
import NetlifyForm from 'react-netlify-form';

import styles from './style';

/*
In netlify snippet injection:
I tested without this in the snippet injection, and the form still seemed to work properly.
According to https://www.npmjs.com/package/react-netlify-form, https://docs.netlify.com/forms/setup/
this needs to be server side rendered, but I haven't found that to be the case.
I left it in anyway for the honeypot.

Another option is to add the hidden form to the default layout, to avoid having to remember handling
the snippet injection, but as this seems to work fine, I neglected to test this option.

<form name="contact" netlify netlify-honeypot="say-hi" hidden>
  <input type="text" name="first_name" />
  <input type="text" name="last_name" />
  <input type="email" name="email" />
  <input type="text" name="subject" />
  <textarea name="message"></textarea>
</form>
*/
export default function Form() {
  return (
    <NetlifyForm name="contact">
      {({ loading, error, success }) => (
        <div {...styles.formContainer}>
          {loading && <p>Loading...</p>}
          {error && <p>Your submission was not sent. Please try again later.</p>}
          {success && <p>Thank you for the submission!</p>}
          {!loading && !success && (
            <>
              <div {...styles.formFieldsContainer}>
                <label>Name *</label>
                <span>
                  <div {...styles.nameContainer}>
                    <div {...styles.firstNameContainer}>
                      <input type="text" id="first_name" name="first_name" required />
                      <label htmlFor="first_name">First name</label>
                    </div>
                    <div {...styles.lastNameContainer}>
                      <input type="text" id="last_name" name="last_name" required />
                      <label htmlFor="last_name">Last name</label>
                    </div>
                  </div>
                </span>
              </div>
              <div {...styles.formFieldsContainer}>
                <label htmlFor="email">Email *</label>
                <span>
                  <input type="email" id="email" name="email" required />
                </span>
              </div>
              <div {...styles.formFieldsContainer}>
                <label htmlFor="subject">Subject *</label>
                <span>
                  <input type="text" id="subject" name="subject" required />
                </span>
              </div>
              <div {...styles.formFieldsContainer}>
                <label htmlFor="message">Message *</label>
                <span>
                  <textarea id="message" name="message" rows={3} required />
                </span>
              </div>
              <button {...styles.submitButton}>send message</button>
            </>
          )}
        </div>
      )}
    </NetlifyForm>
  );
}
