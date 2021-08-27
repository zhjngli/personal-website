import { css } from 'glamor';

import colors from '../../../theme/colors';
import presets from '../../../theme/presets';
import { scale } from '../../../theme/typography';

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
  tagLink: css({
    color: colors.light,
    borderColor: colors.light,
    ':hover': {
      color: colors.light,
      borderColor: colors.linkHover
    }
  }),
  date: css({
    color: colors.light,
    display: `block`,
    [presets.Tablet]: {
      float: `right`,
      marginLeft: `1rem`
    }
  })
};
