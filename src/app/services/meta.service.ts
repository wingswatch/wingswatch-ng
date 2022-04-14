import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetaService {
    constructor(
        private titleService: Title,
        private meta: Meta,
    ) { }

    updateMetaInfo(content: string, keywords: string): void {
        this.meta.updateTag({ name: 'description', content: content });
        //this.meta.updateTag({ name: 'author', content: author });
        this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    updateTitle(title?: string): void {
        this.titleService.setTitle(title + ' | WingsWatch');
    }
}