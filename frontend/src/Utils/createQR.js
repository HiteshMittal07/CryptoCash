import { AwesomeQR } from "awesome-qr";

export async function CreateQR(noteString) {
  const buffer = await new AwesomeQR({
    text: noteString,
    size: 500,
  }).draw();

  return buffer;
}
