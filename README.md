# 스마트 허수아비

## 기능
- 야생 동물을 감지했다면 Amazon SNS를 통해 이메일로 알림을 주며 아두이노의 LED에 불빛을 켜줌
- 야생 동물의 가까움에 따라 LED 깜빡임의 주기가 빨라짐 
- 하루,일주일 동안 모인 온습도 값을 그래프를 통해 웹에서 표현하여 어느 작물이 어떤 환경에서 잘 기를 수 있고 어떤 달에 어떤 작물이 잘 자라지 않는지를 예측하여 작물을 기를 수 있음

## 구조도
<img width="513" alt="구조도" src="https://user-images.githubusercontent.com/61819669/144732795-47d20a51-500b-4c6d-a9a3-8bf97df44846.png">
- AWS Lambda <br/>
- AWS API gateway <br/>
- AWS SNS <br/>
- DynamoDB <br/>
- AWS IoT Core <br/>
- MKRWiFi1010 <br/>

## 서비스 시연
