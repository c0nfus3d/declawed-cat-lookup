var request = require('request');
var cheerio = require('cheerio');

/**
 * fetchCat
 * Fetch cat information from parsed url
 */
var fetchCat = function(url) {
    url = "http://www.petango.com/webservices/adoptablesearch/" + url;
    request({
        url: url,
        headers: {
            'User-Agent': 'c0nfus3d <+https://github.com/c0nfus3d>'
        }
    }, function(err, resp, body) {
        if (err) console.log(err);
        $ = cheerio.load(body);

        console.log(
            $("#lbName").text() +
            " - " +
            $("#trDeclawed").text().replace(/[\r\n]/g, '').split("Declawed")[1].trim()
        );
    });
};

/** Load available cats */
var url = "http://www.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=Cat&sex=A&agegroup=All&location=&site=&onhold=A&orderby=ID&colnum=3&css=http://cathaven.ehclients.com/assets/css/catlistings.css&authkey=13bdekqnmlov3usxre52it28sxrj8dp1ghkpbfex523ooi2rd3&recAmount=&detailsInPopup=Yes&featuredPet=Include&stageID=";

request({
    url: url,
    headers: {
        'User-Agent': 'c0nfus3d <+https://github.com/c0nfus3d>'
    }
}, function(err, resp, body) {
    if (err) console.log(err);
    $ = cheerio.load(body);

    $(".list-animal-name a").each(function() {
        var url = $(this).attr('href').split("'")[1].split("&css=")[0];
        fetchCat(url);
    });
});
