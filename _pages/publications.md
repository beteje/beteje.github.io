---
layout: page
permalink: /publications/
title: Publications
years: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2004]
nav: true
nav_order: 2
---
<!-- _pages/publications.md -->
<div class="publications">

<<<<<<< HEAD
  <p style="text-align:right"><button class="btn btn-expand" type="button">Expand/Collapse All</button></p>
  <div class="card shadow-none">
    <h2 class="card-header">
      <a class="collapsed d-block" data-toggle="collapse" href="#collapse_pre" aria-expanded="true" aria-controls="collapse_pre" id="header_pre">
        Preprints <i class="fa fa-chevron fa-fw"></i>
      </a>
    </h2>
    <div id="collapse_pre" class="collapse" aria-labelledby="header_pre">
      <div class="card-body">
        <h2>Preprints</h2>
        {% bibliography -f papers -q @electronic %}
      </div>
    </div>
  </div>


    {% for y in page.years %}
      <div class="card shadow-none">
        <h2 class="card-header">
          <a class ="collapsed d-block" data-toggle="collapse" href="#collapse_{{y}}" aria-expanded="true" aria-controls="collapse_{{y}}" id="header_{{y}}">
            {{y}} <i class="fa fa-chevron fa-fw" ></i>
          </a>
        </h2>
        <div id="collapse_{{y}}" class="collapse" arialabelledby="header_{{y}}">
          <div class="card-body">
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
=======
<div class="publications">

{% for y in page.years %}
  {% if y==2020 %}
    <h2 class="year_first">{{y}}</h2>
  {% else %}
    <h2 class="year">{{y}}</h2>
  {% endif %}
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
>>>>>>> b0bfa9e (Updated to al-folio v0.3.3)

</div>
