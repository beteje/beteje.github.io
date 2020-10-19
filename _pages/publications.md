---
layout: page
permalink: /publications/
title: Publications
years: [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2004]
nav: true
---

<div class="publications">

{% for y in page.years %}
  {% if y==2020 %}
    <h2 class="year_first">{{y}}</h2>
  {% else %}
    <h2 class="year">{{y}}</h2>
  {% endif %}
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
