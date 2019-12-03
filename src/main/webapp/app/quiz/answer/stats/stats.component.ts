import { AfterViewInit, Component, Input, NgZone, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import animatedTheme from '@amcharts/amcharts4/themes/animated';
import materialTheme from '@amcharts/amcharts4/themes/material';
import { QuestionService } from 'app/entities/question/question.service';

am4core.useTheme(animatedTheme);
am4core.useTheme(materialTheme);

@Component({
  selector: 'jhi-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['stats.scss']
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  @Input()
  public questionId;
  private answersChart: am4charts.PieChart3D;

  constructor(private questionService: QuestionService, private zone: NgZone) {}

  ngAfterViewInit() {
    this.answersGraphInit();
  }

  answersGraphInit(): void {
    this.questionService.getStats(this.questionId).subscribe(stats => {
      this.zone.runOutsideAngular(() => {
        const chart = am4core.create('answers-chart', am4charts.PieChart3D);
        chart.data = stats.body;
        chart.responsive.enabled = true;
        chart.pixelPerfect = true;

        const series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = 'second';
        series.dataFields.category = 'first';
        series.tooltip.label.wrap = true;

        series.ticks.template.disabled = true;
        series.alignLabels = false;
        series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
        series.labels.template.radius = am4core.percent(-40);
        series.labels.template.fill = am4core.color('white');
        series.labels.template.adapter.add('radius', function(radius, target) {
          if (target.dataItem && target.dataItem.values.value.percent < 10) {
            return 0;
          }
          return radius;
        });

        chart.legend = new am4charts.Legend();
        chart.legend.labels.template.truncate = true;
        chart.legend.itemContainers.template.clickable = false;
        chart.legend.itemContainers.template.focusable = false;
        chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
        chart.legend.marginBottom = 20;
        chart.legend.valueLabels.template.text = '';
        chart.legend.itemContainers.template.height = 30;

        const slice = series.slices.template;
        slice.states.getKey('hover').properties.scale = 1;
        slice.states.getKey('active').properties.shiftRadius = 0;

        this.answersChart = chart;
      });
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.answersChart) {
        this.answersChart.dispose();
      }
    });
  }
}
