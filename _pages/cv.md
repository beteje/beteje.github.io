---
layout: page
permalink: /cv/
title: CV
description: A little bit more about myself
nav: true
nav_order: 3
social: true
---

<div class="row" style="margin-top:-6.5em; margin-bottom:2em; padding: 5px">
	<a class="ml-auto mr-2" href="/assets/pdf/cv.pdf" target="_blank">
	  <img height="60px" src="/assets/img/pdf_icon.svg" alt="CV pdf">
	</a>
</div>

<div class="cv">
  {% for entry in site.data.cv %}
    <div class="card mt-3 p-3">
      <h3 class="card-title">{{ entry.title }}</h3>
  		<div class="card-text font-weight-light">
  		  <ul class="list-group list-group-flush">
          {% for content in entry.contents %}
            <li class="list-group-item" style="border:none">
              <div class="row">
                {% if content.date %}
                  <div class="col-sm-2 mt-3 mt-md-0">
                      {{ content.date }}
                  </div>
                {% endif %}
                <div class="col-sm-10 mt-3 mt-md-0">
                  {% if content.title %}
                    <b>{{ content.title }}</b>
                  {% endif %}
                  {% if content.location %}
                    <i>{{content.location}}</i>
                  {% endif %}
                  {% if content.items %}
                    <ul class="items">
                      {% for item in content.items %}
                        <li>
                          {% if item.contents %}
                            <span class="item-title">{{ item.title }}</span>
                            <ul class="subitems">
                              {% for subitem in item.contents %}
                                <li><span class="subitem">{{ subitem }}</span></li>
                              {% endfor %}
                            </ul>
                          {% else %}
                            <span class="item">{{ item }}</span>
                          {% endif %}
                        </li>
                      {% endfor %}
                    </ul>
                  {% endif %}
                </div>
              </div>
            </li>
          {% endfor %}
        </ul>
        {% if entry.note %}
          {{ entry.note }}
        {% endif %}
  		</div>
    </div>
  {% endfor %}
</div>
