---
layout: page
permalink: /publications/
title: Publications
years: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2004]
nav: true
---

<div class="publications">

  <p style="text-align:right"><button class="btn btn-expand" type="button">Expand/Collapse All</button></p>
  <div class="panel-group">
    <div class="panel panel-default">
      <div class="panel-heading collapsed" data-toggle="collapse" data-target="#collapse_pre">
        <h2 class="year">Preprints <i class="fa fa-chevron fa-fw" ></i></h2>
      </div>
      <div id="collapse_pre" class="panel-collapse collapse">
        <h2>Preprints</h2>
        <div class="panel-body">{% bibliography -f papers -q @electronic %}</div>
      </div>
    </div>

    {% for y in page.years %}
      <div class="panel panel-default">
        <div class="panel-heading collapsed" data-toggle="collapse" data-target="#collapse_{{y}}">
          <h2 class="year">{{y}} <i class="fa fa-chevron fa-fw" ></i></h2>
        </div>
        <div id="collapse_{{y}}" class="panel-collapse collapse">
          <div class="panel-body">
            {% capture count %}{% bibliography_count -f papers -q @article[year={{y}}] %}{% endcapture %}
            {% if count != "0" %}
              <h2>Journal Articles</h2>
              {% bibliography -f papers -q @article[year={{y}}]* %}
            {% endif %}

            {% capture count %}{% bibliography_count -f papers -q @incollection[year={{y}}] %}{% endcapture %}
            {% if count != "0" %}
              <h2>Book Chapters</h2>
              {% bibliography -f papers -q @incollection[year={{y}}]* %}
            {% endif %}

            {% capture count %}{% bibliography_count -f papers -q @inproceedings[year={{y}}] %}{% endcapture %}
            {% if count != "0" %}
              <h2>Conference Articles</h2>
              {% bibliography -f papers -q @inproceedings[year={{y}}]* %}
            {% endif %}
          </div>
        </div>  
      </div>
    {% endfor %}

  </div>

</div>
