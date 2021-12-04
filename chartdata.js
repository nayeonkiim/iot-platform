var chartData = {};

var convertDate = function (data) {
    var now = new Date();
    var date = new Date(now.setDate(now.getDate() + data));

    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);

    var timeString = '00:00:00';
    var dateString = year + '-' + month + '-' + day + ' ' + timeString;

    console.log(dateString);
    return dateString;
}

var invokeAPI = function (from, to) {

    // 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'your api uri';

    $.ajax(API_URI, {
        method: 'GET',
        contentType: "application/json",

        success: function (data, status, xhr) {

            chartData.LondonMonthlyTemperatures = {
                timestamp: [],
                temperature: [],
                humidity: [],
            };

            var result = JSON.parse(data);
            var jsonDatas = [];
            for (var i in result.data) {
                jsonDatas.push(result.data[i]);
            }

            console.log(jsonDatas);
            jsonDatas.sort(function (a, b) {
                return Date.parse(a.timestamp) - Date.parse(b.timestamp);
            });

            for (var k = 0; k < result.data.length; k++) {
                var splitData = jsonDatas[k].timestamp.split(' ');
                chartData.LondonMonthlyTemperatures.timestamp[k] = splitData[1];
                chartData.LondonMonthlyTemperatures.temperature[k] = jsonDatas[k].temperature;
                chartData.LondonMonthlyTemperatures.humidity[k] = jsonDatas[k].humidity;
            }
            console.log(chartData);
        },
        error: function (xhr, status, e) {
            //  document.getElementById("result").innerHTML="Error";
            alert("error");
        }
    });
};

