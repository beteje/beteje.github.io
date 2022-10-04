---
layout: page
title: Radar SLAM
description: Landmark management for radar SLAM
img: /assets/img/observation.png
importance: 1
---

<div class="row align-items-top justify-content-center">
  <div class="col-md-7 mt-3 mt-md-0">
    The aim of this project is to investigate the use of rotating synthetic aperture radar (RoSAR) in simultaneous localization and mapping (SLAM).<br><br>

    <div class="col-md-8 mt-3 mt-md-1 offset-sm-2">
      {% include figure.html path="assets/img/observation.png" title="Typical SLAM Scene" caption="Typical SLAM Scene." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
    </div><br/><br/>

    The first stage of this project has focused on developing a landmark management scheme {% cite Sun2022 %} taking account of the following:<br/><br/>

    <ul>
      <li>Landmarks contain multiple scattering/reflecting points</li>
      <li>The angle between the landmark and the platform the sensor is mounted on, changes with the movement of the platform, resulting in varying numbers of radar detections over time</li>
      <li>Clutter in the scene may result in false detections</li>
    </ul>

    At each time step the radar measurements are sifted, the selected measurements which are within a pre-defined distance of the existing landmarks are used for measurement association and to update the state.<br/><br/>

    Measurements which are not selected are used to determine if there are any new landmarks.<br/><br/>

    To determine whether an existing landmark should be deleted or an unconfirmed landmark should be confirmed we use M/N logic - if a landmark has been observed M times in the last N timesteps it is confirmed/deleted.
  </div>
  <div class="col-md-5 mt-3 mt-md-1">
    {% mermaid %}
      graph TD
        A(k = 1) --> B(EKF Prediction)
        B --> C(Get radar measurements Z<sub>k</sub>)
        C --> S1(Calculate distances<br/>landmarks to measurements)
        S1 --> S2{Distances<br>< threshold?}
        S2 --"Yes"--> G(Associate measurements)
        S2 --"No"--> H(Cluster measurements)
        G --> I(Delete landmarks)
        H --> J(Confirm landmarks)
        J --> K(Merge landmarks)
        I --> D(k = k + 1)
        K --> D
        D --> B

        classDef myGraph fill:#c7e9f3;
        classDef highlight fill:#9cd9eb,stroke:#f92080,stroke-width:1px;
        class A,B,C,D,S1,S2 myGraph;
        class G,H,I,J,K highlight;
    {% endmermaid %}
    <figcaption class="caption">Landmark management scheme, highlighted blocks are explained below.</figcaption>
  </div>
</div>

---

### Measurement Association

<div class="row align-items-center justify-content-center">
  <div class="col-md-7 mt-3 mt-md-1">
    {% mermaid %}
      graph LR
        A1(For each selected measurement)
        A1 --> A2(Calculate log distances)
        A2 --> A3{log distance<br/> < threshold?}
        A3 --"Yes"--> A4(Update EKF state)

        classDef myGraph fill:#c7e9f3;
        class A1,A2,A3,A4 myGraph
    {% endmermaid %}
    <figcaption class="caption">Measurement association procedure.</figcaption>
  </div>
  <div class="col-md-5 mt-3 mt-md-1">
    The first step is to check whether the selected measurements can be associated with existing landmarks based on a log distance measure.<br/><br/>

    The associated measurements are used to update the EKF state.
  </div>
</div>

---

### Landmark Deletion

<div class="row align-items-center justify-content-center">
  <div class="col-md-7 mt-3 mt-md-1">
    {% mermaid %}
      graph LR
        D1(For each landmark in state)
        D1 --> D2{Landmark associated<br/> with measurements?}
        D2 --"Yes"--> D3(Update landmark)
        D2 --"No"--> D4{Landmark within range?}
        D4 --"Yes"--> D5{Landmark meets M/N<br/> logic criteria?}
        D5 --"Yes"--> D6(Delete landmark)

        classDef myGraph fill:#c7e9f3;
        class D1,D2,D3,D4,D5,D6 myGraph
    {% endmermaid %}
    <figcaption class="caption">Landmark deletion procedure.</figcaption>
  </div>
  <div class="col-md-5 mt-3 mt-md-1">
    In this step if a landmark is not associated with any measurements and is close enough to the sensor that it should be observed, we use M/N logic determine if the landmark should be deleted.<br/><br/>

    Deleting landmarks allows us to remove any which may have been incorrectly initialized or may have left the scene (i.e. a car has now left the car park).
  </div>
</div>

---

### Measurement Clustering

<div class="row align-items-center justify-content-center">
  <div class="col-md-4 mt-3 mt-md-1">
    {% mermaid %}
      graph TD
        C1(Cluster unselected measurements)
        C1 --> C2(For each cluster)
        C2 --> C3(Calculate distances landmarks to clusters)
        C3 --> C4{Distances < threshold?}
        C4 --"Yes"--> C5(Update landmark)
        C4 --"No"--> C6(Add cluster to unconfirmed landmarks)

        classDef myGraph fill:#c7e9f3;
        class C1,C2,C3,C4,C5,C6 myGraph
    {% endmermaid %}
  </div>
  <div class="col-md-8 mt-3 mt-md-1">
    Measurements which were not initially selected as close to an existing landmark are clustered.<br/><br/>

    If a cluster is within a specified distance of an existing landmark it is used to update the landmark otherwise it is considered an unconfirmed landmark.

    <div class="col-md-8 offset-md-2 mt-3">
      {% include figure.html path="/assets/img/sifting_clustering.png" alt="" title="Sifting and confirmation" caption="Measurements are sifted with each red diamond representing a landmark, remaining measurements are clustered, with measurements that do not belong to a cluster treated as false detections." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
    </div>
  </div>
</div>

---

### Landmark Confirmation

<div class="row align-items-center justify-content-center">
  <div class="col-md-4 mt-3 mt-md-1">
    {% mermaid %}
      graph TD
        CL1(For each unconfirmed landmark) --> CL2{Number of measurements<br/> > threshold?}
        CL2 --"Yes"--> CL3(Confirm landmark)
        CL2 --"No"--> CL4{Landmark meets M/N<br/> logic criteria?}
        CL4 --"Yes"--> CL5(Confirm landmark)

        classDef myGraph fill:#c7e9f3;
        class CL1,CL2,CL3,CL4,CL5 myGraph
    {% endmermaid %}
  </div>
  <div class="col-md-8 mt-3 mt-md-1">
    There are two ways of confirming a landmark:
    <ol>
      <li>If the number of measurements associated with the unconfirmed landmark are above a defined threshold</li>
      <li>If the landmark has been observed often enough according to the M/N logic</li>
    </ol>
    Once a landmark is confirmed it is added to the system state.

    <div class="col-md-8 offset-md-2 mt-3">
      {% include figure.html path="/assets/img/confirmation.png" alt="" title="Landmark confirmation rules" caption="Landmark confirmation rules." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
    </div>
  </div>
</div>

---

### Landmark Merging

<div class="row align-items-center justify-content-center">
  <div class="col-md-7 mt-3 mt-md-1">
    {% mermaid %}
      graph LR
        M1(Calculate distances between landmarks) --> M2{Distances < threshold?}
        M2 --"Yes"--> M3(Merge landmarks)

        classDef myGraph fill:#c7e9f3;
        class M1,M2,M3 myGraph
    {% endmermaid %}
  </div>
  <div class="col-md-5 mt-3 mt-md-1">
    Finally, there is still a possibility that two landmarks in the system may in reality relate to the same landmark.<br/><br/>

    If the distance between two landmarks is less than a set threshold they are merged.
  </div>
</div>

---

### Example EKF-SLAM with Landmark Management

<div class="row justify-content-center">
  <div class="col-md-6 mt-3 mt-md-0">
    <div class="embed-responsive embed-responsive-4by3">
      <video class="embed-responsive-item" preload="metadata" controls="" src="../../assets/img/radarSLAM_sim.mp4" type='video/mp4'> </video>
    </div>
    <figcaption class="caption">Example of landmark management using EKF SLAM</figcaption>
  </div>
</div>

---

### Code
Orientation estimation code can be found here: [SLAM Landmark Management](https://github.com/shuai000/SLAM_LandmarkManagement){:target="_blank" rel="noopener"}

---

### References
<div class="references">
  {% bibliography --cited %}
</div>
