import { CreateQR } from "./createQR";
import jsPDF from "jspdf";
export async function downloadQRCodePDF(noteString, denomination, networkName) {
  const textForQR = noteString.toString();
  const qrDataURL = await CreateQR(textForQR);
  const pdf = new jsPDF();
  var { TextField } = jsPDF.AcroForm;
  pdf.setFontSize(30);
  pdf.text("Crpto Cash", 65, 14);
  pdf.addImage(qrDataURL, "JPEG", 45, 20, 100, 100);
  pdf.setTextColor("#808080");
  pdf.text("https://CryptoCash.netlify.app", 25, 140);
  pdf.setFontSize(23);
  pdf.text("Use the QR Code to withdraw the value.", 25, 130);
  pdf.text(`Value:${denomination} ETH`, 25, 150);
  pdf.text(`Network:${networkName}`, 25, 160);
  pdf.setTextColor("#808080");
  pdf.setFontSize(10);
  pdf.text("Transfer from:", 20, 185);
  let transferFromField = new TextField();
  transferFromField.Rect = [20, 190, 50, 30];
  transferFromField.multiline = true;
  pdf.addField(transferFromField);
  pdf.text("Transfer to:", 80, 185);
  let transferToField = new TextField();
  transferToField.Rect = [80, 190, 50, 30];
  transferToField.multiline = true;
  pdf.addField(transferToField);

  pdf.text("Comment:", 140, 185);
  let transferComment = new TextField();
  transferComment.Rect = [140, 190, 50, 30];
  transferComment.multiline = true;
  pdf.addField(transferComment);

  pdf.setFontSize(10);
  pdf.text(
    "You can add extra information about the transaction to comply with regulation.",
    20,
    180
  );
  pdf.save(`CrptoCash${denomination}ETH.pdf`);
}
