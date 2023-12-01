import {CommonModule} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild,
} from '@angular/core';

const COLORS = ['#E53935', '#E91E63', '#BA68C8', '#1E88E5', '#00ACC1', '#C0CA33', '#F57C00'];

@Component({
    selector: 'app-wheel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wheel.component.html',
    styleUrl: './wheel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WheelComponent implements AfterViewInit, DoCheck {
    private readonly ref = inject(ChangeDetectorRef);

    @Input()
    set options(values: string[]) {
        this.sectors = values.map((opts, i) => {
            return {
                color: COLORS[(i >= COLORS.length ? i + 1 : i) % COLORS.length],
                label: opts,
            };
        });

        if (this.wheel) {
            this.createWheel();
        }
    }

    @Output()
    public winner = new EventEmitter<string>();

    @ViewChild('wheel')
    wheel!: ElementRef<HTMLCanvasElement>;
    @ViewChild('spin')
    spin!: ElementRef;

    sectors: any[] = [];

    rand = (m: number, M: number) => Math.random() * (M - m) + m;
    tot!: number;
    ctx!: CanvasRenderingContext2D;
    dia!: number;
    rad!: number;
    PI!: number;
    TAU!: number;
    arc0!: number;

    modeDelete = true;

    friction = 0.996; // 0.995=soft, 0.99=mid, 0.98=hard
    angVel = 0; // Angular velocity
    ang = 0; // Angle in radians
    lastSelection!: number;

    ngDoCheck(): void {
        this.engine();
    }

    ngAfterViewInit(): void {
        this.createWheel();
    }

    createWheel() {
        // @ts-ignore
        this.ctx = this.wheel.nativeElement.getContext('2d');
        this.dia = this.ctx.canvas.width;
        this.tot = this.sectors.length;
        this.rad = this.dia / 2;
        this.PI = Math.PI;
        this.TAU = 2 * this.PI;

        this.arc0 = this.TAU / this.sectors.length;
        this.sectors.forEach((sector, i) => this.drawSector(sector, i));
        this.rotate(true);
    }

    spinner() {
        if (!this.angVel) {
            this.winner.emit(undefined);
            this.angVel = this.rand(0.25, 0.35);
        }
    }

    getIndex = () => Math.floor(this.tot - (this.ang / this.TAU) * this.tot) % this.tot;

    drawSector(sector: {color: string | CanvasGradient | CanvasPattern; label: string}, i: number) {
        const ang = this.arc0 * i;
        this.ctx.save();
        // COLOR
        this.ctx.beginPath();
        this.ctx.fillStyle = sector.color;
        this.ctx.moveTo(this.rad, this.rad);

        this.ctx.arc(this.rad, this.rad, this.rad, ang, ang + this.arc0);
        this.ctx.lineTo(this.rad, this.rad);
        this.ctx.fill();
        // TEXT
        this.ctx.translate(this.rad, this.rad);
        this.ctx.rotate(ang + this.arc0 / 2);
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 16px sans-serif';

        this.ctx.strokeStyle = '#444';
        this.ctx.strokeText(sector.label, this.rad - 10, 10);

        this.ctx.fillText(sector.label, this.rad - 10, 10);
        //
        this.ctx.restore();
    }

    rotate(first = false) {
        const sector = this.sectors[this.getIndex()];
        this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`;
        this.spin.nativeElement.textContent = !this.angVel ? 'spin' : sector.label;
        if (!first) {
            this.lastSelection = !this.angVel ? this.lastSelection : this.getIndex();
            this.spin.nativeElement.textContent = this.sectors[this.lastSelection].label;
        }
        this.spin.nativeElement.style.background = sector.color;
    }

    frame() {
        if (!this.angVel) return;

        this.angVel *= this.friction; // Decrement velocity by friction
        if (this.angVel < 0.0001) {
            this.angVel = 0; // Bring to stop
            this.winner.emit(this.sectors[this.lastSelection].label);
        }
        this.ang += this.angVel; // Update angle
        this.ang %= this.TAU; // Normalize angle
        this.rotate();
        this.ref.markForCheck();
    }

    engine() {
        requestAnimationFrame(this.frame.bind(this));
    }
}
