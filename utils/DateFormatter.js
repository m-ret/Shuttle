import moment from 'moment';

const momentDateFormatter = date => {
  moment.updateLocale('en', {
    meridiem: (hour, minute, isLowercase) => {
      if (hour >= 12) return isLowercase ? 'p.m.' : 'P.M.';
      return isLowercase ? 'a.m.' : 'A.M.';
    },
  });

  return moment(date).isValid() ? moment(date).format('h:mma') : 'Invalid Date';
};

export default momentDateFormatter;
