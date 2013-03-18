var strfdate = require('../lib/strfdate'),
    error404 = require('./error404');

module.exports = function(req, res) {
  var selectedYear  = Number( req.params[0] || (new Date()).getFullYear() ),
      eventsForYear = req.app.get('events').getPastEventsForYear(selectedYear);

  if (! eventsForYear.length) {
    error404.call(this, req, res);
    return;
  }

  eventsForYear.forEach(function(item) {
    item.formattedDate = strfdate('%B %Y', item.date);
  });

  res.render(
    'talks',
    {
      title        : 'Talks ' + selectedYear,
      years        : req.app.get('events').getYears(),
      selectedYear : selectedYear,
      events       : eventsForYear
    }
  );
};




