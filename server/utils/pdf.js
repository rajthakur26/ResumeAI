
const PDFDocument = require('pdfkit');

module.exports = function(data,res){
  const doc = new PDFDocument();
  res.setHeader('Content-Type','application/pdf');
  doc.pipe(res);

  doc.fontSize(20).text(data.title,{align:'center'});
  doc.moveDown();
  doc.fontSize(12).text("Summary:");
  doc.text(data.summary);
  doc.moveDown();
  doc.text("Skills: "+data.skills.join(", "));
  doc.moveDown();
  doc.text("Experience: "+data.experience);

  doc.end();
}
