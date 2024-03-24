import { CreateQR } from "./createQR";
import jsPDF from "jspdf";
export async function downloadQRCodePDF(noteString) {
  const textForQR = noteString.toString();

  // Embed QR code image into the PDF
  const qrDataURL = await CreateQR(textForQR);
  const pdf = new jsPDF();
  pdf.addImage(qrDataURL, "JPEG", 25, 10, 100, 100); // Adjust position and size as needed
  pdf.text("This is note generated from CryptoCash.netlify.app", 25, 120);
  pdf.setFontSize(10);
  pdf.text(
    "To verify the note and withdraw funds, go to cryptoCash official website and open the withdraw note tab",
    25,
    130
  );
  // Download the PDF
  pdf.save("QRCode.pdf");
}
