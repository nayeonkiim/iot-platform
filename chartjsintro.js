"use strict"


function line(app, amount) {
    invokeAPI(convertDate(amount), app);
}

var convertDate = function (amount) {
    let firstDay;
    let lastDay;

    var now = new Date();
    console.log("amount:" + amount);
    if (amount == "daily") {  //당일 온도
        console.log("하루 온도")
        firstDay = new Date();
        lastDay = new Date(now.setDate(now.getDate() + 1));
    }
    else if (amount == "week") {  //일주일 온도
        console.log("일주일 온도")
        firstDay = new Date(now.getFullYear(), now.getMonth());
        lastDay = new Date(now.getFullYear(), now.getMonth() + 1);
    }

    var arr = [];

    var year = firstDay.getFullYear();
    var month = ('0' + (firstDay.getMonth() + 1)).slice(-2);
    var day = ('0' + firstDay.getDate()).slice(-2);

    var timeString = '00:00:00';
    var dateString = year + '-' + month + '-' + day + ' ' + timeString;
    arr.push(dateString);

    year = lastDay.getFullYear();
    month = ('0' + (lastDay.getMonth() + 1)).slice(-2);
    day = ('0' + lastDay.getDate()).slice(-2);

    timeString = '00:00:00';
    dateString = year + '-' + month + '-' + day + ' ' + timeString;
    arr.push(dateString);

    console.log("first: " + arr[0] + ", " + "last: " + arr[1]);
    return arr;
}

var invokeAPI = function (arr, app) {

    // 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'your api uri';

    axios.get(API_URI)
        .then(response => {
            var chartData = {};
            chartData.LondonMonthlyTemperatures = {
                timestamp: [],
                temperature: [],
                humidity: [],
            };

            console.log("response: " + response.data);
            var result = JSON.parse(response.data);
            var jsonDatas = [];
            for (var i in result.data) {
                jsonDatas.push(result.data[i]);
            }

            console.log(jsonDatas);
            jsonDatas.sort(function (a, b) {
                return Date.parse(a.timestamp) - Date.parse(b.timestamp);
            });

            for (var k = 0; k < result.data.length; k++) {
                //var splitData = jsonDatas[k].timestamp.split(' ');
                chartData.LondonMonthlyTemperatures.timestamp[k] = jsonDatas[k].timestamp;
                chartData.LondonMonthlyTemperatures.temperature[k] = jsonDatas[k].temperature;
                chartData.LondonMonthlyTemperatures.humidity[k] = jsonDatas[k].humidity;
            }
            return chartData;
        })
        .then((chartData) => {
            const data =
            {
                labels: chartData.LondonMonthlyTemperatures.timestamp,
                datasets: [{
                    label: 'temperature',
                    backgroundColor: chartjsColors.maxTempLine,
                    borderColor: chartjsColors.maxTempLine,
                    data: chartData.LondonMonthlyTemperatures.temperature,
                    borderWidth: 1,
                    tension: 0.4,
                },
                {
                    label: 'humidity',
                    backgroundColor: chartjsColors.minTempLine,
                    borderColor: chartjsColors.minTempLine,
                    data: chartData.LondonMonthlyTemperatures.humidity,
                    borderWidth: 1,
                    tension: 0.4,
                },]
            };

            const config =
            {
                type: 'line',
                data: data,
                options:
                {
                    scales: {
                        y: { // 'y'라는 id를 가진 y축에 대한 설정
                            afterDataLimits: (scale) => {
                                // y축의 최대값은 데이터의 최대값에 딱 맞춰져서 그려지므로
                                // y축 위쪽 여유공간이 없어 좀 답답한 느낌이 들 수 있는데요,
                                // 이와 같이 afterDataLimits 콜백을 사용하여 y축의 최대값을 좀 더 여유있게 지정할 수 있습니다!
                                scale.max = scale.max * 1.2;
                            },
                            axis: 'y', // 이 축이 y축임을 명시해줍니다.
                            display: true, // 축의 가시성 여부도 설정할 수 있습니다.
                            position: 'left', // 축이 왼쪽에 표시될지, 오른쪽에 표시될지 정할 수 있습니다.
                            title: { // 이 축의 단위 또는 이름도 title 속성을 이용하여 표시할 수 있습니다.
                                display: true,
                                align: 'end',
                                color: '#808080',
                                font: {
                                    size: 12,
                                    family: "'Noto Sans KR', sans-serif",
                                    weight: 300,
                                },
                                text: '단위: 배'
                            }
                        }
                    },
                    plugins:
                    {
                        legend: { position: 'right' },
                        title:
                        {
                            display: true,
                            text: 'London Monthly Temperatures (\u00B0C)'
                        }
                    }
                }
            };

            console.log(data);
            var myChart = new Chart(app.canvasContext, config);
        })
        .catch(e => console.log(e));
}

