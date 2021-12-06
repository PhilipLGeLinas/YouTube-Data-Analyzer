document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    query();
});

function query() {
    document.getElementById("form").hidden = true;
    document.getElementsByClassName("image")[0].hidden = true;

    var category = document.getElementById('category').selectedOptions[0]?.value;
    var filter = document.getElementById('filter').selectedOptions[0]?.value;
    var uploader = document.getElementById('uploader').value;
    var count = document.getElementById('count').value;

    const Http = new XMLHttpRequest();
    const url='http://192.168.50.198:3000/query?category=' + category.replace("&", "%26") + "&uploader=" + uploader + "&count=" + count + "&filter=" + filter;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        var dict = JSON.parse(Http.responseText);
        Object.values(dict).forEach(obj => {
            var videoId = obj.toString().split("'videoId': '")[1].split("'")[0];
            var pagerank = obj.toString().split("'pageRank': ")[1].split("\}")[0];
            var age = obj.toString().split("'age': '")[1].split("'")[0];
            var length = obj.toString().split("'length': '")[1].split("'")[0];
            var views = obj.toString().split("'views': '")[1].split("'")[0];
            var rate = obj.toString().split("'rate': '")[1].split("'")[0];
            var ratings = obj.toString().split("'ratings': '")[1].split("'")[0];
            var comments = obj.toString().split("'comments': '")[1].split("'")[0];

            var table = document.getElementById("myTable");

            if (table.rows.length <= Object.keys(dict).length) {
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                var cell8 = row.insertCell(7);

                cell1.innerHTML = videoId;
                cell2.innerHTML = pagerank.substring(0, 4);
                cell3.innerHTML = age;
                cell4.innerHTML = length;
                cell5.innerHTML = views;
                cell6.innerHTML = rate;
                cell7.innerHTML = ratings;
                cell8.innerHTML = comments;
            }
        });
        generateChart(Object.keys(dict).length, uploader, category);
    }

    document.getElementById("result").hidden = false;
}

function generateChart(count, uploader, category) {
    document.getElementById("total").innerText = count;
    document.getElementById("stat2").innerText = uploader;
    document.getElementById("stat3").innerText = category;

    var xValues = ["Videos"];
    var yValues = [count];
    var barColors = ["red"];

    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "YouTube Videos"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1
                    }
                }]
            }
        }
    });
}