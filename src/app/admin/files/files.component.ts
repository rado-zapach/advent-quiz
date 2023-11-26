import {CommonModule} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {UploadDataOutput} from '@aws-amplify/storage/src/providers/s3/types';
import {getUrl, list, remove, uploadData} from 'aws-amplify/storage';
import {PlayerEmailPipe} from '../../common/player-email.pipe';
import {SanitizerPipe} from '../../common/sanitizer.pipe';

@Component({
    selector: 'app-files',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        PlayerEmailPipe,
        MatIconModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        ReactiveFormsModule,
        SanitizerPipe,
        MatMenuModule,
    ],
    templateUrl: './files.component.html',
    styleUrl: './files.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesComponent implements OnInit, AfterViewInit {
    public readonly displayedColumns = ['key', 'size', 'lastModified', 'actions'];
    public dataSource = new MatTableDataSource<{key: string; size?: number; lastModified?: Date}>([]);
    private uploadTask: UploadDataOutput | undefined;
    public readonly uploadProgress = signal(0);

    public async ngOnInit() {
        await this.fetchFiles();
    }

    @ViewChild(MatSort) sort: MatSort | undefined;

    public ngAfterViewInit() {
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    private async fetchFiles(): Promise<void> {
        const listOutput = await list({
            options: {
                listAll: true,
            },
        });
        this.dataSource.data = listOutput.items;
    }

    public async onUploadData(event: Event) {
        const files = (<HTMLInputElement>event?.target)?.files;
        if (files) {
            const f = files[0];
            this.uploadTask = uploadData({
                key: f.name,
                data: f,
                options: {
                    onProgress: ({transferredBytes, totalBytes}) => {
                        if (totalBytes) {
                            this.uploadProgress.set((100 * transferredBytes) / totalBytes);
                        }
                    },
                },
            });
            const b = await this.uploadTask.result;
            this.uploadProgress.set(0);
            await this.fetchFiles();
        }
    }

    public onCancelUpload(): void {
        if (this.uploadTask) {
            this.uploadTask.cancel();
            this.uploadProgress.set(0);
        }
    }

    public async onDownload(key: string): Promise<void> {
        const storageUrl = await getUrl({
            key,
        });
        storageUrl.url;
        window.location.href = storageUrl.url.href;
    }

    public async onDelete(key: string): Promise<void> {
        const removeOutput = await remove({
            key,
        });
        await this.fetchFiles();
    }
}
