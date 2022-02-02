const fs = require('fs');
const hbs = require('handlebars');
const pdf = require('html-pdf');


const renderTemplate = ( filename, data ) => {
    let source   = fs.readFileSync(filename,'utf8').toString();
    let template = hbs.compile(source);
    let output = template(data);
    return output;
}



const generatePdf = ( html ) => {

    pdf.create(html).toFile('./reports/example.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
}



module.exports = {
    renderTemplate,
    generatePdf
}

// console.log(result);


