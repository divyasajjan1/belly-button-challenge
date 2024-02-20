//Get the sample.json endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Use the D3 library to read in samples.json from the URL
d3.json(url).then(function(data){
    console.log(data);
    //Get all the samples from the data
    let samples = data.samples;
    let metadata = data.metadata;
    //Initialize a dictionary to store the arrays of OTU IDs, sample values and otu labels for each sample ID.
    let id_values = {};
    //Initialize another dictionary for the bar chart values as only 10 values are needed for plotting.
    let id_bar = {};

    //Init variables for the initial display page
    let init_otuIds=[];
    let init_sampleValues = [];
    let init_otuLabels = [];

    //Init variables for bar chart with 10 values
    let init_barOtuIds=[];
    let init_barSampleValues=[];
    let init_barOtuLabels=[];
    
    //Loop through to collect all the values of each sample ID
    for(let i=0;i<samples.length;i++){
        if(i === 0){
            //Collect the values for initial page display
            init_otuIds = samples[i].otu_ids;
            init_barOtuIds = init_otuIds.slice(0, 10).reverse().map(item => `OTU ${item}`);
            
            init_sampleValues=samples[i].sample_values;
            init_barSampleValues = init_sampleValues.slice(0, 10).reverse();

            init_otuLabels=samples[i].otu_labels;
            init_barOtuLabels = init_otuLabels.slice(0, 10).reverse();
        }
        //contine to collect the values for all the samples in their particular arrays.
        let otuIds = samples[i].otu_ids;
        let bar_otuIds = otuIds.slice(0, 10).reverse().map(item => `OTU ${item}`);
        
        let sampleValues = samples[i].sample_values;
        let bar_sampleValues = sampleValues.slice(0, 10).reverse();

        let otuLabels = samples[i].otu_labels;
        let bar_otuLabels = otuLabels.slice(0, 10).reverse();

        //Assign all the arrays as values to each sample ID and save in a dictionary for both bubble and bar charts.
        id_values[samples[i].id] = [otuIds,sampleValues,otuLabels];
        id_bar[samples[i].id] = [bar_otuIds,bar_sampleValues,bar_otuLabels];
    }   

    //Initialize a dictionary to collect all the values associated with the ids.
    let meta_values = {};
    let init_metaValues = {};
    //Loop through the metadata
    for(let m=0; m < metadata.length; m++) {
        //Get each row
        let row = metadata[m];
        if (m == 0){
            init_metaValues = row;
        }
        //Let the id be the key for each row data
        meta_values[row.id] = row;
    }
    console.log(init_metaValues);
    console.log(meta_values);

    function init(){
        //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        let trace1 = {
            // Use sample_values as the values for the bar chart.
            x: init_barSampleValues,
            // Use otu_ids as the labels for the bar chart.
            y: init_barOtuIds,
            // Use otu_labels as the hovertext for the chart.
            text: init_barOtuLabels,
            type: 'bar',
            orientation: 'h',
            hoverinfo: 'text+x'
        };
        //Data trace array
        let sampleData = [trace1];
        //Apply a title to the layout
        let layout = {
            title: 'Top 10 OTUs Found in an Individual',
            xaxis: { title: 'Sample Values' },
            yaxis: { title: 'OTU ID'}
        };
        //Plot the bar chart
        Plotly.newPlot('bar', sampleData, layout);

        //Create a bubble chart that displays each sample.
        
        let bubbleData = [{
            // Use otu_ids for the x values.
            x: init_otuIds,
            // Use sample_values for the y values.
            y: init_sampleValues,
            // Use otu_labels for the text values
            text: init_otuLabels,
            mode: 'markers',
            marker: {
                // Use sample_values for the marker size.
                size: init_sampleValues,
                // Use otu_ids for the marker colors.
                color: init_otuIds,
                colorscale: 'Earth',
                opacity: 0.75
            }
        }];
        
        // Define the layout for the bubble chart
        let bubbleLayout = {
            title: 'Bubble Chart for Each Sample',
            xaxis: { title: 'OTU ID' },
            yaxis: { title: 'Sample Values' }
        };
        
        // Plot the bubble chart
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

         // Call the displayMetadata function with the metadata object
        displayMetadata(init_metaValues);
    }

    //Dropdown to contain all the IDs for selection
    let dropdown = d3.select("#selDataset");
        dropdown.selectAll("option")
                .data(samples)
                .enter()
                .append("option")
                .text(d => d.id)
                .attr("value", d => d.id);

    // Bind the change event handler to the dropdown
    d3.selectAll("#selDataset").on("change", function(){
        optionChanged(this.value);
    });

    //Create a function for changed options
    function optionChanged(value){
        //Update the trace array
        let traceUpdate = {
            x:[id_bar[value][1]],
            y:[id_bar[value][0]],
            text:[id_bar[value][2]]
        }
        
        //Restyle the bar plot
        Plotly.restyle("bar", traceUpdate);

        //Bubble trace update
        let bubbleUpdate = {
            x: [id_values[value][0]],
            y: [id_values[value][1]],
            text: [id_values[value][2]],
            'marker.size': [id_values[value][1]],
            'marker.color': [id_values[value][0]]
        }
        //Restyle the bubble plot
        Plotly.restyle("bubble", bubbleUpdate);

        displayMetadata(meta_values[value]);
    }

    //Create a function to display sample metadata/demographic info.
    function displayMetadata(metaValue) {
        // Select the element where you want to display the metadata
        let metadataDiv = d3.select("#sample-metadata");
        metadataDiv.style("width", "18rem");

        // Clear any existing content in the element
        metadataDiv.html("");
    
        // Check if the selected metadata exists
        if (metaValue) {
            // Iterate over each key-value pair in the selected metadata object
            Object.entries(metaValue).forEach(([key, value]) => {
                // Append a new paragraph element for each key-value pair
                metadataDiv.append("p")
                    .text(`${key}: ${value}`);
            });
        }
    }
    //Run init when the index page is fired up.
    init();

});
