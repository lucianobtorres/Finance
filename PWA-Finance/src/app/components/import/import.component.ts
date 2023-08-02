import { Component, EventEmitter, Output } from '@angular/core';
import { PdfProcessorService } from 'src/app/services/pdf-processor.service';

@Component({
  selector: 'fi-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {
  @Output() fileImported = new EventEmitter<File>();

  constructor(private pdfProcessor: PdfProcessorService) { }

  async onFileChange(event: any): Promise<void> {
    {
      const file = event.target.files[0] as File;

      if (file.type === 'application/pdf') {
        const pdfTexts = await this.pdfProcessor.processPdf(file);

        // Processar cada linha do PDF e permitir ao usuário confirmar a importação
        for (const pdfText of pdfTexts) {
          const userConfirmed = confirm(`Deseja importar o seguinte dado?\n${pdfText}`);
          if (userConfirmed) {
            // Faça a lógica de importação aqui
          }
        }
      }
      this.fileImported.emit(file);
    }
  }
}
