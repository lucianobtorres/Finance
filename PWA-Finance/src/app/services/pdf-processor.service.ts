import { Injectable } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

@Injectable({
  providedIn: 'root'
})
export class PdfProcessorService {
  async processPdf(file: File): Promise<string[]> {
    const pdfTexts: string[] = [];

    const loadingTask =  pdfjs.getDocument(file.webkitRelativePath);

    const pdfDocument = await loadingTask.promise;

    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const pdfPage = await pdfDocument.getPage(i);
      const textContent = await pdfPage.getTextContent();
      const text = textContent.items.map(item => (<TextItem>item).str).join(' ');
      pdfTexts.push(text);
    }

    return pdfTexts;
  }
}
