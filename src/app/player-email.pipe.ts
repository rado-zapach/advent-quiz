import {inject, Pipe, PipeTransform} from '@angular/core';
import {map, Observable} from 'rxjs';
import {PlayerAttributesService} from './player-attributes.service';

@Pipe({
    name: 'playerEmail',
    standalone: true,
})
export class PlayerEmailPipe implements PipeTransform {
    private readonly playerAttributesService = inject(PlayerAttributesService);

    public transform(username: string): Observable<string> {
        return this.playerAttributesService.attributes$.pipe(
            map(attributes => attributes.find(a => a.username === username)?.email ?? username)
        );
    }
}
