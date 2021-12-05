package com.amazonaws.lambda.demo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.TimeZone;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.utils.NameMap;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class LogDeviceHandler implements RequestHandler<Event, String> {
	//디바이스 로그 조회를 위한 클래스

    private DynamoDB dynamoDb;

    @Override
    public String handleRequest(Event input, Context context) {
        this.initDynamoDbClient();

        Table table = dynamoDb.getTable(input.device);

        
        long from=0; //로그 조회 시작일
        long to=0; //로그 조회 마지막일
        try {
            SimpleDateFormat sdf = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
 
            from = sdf.parse(input.from).getTime() / 1000;  //시간 변환
            to = sdf.parse(input.to).getTime() / 1000;  //시간 변환
        } catch (ParseException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        ScanSpec scanSpec = new ScanSpec()
                .withFilterExpression("#t between :from and :to").withNameMap(new NameMap().with("#t", "time"))
                .withValueMap(new ValueMap().withNumber(":from", from).withNumber(":to", to));  //로그조회를 위한 쿼리

        ItemCollection<ScanOutcome> items=null;
        try {
            items = table.scan(scanSpec);  //테이블로 부터 스캔
        }
        catch (Exception e) {
            System.err.println("Unable to scan the table:"); //에러시 에러문 출력
        }

        return getResponse(items);
    }

    private String getResponse(ItemCollection<ScanOutcome> items) {

        Iterator<Item> iter = items.iterator();
        String response = "{ \"data\": [";  //response를 json 형식으로 변환
        for (int i =0; iter.hasNext(); i++) {
            if (i!=0) 
                response +=",";
            response += iter.next().toJSON();
        }
        response += "]}";
        return response;
    }

    private void initDynamoDbClient() {
        AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().withRegion("ap-northeast-2").build();  //dynamodb 접속을 위한 인스턴스 생성

        this.dynamoDb = new DynamoDB(client);  //dynamodb 인스턴스 생성
    }
}

class Event {  
    public String device;  //device 명
    public String from;  //조회 시작일
    public String to;  //조회 마지막일 
}