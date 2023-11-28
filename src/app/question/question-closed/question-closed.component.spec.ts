import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionClosedComponent} from './question-closed.component';

describe('QuestionClosedComponent', () => {
    let component: QuestionClosedComponent;
    let fixture: ComponentFixture<QuestionClosedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuestionClosedComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(QuestionClosedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
