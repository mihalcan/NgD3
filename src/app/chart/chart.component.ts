import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Stocks } from "app/shared/data";

@Component({
  selector: 'app-chart',
  template: `<svg width="900" height="500"></svg>`
})
export class ChartComponent implements OnInit {

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.initSvg()
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  private initSvg() {
    this.svg = d3.select("svg")
                 .append("g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
  }

  private initAxis() {
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.x.domain(d3.extent(Stocks, (d) => d.date ));
    this.y.domain(d3.extent(Stocks, (d) => d.value ));
  }

  private drawAxis() {

    this.svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3.axisBottom(this.x));

    this.svg.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(this.y))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");
  }

  private drawLine() {
    this.line = d3.line()
                       .x( (d: any) => this.x(d.date) )
                       .y( (d: any) => this.y(d.value) );

    this.svg.append("path")
            .datum(Stocks)
            .attr("class", "line")
            .attr("d", this.line);
  }
}
