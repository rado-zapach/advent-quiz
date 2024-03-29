import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionOpenComponent} from './question-open.component';

describe('QuestionOpenComponent', () => {
    let component: QuestionOpenComponent;
    let fixture: ComponentFixture<QuestionOpenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuestionOpenComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(QuestionOpenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
