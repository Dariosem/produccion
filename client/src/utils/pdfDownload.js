import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = (capture, name) => {
  const fileName = `${name}.pdf`
  html2canvas(capture).then((canvas) => {
    const imgData = canvas.toDataURL('img/png');
    const doc = new jsPDF('p','mm','a4');
    const componentWidth = doc.internal.pageSize.getWidth();
    const componentHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imgData,'PNG', 0, 0,componentWidth, componentHeight);
    doc.save(fileName);
  })
}