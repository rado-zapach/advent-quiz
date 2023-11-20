import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'sanitizer',
    standalone: true,
})
export class SanitizerPipe implements PipeTransform {
    public constructor(private sanitizer: DomSanitizer) {}

    public transform(html: string | undefined | null) {
        if (!html) {
            return '';
        }
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
