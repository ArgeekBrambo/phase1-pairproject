// const jsPDF = require('jspdf')
// // const html2canvas = require('html2canvas')

// function exportToPdf() {
//   screenShot()
// }

// function screenShot() {
//   const input = document.getElementById('pdfSS')
//   html2canvas(input, {logging:true, letterRendering:1, useCORS:true})
//   .then (canvas => {
//       const imgWidth = 200;
//       const imgHeight =  canvas.height * imgWidth / canvas.width;
//       const imgData = canvas.toDataURL('img/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save('thegames.pdf')
//   })
// }

// module.exports = exportToPdf;

const {jsPDF} = require('jspdf')

const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [4,2]
})

const formatPDF = (text) => {
    doc.text(text, 1, 1)
    doc.save('doc/text.pdf')
}

module.exports = formatPDF;