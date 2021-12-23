---
layout: page
title: Research
permalink: /research/
description: Details of some of my past and present research projects
nav: true
social: true
---

<div class="projects grid">

  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% for project in sorted_projects %}
    <div class="grid-item">
      {% if project.redirect %}
      <a href="{{ project.redirect }}" target="_blank">
      {% else %}
      <a href="{{ project.url | relative_url }}">
      {% endif %}
      <div class="card hoverable mml-2 mr-2 mb-2">
        {% if project.img %}
          <img src="{{ project.img | relative_url }}" alt="project thumbnail">
        {% endif %}
        <div class="card-body">
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-text">{{ project.description }}</p>
        </div>
      </div>
      </a>
    </div>
  {% endfor %}

</div>
