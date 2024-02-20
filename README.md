# belly-button-challenge
## Link to Github Pages - [https://divyasajjan1.github.io/belly-button-challenge/](https://divyasajjan1.github.io/belly-button-challenge/)
Javascript-Interactive visualisation

In this assignment, I built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

Entry file: [index.html](https://github.com/divyasajjan1/belly-button-challenge/edit/main/index.html)

JS file: [app.js](https://github.com/divyasajjan1/belly-button-challenge/edit/main/static/js/app.js)

1. Using D3 library, I read the data from the URL to a samples.json file.
2. I created a horizontal bar chart for the top 10 OTUs found in an individual with sample_values for the x-axis, otu_ids for the y-axis, and otu_labels as the hover text for the chart. It updates dynamically when the user selects a different OTU ID. I added a pre-fix OTU to all the otu_ids so that all the top 10 OTU IDs are displayed instead of falling in a range of numbers.
3. I created a bubble chart that displays the data for each sample. Used otu_ids for x values, sample_values for y values, sample_values for the marker size, otu_ids for the marker colors, and otu_labels for the text values. The chart is dynamically updated when a different OTU ID is selected by the user. I searched for the marker colors to be applied in Plotly.js documentation to match the assignment's sample bubble chart and set it to 'Earth' colorscale which did the job.
4. Displayed the sample metadata i.e, an individual's demographic information as a panel on the page with the key-value pairs of data. Was having difficulty in getting some key-value pair in a single line without overflowing the content box, or without flowing into the next line. Refered to the bootstrap documentation and added 'width:18rem' to the metadataDiv which did the trick. The content is displayed flawlessly now. This demographic data is also updated dynamically when the user changes the OTU ID.
