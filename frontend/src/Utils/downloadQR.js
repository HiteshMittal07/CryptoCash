import { CreateQR } from "./createQR";
import jsPDF from "jspdf";
export async function downloadQRCodePDF(noteString) {
  const textForQR = noteString.toString();

  const qrDataURL = await CreateQR(textForQR);
  const pdf = new jsPDF();
  pdf.addImage(qrDataURL, "JPEG", 25, 10, 100, 100);
  pdf.text("This is note generated from CryptoCash.netlify.app", 25, 120);
  pdf.setFontSize(10);
  pdf.text(
    "To verify the note and withdraw funds, go to cryptoCash official website and open the withdraw note tab",
    25,
    130
  );
  pdf.save("QRCode.pdf");
}
