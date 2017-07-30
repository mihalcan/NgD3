import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { feature } from 'topojson';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Component({
  selector: 'app-eu-map',
  template: `<svg id="eu"></svg>`,
  styles: [`
  tooltip {
    opacity:0;
  }
  `]
})
export class EuMapComponent implements OnInit {
  width = 960;
  height = 660;
  svg: any;
  path: any;
  tooltip: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getJSON().subscribe(eu => {
      this.initMap(eu);
      
      this.tooltip = d3.select("body").append("div")   
				    .attr("class", "tooltip")
            .attr('opacity', '0');
      
      this.drawMap(eu);
      this.addLabels(eu);
    });
  }

  initMap(countries: any) {
    this.svg = d3.select("#eu")
                    .attr("width", this.width)
                    .attr("height", this.height);
      const units = feature(countries, countries.objects.countries);
      const projectionAlb = d3.geoAlbers()
                      .center([0, 55.4])
                      .rotate([-20.4, 0])
                      .parallels([50, 90])
                      .scale(900)
                      .translate([this.width / 2, this.height / 2]);
      this.path = d3.geoPath().projection(projectionAlb);

      this.svg.append("path")
          .datum(units)
          .attr("d", this.path);
  }

  drawMap(countries){
    this.svg.selectAll(".unit")
          .data(feature(countries, countries.objects.countries).features)
        .enter().append("path")
          .attr("class", (d) => "unit " + d.id)
          .attr('fill', (d) => this.getRandomColor())
          .attr("d", this.path)
          .on('click', (d) => this.onClick(d))
          .on('mouseover', (d) => {
            console.log(d);
            this.tooltip.transition()        
                  .duration(500)      
                  .style("opacity", .9);      

            const tip = `<strong>Country:</strong> ${d.properties.name} `;
            this.tooltip.html(tip)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
          })                  
          .on('mouseout', (d) => {    
              this.tooltip.transition()        
                  .duration(500)      
                  .style("opacity", 0);   
          });
  }

  addLabels(countries){
    this.svg.selectAll(".subunit-label")
        .data(feature(countries, countries.objects.countries).features)
      .enter().append("text")
        .attr("class", "country-label")
        .attr("transform", (d) => "translate(" + this.path.centroid(d) + ")")
        .attr("dy", ".35em")
        .text((d) => d.id);
  }

  onClick(country: any) {
    console.log(JSON.stringify(country));
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public getJSON(): Observable<any> {
         return this.http.get("./assets/eu.json")
                         .map((res:any) => res.json())
                         .catch((error:any) => {
                           console.log(error);
                           return error;
                          });
     }

}
