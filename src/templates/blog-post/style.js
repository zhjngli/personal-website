import { css } from 'glamor';

import colors from '../../theme/colors';
import { scale } from '../../theme/typography';

export default {
  tagsContainer: css({
    ...scale(-2 / 5),
    display: `block`
  }),
  tagsSection: css({
    fontStyle: `normal`,
    textAlign: `left`,
    color: colors.light
  }),
  minorLink: css({
    color: colors.light,
    borderColor: colors.light,
    ':hover': {
      color: colors.light,
      borderColor: colors.linkHover
    }
  }),
  postNavigation: css({
    ...scale(-2 / 5)
  }),
  nextPost: css({
    float: `right`,
    marginLeft: `1rem`
  }),
  prevPost: css({
    float: `left`,
    marginRight: `1rem`
  })
};
