import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionLotteryComponent} from './question-lottery.component';

describe('QuestionLotteryComponent', () => {
    let component: QuestionLotteryComponent;
    let fixture: ComponentFixture<QuestionLotteryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuestionLotteryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(QuestionLotteryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
