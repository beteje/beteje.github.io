---
layout: page
title: Finger Coordination
description: The neural basis of finger coordination
img: /assets/img/Fingers.jpg
importance: 2
---

Actions involving the hand require positioning multiple fingers each with multiple degrees of freedom. However, we regularly perform complex actions without the need to consciously consider the position of each and every joint. Understanding the neural basis of finger coordination has many uses in rehabilitation and prosthetics.

---

### Small Synergistic Movement in Pianists
<div class="row align-items-center justify-content-center">
  <div class="col-sm-8 mt-3 mt-md-0"><p>The aim of this study was to study the differences in finger movement between experienced and novice pianists with the aim of understanding more about how the fingers move:
    <ul><li>Individually - the joints</li>
      <li>Together - simultaneous movement</li>
      <li>Independently - sequential movement</li></ul></p>
    <p>Movement of the hands during piano playing was recorded using a data glove with 14 sensors measuring finger flexion and abduction. To study how the movement of the fingers differed between the experienced and novice players the concept of movement synergies was used.</p></div>
  <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/Fingers.jpg' | relative_url }}" alt="" title="Data glove piano playing"/></div>
</div>
<div class="caption text-right">
    Piano playing while wearing a data glove.
</div>

Muscle Synergies:

* Fundamental patterns of movement
* Serve as building blocks for more complicated movements
* Reduce the complexity (degrees of freedom) to be controlled

<div class="row justify-content-center">
  <div class="col-sm-10 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/TV_PCA.png' | relative_url }}" alt="" title="Time-varying PCA"/></div>
</div>
<div class="caption text-right">
    Time-varying principal component analysis for movement synergy extraction.
</div>

Results showed that a small number of components accounted for the majority of the variance in the data but that these components are common across the groups. Classification results showed accurate classification was obtained from components accounting for only small amount of variance primarily related to the abduction of the fingers {% cite Jelfs2015 %}.

<div class="row align-items-center">
  <div class="col-sm-6 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/VAF-10.png' | relative_url }}" alt="" title="Variance accounted for"/></div>
  <div class="col-sm-6 mt-3 mt-md0 table-responsive"><table table-sm table-borderless class="project-table">
    <tr><th style="text-align:left;">Finger</th><th>Accuracy (%)</th><th>No. Components</th><th style="padding:1rem;color:#2698BA;">VAF</th></tr>
    <tr><td style="text-align:left;">Thumb</td><td>93.68</td><td>15/253</td><td>1.38</td></tr>
    <tr><td style="text-align:left;">Index</td><td>94.81</td><td>14/212</td><td>0.11</td></tr>
    <tr><td style="text-align:left;">Middle</td><td>93.40</td><td>17/409</td><td>2.70</td></tr>
    <tr><td style="text-align:left;">Ring</td><td>96.52</td><td>18/115</td><td>5.97</td></tr>
    <tr><td style="text-align:left;">Little</td><td>98.29</td><td>17/175</td><td>0.96</td></tr>
  </table></div>
</div>
<div class="caption text-right">
    Left: The variance accounted for by the first 10 components. Right: Classification results showing the accuracy, number of components and variance accounted for, for each of the fingers.
</div>

---

### Muscle Synergy Extraction
The muscles which control the fingers are primarily located in the forearm and for each gesture we perform multiple muscles are required. As with the movement we can also use synergies to represent the common patterns of muscle activity which serve as the building blocks to produce detailed movements associated with the control of the fingers.

<div class="row align-items-center justify-content-center">
  <div class="col-sm-5 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/NMFDiagram.png' | relative_url }}" alt="" title="NMF Diagram"/></div>
  <div class="col-sm-7 mt-3 mt-md-0">Muscle synergy extraction can be performed using nonnegative matrix factorization. That is for a data matrix \(Y\in\mathbb{R}^{X\times N}\) find nonnegative matrices \(W\in\mathbb{R}^{X\times K}\) and \(H\in\mathbb{R}^{K\times N}\) via $$\min_{W,H} D(Y||WH)\quad\text{ subject to}\quad W\geq 0,\quad H\geq 0$$
  where \(D(\cdot)\) is a measure of goodness of fit</div>
</div>
<div class="caption text-left">
    Nonnegative matrix factorization.
</div>

To deal with the complexity of the neuromuscular system and extend beyond the variance accounted for as a measure we proposed a method based on using fuzzy entropy as a similarity measure {% cite Jelfs2016 %}. Examples of the differences between the synergies extracted using 16 channels of EMG recorded from the arm show compared to an alternating least squares NMF our method places greater significance on a smaller number of muscles.

<div class="row justify-content-center">
  <div class="col-sm-10 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/Subj1_K3.png' | relative_url }}" alt="" title="Synergies for Subject 1"/></div>
</div>
<div class="row justify-content-center mt-3">
  <div class="col-sm-10 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/Subj2_K3.png' | relative_url }}" alt="" title="Synergies for Subject 2"/></div>
</div>
<div class="caption text-right">
    Example synergies for a value of k=3 for 2 different subjects.
</div>

---

### Code
Fuzzy entropy NMF code can be found here: [Entropy_NMF](https://github.com/beteje/Entropy_NMF){:target="_blank"}

---

### References
<div class="references">
  {% bibliography --cited %}
</div>
