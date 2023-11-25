import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InitQuestionsComponent} from './init-questions.component';

describe('InitQuestionsComponent', () => {
    let component: InitQuestionsComponent;
    let fixture: ComponentFixture<InitQuestionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InitQuestionsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InitQuestionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
